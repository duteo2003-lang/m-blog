import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'app/post');

export function getAllPosts(): Post[] {
    // Get all markdown files from the posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            // extract the slug from the file name
            const slug = fileName.replace(/\.md$/, '');

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const { data, content } = matter(fileContents);

            // Combine the data with the slug and content
            return {
                id: slug,
                slug: slug,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt,
                content: content,
            } as Post;
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        // sort posts by date in descending order
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });
}

export function getPostBySlug(slug: string): Post | undefined {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            id: slug,
            slug: slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            content: content,
        } as Post;
    } catch (error) {
        console.error(`Error getting post by slug ${slug}: ${error}`);
    }
}