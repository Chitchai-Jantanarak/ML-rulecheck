"use client"
import { MessageCircle, ThumbsUp, Share2, MoreHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function FacebookDemo() {
  const post = {
    author: "Sarah Johnson",
    avatar: "SJ",
    time: "4 hours ago",
    content:
      "Looking for recommendations for a good coffee shop in the area. Any suggestions? I'm particularly interested in places with great atmosphere and quality espresso. Bonus points if they have good pastries!",
    likes: 156,
    comments: 43,
    shares: 12,
  }

  const comments = [
    {
      id: 1,
      author: "Mike Chen",
      avatar: "MC",
      time: "3 hours ago",
      content:
        "Have you tried The Daily Grind on Main Street? Their espresso is amazing and they have the best croissants in town!",
      likes: 24,
    },
    {
      id: 2,
      author: "Emma Wilson",
      avatar: "EW",
      time: "2 hours ago",
      content:
        "Brew & Bean is my absolute favorite! They roast their own beans and the baristas are super knowledgeable. Plus they have a cozy reading nook upstairs",
      likes: 45,
    },
    {
      id: 3,
      author: "James Rodriguez",
      avatar: "JR",
      time: "2 hours ago",
      content:
        "Honestly, all the chain places are overrated. Try the little Vietnamese cafe next to the library - amazing iced coffee and banh mi!",
      likes: 67,
    },
  ]

  return (
    <div className="container mx-auto min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full px-20 border-b bg-[#1877f2] shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold text-white">Coffee Lovers Community</h1>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Facebook Demo
          </Badge>
        </div>
      </header>

      <main className="flex flex-col object-center items-center justify-center px-20 max-w-4xl py-8">
        {/* Original Post */}
        <Card className="p-6 mb-6 shadow-lg" data-type="main-post">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-[#1877f2] text-white text-lg">{post.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{post.author}</h3>
                <p className="text-sm text-muted-foreground">{post.time}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          <p className="mb-4 text-base leading-relaxed">{post.content}</p>

          <div className="flex items-center gap-6 py-3 border-y my-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-[#1877f2] flex items-center justify-center border-2 border-background">
                  <ThumbsUp className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{post.likes}</span>
            </div>
            <span className="text-sm text-muted-foreground">{post.comments} comments</span>
            <span className="text-sm text-muted-foreground">{post.shares} shares</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="flex-1 hover:bg-muted">
              <ThumbsUp className="w-5 h-5 mr-2" />
              Like
            </Button>
            <Button variant="ghost" className="flex-1 hover:bg-muted">
              <MessageCircle className="w-5 h-5 mr-2" />
              Comment
            </Button>
            <Button variant="ghost" className="flex-1 hover:bg-muted">
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </Card>

        {/* Comments Section */}
        <Card className="p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Comments</h3>

          {/* Add Comment */}
          <div className="flex gap-3 mb-6 pb-6 border-b">
            <Avatar>
              <AvatarFallback className="bg-muted">You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input placeholder="Write a comment..." className="rounded-full" />
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-3 rounded-lg" data-type="comment">
                <Avatar>
                  <AvatarFallback className="bg-[#1877f2] text-white">{comment.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <h4 className="font-semibold text-sm mb-1">{comment.author}</h4>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 px-2">
                    <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">Like</button>
                    <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">Reply</button>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                    {comment.likes > 0 && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {comment.likes}
                      </span>
                    )}
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
