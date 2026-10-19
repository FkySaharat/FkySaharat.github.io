import type { IconName } from './components/Icon.astro';

/**
 * Single source of truth for personal info and home page content.
 * Edit this file instead of hardcoding text in pages or components.
 */
export const SITE = {
	name: 'Saharat Diewtrakul',
	nameTh: 'สหรัฐ เดี่ยวตระกูล',
	role: 'Software Engineer',
	location: 'Chiang Mai, Thailand',
	email: 'saharat.diewtrakul@gmail.com',
	description:
		'Backend engineer with 5+ years of experience building services with C#, ASP.NET Core, and SQL Server.',
	bio: 'Backend Engineer with 5+ years of experience designing, developing, and maintaining backend services using C# and ASP.NET Core. Experienced in building RESTful APIs for Point of Sale (POS) systems, golf course reservation platforms, and third-party integrations. Strong interest in clean architecture, design patterns, distributed systems, system performance, and reliability.',
	blog: {
		title: 'Blog',
		description: 'Notes and articles on software engineering, C#, and SQL.',
	},
};

export const SOCIAL_LINKS: { label: string; href: string; icon: IconName; variant: 'neutral' | 'primary' }[] = [
	{ label: 'GitHub', href: 'https://github.com/FkySaharat', icon: 'github', variant: 'neutral' },
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/saharat-diewtrakul-bb63a520b/',
		icon: 'linkedin',
		variant: 'primary',
	},
	{ label: 'Email', href: `mailto:${SITE.email}`, icon: 'mail', variant: 'neutral' },
];

/** Newest first. */
export const EXPERIENCE: {
	role: string;
	type: string;
	company: string;
	period: string;
	summary: string;
	highlights: string[];
}[] = [
	{
		role: 'Software Engineer',
		type: 'Full-time',
		company: 'Mycos Technologies Co., Ltd.',
		period: 'April 2021 – Present',
		summary: 'Backend services for a POS application and a golf course reservation system, plus a web management portal.',
		highlights: [
			'Designed and built RESTful APIs, microservices, and gRPC services in C# / ASP.NET Web API.',
			'Integrated third-party APIs and services to automate and support core business operations.',
			'Optimized data access on SQL Server using Entity Framework and Dapper — tuning queries and choosing the right tool for performance-critical paths.',
			'Developed a web management portal with MVC for email server configuration.',
		],
	},
	{
		role: 'Full-Stack Software Engineer',
		type: 'Cooperative Education',
		company: 'Manao Software Co., Ltd.',
		period: 'November 2020 – March 2021',
		summary: 'Outsource resource management web application.',
		highlights: ['Designed and created a web application with TypeScript and Angular.'],
	},
];

export const SKILLS: { title: string; icon: IconName; items: string[] }[] = [
	{ title: 'Languages', icon: 'code', items: ['C#', 'SQL'] },
	{ title: 'Backend', icon: 'server', items: ['ASP.NET Core', 'RESTful APIs', 'Microservices'] },
	{ title: 'Database', icon: 'database', items: ['SQL Server', 'Entity Framework', 'Dapper'] },
	{ title: 'Tools', icon: 'wrench', items: ['Git', 'Docker', 'Linux'] },
	{ title: 'Concepts', icon: 'layers', items: ['OOP', 'SOLID', 'Design Patterns', 'API Design'] },
	{ title: 'Other', icon: 'sparkles', items: ['AI-assisted Development Tools'] },
];

export const EDUCATION: { degree: string; program: string; school: string; period: string; gpa: string }[] = [
	{
		degree: 'Bachelor of Engineering (B.Eng.) in Computer Engineering',
		program: 'Information Systems and Network Engineering',
		school: 'Chiang Mai University',
		period: '2018 – 2021',
		gpa: '3.08',
	},
];

export const LANGUAGES: { name: string; level: string }[] = [
	{ name: 'Thai', level: 'Native' },
	{ name: 'English', level: 'Basic' },
];

/** Builds a page title like "Blog - Saharat Diewtrakul". */
export function pageTitle(title?: string) {
	return title ? `${title} - ${SITE.name}` : `${SITE.name} - ${SITE.role}`;
}
