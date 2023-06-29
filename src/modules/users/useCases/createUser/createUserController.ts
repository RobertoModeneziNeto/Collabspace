import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUserUseCase";
import { IRequestCreateUser } from "../../dto/users";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    } = req.body as IRequestCreateUser;

    const createUserCase = new CreateUserUseCase();

    const result = await createUserCase.execute({
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    });

    res.json(result);
  }
}

export { CreateUserController };
