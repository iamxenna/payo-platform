import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { INotification, Notification, NotificationPromise } from "libs/Notification";
import InjectedModule from "Modules/InjectedModule/InjectedModule";
import ChainConverter from "utils/chainConverter";
import { TransferEntity } from "../TransferEntity";
import { IPurchaseRequest, ITransferRepository, TransferRepository } from "../TransferRepository";

export interface ITransferInteractor {
  saveTransfer: Thunk<{ data: any }>;
  transact: Thunk<{ data: IPurchaseRequest & { token: string; toAddress: string } }>;
}

export const createTransferInteractor = (
  Repository: ITransferRepository,
  Entity: typeof TransferEntity,
  Notification: INotification,
): ITransferInteractor => ({
  saveTransfer: createAsyncThunk("TransferInteractor/saveTransfer", async ({ data }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.saveTransfer(data);
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  transact: createAsyncThunk(
    "TransferInteractor/transact",
    async ({ data: { network, token, amount, to, toAddress, ...data } }, { dispatch }) => {
      try {
        dispatch(Entity.actions.setLoading(true));
        dispatch(Entity.actions.setTxLoading(true));
        await InjectedModule.changeNetwork(+ChainConverter.convert(network));
        const txPromise = InjectedModule.makeTransaction({
          network: +ChainConverter.convert(network),
          token,
          amount,
          to: toAddress,
        });
        const tx = await NotificationPromise({
          promise: txPromise,
          pending: "In processing",
        });
        const { data: purchaseData } = await Repository.saveTransfer({
          network,
          to,
          amount,
          ...data,
        });
        if (tx.status === 1) {
          dispatch(Entity.actions.setTxStatus("Success"));
          Notification.success("Transaction completed");
          await Repository.updateStatus({ purchaseId: purchaseData.id, status: "Completed" });
          return;
        }
        await Repository.updateStatus({ purchaseId: purchaseData.id, status: "Cancelled" });
        dispatch(Entity.actions.setTxStatus("Error"));
        Notification.error("Transaction failed");
      } catch (err: any) {
        dispatch(Entity.actions.setError(err.message));
        dispatch(Entity.actions.setTxStatus("Error"));
        Notification.error("Transaction failed");
      } finally {
        dispatch(Entity.actions.setLoading(false));
        dispatch(Entity.actions.setTxLoading(false));
      }
    },
  ),
});

export const TransferInteractor = createTransferInteractor(TransferRepository, TransferEntity, Notification);
