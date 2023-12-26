import { IProfileRaw } from "Core/Profile/ProfileRepository";
import { ICard, IGroup, IItem } from "Core/Showcase/ShowcaseEntity";
import { IUserType } from "Core/UserType/UserTypeEntity";

type IMerchantProfileData = IProfileRaw & {
  email: string | null;
  wallet: string | null;
  userType: IUserType;
};
interface IMerchantEntityState {
  showcase: IItem[];
  card: ICard | null;
  group: IGroup | null;
  profile: IMerchantProfileData | null;
}

export type { IMerchantEntityState, IMerchantProfileData };
