import { MessageSquare, Eye, Clock, Star, ArrowLeft, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Panthip = () => {
  const topic = {
    title: "ถามหน่อยครับ MacBook Air M2 ซื้อดีไหม",
    category: "Tech",
    author: "techgeek",
    views: 3456,
    replies: 87,
    time: "8 ชั่วโมงที่แล้ว",
    hot: true,
    content: "สวัสดีครับทุกคน กำลังคิดว่าจะซื้อ MacBook Air M2 เป็นเครื่องหลักใช้ทำงาน (เขียนโปรแกรม, ตัดต่อวิดีโอเบาๆ)\n\nงบประมาณอยู่ที่ประมาณ 40,000-50,000 บาท\n\nสเปคที่สนใจ:\n- M2 chip\n- RAM 16GB\n- SSD 256GB (อาจจะอัพเป็น 512GB)\n\nอยากทราบว่า:\n1. ใช้งานหนักๆ แล้วเครื่องร้อนไหมครับ\n2. RAM 16GB พอไหมสำหรับงานเขียนโค้ด + เปิดแท็บเยอะๆ\n3. ควรซื้อ 256GB แล้วใช้ external drive หรือจ่ายเพิ่มไป 512GB ดีกว่า\n\nขอบคุณล่วงหน้าครับ 🙏"
  };

  const replies = [
    {
      id: 1,
      author: "appleexpert2024",
      avatar: "AE",
      time: "7 ชั่วโมงที่แล้ว",
      floor: "#1",
      content: "ผมใช้ M2 Air มา 6 เดือนแล้วครับ ตอบเลยว่าเครื่องดีมากๆ\n\n1. เรื่องความร้อน: ใช้งานทั่วไปไม่ร้อนเลยครับ แม้แต่รันโค้ดหรือ compile ก็ยังอุ่นๆ เท่านั้น ไม่ร้อนจี๊ดแบบ Intel เลย แต่ถ้าเอาไปเรนเดอร์วิดีโอยาวๆ หรือ export project ใหญ่ อาจจะร้อนหน่อย แต่ก็ยังใช้งานได้ปกติ\n\n2. RAM 16GB: เพียงพอมากครับสำหรับงานเขียนโค้ด ผมเปิด VS Code, Chrome (20-30 แท็บ), Docker, และ Simulator พร้อมกัน ยังลื่นไหลดี M2 จัดการ memory ได้ดีกว่า Intel เยอะ\n\n3. Storage: แนะนำ 512GB เลยครับ ถ้างบพอ เพราะ 256GB เหลือใช้จริงๆ ประมาณ 220GB พอลง Xcode, Android Studio, Node modules อะไรประมาณนี้ พื้นที่จะหมดเร็วมาก External drive ใช้ได้แต่ไม่สะดวกเท่า internal\n\nโดยรวมแล้วคุ้มค่ามากครับ แบตเตอรี่อึดมาก ใช้งานได้ทั้งวันเลย",
      likes: 45,
      replies: [
        {
          id: 11,
          author: "techgeek",
          avatar: "TG",
          time: "7 ชั่วโมงที่แล้ว",
          floor: "#1.1",
          content: "ขอบคุณมากครับ ตอนนี้เอียงไป 512GB แล้ว แต่ราคาแพงขึ้นเกือบหมื่นเลย 😅",
          likes: 12
        },
        {
          id: 12,
          author: "dealhunter",
          avatar: "DH",
          time: "6 ชั่วโมงที่แล้ว",
          floor: "#1.2",
          content: "ลองรอ promotion ดูครับ ช่วงนี้หลายร้านมี deal ดีๆ อาจจะได้ราคาดีกว่า Apple Store ตรง",
          likes: 23
        }
      ]
    },
    {
      id: 2,
      author: "devlifestyle",
      avatar: "DL",
      time: "6 ชั่วโมงที่แล้ว",
      floor: "#2",
      content: "จากประสบการณ์ผมที่ใช้ M2 Air เขียน React, Node.js:\n\n**ข้อดี:**\n- เงียบสนิท ไม่มีเสียงพัดลม\n- แบตอึดสุดๆ code ได้ 10-12 ชม. ไม่ต้องเสียบปลั๊ก\n- ตัวเครื่องเบาดี พกพาสะดวก\n- Performance ดีเกินราคา\n\n**ข้อควรระวัง:**\n- จอ notch อาจจะรบกวนบางคนนะครับ\n- port มีแค่ 2 พอร์ต อาจต้องซื้อ hub เพิ่ม\n- ไม่มี HDMI/SD card reader ในตัว\n\nสรุป: ถ้างานหลักๆ เป็นเขียนโค้ด + งานทั่วไป ตัวนี้เหมาะมากครับ แต่ถ้าจะทำงานหนักๆ แบบ 3D rendering หรือ video editing 4K+ อาจจะต้องดู Pro แทน",
      likes: 67,
      replies: []
    },
    {
      id: 3,
      author: "windowsuser99",
      avatar: "WU",
      time: "5 ชั่วโมงที่แล้ว",
      floor: "#3",
      content: "ผมเป็น Windows user มาตลอด แต่พอได้ลองใช้ M2 Air ของเพื่อน รู้สึกว่า macOS น่าสนใจดีนะ\n\nแต่ถ้าคุ้นกับ Windows จะปรับตัวยากไหมครับ?",
      likes: 15,
      replies: [
        {
          id: 31,
          author: "switchedtomac",
          avatar: "SM",
          time: "4 ชั่วโมงที่แล้ว",
          floor: "#3.1",
          content: "ผมเพิ่งเปลี่ยนมา 3 เดือนครับ ช่วงแรกงงนิดหน่อย แต่พอผ่านไป 1-2 สัปดาห์ ก็เริ่มคุ้นแล้ว ตอนนี้กลับไปใช้ Windows แล้วกลับรู้สึกไม่ถนัดเสียอีก 😂\n\nเคล็ดลับคือหา keyboard shortcuts ที่ใช้บ่อยๆ แล้วจำไว้ จะทำให้เร็วขึ้นเยอะ",
          likes: 28
        }
      ]
    },
    {
      id: 4,
      author: "budgetconsious",
      avatar: "BC",
      time: "4 ชั่วโมงที่แล้ว",
      floor: "#4",
      content: "ถ้างบจำกัด แนะนำลองดู M1 Air มือสองครับ ราคาถูกลงมาเยอะ แต่ performance ก็ยังดีมากๆ\n\nหรือไม่ก็รอ M3 ออกมา M2 ก็น่าจะลดราคาลงอีก\n\nอย่างผมซื้อ M1 Air มา 35,000 ใช้งานหนักมา 2 ปี ยังไม่มีปัญหาอะไรเลย เร็วแรงครบทุกอย่าง",
      likes: 34,
      replies: [
        {
          id: 41,
          author: "techgeek",
          avatar: "TG",
          time: "3 ชั่วโมงที่แล้ว",
          floor: "#4.1",
          content: "M1 มือสองน่าสนใจดีนะครับ แต่กลัวเรื่อง warranty กับ battery health อะครับ มีวิธีเช็คไหมครับ",
          likes: 8
        },
        {
          id: 42,
          author: "macrefurbished",
          avatar: "MR",
          time: "2 ชั่วโมงที่แล้ว",
          floor: "#4.2",
          content: "เช็ค battery cycle count ได้ง่ายครับ กด Option + คลิกที่ไอคอนแบต จะขึ้น\n\nถ้าซื้อมือสอง ควรหาเครื่องที่ cycle count ไม่เกิน 100-150 และ health ยังอยู่เหนือ 90% จะคุ้มค่าที่สุด",
          likes: 19
        }
      ]
    },
    {
      id: 5,
      author: "videoeditor_pro",
      avatar: "VP",
      time: "3 ชั่วโมงที่แล้ว",
      floor: "#5",
      content: "สำหรับงานตัดต่อวิดีโอ:\n\nM2 Air จัดการ 1080p ได้สบายครับ ลื่นไหลดี ไม่มีปัญหา แต่ถ้าจะทำ 4K หรือ multicam editing แนะนำไปดู M2 Pro หรือ Max จะดีกว่า\n\nFinal Cut Pro ใช้งานได้ดีมากบน M2 เพราะ optimize มาดี แต่ถ้าใช้ Adobe Premiere อาจจะต้องการ RAM มากกว่านี้\n\nแนะนำให้ซื้อ RAM 16GB ขั้นต่ำสำหรับงานวิดีโอนะครับ",
      likes: 52,
      replies: []
    },
    {
      id: 6,
      author: "studentsaver",
      avatar: "SS",
      time: "2 ชั่วโมงที่แล้ว",
      floor: "#6",
      content: "ถ้าเป็นนักศึกษา แนะนำให้สมัคร Apple Education Pricing ได้ส่วนลดเยอะครับ ประมาณ 3,000-4,000 บาท\n\nแถมยังได้ AirPods ฟรีอีกด้วย (ช่วง promotion) คุ้มมากๆ!",
      likes: 41,
      replies: [
        {
          id: 61,
          author: "techgeek",
          avatar: "TG",
          time: "1 ชั่วโมงที่แล้ว",
          floor: "#6.1",
          content: "เสียดายที่จบมาแล้วครับ 😢 แต่ขอบคุณสำหรับ info นะครับ",
          likes: 6
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-panthip shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold text-white">Pantip - ห้อง {topic.category}</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container max-w-5xl py-8">
        {/* Topic header */}
        <Card className="p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            {topic.hot && (
              <Badge className="bg-panthip hover:bg-panthip-hover">
                🔥 HOT
              </Badge>
            )}
            <Badge variant="secondary">{topic.category}</Badge>
          </div>

          <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-panthip text-white text-xs">
                  {topic.author[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>โดย <span className="font-semibold text-foreground">{topic.author}</span></span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {topic.time}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {topic.views.toLocaleString()} ครั้ง
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {topic.replies} ความคิดเห็น
            </div>
          </div>

          <div className="prose max-w-none">
            {topic.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-3 leading-relaxed whitespace-pre-line">{paragraph}</p>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4 mt-4 border-t">
            <Button variant="outline" size="sm" className="hover:bg-muted">
              <ThumbsUp className="w-4 h-4 mr-2" />
              ถูกใจ
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-muted">
              <Star className="w-4 h-4 mr-2" />
              บันทึก
            </Button>
          </div>
        </Card>

        {/* Reply input */}
        <Card className="p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-3">แสดงความคิดเห็น</h3>
          <Input
            id="text-input"
            placeholder="พิมพ์ความคิดเห็นของคุณ..."
            className="mb-3"
          />
          <Button className="bg-panthip hover:bg-panthip-hover">
            ส่งความคิดเห็น
          </Button>
        </Card>

        {/* Replies */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">ความคิดเห็นทั้งหมด ({replies.length})</h3>
          
          {replies.map((reply) => (
            <Card key={reply.id} className="shadow-lg">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-panthip text-white">
                      {reply.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold">{reply.author}</span>
                      <Badge variant="outline" className="text-xs">{reply.floor}</Badge>
                      <span className="text-sm text-muted-foreground">{reply.time}</span>
                    </div>
                    
                    <div className="prose max-w-none mb-3">
                      {reply.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-2 leading-relaxed whitespace-pre-line">{paragraph}</p>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="hover:bg-muted h-8">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        ถูกใจ ({reply.likes})
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-muted h-8">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        ตอบกลับ
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Nested replies */}
                {reply.replies && reply.replies.length > 0 && (
                  <div className="ml-14 space-y-4 pt-4 border-t">
                    {reply.replies.map((nestedReply) => (
                      <div key={nestedReply.id} className="flex items-start gap-4">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-panthip text-white text-xs">
                            {nestedReply.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-sm">{nestedReply.author}</span>
                            <Badge variant="outline" className="text-xs">{nestedReply.floor}</Badge>
                            <span className="text-xs text-muted-foreground">{nestedReply.time}</span>
                          </div>
                          
                          <p className="text-sm leading-relaxed mb-2">{nestedReply.content}</p>

                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="hover:bg-muted h-7 text-xs">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              ถูกใจ ({nestedReply.likes})
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-muted h-7 text-xs">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              ตอบกลับ
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Panthip;