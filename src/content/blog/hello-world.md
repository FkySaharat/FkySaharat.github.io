---
title: 'Hello, world: Astro 101'
description: 'โพสต์แรกของบล็อก: Astro คืออะไร และวิธีสร้าง portfolio กับ blog แบบเว็บนี้ทีละขั้นตอน'
pubDate: 2026-10-19
tags: ['astro', 'tutorial', 'beginner']
lang: 'th'
---

ยินดีต้อนรับสู่บล็อกของผมครับ! โพสต์แรกนี้จะพาดูว่าเว็บนี้สร้างยังไง เว็บนี้ใช้ [Astro](https://astro.build) และ host ฟรีบน GitHub Pages อ่านจบแล้วคุณจะมีเว็บของตัวเองที่มีหลายหน้า มี layout และมี blog ที่เขียนด้วย Markdown

## Astro คืออะไร?

Astro คือ web framework สำหรับ**เว็บที่เน้นเนื้อหา** เช่น portfolio, blog, เว็บ docs และ landing page

แนวคิดหลักคือ **build ทุกหน้าให้เป็น HTML ล้วนไว้ล่วงหน้า และไม่ส่ง JavaScript ไปที่ browser เลยเป็นค่าเริ่มต้น** framework ส่วนใหญ่จะส่ง JavaScript bundle ไปให้ browser แล้วให้ browser สร้างหน้าเว็บเอง แต่ Astro จะ render หน้าเว็บแค่ครั้งเดียวตอน build แล้วส่ง HTML ที่เสร็จแล้วออกไปเลย เว็บที่ทำด้วย Astro จึงเร็วมากและ host ง่ายมาก

เหตุผลที่ผมเลือก Astro มาทำเว็บนี้:

- **เร็วตั้งแต่แรก** ไม่มี JavaScript ก็ไม่มีอะไรต้องโหลด ต้อง parse หรือต้องรัน
- **syntax คุ้นตา** ไฟล์ `.astro` หน้าตาเหมือน HTML ที่เพิ่ม template แบบ JSX มานิดหน่อย
- **รองรับ Markdown ในตัว** โพสต์ blog เป็นแค่ไฟล์ `.md` ไม่ต้องลง library เพิ่ม
- **ไม่ผูกมัด** ถ้าวันหลังอยากได้ส่วนที่ interactive ก็เพิ่ม component ของ React, Vue หรือ Svelte (เรียกว่า "islands") เฉพาะจุดที่ต้องใช้ได้

## สิ่งที่ต้องมี

- **Node.js 22.12 ขึ้นไป** เช็คได้ด้วย `node -v`
- code editor สักตัว ผมใช้ VS Code กับ extension **Astro** ตัว official ซึ่งช่วยเรื่อง syntax highlighting และ type hints
- พื้นฐาน HTML กับ CSS ถ้ารู้ JavaScript ด้วยจะช่วยได้ แต่ใช้แค่นิดเดียว

## ขั้นที่ 1: สร้างโปรเจกต์

รัน setup wizard ในโฟลเดอร์ว่าง:

```sh
npm create astro@latest my-site
cd my-site
npm run dev
```

ตอนมันถาม ให้เลือก template **minimal** แล้วเปิด `http://localhost:4321` ก็จะเห็นเว็บของคุณ dev server จะ reload หน้าเว็บให้อัตโนมัติทุกครั้งที่ save ไฟล์

## ขั้นที่ 2: ทำความเข้าใจโครงสร้างโฟลเดอร์

```text
my-site/
├── public/            # ไฟล์ที่ copy ไปตรง ๆ (favicon, robots.txt, รูปภาพ)
├── src/
│   ├── pages/         # ทุกไฟล์ในนี้จะกลายเป็น URL
│   ├── layouts/       # โครงหน้าเว็บที่ใช้ร่วมกัน (head, header, footer)
│   ├── components/    # ชิ้นส่วน UI ที่ใช้ซ้ำได้
│   └── content/       # เนื้อหา Markdown (โพสต์ blog, projects)
├── astro.config.mjs   # ไฟล์ตั้งค่า Astro
└── package.json
```

โฟลเดอร์ที่สำคัญที่สุดคือ `src/pages/` เพราะ **Astro ใช้ file-based routing** คือชื่อไฟล์กำหนด URL:

| ไฟล์ | URL |
| --- | --- |
| `src/pages/index.astro` | `/` |
| `src/pages/about.astro` | `/about/` |
| `src/pages/blog/index.astro` | `/blog/` |
| `src/pages/blog/[...slug].astro` | `/blog/อะไรก็ได้/` (dynamic) |

## ขั้นที่ 3: โครงสร้างของ `.astro` component

ไฟล์ `.astro` ทุกไฟล์มี 2 ส่วน ส่วนแรกคือ **frontmatter** ที่อยู่ระหว่าง `---` สองอัน ส่วนนี้รันตอน build ส่วนที่สองที่อยู่ข้างล่างคือ **template** ซึ่งเป็น HTML ที่ใส่ `{expressions}` ได้:

```astro
---
// Frontmatter: รันตอน build เท่านั้น ไม่รันใน browser
const name = 'Fluk';
const skills = ['C#', 'ASP.NET', 'SQL'];
---

<h1>Hello, I'm {name}</h1>
<ul>
  {skills.map((skill) => <li>{skill}</li>)}
</ul>

<style>
  /* Scoped: มีผลเฉพาะ component นี้ */
  h1 { color: #0a66c2; }
</style>
```

ถ้าเคยเขียน React มาก่อน จุดที่ต่างหลัก ๆ คือ:

- ใช้ `class` ไม่ใช่ `className` เพราะเป็น HTML จริง ๆ
- ไม่มี state และไม่มีการ re-render เพราะ component รันแค่**ครั้งเดียว**ตอน build
- `<style>` ถูก scope ให้เฉพาะ component นั้นอัตโนมัติ ไม่ต้องใช้ CSS modules

## ขั้นที่ 4: Props และ components

component รับ props ผ่าน `Astro.props` ตัวอย่างเช่น card component เล็ก ๆ:

```astro
---
// src/components/SkillCard.astro
interface Props {
  title: string;
  items: string[];
}

const { title, items } = Astro.props;
---

<div class="card">
  <h3>{title}</h3>
  <p>{items.join(', ')}</p>
</div>
```

แล้วเรียกใช้จากหน้าไหนก็ได้:

```astro
---
import SkillCard from '../components/SkillCard.astro';
---

<SkillCard title="Backend" items={['C#', 'ASP.NET']} />
```

## ขั้นที่ 5: เพิ่ม layout

เราคงไม่อยากเขียน `<html>`, `<head>` และเมนูซ้ำทุกหน้า **layout** ก็คือ component ธรรมดาที่มี `<slot />` ไว้บอกว่าเนื้อหาของแต่ละหน้าจะไปอยู่ตรงไหน:

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="th">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <nav><a href="/">Home</a> · <a href="/blog/">Blog</a></nav>
    <main>
      <slot />
    </main>
  </body>
</html>
```

จากนั้นครอบทุกหน้าด้วย layout นี้:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Home">
  <h1>Welcome!</h1>
</Layout>
```

## ขั้นที่ 6: สร้าง blog ด้วย content collections

**Content collections** คือวิธีของ Astro ในการจัดการเนื้อหา Markdown แบบมี type safety เรากำหนด field ของ frontmatter ไว้ครั้งเดียว แล้ว Astro จะตรวจทุกโพสต์ให้ตรงตามนั้น

**1. กำหนด collection** ใน `src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**2. เขียนโพสต์** เป็นไฟล์ `src/content/blog/my-first-post.md`:

```md
---
title: 'My first post'
description: 'สรุปสั้น ๆ'
pubDate: 2026-10-19
tags: ['astro']
---

สวัสดี! นี่คือ **Markdown**
```

ถ้าลืมใส่ `title` หรือพิมพ์วันที่ผิด **build จะ fail พร้อม error ที่อ่านเข้าใจง่าย** ทำให้ไม่มีทางเผลอ publish โพสต์ที่พังออกไป

**3. แสดงรายการโพสต์** ใน `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<Layout title="Blog">
  <h1>Blog</h1>
  <ul>
    {posts.map((post) => (
      <li><a href={`/blog/${post.id}/`}>{post.data.title}</a></li>
    ))}
  </ul>
</Layout>
```

**4. สร้างหน้าให้แต่ละโพสต์** ด้วย dynamic route ที่ไฟล์ `src/pages/blog/[...slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

// บอก Astro ว่าต้อง build หน้าไหนบ้าง: โพสต์ละหนึ่งหน้า
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<Layout title={post.data.title}>
  <h1>{post.data.title}</h1>
  <Content />
</Layout>
```

แค่นี้ก็ได้ blog ที่ใช้งานได้ครบแล้ว อยากเพิ่มโพสต์ใหม่ก็แค่เพิ่มไฟล์ `.md` ไม่ต้องแก้อะไรอื่น

## ขั้นที่ 7: Build และ preview

```sh
npm run build     # สร้าง HTML แบบ static ไว้ใน dist/
npm run preview   # เปิด dist/ บนเครื่องเพื่อเช็คอีกรอบ
```

โฟลเดอร์ `dist/` คือเว็บทั้งเว็บของคุณ เป็น HTML, CSS และ assets ล้วน ๆ เอาไปวางบน static host ที่ไหนก็ได้

**Tip:** ติดตั้ง `@astrojs/check` กับ `typescript` แล้วรัน `npx astro check` เพื่อจับ type error ในไฟล์ `.astro` ก่อนขึ้น production

## ขั้นที่ 8: Deploy ขึ้น GitHub Pages

1. สร้าง repository แบบ public ชื่อ `<your-username>.github.io`
2. ใส่ URL ของเว็บใน `astro.config.mjs`:

   ```js
   import { defineConfig } from 'astro/config';

   export default defineConfig({
     site: 'https://<your-username>.github.io',
   });
   ```

3. เพิ่ม GitHub Actions workflow ที่ build เว็บแล้ว publish โฟลเดอร์ `dist/` ใน [คู่มือ deploy ขึ้น GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) ของ Astro มี workflow ให้ copy ไปใช้ได้เลย
4. ใน repo ไปที่ **Settings → Pages → Source** แล้วเลือก **GitHub Actions**
5. push ขึ้น `main` รอประมาณหนึ่งนาที เว็บก็จะขึ้นที่ `https://<your-username>.github.io` 🎉

## ไปต่อทางไหนดี

- **Styling:** ใช้ CSS variables เก็บสีไว้ จะเปลี่ยน theme ทั้งเว็บได้จากที่เดียว
- **Interactivity:** รัน `npx astro add react` แล้วใช้ `client:load` กับ component ที่ต้องทำงานใน browser เช่น ปุ่มสลับ dark mode หรือช่องค้นหา
- **SEO:** เพิ่ม `<meta name="description">` และ Open Graph tags ใน layout
- **Docs:** [Astro docs](https://docs.astro.build) ตัว official เขียนดีมาก แนะนำให้เริ่มจาก [tutorial](https://docs.astro.build/en/tutorial/0-introduction/)

ขอบคุณที่อ่านโพสต์แรกนะครับ! โพสต์ต่อ ๆ ไปผมจะเขียนเรื่อง C#, SQL และสิ่งที่กำลังสร้างอยู่
