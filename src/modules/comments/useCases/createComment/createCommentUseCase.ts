import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestCreateComment } from "@modules/comments/dto/comments";
import { ICommentsRepositories } from "@modules/comments/iRepositories/iCommentsRepositories";
import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import { UuidProvider } from "@shared/container/providers/uuidProvider/implementation/UuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestCreateComment {
  usrId: string;
  postId: string;
}

@injectable()
class CreateCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: UuidProvider
  ) {}

  async execute({ usrId, postId, content }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }

    const listPostById = await this.postRepository.listById(postId);

    if (!listPostById) {
      throw new AppError({
        message: "Post não encontrado!",
      });
    }

    const createComment = await this.commentRepository.create({
      id: this.uuidProvider.createUUID(),
      postId,
      userId: usrId,
      content,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Comentário criado com sucesso!",
      data: {
        id: createComment.id,
        postId: createComment.post_id,
        userId: createComment.user_id,
        content: createComment.content,
      },
    });
  }
}

export { CreateCommentUseCase };
