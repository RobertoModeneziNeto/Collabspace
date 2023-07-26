import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllFriendsByUserUseCase } from "./listAllFriendsByUserUseCase";

class ListAllFriendsByUserController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const listAllFriendsByUserUseCase = container.resolve(
      ListAllFriendsByUserUseCase
    );

    const result = await listAllFriendsByUserUseCase.execute({
      usrId,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { ListAllFriendsByUserController };
