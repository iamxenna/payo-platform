import { AnyAction, createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { INotification, Notification } from "libs/Notification";
import { ICard, IGroup, IItem, ShowcaseEntity } from "../ShowcaseEntity";
import {
  ShowcaseRepository,
  IShowcaseRepository,
  ICardCreateRequest,
  IGroupCreateRequest,
  ICardUpdateRequest,
  IGroupUpdateRequest,
  IDeleteGroupType,
  IArchiveGroupType,
} from "../ShowcaseRepository";

export interface IShowcaseInteractor {
  getShowcase: Thunk<void>;
  createCard: Thunk<{ data: ICardCreateRequest }>;
  createGroup: Thunk<{ data: IGroupCreateRequest }>;
  updateCard: Thunk<{ data: ICardUpdateRequest }>;
  updateGroup: Thunk<{ data: IGroupUpdateRequest }>;
  archiveCard: Thunk<{ id: number; statusId: number }>;
  archiveGroup: Thunk<{ id: number; type: IArchiveGroupType; statusId: number }>;
  deleteCard: Thunk<{ id: number }>;
  deleteGroup: Thunk<{ id: number; type: IDeleteGroupType }>;
}

const compareAndSortItems = (cards: ICard[], groups: IGroup[]) => {
  const items: IItem[] = [];
  cards.map((el) => {
    items.push({ ...el, type: "card" });
  });
  groups.map((el) => {
    items.push({ ...el, type: "group" });
  });
  return items.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1));
};

const updateShowcase = async (
  Repository: IShowcaseRepository,
  Entity: typeof ShowcaseEntity,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
) => {
  const { data } = await Repository.getShowcase();
  dispatch(Entity.actions.setShowcase({ items: compareAndSortItems(data.cards, data.groups), id: data.id }));
  dispatch(Entity.actions.setCards(data.cards));
  dispatch(Entity.actions.setGroups(data.groups));
};

export const createShowcaseInteractor = (
  Repository: IShowcaseRepository,
  Entity: typeof ShowcaseEntity,
  Notification: INotification,
): IShowcaseInteractor => ({
  getShowcase: createAsyncThunk("ShwocaseInteractor/getShowcase", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await updateShowcase(Repository, Entity, dispatch);
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  createCard: createAsyncThunk("ShowcaseInteractor/createCard", async ({ data: createData }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.createCard(createData);

      await updateShowcase(Repository, Entity, dispatch);
      Notification.success("The card was created");
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  createGroup: createAsyncThunk("ShowcaseInteractor/createGroup", async ({ data: createData }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.createGroup(createData);

      await updateShowcase(Repository, Entity, dispatch);
      Notification.success("The group was created");
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  updateCard: createAsyncThunk("ShowcaseInteractor/updateCard", async ({ data: updateData }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.updateCard(updateData);

      await updateShowcase(Repository, Entity, dispatch);
      Notification.success("Data successfully saved");
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  updateGroup: createAsyncThunk("ShowcaseInteractor/updateCard", async ({ data: updateData }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.updateGroup(updateData);

      await updateShowcase(Repository, Entity, dispatch);
      Notification.success("Data successfully saved");
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  archiveCard: createAsyncThunk("ShowcaseInteractor/archiveCard", async ({ id, statusId }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.archiveCard(id, statusId);

      if (data) {
        await updateShowcase(Repository, Entity, dispatch);
      }
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  archiveGroup: createAsyncThunk("ShowcaseInteractor/archiveCard", async ({ id, type, statusId }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.archiveGroup(id, statusId, type);
      if (data) {
        await updateShowcase(Repository, Entity, dispatch);
      }
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  deleteCard: createAsyncThunk("ShowcaseInteractor/deleteCard", async ({ id }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.deleteCard(id);

      await updateShowcase(Repository, Entity, dispatch);
      Notification.success("The card was deleted");
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  deleteGroup: createAsyncThunk("ShowcaseInteractor/deleteGroup", async ({ id, type }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.deleteGroup(id, type);

      await updateShowcase(Repository, Entity, dispatch);
      Notification.success("The group was deleted");
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const ShowcaseInteractor = createShowcaseInteractor(ShowcaseRepository, ShowcaseEntity, Notification);
