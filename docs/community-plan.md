# WinWin Community — แผนพัฒนา

## แนวคิด
สร้างพื้นที่สำหรับนักเรียน (เจ้าของธุรกิจ) ได้แลกเปลี่ยน เรียนรู้ และสร้าง connection กัน
อยู่ภายใน /learn area — เข้าถึงได้เฉพาะคนที่มีบัญชี

---

## โครงสร้างหน้า

### /learn/community
หน้าหลัก — แสดง feed โพสต์ทั้งหมดหรือกรองตามห้อง

### /learn/community/[spaceSlug]
หน้าห้อง — แสดงโพสต์เฉพาะห้อง

### /learn/community/post/[postId]
หน้าโพสต์ — แสดงโพสต์เต็ม + ความคิดเห็นทั้งหมด

### /learn/community/members
รายชื่อสมาชิก — ดูข้อมูลธุรกิจ + อุตสาหกรรม

---

## Features

### Phase 1 — พื้นฐาน
| Feature | รายละเอียด |
|---------|-----------|
| ห้อง (Spaces) | แยกตามคอร์ส + ห้องทั่วไป "พูดคุย" |
| สิทธิ์เข้าห้อง | ห้องทั่วไป = ทุกคน, ห้องคอร์ส = เฉพาะคนที่ซื้อ |
| โพสต์ | เขียนข้อความ + แนบรูปได้ 1 รูป |
| ความคิดเห็น | ตอบกลับใต้โพสต์ (1 ระดับ ไม่มี nested) |
| ถูกใจ | กดถูกใจโพสต์ได้ |
| ปักหมุด | Admin ปักหมุดโพสต์สำคัญไว้ด้านบน |
| ประกาศ | Admin สร้างโพสต์ประเภท "ประกาศ" มี badge พิเศษ |

### Phase 2 — เพิ่มเติม
| Feature | รายละเอียด |
|---------|-----------|
| Business Profile | เพิ่ม field: ชื่อธุรกิจ, อุตสาหกรรม, จังหวัด, เว็บไซต์ |
| Member Directory | ค้นหาสมาชิกตามอุตสาหกรรม/จังหวัด |
| แท็ก | ติดแท็กโพสต์ เช่น #สินเชื่อ #บัญชี #การเงิน |
| Notification | แจ้งเตือนเมื่อมีคนตอบโพสต์ของเรา |
| ถูกใจ comment | กดถูกใจความคิดเห็นได้ |
| รูปหลายรูป | แนบรูปได้หลายรูปต่อโพสต์ |
| Rich text | เขียนโพสต์แบบ bold/italic/link |

### Phase 3 — ขั้นสูง
| Feature | รายละเอียด |
|---------|-----------|
| Direct Message | ส่งข้อความส่วนตัวระหว่างสมาชิก |
| Real-time | โพสต์/ความคิดเห็นใหม่ขึ้นทันทีไม่ต้อง refresh |
| Poll | สร้างโพลสำรวจความคิดเห็น |
| Event | สร้างนัดหมาย/กิจกรรม |
| Leaderboard | สมาชิกที่ active ที่สุด |
| Report | แจ้งโพสต์/ความคิดเห็นที่ไม่เหมาะสม |

---

## Database

### community_spaces
| Column | Type | หมายเหตุ |
|--------|------|----------|
| id | UUID | PK |
| name | VARCHAR | ชื่อห้อง |
| slug | VARCHAR | URL-friendly, unique |
| description | TEXT | คำอธิบายห้อง |
| course_id | UUID? | FK → courses (null = ห้องทั่วไป) |
| type | VARCHAR | "general" / "course" |
| image_url | VARCHAR? | รูปปกห้อง |
| created_at | TIMESTAMPTZ | |

### community_posts
| Column | Type | หมายเหตุ |
|--------|------|----------|
| id | UUID | PK |
| space_id | UUID | FK → community_spaces |
| user_id | UUID | FK → users |
| content | TEXT | เนื้อหาโพสต์ |
| image_url | VARCHAR? | รูปแนบ |
| is_pinned | BOOLEAN | ปักหมุด (admin) |
| is_announcement | BOOLEAN | ประกาศ (admin) |
| tags | VARCHAR[] | แท็ก |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### community_comments
| Column | Type | หมายเหตุ |
|--------|------|----------|
| id | UUID | PK |
| post_id | UUID | FK → community_posts |
| user_id | UUID | FK → users |
| content | TEXT | เนื้อหา |
| created_at | TIMESTAMPTZ | |

### community_likes
| Column | Type | หมายเหตุ |
|--------|------|----------|
| id | UUID | PK |
| post_id | UUID | FK → community_posts |
| user_id | UUID | FK → users |
| created_at | TIMESTAMPTZ | |
| UNIQUE(post_id, user_id) | | กดได้ครั้งเดียว |

### users (เพิ่ม field — Phase 2)
| Column | Type | หมายเหตุ |
|--------|------|----------|
| business_name | VARCHAR? | ชื่อธุรกิจ |
| industry | VARCHAR? | อุตสาหกรรม |
| province | VARCHAR? | จังหวัด |
| website | VARCHAR? | เว็บไซต์ |
| bio | TEXT? | แนะนำตัวสั้นๆ |

---

## API Endpoints

### Spaces
| Method | Path | หมายเหตุ |
|--------|------|----------|
| GET | /api/community/spaces | รายการห้องที่เข้าถึงได้ |

### Posts
| Method | Path | หมายเหตุ |
|--------|------|----------|
| GET | /api/community/posts?space=slug&page=1 | Feed (pagination) |
| GET | /api/community/posts/:id | โพสต์เดียว + comments |
| POST | /api/community/posts | สร้างโพสต์ |
| PUT | /api/community/posts/:id | แก้ไขโพสต์ (เจ้าของ) |
| DELETE | /api/community/posts/:id | ลบโพสต์ (เจ้าของ/admin) |

### Comments
| Method | Path | หมายเหตุ |
|--------|------|----------|
| POST | /api/community/posts/:id/comments | เพิ่มความคิดเห็น |
| DELETE | /api/community/comments/:id | ลบ (เจ้าของ/admin) |

### Likes
| Method | Path | หมายเหตุ |
|--------|------|----------|
| POST | /api/community/posts/:id/like | กดถูกใจ (toggle) |

### Members
| Method | Path | หมายเหตุ |
|--------|------|----------|
| GET | /api/community/members | รายชื่อสมาชิก |

### Admin
| Method | Path | หมายเหตุ |
|--------|------|----------|
| POST | /api/admin/community/spaces | สร้างห้อง |
| PUT | /api/admin/community/posts/:id/pin | ปักหมุด |
| DELETE | /api/admin/community/posts/:id | ลบโพสต์ |

---

## UI Design

### Feed Layout
```
┌─────────────────────────────────────────────┐
│  Community                                  │
│                                             │
│  [ทั้งหมด] [พูดคุย] [Bank Uncensored] [BHC] │
│                                             │
│  ┌─ สร้างโพสต์ ──────────────────────────┐  │
│  │ [W] มีอะไรอยากแชร์...    [รูป] [โพสต์] │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌─ ปักหมุด ─────────────────────────────┐ │
│  │ วิน (Admin) · ประกาศ                   │ │
│  │ ยินดีต้อนรับสมาชิกใหม่ทุกท่าน...        │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  ┌────────────────────────────────────────┐ │
│  │ สมชาย · ธุรกิจค้าปลีก · 2 ชม.         │ │
│  │                                        │ │
│  │ มีใครเคยยื่นกู้ SME กับ KBank บ้างครับ  │ │
│  │ อยากถามเรื่องเอกสารที่ต้องเตรียม...     │ │
│  │                                        │ │
│  │ [รูป]                                  │ │
│  │                                        │ │
│  │ ♡ 12 ถูกใจ · 5 ความคิดเห็น            │ │
│  │ [ถูกใจ]  [ความคิดเห็น]                  │ │
│  │                                        │ │
│  │  ┌─ อรอนงค์ · 1 ชม.                   │ │
│  │  │ เคยยื่นค่ะ ต้องเตรียม...            │ │
│  │  └─                                   │ │
│  │  ┌─ ธนา · 45 น.                      │ │
│  │  │ ผมเพิ่งผ่านมาเลย แนะนำว่า...        │ │
│  │  └─                                   │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Member Card
```
┌────────────────────────────────────┐
│ [W] สมชาย วงษ์สวัสดิ์              │
│     ค้าปลีก · กรุงเทพ              │
│     บริษัท สมชาย มาร์ท จำกัด       │
│     เรียน: Bank Uncensored, BHC    │
│                                    │
│     5 โพสต์ · สมาชิกตั้งแต่ พ.ค. 69 │
└────────────────────────────────────┘
```

---

## สิทธิ์การเข้าถึง

| บทบาท | สร้างโพสต์ | ลบโพสต์ตัวเอง | ลบโพสต์คนอื่น | ปักหมุด | สร้างห้อง |
|-------|----------|-------------|-------------|---------|---------|
| User | ได้ | ได้ | ไม่ได้ | ไม่ได้ | ไม่ได้ |
| Admin | ได้ | ได้ | ได้ | ได้ | ได้ |

### สิทธิ์เข้าห้อง
- ห้องทั่วไป ("พูดคุย") → ทุกคนที่มีบัญชี
- ห้องคอร์ส ("Bank Uncensored") → เฉพาะคนที่ซื้อคอร์สนั้น
- ไม่มีสิทธิ์ → เห็นห้องแต่เข้าไม่ได้ แสดง "ซื้อคอร์สเพื่อเข้าร่วม"

---

## Sidebar Integration

```
┌─ WinWin Learn ──────────┐
│                          │
│ หน้าหลัก                  │
│ Community ← ใหม่          │
│                          │
│ คอร์สของฉัน               │
│ ├─ Business Health Check │
│ └─ Bank Uncensored       │
│                          │
│ จัดการคอร์ส (admin)       │
│                          │
│ [W] Wachirawit Markk     │
│ ออกจากระบบ                │
└──────────────────────────┘
```

---

## ลำดับการทำ

### Sprint 1 (พื้นฐาน)
1. สร้าง DB tables (spaces, posts, comments, likes)
2. Backend CRUD endpoints
3. หน้า community + feed
4. สร้าง/แสดงโพสต์ + ความคิดเห็น
5. ถูกใจ
6. ห้องแยกตามคอร์ส

### Sprint 2 (ดึงดูด)
7. Business profile fields ใน user
8. Member directory + ค้นหา
9. แนบรูปในโพสต์
10. ประกาศ + ปักหมุด (admin)
11. แท็ก

### Sprint 3 (engagement)
12. Notification (ในระบบ)
13. Rich text editor
14. รูปหลายรูป
15. Admin จัดการ community

---

## เทคโนโลยี

| ส่วน | เทคโนโลยี |
|------|----------|
| Backend | NestJS (learn module เดิม หรือ community module ใหม่) |
| DB | PostgreSQL (tables ใหม่) |
| Frontend | Next.js (ใน /learn/community) |
| รูปภาพ | Upload ไป VPS (/uploads/) เหมือนเดิม |
| Pagination | Cursor-based (scalable) |
| Real-time (อนาคต) | SSE หรือ WebSocket |

---

## KPI ที่ควรวัด
- จำนวนโพสต์ต่อสัปดาห์
- จำนวนสมาชิกที่ active (โพสต์/comment อย่างน้อย 1 ครั้ง/สัปดาห์)
- อัตราการ engage (likes + comments / posts)
- ห้องที่ active ที่สุด
- สมาชิกที่ active ที่สุด
