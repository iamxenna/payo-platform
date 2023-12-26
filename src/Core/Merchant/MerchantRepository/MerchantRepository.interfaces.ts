import { IProfileRaw } from "Core/Profile/ProfileRepository";
import { ICard, IGroup } from "Core/Showcase/ShowcaseEntity";
import { IShowcaseResponse } from "Core/Showcase/ShowcaseRepository";
import { IRepositoryResponse } from "Core/types/Repository";

type MerchantCardResponse = ICard & {
  showcase: {
    user: {
      email: string | null;
      wallet: string | null;
      profile: IProfileRaw;
    };
  };
};

type MerchantGroupResponse = IGroup & {
  showcase: {
    user: {
      email: string | null;
      wallet: string | null;
      profile: IProfileRaw;
    };
  };
};

type MerchantShowcaseResponse = IShowcaseResponse & {
  user: {
    email: string | null;
    wallet: string | null;
    profile: IProfileRaw;
  };
};

interface IMerchantRepository {
  getShowcase(id: number): IRepositoryResponse<MerchantShowcaseResponse>;
  getCard(id: number): IRepositoryResponse<MerchantCardResponse>;
  getGroup(id: number): IRepositoryResponse<MerchantGroupResponse>;
}

export type { IMerchantRepository, MerchantCardResponse };
