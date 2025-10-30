"use client"

import { MessageCircle, Eye, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PantipDemo() {
  const thread = {
  title: "Recommend good coffee shops in Bangkok?",
  author: "coffeelover2024",
  avatar: "CL",
  room: "Coffee Lounge",
  time: "5 hours ago",
  views: 1234,
  content:
    "Hi everyone! I'm looking for nice coffee shops in Bangkok with a good atmosphere, great coffee, and reasonable prices. Any recommendations? I’d love places suitable for working, with fast Wi-Fi and convenient parking. Thanks in advance!",
  tags: ["coffee", "restaurant", "Bangkok"],
  }

  const comments = [
    {
      id: 1,
      author: "bangkokfoodie",
      avatar: "BF",
      time: "4 hours ago",
      content:
        "I recommend Roots Coffee Roaster in Ari. The atmosphere is great, they roast their own beans, and the coffee is excellent. Parking is convenient too. Prices are a bit high, but worth it!",
      floor: 1,
    },
    {
      id: 2,
      author: "cafehopper_bkk",
      avatar: "CH",
      time: "3 hours ago",
      content:
        "If you like a cozy vibe, check out Ceresia Coffee Roasters. They have several branches, great coffee, tasty cakes, and fast Wi-Fi — perfect for working. Prices are reasonable too.",
      floor: 2,
    },
    {
      id: 3,
      author: "workfromcafe",
      avatar: "WC",
      time: "2 hours ago",
      content:
        "I like Factory Coffee on Charoenkrung Road. It’s a renovated warehouse with a cool industrial look, great coffee, and lots of seating — ideal for working. It can get crowded on weekends, so weekdays are better.",
      floor: 3,
    },
  ]


  return (
    <div className="container mx-auto min-h-screen bg-background">
      <header className="px-20 sticky top-0 z-50 w-full border-b bg-[#4a148c] shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold text-white">Pantip - {thread.room}</h1>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Pantip Demo
          </Badge>
        </div>
      </header>

      <main className="container max-w-4xl py-8">
        {/* Thread Header */}
        <Card className="p-6 mb-6 shadow-lg" data-type="main-post">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-[#4a148c] text-white">{thread.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">{thread.author}</span>
                <span>•</span>
                <Badge variant="secondary" className="text-xs">
                  {thread.room}
                </Badge>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{thread.time}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{thread.views.toLocaleString()} ครั้ง</span>
                </div>
              </div>
              <p className="mb-4 leading-relaxed">{thread.content}</p>
              <div className="flex gap-2">
                {thread.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="hover:bg-muted">
              <MessageCircle className="w-4 h-4 mr-2" />
              ตอบกลับ
            </Button>
          </div>
        </Card>

        {/* Comments */}
        <Card className="p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">ความคิดเห็น ({comments.length})</h3>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 pb-6 border-b last:border-b-0" data-type="comment">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#4a148c] text-white text-sm">{comment.avatar}</AvatarFallback>
                  </Avatar>
                  <Badge variant="secondary" className="text-xs">
                    #{comment.floor}
                  </Badge>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{comment.content}</p>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      ตอบกลับ
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      ถูกใจ
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
