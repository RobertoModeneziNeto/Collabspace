import { IComment, ICreateComment } from "../dto/comments";

interface ICommentsRepositories {
  create(comment: ICreateComment): Promise<IComment>;
}

export { ICommentsRepositories };
