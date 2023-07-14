import { IRequestCreateComment } from "@modules/comments/dto/comments";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCommentUseCase } from "./createCommentUseCase";

class CreateCommentController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;
    const { id } = req.params as { id: string };
    const { content } = req.body as IRequestCreateComment;

    const createCommentUseCase = container.resolve(CreateCommentUseCase);

    const result = await createCommentUseCase.execute({
      postId: id,
      usrId,
      content,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { CreateCommentController };
