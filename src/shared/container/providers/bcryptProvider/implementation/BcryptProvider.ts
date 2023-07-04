import bcryptjs from "bcryptjs";
import { IBcrypt, IBcryptProvider } from "../IBcryptProvider";

class BcryptProvider implements IBcryptProvider {
  async encryptPassword(password: string): Promise<IBcrypt> {
    const salt = await bcryptjs.genSalt(10);

    const hash = await bcryptjs.hash(password, salt);

    return { salt, hash };
  }
}

export { BcryptProvider };
