import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import "./providers";

import { IUsersRepositories } from "@modules/users/iRepositories/iUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { container } from "tsyringe";
import { PostsRepository } from "@modules/posts/repositories/PostsRepository";
import { ICommentsRepositories } from "@modules/comments/iRepositories/iCommentsRepositories";
import { CommentRepository } from "@modules/comments/repositories/CommentRepository";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IPostsRepositories>(
  "PostRepository",
  PostsRepository
);

container.registerSingleton<ICommentsRepositories>(
  "CommentRepository",
  CommentRepository
);
