"use client"

import { useState, type ReactNode, type JSX } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScanSearch, Loader2, CheckCircle, XCircle, AlertCircle, Download, PlayCircle, StopCircle } from "lucide-react"
import { predictSync } from "@/lib/api/rails-server"

const DEFAULT_RULES = `Must not contain profanity
Must be constructive
Should provide specific details
Must be respectful
Must not contain spam`

interface CollectedContentItem {
  id: string
  type: "post" | "comment"
  author: string
  content: string
  element: Element
}

interface Violation {
  rule: string
  severity: "low" | "medium" | "high"
}

interface ComplianceResult {
  id: string
  type: "post" | "comment"
  author: string
  content: string
  is_compliant: boolean
  confidence_score: number
  violations: Violation[]
  timestamp: string
  error?: string
}

type Platform = "facebook" | "reddit" | "pantip" | "unknown"

interface ExamplesLayoutProps {
  children: ReactNode
}

async function callPredictAPI(data: {
  available_model_id: string
  input_text: string
  rules: string
}): Promise<{ data: any; error: string | null }> {
  try {
    console.log("[v0] ===== STARTING API CALL =====")
    console.log("[v0] Calling predictSync with:", {
      model_id: data.available_model_id,
      text_length: data.input_text.length,
      rules_length: data.rules.length,
      full_data: data,
    })

    console.log("[v0] About to call predictSync function...")

    // Call the Rails server action directly
    const result = await predictSync(data)

    console.log("[v0] ===== API CALL SUCCESS =====")
    console.log("[v0] predictSync success response:", result)
    return { data: result, error: null }
  } catch (error) {
    console.error("[v0] ===== API CALL FAILED =====")
    console.error("[v0] predictSync exception:", error)
    console.error("[v0] Error type:", typeof error)
    console.error("[v0] Error name:", error instanceof Error ? error.name : "unknown")
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "no stack")

    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps): JSX.Element {
  const pathname = usePathname()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [collectedContent, setCollectedContent] = useState<CollectedContentItem[]>([])
  const [rules, setRules] = useState<string>(DEFAULT_RULES)
  const [results, setResults] = useState<ComplianceResult[]>([])
  const [progress, setProgress] = useState<number>(0)
  const [selectedModelId, setSelectedModelId] = useState<string>("1")

  // Determine platform from pathname
  const getPlatform = (): Platform => {
    if (pathname?.includes("facebook")) return "facebook"
    if (pathname?.includes("reddit")) return "reddit"
    if (pathname?.includes("pantip")) return "pantip"
    return "unknown"
  }

  const platform: Platform = getPlatform()

  // Scan and collect all text content from the page
  const scanPageContent = (): void => {
    setIsScanning(true)
    const content: CollectedContentItem[] = []

    try {
      console.log("[v0] Starting page scan...")

      // Find main post/thread
      const mainContent = document.querySelector('[data-type="main-post"]')
      console.log("[v0] Found main post element:", mainContent)

      if (mainContent) {
        const text = mainContent.textContent?.trim() || ""
        console.log("[v0] Main post text length:", text.length)

        if (text && text.length > 10) {
          content.push({
            id: "main-post",
            type: "post",
            author: "Main Author",
            content: text.substring(0, 500), // Limit length
            element: mainContent,
          })
          console.log("[v0] Added main post to content")
        }
      }

      // Find all comments - simplified to focus on data-type attribute
      const commentElements = document.querySelectorAll('[data-type="comment"]')
      console.log("[v0] Found comment elements:", commentElements.length)

      commentElements.forEach((element, index) => {
        const text = element.textContent?.trim() || ""
        console.log(`[v0] Comment ${index} text length:`, text.length)

        if (text && text.length > 10) {
          // Try to find author name
          let author = "Unknown"
          const authorElement = element.querySelector('[class*="author"], .username, [class*="user"], h4, h3')
          if (authorElement) {
            author = authorElement.textContent?.trim() || "Unknown"
          }

          content.push({
            id: `comment-${index}`,
            type: "comment",
            author: author,
            content: text.substring(0, 500),
            element,
          })
          console.log(`[v0] Added comment ${index} to content`)
        }
      })

      console.log("[v0] Total content items collected:", content.length)
      setCollectedContent(content)
    } catch (error) {
      console.error("[v0] Error scanning page:", error)
    }

    setIsScanning(false)
  }

  const processAllContent = async (): Promise<void> => {
    if (collectedContent.length === 0) return

    console.log("[v0] ===== STARTING BULK PROCESSING =====")
    console.log("[v0] Total items to process:", collectedContent.length)
    console.log("[v0] Selected model ID:", selectedModelId)
    console.log("[v0] Rules:", rules)

    setIsProcessing(true)
    setResults([])
    setProgress(0)

    const MAX_CONCURRENT = 3 // Max 3 threads running concurrently
    const batches: CollectedContentItem[][] = []

    for (let i = 0; i < collectedContent.length; i += MAX_CONCURRENT) {
      batches.push(collectedContent.slice(i, i + MAX_CONCURRENT))
    }

    let processedCount = 0
    const allResults: ComplianceResult[] = []

    console.log("[v0] Starting batch processing:", {
      total_items: collectedContent.length,
      total_batches: batches.length,
      max_concurrent: MAX_CONCURRENT,
    })

    for (const batch of batches) {
      console.log("[v0] ===== PROCESSING NEW BATCH =====")
      console.log("[v0] Processing batch with", batch.length, "items")
      console.log(
        "[v0] Batch items:",
        batch.map((b) => ({ id: b.id, type: b.type })),
      )

      const batchPromises = batch.map(async (item): Promise<ComplianceResult> => {
        console.log("[v0] ----- Processing item:", item.id, "-----")
        console.log("[v0] Item type:", item.type)
        console.log("[v0] Item content preview:", item.content.substring(0, 100))

        const { data, error } = await callPredictAPI({
          available_model_id: selectedModelId,
          input_text: item.content,
          rules: rules,
        })

        console.log("[v0] Item", item.id, "result:", { hasData: !!data, error })

        if (error || !data) {
          console.error("[v0] Error processing item:", item.id, error)
          return {
            id: item.id,
            type: item.type,
            author: item.author,
            content: item.content,
            is_compliant: false,
            confidence_score: 0,
            violations: [{ rule: "API Error", severity: "high" }],
            timestamp: new Date().toISOString(),
            error: error || "Unknown error",
          }
        }

        console.log("[v0] Successfully processed item:", item.id, data)
        return {
          id: item.id,
          type: item.type,
          author: item.author,
          content: item.content,
          is_compliant: data.is_compliant ?? false,
          confidence_score: data.confidence_score ?? 0,
          violations: [], // Parse from data.result if needed
          timestamp: new Date().toISOString(),
        }
      })

      console.log("[v0] Waiting for batch promises to resolve...")
      const batchResults = await Promise.all(batchPromises)
      console.log("[v0] Batch promises resolved. Results:", batchResults.length)

      allResults.push(...batchResults)
      processedCount += batch.length

      console.log("[v0] Batch complete. Processed:", processedCount, "of", collectedContent.length)

      setProgress((processedCount / collectedContent.length) * 100)
      setResults([...allResults])
    }

    setIsProcessing(false)
    console.log("[v0] ===== PROCESSING COMPLETE =====")
    console.log("[v0] Total results:", allResults.length)
    console.log("[v0] Compliant:", allResults.filter((r) => r.is_compliant).length)
    console.log("[v0] Non-compliant:", allResults.filter((r) => !r.is_compliant).length)
    console.log("[v0] Errors:", allResults.filter((r) => r.error).length)
  }

  // Stop processing
  const stopProcessing = (): void => {
    setIsProcessing(false)
  }

  // Export results as JSON
  const exportResults = (): void => {
    const dataStr = JSON.stringify(results, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `compliance-results-${platform}-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleOpen = (): void => {
    setShowDialog(true)
    setCollectedContent([])
    setResults([])
    setProgress(0)
    setTimeout(() => scanPageContent(), 500)
  }

  const compliantCount = results.filter((r) => r.is_compliant).length
  const nonCompliantCount = results.filter((r) => !r.is_compliant).length

  return (
    <div className="relative">
      {/* Floating Action Button */}
      <Button
        onClick={handleOpen}
        className="fixed bottom-8 right-8 z-50 h-14 px-6 shadow-2xl hover:shadow-3xl transition-all"
        size="lg"
      >
        <ScanSearch className="w-5 h-5 mr-2" />
        Bulk Compliance Check
      </Button>

      {/* Main Content */}
      {children}

      {/* Bulk Compliance Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="min-w-7xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <ScanSearch className="w-6 h-6" />
              Bulk Compliance Checker - {platform.toUpperCase()}
            </DialogTitle>
            <DialogDescription>
              Scan and analyze all posts and comments on this page (Max 3 concurrent threads)
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4">
            {/* Left Column - Collected Content */}
            <Card className="col-span-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Collected Content</h3>
                <Badge variant="secondary">{collectedContent.length} items</Badge>
              </div>

              {isScanning ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Scanning page...</p>
                </div>
              ) : (
                <ScrollArea className="h-[450px]">
                  <div className="space-y-2">
                    {collectedContent.map((item) => (
                      <Card key={item.id} className="p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-2">
                          <Badge variant={item.type === "post" ? "default" : "secondary"} className="text-xs shrink-0">
                            {item.type}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground truncate">{item.author}</p>
                            <p className="text-xs line-clamp-2 mt-1">{item.content}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {collectedContent.length > 0 && (
                <Button
                  onClick={scanPageContent}
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  size="sm"
                  disabled={isScanning}
                >
                  Rescan Page
                </Button>
              )}
            </Card>

            {/* Middle Column - Rules & Controls */}
            <Card className="col-span-1 p-4">
              <h3 className="font-semibold mb-4">Compliance Rules</h3>

              <Textarea
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                rows={12}
                className="font-mono text-xs mb-4"
                placeholder="Enter rules, one per line..."
              />

              <div className="space-y-3">
                {!isProcessing ? (
                  <Button
                    onClick={processAllContent}
                    disabled={collectedContent.length === 0 || isScanning}
                    className="w-full"
                    size="lg"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Processing ({collectedContent.length})
                  </Button>
                ) : (
                  <Button onClick={stopProcessing} variant="destructive" className="w-full" size="lg">
                    <StopCircle className="w-4 h-4 mr-2" />
                    Stop Processing
                  </Button>
                )}

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      Processing {results.length} of {collectedContent.length} items (3 threads)...
                    </p>
                  </div>
                )}

                {results.length > 0 && !isProcessing && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="p-3 bg-green-50 border-green-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-xs text-green-700">Compliant</p>
                            <p className="text-lg font-bold text-green-900">{compliantCount}</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3 bg-red-50 border-red-200">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="text-xs text-red-700">Non-Compliant</p>
                            <p className="text-lg font-bold text-red-900">{nonCompliantCount}</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <Button onClick={exportResults} variant="outline" className="w-full bg-transparent" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Results (JSON)
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Right Column - Results */}
            <Card className="col-span-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Results</h3>
                <Badge variant="secondary">{results.length} analyzed</Badge>
              </div>

              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No results yet. Click "Start Processing" to begin.</p>
                </div>
              ) : (
                <ScrollArea className="h-[450px]">
                  <div className="space-y-2">
                    {results.map((result) => (
                      <Card
                        key={result.id}
                        className={`p-3 ${
                          result.error
                            ? "border-yellow-200 bg-yellow-50"
                            : result.is_compliant
                              ? "border-green-200 bg-green-50"
                              : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          {result.error ? (
                            <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                          ) : result.is_compliant ? (
                            <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {result.type}
                              </Badge>
                              <span className="text-xs font-medium truncate">{result.author}</span>
                            </div>
                            <p className="text-xs line-clamp-2 text-muted-foreground mb-2">{result.content}</p>
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-semibold ${
                                  result.error
                                    ? "text-yellow-700"
                                    : result.is_compliant
                                      ? "text-green-700"
                                      : "text-red-700"
                                }`}
                              >
                                {result.error ? "Error" : result.is_compliant ? "Compliant" : "Non-Compliant"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {(result.confidence_score * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {result.error && (
                          <Alert variant="destructive" className="mt-2 py-2">
                            <AlertDescription className="text-xs">{result.error}</AlertDescription>
                          </Alert>
                        )}

                        {result.violations && result.violations.length > 0 && (
                          <Alert variant="destructive" className="mt-2 py-2">
                            <AlertDescription className="text-xs">
                              {result.violations.map((v, idx) => (
                                <div key={idx}>• {v.rule}</div>
                              ))}
                            </AlertDescription>
                          </Alert>
                        )}
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
