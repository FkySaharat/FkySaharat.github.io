import { getCollection } from 'astro:content';

/** All non-draft blog posts, newest first. */
export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** All non-draft projects, sorted by their `order` field. */
export async function getPublishedProjects() {
	const projects = await getCollection('projects', ({ data }) => !data.draft);
	return projects.sort((a, b) => a.data.order - b.data.order);
}
