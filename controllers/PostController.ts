import {PostService} from "../services/PostService";
import { Request, Response } from 'express';
import Post from "../models/Post";

export class PostController {

    private postService : PostService;

    constructor(postService: PostService) {

        this.postService = postService;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body;
        const post = new Post(postData.id, postData.title, postData.body, postData.date,  postData.img_url, postData.posted_by);

        try {
            await this.postService.addPost(post);
            res.status(201).send({ message: `Post created successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getPost(req : Request , res : Response) : Promise<void> {

        const postId: number = Number(req.params.id);

        try {
            const post = await this.postService.getPost(postId);
            res.status(200).send(post);
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getAllPosts(req: Request, res: Response) {
        try {
            const from = req.query.from ? parseInt(req.query.from as string) : undefined;
            const to = req.query.to ? parseInt(req.query.to as string) : undefined;
            const filterText = req.query.filterText ? req.query.filterText as string : undefined;

            const allPosts = await this.postService.getAllPosts(from, to, filterText);

            res.status(200).send(allPosts);
        } catch (error) {
            res.status(500).send((error as Error).message);
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {

        const postId : number = Number(req.params.id);
        const postData = req.body;

        try {
            await this.postService.updatePost(postId, postData);
            res.status(200).send({ message: `Post ${postId} updated successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {

        const postId : number = Number(req.params.id);

        try {
            await this.postService.deletePost(postId);
            res.status(200).send({ message: `Post ${postId} deleted successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }


}