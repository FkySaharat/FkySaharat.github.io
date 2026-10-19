import type { IconName } from './components/Icon.astro';
import type { Label, Text } from './i18n';

/**
 * Single source of truth for personal info and home page content.
 * Edit this file instead of hardcoding text in pages or components.
 * Fields typed `Text` need both an English (`en`) and a Thai (`th`) version.
 */
export const SITE = {
	name: 'Saharat Diewtrakul',
	nameTh: 'สหรัฐ เดี่ยวตระกูล',
	role: 'Software Engineer',
	location: { en: 'Chiang Mai, Thailand', th: 'เชียงใหม่, ประเทศไทย' } satisfies Text,
	email: 'saharat.diewtrakul@gmail.com',
	/** Meta description for search engines and link previews (English). */
	description:
		'Backend engineer with 5+ years of experience building services with C#, ASP.NET Core, and SQL Server.',
	bio: {
		en: 'Backend Engineer with 5+ years of experience designing, developing, and maintaining backend services using C# and ASP.NET Core. Experienced in building RESTful APIs for Point of Sale (POS) systems, golf course reservation platforms, and third-party integrations. Strong interest in clean architecture, design patterns, distributed systems, system performance, and reliability.',
		th: 'Backend Engineer ที่มีประสบการณ์มากกว่า 5 ปีในการออกแบบ พัฒนา และดูแล backend services ด้วย C# และ ASP.NET Core มีประสบการณ์สร้าง RESTful APIs สำหรับระบบ Point of Sale (POS) แพลตฟอร์มจองสนามกอล์ฟ และการเชื่อมต่อกับระบบภายนอก สนใจเรื่อง clean architecture, design patterns, distributed systems รวมถึงประสิทธิภาพและความเสถียรของระบบ',
	} satisfies Text,
	blog: {
		title: { en: 'Blog', th: 'บล็อก' } satisfies Text,
		/** Meta description for search engines and link previews: says what the blog covers. */
		description: 'Notes on software engineering, C#, SQL, and working with AI agents.',
		/** Personal intro shown under the Blog heading. */
		intro: {
			en: 'These are the notes I keep while learning, because for me, nothing truly settles in and makes sense the first time.',
			th: 'นี่คือสิ่งที่ผมจดไว้ระหว่างการเรียนรู้ เพราะสำหรับผม ทุกอย่างไม่อาจตกตะกอนและเข้าใจได้ภายในครั้งเดียว',
		} satisfies Text,
	},
};

export const SOCIAL_LINKS: { label: Label; href: string; icon: IconName; variant: 'neutral' | 'primary' }[] = [
	{ label: 'GitHub', href: 'https://github.com/FkySaharat', icon: 'github', variant: 'neutral' },
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/saharat-diewtrakul-bb63a520b/',
		icon: 'linkedin',
		variant: 'primary',
	},
	{
		label: 'JobsDB',
		href: 'https://th.jobsdb.com/profiles/สหรัฐ-เดี่ยวตระกูล-96gyvq0bkj',
		icon: 'briefcase',
		variant: 'neutral',
	},
	{ label: { en: 'Email', th: 'อีเมล' }, href: `mailto:${SITE.email}`, icon: 'mail', variant: 'neutral' },
];

/** Newest first. Each job needs the same number of `highlights` in both languages. */
export const EXPERIENCE: {
	role: string;
	type: Text;
	company: string;
	period: Text;
	summary: Text;
	highlights: Text[];
}[] = [
	{
		role: 'Software Engineer',
		type: { en: 'Full-time', th: 'พนักงานประจำ' },
		company: 'Mycos Technologies Co., Ltd.',
		period: { en: 'April 2021 – Present', th: 'เมษายน 2021 – ปัจจุบัน' },
		summary: {
			en: 'Backend services for a POS application and a golf course reservation system, plus a web management portal.',
			th: 'พัฒนา backend services สำหรับแอปพลิเคชัน POS และระบบจองสนามกอล์ฟ รวมถึงสร้าง web management portal',
		},
		highlights: [
			{
				en: 'Designed and built RESTful APIs, microservices, and gRPC services in C# / ASP.NET Web API.',
				th: 'ออกแบบและพัฒนา RESTful APIs, microservices และ gRPC services ด้วย C# / ASP.NET Web API',
			},
			{
				en: 'Integrated third-party APIs and services to automate and support core business operations.',
				th: 'เชื่อมต่อ API และบริการจากระบบภายนอก เพื่อทำงานอัตโนมัติและรองรับการดำเนินธุรกิจหลัก',
			},
			{
				en: 'Optimized data access on SQL Server using Entity Framework and Dapper — tuning queries and choosing the right tool for performance-critical paths.',
				th: 'ปรับประสิทธิภาพการเข้าถึงข้อมูลบน SQL Server ด้วย Entity Framework และ Dapper ทั้งการ tune query และการเลือกเครื่องมือให้เหมาะกับส่วนที่ต้องการ performance สูง',
			},
			{
				en: 'Developed a web management portal with MVC for email server configuration.',
				th: 'พัฒนา web management portal ด้วย MVC สำหรับตั้งค่า email server',
			},
		],
	},
	{
		role: 'Full-Stack Software Engineer',
		type: { en: 'Cooperative Education', th: 'สหกิจศึกษา' },
		company: 'Manao Software Co., Ltd.',
		period: { en: 'November 2020 – March 2021', th: 'พฤศจิกายน 2020 – มีนาคม 2021' },
		summary: {
			en: 'Outsource resource management web application.',
			th: 'เว็บแอปพลิเคชันบริหารจัดการทรัพยากรสำหรับงาน outsource',
		},
		highlights: [
			{
				en: 'Designed and created a web application with TypeScript and Angular.',
				th: 'ออกแบบและพัฒนาเว็บแอปพลิเคชันด้วย TypeScript และ Angular',
			},
		],
	},
];

export const SKILLS: { title: Label; icon: IconName; items: string[] }[] = [
	{ title: { en: 'Languages', th: 'ภาษาโปรแกรม' }, icon: 'code', items: ['C#', 'SQL'] },
	{ title: 'Backend', icon: 'server', items: ['ASP.NET Core', 'RESTful APIs', 'Microservices'] },
	{ title: { en: 'Database', th: 'ฐานข้อมูล' }, icon: 'database', items: ['SQL Server', 'Entity Framework', 'Dapper'] },
	{ title: { en: 'Tools', th: 'เครื่องมือ' }, icon: 'wrench', items: ['Git', 'Docker', 'Linux'] },
	{ title: { en: 'Concepts', th: 'แนวคิด' }, icon: 'layers', items: ['OOP', 'SOLID', 'Design Patterns', 'API Design'] },
	{ title: { en: 'Other', th: 'อื่น ๆ' }, icon: 'sparkles', items: ['AI-assisted Development Tools'] },
];

export const EDUCATION: { degree: Text; program: string; school: Text; period: string; gpa: string }[] = [
	{
		degree: {
			en: 'Bachelor of Engineering (B.Eng.) in Computer Engineering',
			th: 'วิศวกรรมศาสตรบัณฑิต (วศ.บ.) สาขาวิศวกรรมคอมพิวเตอร์',
		},
		program: 'Information Systems and Network Engineering',
		school: { en: 'Chiang Mai University', th: 'มหาวิทยาลัยเชียงใหม่' },
		period: '2018 – 2021',
		gpa: '3.08',
	},
];

export const LANGUAGES: { name: Text; level: Text }[] = [
	{ name: { en: 'Thai', th: 'ไทย' }, level: { en: 'Native', th: 'ภาษาแม่' } },
	{ name: { en: 'English', th: 'อังกฤษ' }, level: { en: 'Basic', th: 'พื้นฐาน' } },
];

/** Builds a page title like "Blog - Saharat Diewtrakul". Page titles are always English. */
export function pageTitle(title?: string) {
	return title ? `${title} - ${SITE.name}` : `${SITE.name} - ${SITE.role}`;
}
