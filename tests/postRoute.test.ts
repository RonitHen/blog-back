import request from 'supertest';
import { app } from '../index';
import { PostDataAccessSQL } from '../DAL/PostDataAccessSQL';
import Post from '../models/Post';
import {test, describe} from "node:test";

const testPost = new Post(123456667, "test post", "body test", new Date(), "img url", "ronit")
describe('POST /api/posts', () => {
    test('should add a new post', async () => {
        const postData = {
            title: 'Test Post',
            body: 'This is a test post',
            date: '2024-05-05',
        };

        const response = await request(app).post('/api/posts').send(testPost);

        expect(response.statusCode).toBe(201);

        const dataAccess = new PostDataAccessSQL();
        await dataAccess.delete(response.body.id);
    });
});

describe('GET /api/posts/:id', () => {
    test('should get a specific post', async () => {
        const dataAccess = new PostDataAccessSQL();
        const post = new Post(100, 'Test Post -title', 'This is a test post -body', new Date(), "testImgURL.png", "test -posted-by");
        const postId = await dataAccess.add(post);

        const response = await request(app).get(`/api/posts/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(postId);

        await dataAccess.delete(response.body.id);
    });
});

describe('GET /api/posts', () => {
    test('should get all posts', async () => {
        const response = await request(app).get('/api/posts');

        expect(response.statusCode).toBe(200);
    });
});

describe('PUT /api/posts/:id', () => {
    test('should update a specific post', async () => {
        const dataAccess = new PostDataAccessSQL();
        const post = new Post(100, 'Test Post -title', 'This is a test post -body', new Date(), "testImgURL.png", "test -posted-by");
        const postId = await dataAccess.add(post);

        const updatedPostData = {
            title: 'Updated Post',
            body: 'This is an updated post',
            date: '2024-07-05',
        };

        const response = await request(app)
            .put(`/api/posts/${postId}`)
            .send(updatedPostData);

        expect(response.statusCode).toBe(200);

        await dataAccess.delete(postId);
    });
});

describe('DELETE /api/posts/:id', () => {
    test('should delete a specific post', async () => {
        const dataAccess = new PostDataAccessSQL();
        const post = new Post(100, 'Test Post -title', 'This is a test post -body', new Date(), "testImgURL.png", "test -posted-by");
        const postId = await dataAccess.add(post);

        const response = await request(app).delete(`/api/posts/${postId}`);

        expect(response.statusCode).toBe(200);
    });
});


