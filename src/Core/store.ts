import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { AppEntity } from "./App/AppEntity";
import { DeviceEntity } from "./Device/DeviceEntity";

import { UserEntity } from "./User/UserEntity";
import type { IUserInteractor } from "./User/UserInteractor";
import { UserInteractor } from "./User/UserInteractor";

import { ProfileEntity } from "./Profile/ProfileEntity";
import type { IProfileInteractor } from "./Profile/ProfileInteractor";
import { ProfileInteractor } from "./Profile/ProfileInteractor";

import { ShowcaseEntity } from "./Showcase/ShowcaseEntity";
import type { IShowcaseInteractor } from "./Showcase/ShowcaseInteractor";
import { ShowcaseInteractor } from "./Showcase/ShowcaseInteractor";

import { CardTypesEntity } from "./CardTypes/CardTypesEntity";
import type { ICardTypesInteractor } from "./CardTypes/CardTypesInteractor";
import { CardTypesInteractor } from "./CardTypes/CardTypesInteractor";

import { UserTypesEntity } from "./UserType/UserTypeEntity";
import type { IUserTypeInteractor } from "./UserType/UserTypeInteractor";
import { UserTypeInteractor } from "./UserType/UserTypeInteractor";

import { StatusEntity } from "./Status/StatusEntity";
import type { IStatusInteractor } from "./Status/StatusInteractor";
import { StatusInteractor } from "./Status/StatusInteractor/StatusInteractor";

import { MerchantEntity } from "./Merchant/MerchantEntity";
import type { IMerchantInteractor } from "./Merchant/MerchantInteractor";
import { MerchantInteractor } from "./Merchant/MerchantInteractor";

import { TransferEntity } from "./Transfer/TransferEntity";
import type { ITransferInteractor } from "./Transfer/TransferInteractor";
import { TransferInteractor } from "./Transfer/TransferInteractor";

import { RatesEntity } from "./Rates/RatesEntity";
import type { IRatesInteractor } from "./Rates/RatesInteractor";
import { RatesInteractor } from "./Rates/RatesInteractor";

import { DashboardEntity } from "./Dashboard/DashboardEntity";
import type { IDashboardInteractor } from "./Dashboard/DashboardInteractor";
import { DashboardInteractor } from "./Dashboard/DashboardInteractor";
import { DashboardQuery } from "./Dashboard/DashboardQuery";

export const store = configureStore({
  reducer: {
    AppEntity: AppEntity.reducer,
    UserEntity: UserEntity.reducer,
    RatesEntity: RatesEntity.reducer,
    DeviceEntity: DeviceEntity.reducer,
    StatusEntity: StatusEntity.reducer,
    ProfileEntity: ProfileEntity.reducer,
    MerchantEntity: MerchantEntity.reducer,
    ShowcaseEntity: ShowcaseEntity.reducer,
    TransferEntity: TransferEntity.reducer,
    CardTypesEntity: CardTypesEntity.reducer,
    UserTypesEntity: UserTypesEntity.reducer,
    DashboardEntity: DashboardEntity.reducer,
    [DashboardQuery.reducerPath]: DashboardQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }).concat(DashboardQuery.middleware),
  ],
});

export type IStore = ReturnType<typeof store.getState>;

interface IActions {
  App: typeof AppEntity.actions;
  User: typeof UserEntity.actions;
  Rates: typeof RatesEntity.actions;
  Device: typeof DeviceEntity.actions;
  Status: typeof StatusEntity.actions;
  Profile: typeof ProfileEntity.actions;
  Showcase: typeof ShowcaseEntity.actions;
  Transfer: typeof TransferEntity.actions;
  Merchant: typeof MerchantEntity.actions;
  CardTypes: typeof CardTypesEntity.actions;
  UserTypes: typeof UserTypesEntity.actions;
  Dashboard: typeof DashboardEntity.actions;
}

export const actions: IActions = {
  App: AppEntity.actions,
  User: UserEntity.actions,
  Rates: RatesEntity.actions,
  Device: DeviceEntity.actions,
  Status: StatusEntity.actions,
  Profile: ProfileEntity.actions,
  Merchant: MerchantEntity.actions,
  Showcase: ShowcaseEntity.actions,
  Transfer: TransferEntity.actions,
  CardTypes: CardTypesEntity.actions,
  UserTypes: UserTypesEntity.actions,
  Dashboard: DashboardEntity.actions,
};

export interface IAsyncActions {
  User: IUserInteractor;
  Rates: IRatesInteractor;
  Status: IStatusInteractor;
  Profile: IProfileInteractor;
  Showcase: IShowcaseInteractor;
  Merchant: IMerchantInteractor;
  Transfer: ITransferInteractor;
  UserTypes: IUserTypeInteractor;
  CardTypes: ICardTypesInteractor;
  Dashboard: IDashboardInteractor;
}

export const asyncActions: IAsyncActions = {
  User: UserInteractor,
  Rates: RatesInteractor,
  Status: StatusInteractor,
  Profile: ProfileInteractor,
  Showcase: ShowcaseInteractor,
  Merchant: MerchantInteractor,
  Transfer: TransferInteractor,
  UserTypes: UserTypeInteractor,
  CardTypes: CardTypesInteractor,
  Dashboard: DashboardInteractor,
};

export interface IQuery {
  Dashboard: typeof DashboardQuery;
}

export const query: IQuery = {
  Dashboard: DashboardQuery,
};

export const useStore = <T>(
  selector: (store: IStore) => T,
): { store: T; actions: IActions; asyncActions: IAsyncActions; query: IQuery } => {
  return {
    actions,
    asyncActions,
    store: useSelector(selector),
    query,
  };
};
