import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Award, ArrowLeft, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Reddit = () => {
  const thread = {
    title: "What's your favorite programming language and why?",
    author: "u/codewizard",
    subreddit: "r/programming",
    upvotes: 2847,
    upvoteRatio: 94,
    time: "8 hours ago",
    content: "I've been programming for about 10 years now, and I've worked with many different languages - Python, JavaScript, Java, C++, Go, Rust, and more. Each has its strengths, but I'm curious to hear from the community: what's YOUR favorite and why?\n\nFor me, I keep coming back to Python. Yes, it's slower than compiled languages, but the development speed and readability are unmatched. The ecosystem is incredible, and I can go from idea to working prototype faster than any other language.\n\nWhat about you? What makes your favorite language special?",
    awards: 12
  };

  const comments = [
    {
      id: 1,
      author: "u/rustacean_prime",
      avatar: "RP",
      upvotes: 1234,
      time: "7 hours ago",
      content: "Rust, hands down. Once you get past the learning curve (and yes, it's steep), you gain a level of confidence in your code that's hard to match. No more wondering if you have a memory leak or a data race. The compiler is your pair programming partner that never sleeps.\n\nPlus, the community is incredibly welcoming and the tooling (cargo, clippy, rustfmt) is best-in-class.",
      replies: [
        {
          id: 11,
          author: "u/cpp_veteran",
          avatar: "CV",
          upvotes: 456,
          time: "6 hours ago",
          content: "As someone who spent 15 years writing C++, Rust feels like coming home but to a home that's been renovated with all modern amenities. You get the performance of C++ without shooting yourself in the foot every other day."
        },
        {
          id: 12,
          author: "u/codewizard",
          avatar: "CW",
          upvotes: 234,
          time: "6 hours ago",
          content: "OP here - I've been meaning to dive deeper into Rust. The ownership model seems fascinating. Any resources you'd recommend for someone coming from Python/JS?"
        },
        {
          id: 13,
          author: "u/rustacean_prime",
          avatar: "RP",
          upvotes: 567,
          time: "5 hours ago",
          content: "Definitely start with \"The Rust Book\" (it's free online). After that, do the Rustlings exercises. For your background, you might also enjoy \"Programming Rust\" by O'Reilly - it does a great job explaining systems concepts that might be new to you."
        }
      ]
    },
    {
      id: 2,
      author: "u/pythonista_forever",
      avatar: "PF",
      upvotes: 892,
      time: "7 hours ago",
      content: "Team Python here! 🐍\n\nI love that I can write:\n```python\ndata = [x**2 for x in range(10) if x % 2 == 0]\n```\nInstead of 10 lines of boilerplate. Yes, performance matters, but developer time is expensive. If I need performance-critical sections, I'll write them in Rust or C and call them from Python.\n\nAlso, the data science ecosystem is unparalleled. NumPy, Pandas, scikit-learn, PyTorch - if you're doing anything with data or ML, Python is the obvious choice.",
      replies: [
        {
          id: 21,
          author: "u/javascript_ninja",
          avatar: "JN",
          upvotes: 234,
          time: "6 hours ago",
          content: "You can do similar in JS though:\n```javascript\nconst data = Array.from({length: 10}, (_, x) => x).filter(x => x % 2 === 0).map(x => x**2)\n```\nNot quite as clean, but close!"
        },
        {
          id: 22,
          author: "u/pythonista_forever",
          avatar: "PF",
          upvotes: 445,
          time: "5 hours ago",
          content: "Fair point! Though I'd argue Python's version is more readable. But honestly, modern JS is pretty great too. I use both depending on the project."
        }
      ]
    },
    {
      id: 3,
      author: "u/go_gopher",
      avatar: "GG",
      upvotes: 678,
      time: "6 hours ago",
      content: "Go for backend services, no contest.\n\nSimple, fast to compile, built-in concurrency that actually makes sense, and deployment is a single binary. I can write a microservice, compile it, and have it running in production in minutes.\n\nYes, the lack of generics was annoying (though that's fixed now), and error handling is verbose, but the simplicity means my team can onboard new developers quickly and maintain code written years ago without issue.",
      replies: [
        {
          id: 31,
          author: "u/java_enterprise",
          avatar: "JE",
          upvotes: 123,
          time: "5 hours ago",
          content: "This sounds like what Java promised but Go actually delivered. The JVM warmup time alone makes Go more appealing for microservices."
        }
      ]
    },
    {
      id: 4,
      author: "u/typescript_advocate",
      avatar: "TA",
      upvotes: 534,
      time: "5 hours ago",
      content: "TypeScript has changed my life. I used to write JavaScript and spend hours debugging runtime errors. Now the editor catches them before I even save the file.\n\nThe type system is sophisticated enough to express complex patterns but pragmatic enough to adopt gradually. And the ecosystem? Everything from frontend to backend to mobile - you can do it all with TypeScript.",
      replies: [
        {
          id: 41,
          author: "u/javascript_purist",
          avatar: "JP",
          upvotes: -45,
          time: "4 hours ago",
          content: "Or you could just write better tests and not need TypeScript... 🤷"
        },
        {
          id: 42,
          author: "u/senior_dev_1",
          avatar: "SD",
          upvotes: 789,
          time: "4 hours ago",
          content: "Why not both? Types catch entire classes of errors that tests can't easily cover. This isn't an either/or situation."
        }
      ]
    },
    {
      id: 5,
      author: "u/elixir_enthusiast",
      avatar: "EE",
      upvotes: 345,
      time: "4 hours ago",
      content: "Surprised no one has mentioned Elixir yet. If you're building anything that needs to handle thousands of concurrent connections or needs high availability, Elixir (and the BEAM VM) is incredible.\n\nPattern matching, pipe operators, OTP for building fault-tolerant systems - it's all there. Phoenix LiveView is also a game-changer for real-time web apps.",
      replies: []
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-reddit shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <span className="text-lg font-bold text-white">{thread.subreddit}</span>
          <div className="w-24" />
        </div>
      </header>

      <main className="container max-w-5xl py-8">
        <Card className="shadow-lg overflow-hidden">
          <div className="flex">
            {/* Voting sidebar */}
            <div className="bg-muted/50 p-4 flex flex-col items-center gap-2 min-w-[60px]">
              <Button variant="ghost" size="icon" className="hover:bg-background">
                <ArrowBigUp className="w-8 h-8 text-muted-foreground hover:text-reddit" />
              </Button>
              <div className="text-center">
                <span className="font-bold text-lg">{thread.upvotes}</span>
                <div className="text-xs text-muted-foreground">{thread.upvoteRatio}%</div>
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
                <span>Posted by <span className="hover:underline cursor-pointer">{thread.author}</span></span>
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
              
              <div className="prose max-w-none mb-6">
                {thread.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-3 leading-relaxed">{paragraph}</p>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {comments.length} Comments
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Award className="w-4 h-4 mr-2" />
                  Give Award
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Comment input */}
        <Card className="p-6 my-6 shadow-lg">
          <div className="flex gap-3 mb-2">
            <span className="text-sm font-medium">Comment as <span className="text-reddit">u/YourUsername</span></span>
          </div>
          <Input
            id="text-input"
            placeholder="What are your thoughts?"
            className="mb-3"
          />
          <div className="flex justify-end">
            <Button className="bg-reddit hover:bg-reddit-hover">Comment</Button>
          </div>
        </Card>

        {/* Comments section */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="shadow-lg">
              <div className="flex gap-4 p-4">
                {/* Vote column */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted">
                    <ArrowBigUp className="w-5 h-5 text-muted-foreground hover:text-reddit" />
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
                      <AvatarFallback className="bg-reddit text-white text-xs">{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm hover:underline cursor-pointer">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>

                  <div className="prose max-w-none mb-3">
                    {comment.content.split('\n').map((line, idx) => (
                      <p key={idx} className="mb-2 leading-relaxed text-sm">{line}</p>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                    <button className="hover:bg-muted px-2 py-1 rounded">Reply</button>
                    <button className="hover:bg-muted px-2 py-1 rounded">Award</button>
                    <button className="hover:bg-muted px-2 py-1 rounded">Share</button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-l-2 border-muted pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-4">
                          <div className="flex flex-col items-center gap-1 pt-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted">
                              <ArrowBigUp className="w-4 h-4 text-muted-foreground hover:text-reddit" />
                            </Button>
                            <span className="text-xs font-bold">{reply.upvotes}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted">
                              <ArrowBigDown className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="bg-reddit text-white text-[10px]">{reply.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="font-semibold text-sm hover:underline cursor-pointer">{reply.author}</span>
                              <span className="text-xs text-muted-foreground">{reply.time}</span>
                            </div>

                            <p className="text-sm leading-relaxed mb-2">{reply.content}</p>

                            <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                              <button className="hover:bg-muted px-2 py-1 rounded">Reply</button>
                              <button className="hover:bg-muted px-2 py-1 rounded">Award</button>
                              <button className="hover:bg-muted px-2 py-1 rounded">Share</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reddit;