---
title: 'Harness Engineering: ทำให้ AI agent ทำงานใน repo นี้ได้อย่างปลอดภัย'
description: 'เบื้องหลังการตั้ง harness ให้เว็บนี้: AGENTS.md, npm run verify, type-safe config, permissions และ CI พร้อมเรื่องจริงที่มันช่วยจับ bug ได้'
pubDate: 2026-10-19
tags: ['harness-engineering', 'ai', 'claude-code', 'astro']
lang: 'th'
---

เว็บนี้สร้างโดยผมทำงานคู่กับ AI coding agent (Claude Code) ตลอดทาง ระหว่างทำผมได้เรียนรู้ว่าสิ่งที่ทำให้ agent ทำงานได้ดี ไม่ได้มีแค่ model ที่เก่ง แต่คือ**สภาพแวดล้อมรอบตัวมัน** ซึ่งเรียกว่า **harness**

โพสต์นี้จะเล่าว่า harness engineering คืออะไร และ harness ของ repo นี้มีอะไรบ้าง

## Harness engineering คืออะไร?

ลองนึกถึง AI model เป็น**เครื่องยนต์** ส่วน harness คือ**ทุกอย่างที่อยู่รอบเครื่องยนต์** ได้แก่พวงมาลัย เบรก หน้าปัด และรั้วข้างทาง ถ้าเครื่องยนต์แรงแต่ไม่มีเบรก ก็ไม่มีใครกล้าขับ

ในทางปฏิบัติ harness ของ coding agent มี 4 ส่วนหลัก:

| ส่วน | หน้าที่ | ใน repo นี้ |
| --- | --- | --- |
| **Instructions** | บอกว่าโปรเจกต์นี้คืออะไร อะไรอยู่ตรงไหน และมีกฎอะไร | `AGENTS.md` |
| **Feedback loop** | ให้ agent รู้ได้เองว่างานถูกหรือผิด | `npm run verify` |
| **Guardrails** | จำกัดสิ่งที่ agent ทำได้ | `.claude/settings.json` |
| **Enforcement** | ตรวจซ้ำนอกเครื่อง ไม่ว่าใครจะเป็นคนแก้ | GitHub Actions CI |

หลักสำคัญคือ **อย่าหวังให้ agent "จำ" หรือ "ระวัง" เอง** แต่ให้ออกแบบระบบให้ความผิดพลาดถูกจับได้โดยอัตโนมัติ

## 1. AGENTS.md: แผนที่และกฎของโปรเจกต์

`AGENTS.md` คือไฟล์ที่ agent อ่านก่อนเริ่มทำงาน มันเป็นมาตรฐานกลางที่ agent หลายตัวรองรับ ไม่ว่าจะเป็น Claude Code, Codex หรือ Copilot

ไฟล์นี้บอก 3 เรื่อง:

**แผนที่:** ถ้าจะแก้อะไร ต้องไปแก้ที่ไฟล์ไหน

```md
| Change | Edit |
| --- | --- |
| Name, bio, social links, experience, skills | `src/site.config.ts` — the single source of truth |
| Blog posts | `src/content/blog/*.md` — file name = URL slug |
| Icons | `src/components/Icon.astro` |
| Querying posts | `getPublishedPosts()` in `src/lib/content.ts` |
```

**กฎ:** เช่น

- ห้าม hardcode ข้อมูลส่วนตัวนอก `site.config.ts`
- ห้ามเพิ่ม dependency โดยไม่ถามก่อน
- ห้ามใช้สี hex ใหม่ ให้ใช้ CSS variables ที่มีอยู่
- **ห้ามใส่เนื้อหาที่แต่งขึ้น** (project, โพสต์, skill) ราวกับเป็นของจริง ให้ใช้ `draft: true`

**นิยามของ "เสร็จ":** ต้องรัน `npm run verify` ผ่านก่อนจะบอกว่างานเสร็จ

ส่วน `CLAUDE.md` มีอยู่บรรทัดเดียว:

```md
@AGENTS.md
```

บรรทัดนี้ import `AGENTS.md` เข้ามา ทำให้มี source of truth แค่ไฟล์เดียว ไม่ต้องคอยแก้สองไฟล์ให้ตรงกัน

## 2. npm run verify: คำสั่งเดียวที่ตอบว่า "งานถูกไหม"

```json
"scripts": {
  "check": "astro check",
  "verify": "astro check && astro build"
}
```

`verify` รวม 2 อย่างไว้ในคำสั่งเดียว:

- **`astro check`** ตรวจ type ในไฟล์ `.astro` และ `.ts` ทั้งหมด
- **`astro build`** build เว็บจริง และตรวจ frontmatter ของทุกโพสต์ไปด้วย

การมี**คำสั่งเดียว**สำคัญมาก เพราะ agent (และคน) ไม่ต้องเดาว่าต้องรันอะไรบ้าง และใช้คำสั่งเดียวกันทั้งบนเครื่องและบน CI

## 3. ทำให้ความผิดพลาดกลายเป็น error

feedback loop จะดีได้ก็ต่อเมื่อ**ความผิดพลาดถูกตรวจจับได้** ผมเลยออกแบบโค้ดให้ความผิดพลาดหลายแบบกลายเป็น type error หรือ build error

**Content schema:** frontmatter ของทุกโพสต์ต้องตรงกับ schema ใน `src/content.config.ts`

```ts
schema: z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
}),
```

ถ้าลืมใส่ `title` หรือพิมพ์วันที่ผิด build จะ fail ทันที

**Typed config:** ชื่อไอคอนใน `site.config.ts` ถูกจำกัดด้วย type `IconName`

```ts
export const SKILLS: { title: string; icon: IconName; items: string[] }[] = [
  { title: 'Backend', icon: 'server', items: ['ASP.NET Core', 'RESTful APIs'] },
];
```

ถ้าพิมพ์ `icon: 'sever'` ผิด จะไม่มีไอคอนที่หายไปเงียบ ๆ บนเว็บ แต่จะได้ type error ตั้งแต่ตอน check

**Single source of truth:** ข้อมูลส่วนตัวอยู่ที่ `site.config.ts` ที่เดียว และ query โพสต์ผ่าน `getPublishedPosts()` ที่เดียว ยิ่งมีจุดที่ต้องแก้น้อย โอกาสที่ agent จะแก้ไม่ครบก็ยิ่งน้อย

## 4. Permissions: guardrails ของ agent

`.claude/settings.json` กำหนดว่า Claude Code ทำอะไรได้บ้างโดยไม่ต้องถาม และห้ามทำอะไร

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run verify)",
      "Bash(npm run check)",
      "Bash(npm run build)",
      "Bash(astro dev --background)"
    ],
    "deny": [
      "Edit(dist/**)",
      "Edit(.astro/**)",
      "Edit(node_modules/**)"
    ]
  }
}
```

- **allow:** คำสั่งที่ปลอดภัยและต้องใช้บ่อย เช่น verify และ build agent รันได้เลยโดยไม่ต้องรอผมกดอนุมัติ ทำให้ feedback loop เร็วขึ้น
- **deny:** ห้ามแก้ไฟล์ที่ถูก generate ขึ้นมา เพราะแก้ไปก็ถูกเขียนทับอยู่ดี และอาจทำให้เข้าใจผิดว่าแก้ bug แล้ว

ไฟล์นี้ commit ขึ้น repo ส่วนการตั้งค่าส่วนตัวให้ใส่ใน `.claude/settings.local.json` ซึ่งอยู่ใน `.gitignore`

## 5. CI: ด่านสุดท้าย

harness บนเครื่องจะไม่มีความหมาย ถ้ามีคนข้ามมันไปได้ GitHub Actions จึงรัน `verify` ตัวเดียวกันทุกครั้งที่ push หรือเปิด pull request

```yaml
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run verify
```

ไม่ว่าโค้ดจะมาจาก agent, จากผม หรือจาก quick fix ของ editor ก็ต้องผ่านด่านเดียวกัน

workflow เดียวกันนี้ยังทำหน้าที่ deploy ด้วย ถ้า push ขึ้น `main` แล้ว verify ผ่าน มันจะ deploy `dist/` ขึ้น GitHub Pages ต่อทันที แต่ถ้า verify ไม่ผ่าน ก็จะไม่มีอะไรถูก deploy ส่วน pull request จะถูก verify อย่างเดียว ไม่ถูก deploy

## เรื่องจริง: harness จับ bug ได้ 2 ครั้ง

นี่ไม่ใช่แค่ทฤษฎี ระหว่างทำเว็บนี้ harness จับ bug จริงได้ 2 ครั้ง

**ครั้งที่ 1: รันครั้งแรกก็เจอเลย** ทันทีที่ติดตั้ง `astro check` มันก็เจอ type error ใน `Icon.astro` ซึ่ง `astro build` อย่างเดียวไม่ได้ตรวจ:

```text
src/components/Icon.astro:45:2 - error ts(2322):
  Types of property 'stroke-linecap' are incompatible.
  Type 'string' is not assignable to type '"round" | "butt" | "square" | "inherit"'.
```

แก้ด้วยการเติม `as const` ให้ TypeScript รู้ว่าค่าเป็น `'round'` จริง ๆ ไม่ใช่ `string` ทั่วไป

**ครั้งที่ 2: quick fix ของ editor** มี type annotation ถูกเพิ่มเข้ามาในหน้าโพสต์ ดูเหมือนจะมาจาก quick fix ของ editor:

```ts
posts.map((post: { id: any; }) => ...)
```

ดูเผิน ๆ ไม่มีอะไร แต่มันบอก TypeScript ว่า post มีแค่ `id` ทำให้ `post.data` และ `render(post)` พังทั้งคู่ `npm run verify` จับได้ทันที:

```text
error ts(2339): Property 'data' does not exist on type '{ id: any; }'.
error ts(2769): No overload matches this call.
```

วิธีแก้คือลบ annotation ออก แล้วปล่อยให้ Astro infer type เอง ถ้าไม่มี harness bug แบบนี้อาจหลุดขึ้น production ได้

## บทเรียนที่ได้

1. **กฎที่เครื่องตรวจได้ ดีกว่ากฎที่เขียนเป็นภาษาคน** "ห้ามพิมพ์ชื่อไอคอนผิด" ใน `AGENTS.md` ช่วยได้นิดเดียว แต่ type `IconName` ช่วยได้ 100%
2. **มีคำสั่งเดียวสำหรับคำว่า "เสร็จ"** ทั้ง agent, คน และ CI ใช้ `npm run verify` เหมือนกันหมด
3. **ลดจำนวนจุดที่ต้องแก้** single source of truth ทำให้งานของ agent เล็กลงและพลาดยากขึ้น
4. **ให้อิสระในจุดที่ปลอดภัย และล็อกจุดที่อันตราย** อนุญาตคำสั่ง verify/build ล่วงหน้า แต่ห้ามแก้ไฟล์ที่ถูก generate
5. **harness ไม่ได้มีไว้สำหรับ AI อย่างเดียว** ทุกอย่างในโพสต์นี้ช่วยคนเขียนโค้ดด้วยเหมือนกัน

## สิ่งที่จะทำต่อ

harness ของ repo นี้ยังไม่ครบ สิ่งที่ผมอยากเพิ่ม:

- **Hooks:** ใช้ hooks ของ Claude Code ให้รัน `verify` อัตโนมัติทุกครั้งที่ agent ทำงานเสร็จ แทนที่จะพึ่งให้ agent จำเอง
- **Formatter และ linter:** เช่น Prettier เพื่อให้ style ของโค้ดเหมือนกันโดยไม่ต้องเขียนเป็นกฎ

ถ้าคุณเริ่มใช้ AI agent กับโปรเจกต์ของตัวเอง ผมแนะนำให้เริ่มจาก 2 อย่างก่อน คือ**ไฟล์ `AGENTS.md`** กับ**คำสั่ง verify คำสั่งเดียว** แค่นี้ก็เห็นผลแล้วครับ
