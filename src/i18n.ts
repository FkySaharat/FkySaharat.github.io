export const LOCALES = ['en', 'th'] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * Bilingual text. Every user-facing string that differs between languages uses this shape
 * and is rendered with the <T> component, which outputs both and lets CSS show the active one.
 */
export type Text = Record<Locale, string>;

/** Text that may be the same in every language (brand and tech names): a plain string is fine. */
export type Label = Text | string;

/** UI labels (headings, links, buttons). Content lives in site.config.ts. */
export const UI = {
	nav: {
		home: { en: 'Home', th: 'หน้าแรก' },
		blog: { en: 'Blog', th: 'บล็อก' },
	},
	home: {
		experience: { en: 'Experience', th: 'ประสบการณ์ทำงาน' },
		skills: { en: 'Skills', th: 'ทักษะ' },
		education: { en: 'Education', th: 'การศึกษา' },
		languages: { en: 'Languages', th: 'ภาษา' },
		projects: { en: 'Projects', th: 'ผลงาน' },
		latestPosts: { en: 'Latest posts', th: 'โพสต์ล่าสุด' },
		allPosts: { en: 'All posts →', th: 'ดูโพสต์ทั้งหมด →' },
		code: { en: 'Code →', th: 'โค้ด →' },
		demo: { en: 'Live demo →', th: 'ดูตัวอย่าง →' },
		gpa: { en: 'GPA', th: 'เกรดเฉลี่ย' },
	},
	blog: {
		backToAll: { en: '← All posts', th: '← โพสต์ทั้งหมด' },
		updated: { en: 'Updated', th: 'อัปเดต' },
		empty: { en: 'No posts yet.', th: 'ยังไม่มีโพสต์' },
		onThisPage: { en: 'On this page', th: 'ในหน้านี้' },
	},
	toggles: {
		// Accessible names. The theme button also exposes its state via aria-pressed.
		theme: { en: 'Dark mode', th: 'โหมดมืด' },
		lang: { en: 'Language: English. Switch to Thai', th: 'ภาษา: ไทย เปลี่ยนเป็นภาษาอังกฤษ' },
	},
} satisfies Record<string, Record<string, Text>>;
