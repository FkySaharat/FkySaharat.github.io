---
title: 'Context Engineering: ให้ AI agent รู้สิ่งที่ต้องรู้ ในเวลาที่ต้องรู้'
description: 'ต่อจาก Harness Engineering: วิธีจัดการ context ให้ AI agent ใน repo นี้ ทั้ง AGENTS.md, skills, error message ที่ดี และการออกแบบโค้ดให้อ่านง่ายสำหรับ agent'
pubDate: 2026-10-20
tags: ['context-engineering', 'ai', 'claude-code']
lang: 'th'
---

ใน[โพสต์ที่แล้ว](/blog/harness-engineering/) ผมเล่าเรื่อง harness ซึ่งเป็นตัวกำหนดว่า AI agent **ทำอะไรได้** และอะไรจะตรวจงานของมัน โพสต์นี้เป็นอีกครึ่งหนึ่ง คือ **context engineering** ซึ่งเป็นตัวกำหนดว่า agent **รู้อะไร**

ถ้า harness คือรั้วกับเบรก context ก็คือแผนที่ที่ส่งให้คนขับ ต่อให้รถดีแค่ไหน ถ้าแผนที่ผิดก็ไปผิดทางอยู่ดี

## Context engineering คืออะไร?

AI model ไม่ได้ "จำ" โปรเจกต์ของเรา สิ่งเดียวที่มันเห็นตอนทำงานคือ **context window** ซึ่งรวมทุกอย่างที่ถูกส่งเข้าไป:

- คำสั่งของเรา
- ไฟล์คำสั่งอย่าง `AGENTS.md`
- ไฟล์ที่ agent เปิดอ่าน
- ผลลัพธ์จาก tool เช่น output ของ `npm run verify`
- บทสนทนาทั้งหมดก่อนหน้า

**Prompt engineering** คือการเขียนคำสั่ง*หนึ่งครั้ง*ให้ดี ส่วน **context engineering** คือการออกแบบว่า*ข้อมูลอะไร* จะเข้าไปใน context *เมื่อไหร่* และ*มากแค่ไหน* ตลอดการทำงาน

ลองนึกถึงวันแรกของเพื่อนร่วมทีมคนใหม่ เราคงไม่โยน wiki ทั้งบริษัทให้อ่านตั้งแต่เช้า แต่จะให้แผนที่คร่าว ๆ ก่อน แล้วค่อยชี้ไปที่เอกสารที่เกี่ยวข้องเมื่อถึงงานนั้น การจัด context ให้ agent ก็ใช้หลักเดียวกัน

## ทำไมใส่ข้อมูลเยอะ ๆ ไว้ก่อนจึงไม่ใช่ทางออก

ตอนแรกผมก็คิดว่ายิ่งบอก agent เยอะยิ่งดี แต่จริง ๆ แล้วมีปัญหา 3 อย่าง:

1. **context มีขนาดจำกัด** ทุกบรรทัดที่ใส่ไปกินพื้นที่ที่ควรเป็นของงานจริง
2. **ข้อมูลที่ไม่เกี่ยวข้องทำให้เสียโฟกัส** ถ้ากฎการเขียนโพสต์อยู่ใน context ตอนแก้ CSS มันไม่ได้ช่วยอะไร แถมเป็นเสียงรบกวน
3. **ข้อมูลที่ล้าสมัยอันตรายกว่าการไม่มีข้อมูล** ถ้าเอกสารบอกว่าไฟล์อยู่ที่หนึ่งแต่จริง ๆ ย้ายไปแล้ว agent จะเชื่อเอกสาร

เป้าหมายจึงไม่ใช่ "ให้ข้อมูลเยอะที่สุด" แต่เป็น **"ให้ข้อมูลที่ถูกต้อง ในเวลาที่ต้องใช้"**

## Context ใน repo นี้มี 3 ชั้น

| ชั้น | โหลดเมื่อไหร่ | ใน repo นี้ |
| --- | --- | --- |
| **Always-on** | ทุกครั้งที่เริ่มทำงาน | `AGENTS.md` (ผ่าน `CLAUDE.md`) |
| **On-demand** | เฉพาะตอนทำงานที่ตรงเรื่อง | skills ใน `.claude/skills/` |
| **Just-in-time** | ตอนที่ agent ต้องใช้จริง | ไฟล์ที่เปิดอ่าน และผลจาก `npm run verify` |

### ชั้นที่ 1: AGENTS.md ต้องสั้น เพราะโหลดทุกครั้ง

`AGENTS.md` ถูกโหลดเข้า context ทุกครั้ง ไม่ว่าจะทำงานอะไร ผมจึงให้มันเป็น**แผนที่** ไม่ใช่คู่มือ ส่วนที่สำคัญที่สุดคือตาราง "อะไรอยู่ตรงไหน":

```md
| Change | Edit |
| --- | --- |
| Blog posts | `src/content/blog/*.md` — file name = URL slug. To write one, follow the `new-post` skill (`.claude/skills/new-post/SKILL.md`) |
| Portfolio projects | `src/content/projects/*.md` — hidden while `draft: true` |
| UI labels (headings, buttons, nav) | `UI` in `src/i18n.ts` |
```

ตารางแบบนี้ประหยัด context ได้มาก agent ไม่ต้องค้นทั้ง repo เพื่อหาว่าต้องแก้ไฟล์ไหน และสังเกตแถวแรก ผมไม่ได้เขียนวิธีเขียนโพสต์ไว้ตรงนี้ แค่**ชี้ไปที่ skill** ส่วนรายละเอียดจะโหลดก็ต่อเมื่อจำเป็น

ส่วน `CLAUDE.md` มีอยู่บรรทัดเดียว:

```md
@AGENTS.md
```

ทำให้มีคำสั่งชุดเดียว ไม่มีเอกสารสองฉบับที่วันหนึ่งจะเขียนไม่ตรงกัน ซึ่งก็คือปัญหา "ข้อมูลล้าสมัย" ในข้อ 3 นั่นเอง

### ชั้นที่ 2: Skills โหลดเฉพาะตอนที่ต้องใช้

skill คือไฟล์ `SKILL.md` ที่อธิบายขั้นตอนของงานหนึ่งอย่างละเอียด ตอนเริ่มทำงาน agent จะเห็นแค่**ชื่อกับคำอธิบายสั้น ๆ** ของแต่ละ skill เนื้อหาเต็มจะถูกโหลดก็ต่อเมื่องานตรงกับ skill นั้น

นี่คือส่วนหัวของ skill `new-post` ใน repo นี้:

```md
---
name: new-post
description: Write a new blog post for this site. Use when asked to write, draft, or add a blog post or article (e.g. "write a post about X", "เขียน blog เรื่อง X"). Covers file naming, frontmatter, the site's writing style, fact rules, and verification.
---
```

`description` สำคัญที่สุด เพราะเป็นสิ่งเดียวที่ agent ใช้ตัดสินใจว่าจะโหลด skill หรือไม่ ผมจึงใส่ตัวอย่างคำสั่งไว้ทั้งภาษาอังกฤษและภาษาไทย

เนื้อหาข้างในมีทุกอย่างที่เคยต้องอธิบายซ้ำทุกครั้งที่ขอให้เขียนโพสต์ เช่น ตั้งชื่อไฟล์ยังไง frontmatter มีอะไรบ้าง ใช้สรรพนาม "ผม" ไม่แปลคำเฉพาะ และกฎข้อสำคัญที่สุด:

```md
- Code snippets about this site must be **copied from the real files in this repo**. Open the file and check.
- Don't invent numbers, benchmarks, quotes, error messages, or stories.
```

โพสต์ที่คุณกำลังอ่านอยู่นี้ก็เขียนตาม skill นี้ครับ

### ชั้นที่ 3: Feedback ก็เป็น context

context ไม่ได้มีแค่สิ่งที่เราเขียนให้อ่าน **ผลลัพธ์จาก tool ก็คือ context** เมื่อ agent รัน `npm run verify` แล้วเจอ error ข้อความ error นั้นจะกลายเป็นข้อมูลที่ agent ใช้ตัดสินใจขั้นต่อไป

ตัวอย่างจริงจากโพสต์ที่แล้ว:

```text
error ts(2339): Property 'data' does not exist on type '{ id: any; }'.
```

error นี้บอกครบทั้งไฟล์ บรรทัด และสาเหตุ agent จึงแก้ได้ตรงจุดทันที เทียบกับกรณีที่ไม่มี type check หน้าเว็บอาจพังเงียบ ๆ แล้ว agent ก็ไม่ได้รับข้อมูลอะไรเลย

**error message ที่ดีจึงเป็น context ที่ดี** และนี่คือเหตุผลที่ harness กับ context engineering แยกจากกันไม่ได้

## ออกแบบโค้ดให้เป็น context ที่ดี

agent อ่านโค้ดเยอะกว่าอ่านเอกสาร โค้ดจึงเป็น context ชิ้นใหญ่ที่สุด สิ่งที่ผมทำใน repo นี้คือ:

**ใช้ type บอกกฎ แทนการเขียนกฎเป็นภาษาคน** เว็บนี้มี 2 ภาษา ทุกข้อความจึงต้องมีทั้งไทยและอังกฤษ แทนที่จะหวังให้ agent จำ ผมใช้ type ใน `src/i18n.ts`:

```ts
/**
 * Bilingual text. Every user-facing string that differs between languages uses this shape
 * and is rendered with the <T> component, which outputs both and lets CSS show the active one.
 */
export type Text = { en: string; th: string };
```

agent แค่เห็น field ที่เป็น type `Text` ก็รู้ทันทีว่าต้องใส่ทั้ง `en` และ `th` ถ้าลืม `astro check` ก็จะฟ้อง

**เขียน comment อธิบายว่า "ทำไม" ไม่ใช่ "ทำอะไร"** เช่นใน `FormattedDate.astro`:

```ts
// Dates are stored as UTC midnight, so format in UTC to avoid showing the previous day.
// Thai uses the Gregorian year (2026, not 2569) to match the rest of the site.
```

ถ้าไม่มี comment นี้ วันหนึ่ง agent อาจเห็นว่า `timeZone: 'UTC'` ดูไม่จำเป็นแล้วลบทิ้ง bug วันที่เลื่อนไป 1 วันก็จะกลับมา

**เก็บข้อมูลไว้ที่เดียว** ข้อมูลส่วนตัวทั้งหมดอยู่ใน `src/site.config.ts` ยิ่งข้อมูลกระจายน้อย agent ยิ่งต้องอ่านน้อยและพลาดน้อย

## สิ่งที่ไม่ควรอยู่ใน context

การตัดออกสำคัญพอ ๆ กับการใส่เข้าไป:

- **ไฟล์ที่ถูก generate** เช่น `dist/`, `.astro/`, `node_modules/` เป็นทั้งเสียงรบกวนและกับดัก เพราะแก้ไปก็ถูกเขียนทับ ใน repo นี้ห้าม agent แก้ไฟล์พวกนี้ผ่าน `.claude/settings.json`
- **เอกสารที่ซ้ำกัน** เพราะเมื่อมีสองฉบับ วันหนึ่งจะไม่ตรงกัน
- **ความลับ** เช่น API key หรือรหัสผ่าน อะไรที่อยู่ใน context อาจถูกนำไปใช้หรือแสดงออกมาได้

## Harness กับ Context ต่างกันยังไง

| | Harness engineering | Context engineering |
| --- | --- | --- |
| **คำถาม** | agent ทำอะไรได้ และอะไรตรวจงานมัน? | agent รู้อะไร และรู้เมื่อไหร่? |
| **ตัวอย่างใน repo นี้** | `npm run verify`, permissions, CI | `AGENTS.md`, skills, type, comment |
| **ถ้าขาดไป** | ความผิดพลาดหลุดไปถึง production | agent ทำงานผิดเพราะไม่รู้ หรือรู้ผิด |

สองอย่างนี้เสริมกัน context ที่ดีทำให้ agent ทำถูกตั้งแต่แรก ส่วน harness ที่ดีจับได้เมื่อมันยังทำผิด

## บทเรียนที่ได้

1. **ไฟล์ที่โหลดทุกครั้งต้องสั้น** ให้เป็นแผนที่ แล้วชี้ไปหารายละเอียด
2. **งานที่ทำซ้ำ ให้ทำเป็น skill** อะไรที่ต้องอธิบายซ้ำเกินสองครั้ง ควรเขียนเก็บไว้
3. **error message คือ context** ลงทุนกับ type และ schema แล้ว agent จะได้ feedback ที่แม่นยำ
4. **comment ควรตอบว่า "ทำไม"** เพื่อไม่ให้ใครลบโค้ดที่ดูไม่จำเป็นแต่จริง ๆ จำเป็น
5. **อย่ามีความจริงสองฉบับ** ไม่ว่าจะเป็นเอกสารหรือข้อมูล

## สิ่งที่จะทำต่อ

- **skill เพิ่มเติม:** เช่น `add-project` สำหรับเพิ่ม project ลง portfolio เมื่อเริ่มทำบ่อยขึ้น
- **คุม `AGENTS.md` ให้สั้นไว้:** เมื่อโปรเจกต์โตขึ้น จะย้ายรายละเอียดออกไปเป็น skill แทนที่จะเพิ่มลงในไฟล์นี้

ถ้าคุณใช้ AI agent อยู่แล้ว ลองเริ่มจากคำถามง่าย ๆ ว่า "ถ้าเพื่อนร่วมทีมคนใหม่ต้องทำงานนี้ เขาต้องรู้อะไรบ้าง และต้องรู้ตอนไหน" คำตอบของคำถามนี้ก็คือ context ที่ agent ต้องการครับ
