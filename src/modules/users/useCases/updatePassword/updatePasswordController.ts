import { IRequestUpdateUserPassword } from "@modules/users/dtos/users";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePasswordUseCase } from "./updatePasswordUseCase";

class UpdatePasswordController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { password } = req.body as IRequestUpdateUserPassword;

    const updatePasswordUseCase = container.resolve(UpdatePasswordUseCase);

    const result = await updatePasswordUseCase.execute({
      usrId,
      password,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { UpdatePasswordController };
