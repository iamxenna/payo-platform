import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { IMerchantRepository, MerchantRepository } from "Core/Merchant/MerchantRepository";
import { MerchantEntity } from "../MerchantEntity";
import { ICard, IGroup, IItem } from "Core/Showcase/ShowcaseEntity";

export interface IMerchantInteractor {
  getCard: Thunk<{ id: number }>;
  getGroup: Thunk<{ id: number }>;
  getShowcase: Thunk<{ id: number }>;
}

const compareAndSortItems = (cards: ICard[], groups: IGroup[]) => {
  const items: IItem[] = [];
  cards.map((el) => {
    if (el.groupId === null && el.status.title !== "Archived") {
      items.push({ ...el, type: "card" });
    }
  });
  groups.map((el) => {
    if (el.status.title !== "Archived") {
      items.push({ ...el, type: "group" });
    }
  });
  return items.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1));
};

export const createMerchantInteractor = (
  Repository: IMerchantRepository,
  Entity: typeof MerchantEntity,
): IMerchantInteractor => ({
  getCard: createAsyncThunk("MerchantInteractor/getCard", async ({ id }, { dispatch }) => {
    try {
      const {
        data: { showcase, ...card },
      } = await Repository.getCard(id);
      dispatch(Entity.actions.setCard(card));
      dispatch(
        Entity.actions.setProfile({
          ...showcase.user.profile,
          email: showcase.user.email,
          wallet: showcase.user.wallet,
        }),
      );
    } catch (err: any) {
      window.location.href = "/deleted";
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  getGroup: createAsyncThunk("MerchantInteractor/getGroup", async ({ id }, { dispatch }) => {
    try {
      const {
        data: { showcase, ...group },
      } = await Repository.getGroup(id);
      dispatch(Entity.actions.setGroup(group));
      dispatch(
        Entity.actions.setProfile({
          ...showcase.user.profile,
          email: showcase.user.email,
          wallet: showcase.user.wallet,
        }),
      );
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  getShowcase: createAsyncThunk("MerchantInteractor/getShowcase", async ({ id }, { dispatch }) => {
    try {
      const {
        data: { user, cards, groups },
      } = await Repository.getShowcase(id);
      dispatch(Entity.actions.setShowcase(compareAndSortItems(cards, groups)));
      dispatch(
        Entity.actions.setProfile({
          ...user.profile,
          email: user.email,
          wallet: user.wallet,
        }),
      );
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const MerchantInteractor = createMerchantInteractor(MerchantRepository, MerchantEntity);
