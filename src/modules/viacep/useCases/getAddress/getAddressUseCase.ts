import { AppResponse } from "@helpers/responseParser";
import axios from "axios";
import { injectable } from "tsyringe";

interface IRequest {
  cep: string;
}

@injectable()
class GetAddressUseCase {
  async execute({ cep }: IRequest): Promise<AppResponse> {
    const viacepUrl = "https://viacep.com.br/ws/{cep}/json/";

    const response = await axios.get(viacepUrl.replace("{cep}", cep));

    return new AppResponse({
      data: { endereco: response.data },
    });
  }
}

export { GetAddressUseCase };
