import { MessageCircle, ThumbsUp, Share2, MoreHorizontal, ArrowLeft, Heart, Laugh, Angry } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Facebook = () => {
  const post = {
    author: "Sarah Johnson",
    avatar: "SJ",
    time: "4 hours ago",
    content: "Looking for recommendations for a good coffee shop in the area. Any suggestions? I'm particularly interested in places with great atmosphere and quality espresso. Bonus points if they have good pastries! ☕🥐",
    likes: 156,
    comments: 43,
    shares: 12,
    reactions: { like: 89, love: 45, laugh: 12, angry: 3 }
  };

  const comments = [
    {
      id: 1,
      author: "Mike Chen",
      avatar: "MC",
      time: "3 hours ago",
      content: "Have you tried The Daily Grind on Main Street? Their espresso is amazing and they have the best croissants in town!",
      likes: 24,
      replies: [
        {
          id: 11,
          author: "Sarah Johnson",
          avatar: "SJ",
          time: "3 hours ago",
          content: "Oh yes! I've heard about that place. Is it usually crowded in the mornings?",
          likes: 8
        },
        {
          id: 12,
          author: "Mike Chen",
          avatar: "MC",
          time: "2 hours ago",
          content: "It can get busy around 8-9 AM, but they have a good flow. Weekends are more relaxed actually!",
          likes: 12
        }
      ]
    },
    {
      id: 2,
      author: "Emma Wilson",
      avatar: "EW",
      time: "2 hours ago",
      content: "Brew & Bean is my absolute favorite! They roast their own beans and the baristas are super knowledgeable. Plus they have a cozy reading nook upstairs 📚",
      likes: 45,
      replies: [
        {
          id: 21,
          author: "David Park",
          avatar: "DP",
          time: "2 hours ago",
          content: "Second this! Their single origin pour-overs are incredible. Ask for Mark, he'll recommend the perfect brew based on your taste.",
          likes: 19
        },
        {
          id: 22,
          author: "Sarah Johnson",
          avatar: "SJ",
          time: "1 hour ago",
          content: "This sounds perfect! Do they have WiFi? I sometimes work from coffee shops.",
          likes: 5
        },
        {
          id: 23,
          author: "Emma Wilson",
          avatar: "EW",
          time: "1 hour ago",
          content: "Yes! Free WiFi and plenty of outlets. The upstairs area is perfect for working.",
          likes: 8
        }
      ]
    },
    {
      id: 3,
      author: "James Rodriguez",
      avatar: "JR",
      time: "2 hours ago",
      content: "Honestly, all the chain places are overrated. Try the little Vietnamese cafe next to the library - amazing iced coffee and banh mi!",
      likes: 67,
      replies: [
        {
          id: 31,
          author: "Lisa Thompson",
          avatar: "LT",
          time: "1 hour ago",
          content: "OMG yes! Their Vietnamese iced coffee is addictive. I go there at least twice a week.",
          likes: 23
        }
      ]
    },
    {
      id: 4,
      author: "Rachel Green",
      avatar: "RG",
      time: "1 hour ago",
      content: "Sunset Coffee House just opened last month and it's gorgeous! Floor-to-ceiling windows with a view of the park. Their lavender latte is to die for 💜",
      likes: 34,
      replies: []
    },
    {
      id: 5,
      author: "Tom Anderson",
      avatar: "TA",
      time: "45 minutes ago",
      content: "If you're into specialty coffee, check out Third Wave Roasters. They're serious about their craft - origin info on every bag, precise brewing methods. Not cheap but worth it for coffee enthusiasts.",
      likes: 28,
      replies: [
        {
          id: 51,
          author: "Sarah Johnson",
          avatar: "SJ",
          time: "30 minutes ago",
          content: "I love places that take coffee seriously! Adding this to my list. Thanks everyone for the amazing suggestions! 🙏",
          likes: 15
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-facebook shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold text-white">Coffee Lovers Community</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container max-w-4xl py-8">
        {/* Original Post */}
        <Card className="p-6 mb-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-facebook text-white text-lg">{post.avatar}</AvatarFallback>
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
                <div className="w-6 h-6 rounded-full bg-facebook flex items-center justify-center border-2 border-background">
                  <ThumbsUp className="w-3 h-3 text-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center border-2 border-background">
                  <Heart className="w-3 h-3 text-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center border-2 border-background">
                  <Laugh className="w-3 h-3 text-white" />
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
              <Input
                id="text-input"
                placeholder="Write a comment..."
                className="rounded-full"
              />
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-facebook text-white">{comment.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <h4 className="font-semibold text-sm mb-1">{comment.author}</h4>
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 px-2">
                      <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                        Like
                      </button>
                      <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                        Reply
                      </button>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                      {comment.likes > 0 && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> {comment.likes}
                        </span>
                      )}
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-facebook text-white text-xs">{reply.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted rounded-2xl px-4 py-3">
                                <h4 className="font-semibold text-sm mb-1">{reply.author}</h4>
                                <p className="text-sm leading-relaxed">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-4 mt-2 px-2">
                                <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                                  Like
                                </button>
                                <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                                  Reply
                                </button>
                                <span className="text-xs text-muted-foreground">{reply.time}</span>
                                {reply.likes > 0 && (
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3" /> {reply.likes}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Facebook;
