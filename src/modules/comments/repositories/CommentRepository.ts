import { prisma } from "@libs/prismaClient";
import { ICommentsRepositories } from "../iRepositories/iCommentsRepositories";
import { IComment, ICreateComment } from "../dto/comments";

class CommentRepository implements ICommentsRepositories {
  create({ id, userId, postId, content }: ICreateComment): Promise<IComment> {
    return prisma.comments.create({
      data: {
        id,
        post_id: postId,
        user_id: userId,
        content,
      },
    });
  }
}

export { CommentRepository };
