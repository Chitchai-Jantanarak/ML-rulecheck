"use client"

import { ArrowBigUp, ArrowBigDown, MessageSquare, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function RedditDemo() {
  const thread = {
    title: "What's your favorite programming language and why?",
    author: "u/codewizard",
    subreddit: "r/programming",
    upvotes: 2847,
    time: "8 hours ago",
    content:
      "I've been programming for about 10 years now, and I've worked with many different languages - Python, JavaScript, Java, C++, Go, Rust, and more. Each has its strengths, but I'm curious to hear from the community: what's YOUR favorite and why?",
    awards: 12,
  }

  const comments = [
    {
      id: 1,
      author: "u/rustacean_prime",
      avatar: "RP",
      upvotes: 1234,
      time: "7 hours ago",
      content:
        "Rust, hands down. Once you get past the learning curve (and yes, it's steep), you gain a level of confidence in your code that's hard to match. No more wondering if you have a memory leak or a data race.",
    },
    {
      id: 2,
      author: "u/pythonista_forever",
      avatar: "PF",
      upvotes: 892,
      time: "7 hours ago",
      content:
        "Team Python here! I love that I can write concise, readable code. Yes, performance matters, but developer time is expensive. If I need performance-critical sections, I'll write them in Rust or C and call them from Python.",
    },
    {
      id: 3,
      author: "u/go_gopher",
      avatar: "GG",
      upvotes: 678,
      time: "6 hours ago",
      content:
        "Go for backend services, no contest. Simple, fast to compile, built-in concurrency that actually makes sense, and deployment is a single binary.",
    },
  ]

  return (
    <div className="container mx-auto min-h-screen bg-background">
      <header className="px-20 sticky top-0 z-50 w-full border-b bg-[#ff4500] shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <span className="text-lg font-bold text-white">{thread.subreddit}</span>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Reddit Demo
          </Badge>
        </div>
      </header>

      <main className="container max-w-5xl py-8">
        <Card className="shadow-lg overflow-hidden" data-type="main-post">
          <div className="flex">
            {/* Voting sidebar */}
            <div className="bg-muted/50 p-4 flex flex-col items-center gap-2 min-w-[60px]">
              <Button variant="ghost" size="icon" className="hover:bg-background">
                <ArrowBigUp className="w-8 h-8 text-muted-foreground hover:text-[#ff4500]" />
              </Button>
              <div className="text-center">
                <span className="font-bold text-lg">{thread.upvotes}</span>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-background">
                <ArrowBigDown className="w-8 h-8 text-muted-foreground" />
              </Button>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="font-semibold text-foreground hover:underline cursor-pointer">{thread.subreddit}</span>
                <span>•</span>
                <span>
                  Posted by <span className="hover:underline cursor-pointer">{thread.author}</span>
                </span>
                <span>•</span>
                <span>{thread.time}</span>
                {thread.awards > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>{thread.awards} Awards</span>
                    </div>
                  </>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>

              <p className="mb-6 leading-relaxed">{thread.content}</p>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {comments.length} Comments
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Award className="w-4 h-4 mr-2" />
                  Give Award
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Comment input */}
        <Card className="p-6 my-6 shadow-lg">
          <Input placeholder="What are your thoughts?" className="mb-3" />
        </Card>

        {/* Comments section */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="shadow-lg" data-type="comment">
              <div className="flex gap-4 p-4">
                {/* Vote column */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted">
                    <ArrowBigUp className="w-5 h-5 text-muted-foreground hover:text-[#ff4500]" />
                  </Button>
                  <span className="text-sm font-bold">{comment.upvotes}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted">
                    <ArrowBigDown className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>

                {/* Comment content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[#ff4500] text-white text-xs">{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm hover:underline cursor-pointer">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>

                  <p className="mb-3 leading-relaxed text-sm">{comment.content}</p>

                  <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                    <button className="hover:bg-muted px-2 py-1 rounded">Reply</button>
                    <button className="hover:bg-muted px-2 py-1 rounded">Award</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
