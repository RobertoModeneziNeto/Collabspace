import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
}

@injectable()
class ListAllFriendsByUserUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId }: IRequest): Promise<AppResponse> {
    const listAllFriendsByUser = await this.friendRepository.listAllByUser(
      usrId
    );

    const friends = listAllFriendsByUser.map((friend) => {
      return {
        id: friend.id,
        user1: {
          id: friend.users_friends_user_id_1Tousers.id,
          name: friend.users_friends_user_id_1Tousers.name,
          avatarUrl: friend.users_friends_user_id_1Tousers.avatar_url,
        },
        user2: {
          id: friend.users_friends_user_id_2Tousers.id,
          name: friend.users_friends_user_id_2Tousers.name,
          avatarUrl: friend.users_friends_user_id_2Tousers.avatar_url,
        },
        createdAt: friend.created_at,
      };
    });

    return new AppResponse({
      message: "Amizades listadas com sucesso!",
      data: {
        friends,
      },
    });
  }
}

export { ListAllFriendsByUserUseCase };
