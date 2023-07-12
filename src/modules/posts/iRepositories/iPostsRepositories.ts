import { ICreatePost, IListAllPosts, IPost, IUpdatePost } from "../dtos/posts";

interface IPostsRepositories {
  create(post: ICreatePost): Promise<IPost>;
  listAll(page: number, limit: number): Promise<IListAllPosts[]>;
  count(): Promise<number>;
  listById(id: string): Promise<IPost | null>;
  update(data: IUpdatePost): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IPostsRepositories };
