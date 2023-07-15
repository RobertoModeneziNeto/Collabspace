import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { ICommentsRepositories } from "@modules/comments/iRepositories/iCommentsRepositories";
import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import { UuidProvider } from "@shared/container/providers/uuidProvider/implementation/UuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  postId: string;
  id: string;
}

@injectable()
class DeleteCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: UuidProvider
  ) {}

  async execute({ usrId, postId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "CommentID é inválido!",
      });
    }

    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "PostID é inválido!",
      });
    }

    const listCommentById = await this.commentRepository.listById(id);

    if (!listCommentById) {
      throw new AppError({
        message: "Comentário não encontrado!",
      });
    }

    const listPostById = await this.postRepository.listById(postId);

    if (!listPostById) {
      throw new AppError({
        message: "Post não encontrado!",
      });
    }

    if (usrId !== listCommentById.user_id && usrId !== listPostById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    await this.commentRepository.delete(id);

    return new AppResponse({
      message: "Comentário deletado com sucesso!",
    });
  }
}

export { DeleteCommentUseCase };
