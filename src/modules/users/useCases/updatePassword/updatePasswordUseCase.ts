import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateUserPassword } from "@modules/users/dtos/users";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IBcryptProvider } from "@shared/container/providers/bcryptProvider/IBcryptProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestUpdateUserPassword {
  usrId: string;
}

@injectable()
class UpdatePasswordUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("BcryptProvider")
    private bcryptProvider: IBcryptProvider
  ) {}

  async execute({ usrId, password }: IRequest): Promise<AppResponse> {
    if (password)
      if (
        !password.match(
          /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        )
      ) {
        throw new AppError({
          message: "Senha Fraca!",
        });
      }

    const passwordHash = await this.bcryptProvider.encryptPassword(password);

    await this.userRepository.updatePassword({
      id: usrId,
      password: passwordHash.hash,
    });

    return new AppResponse({
      message: "Senha Atualizada com sucesso!",
    });
  }
}

export { UpdatePasswordUseCase };
