import pool from '../db';
import Post from '../models/Post';
import { DataAccess } from './DataAccess';

export class PostDataAccessSQL implements DataAccess <Post> {
    async add(post :Post) :Promise<number> {
        const query = 'INSERT INTO posts (title, body, date, img_url, posted_by) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(query, [post.title, post.body, post.date, post.img_url, post.posted_by]);
        return post.id;
    }

    async get(postId :number) :Promise<Post> {

        const query = 'SELECT * FROM posts WHERE id = $1';
        const result = await pool.query(query, [postId]);

        if (result.rows.length === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return result.rows[0];
    }

    async getAll(): Promise<Partial<Post>[]> {
        try {
            const query = 'SELECT * FROM posts ORDER BY date DESC';
            const allPosts = await pool.query(query);

            return allPosts.rows;

        } catch (error) {
            console.error('Error getting all posts:', error)
            throw error
        }
    }

    async update(postId: number, updateData: Partial<Post>): Promise<void> {
        let query = 'UPDATE posts SET ';
        const updates: string[] = [];
        const values: (string | number | Date)[] = [];

        Object.entries(updateData).forEach(([key, value], index) => {
            updates.push(`${key} = $${index + 1}`);
            values.push(value);
        });

        query += updates.join(', ') + ' WHERE id = $' + (values.length + 1);
        values.push(postId);

        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }

    async delete(postId: number): Promise<number> {
        const query = 'DELETE FROM posts WHERE id = $1';
        const result = await pool.query(query, [postId]);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return postId;
    }
}