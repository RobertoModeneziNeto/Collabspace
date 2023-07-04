import "./providers";

import { IUsersRepositories } from "@modules/users/iRepositories/iUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);
