import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts: one Markdown file per post in src/content/blog/
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		// Language of the post body, used for <html lang>. Default: English.
		lang: z.enum(['en', 'th']).default('en'),
		draft: z.boolean().default(false),
	}),
});

// Portfolio projects: one Markdown file per project in src/content/projects/
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tech: z.array(z.string()).default([]),
		repo: z.url().optional(),
		demo: z.url().optional(),
		order: z.number().default(0),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, projects };
