import { brandAPI } from '@/lib/api';
import { AxiosError } from 'axios';
import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationType } from './mutations';
import { BrandItem, State } from './state';

export enum ActionType {
  CreateBrandItem = 'CREATE_ITEM',
  ReadBrandItem = 'READ_ITEM',
  UpdateBrandItem = 'UPDATE_ITEM',
  DeleteBrandItem = 'DELETE_ITEM',
  GetBrandItems = 'GET_ITEMS',
}

type ActionArguments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionType.CreateBrandItem](
    context: ActionArguments,
    payload: Omit<BrandItem, '_id'>
  ): void;

  [ActionType.ReadBrandItem](context: ActionArguments, id: string): void;

  [ActionType.UpdateBrandItem](
    context: ActionArguments,
    payload: { _id: string; data: Omit<BrandItem, '_id'> }
  ): void;

  [ActionType.DeleteBrandItem](context: ActionArguments, id: string): void;

  [ActionType.GetBrandItems](context: ActionArguments): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionType.CreateBrandItem]({ commit }, payload) {
    commit(MutationType.SetLoading, true);
    try {
      await brandAPI.createItem(payload);
      const updatedItems = await brandAPI.getItems();
      commit(MutationType.SetItems, updatedItems);
    } catch (error) {
      const { response } = error as AxiosError;
      alert(`Error: ${response?.data || 'no info'}`);
    }
    commit(MutationType.SetLoading, false);
  },

  async [ActionType.ReadBrandItem]({ commit }, id) {
    commit(MutationType.SetLoading, true);
    try {
      const readedItem = await brandAPI.readItem(id);
      console.log(readedItem);
    } catch (error) {
      const { response } = error as AxiosError;
      alert(`Error: ${response?.data || 'no info'}`);
    }
    commit(MutationType.SetLoading, false);
  },

  async [ActionType.UpdateBrandItem]({ commit }, { _id, data }) {
    commit(MutationType.SetLoading, true);
    try {
      await brandAPI.updateItem(_id, data);
      const updatedItems = await brandAPI.getItems();
      commit(MutationType.SetItems, updatedItems);
    } catch (error) {
      const { response } = error as AxiosError;
      alert(`Error: ${response?.data || 'no info'}`);
    }
    commit(MutationType.SetLoading, false);
  },

  async [ActionType.DeleteBrandItem]({ commit }, id) {
    commit(MutationType.SetLoading, true);
    try {
      await brandAPI.deleteItem(id);
      const updatedItems = await brandAPI.getItems();
      commit(MutationType.SetItems, updatedItems);
    } catch (error) {
      const { response } = error as AxiosError;
      alert(`Error: ${response?.data || 'no info'}`);
    }
    commit(MutationType.SetLoading, false);
  },

  async [ActionType.GetBrandItems]({ commit }) {
    commit(MutationType.SetLoading, true);
    try {
      const brandItems = await brandAPI.getItems();
      commit(MutationType.SetItems, brandItems);
    } catch (error) {
      const { response } = error as AxiosError;
      alert(`Error: ${response?.data || 'no info'}`);
    }
    commit(MutationType.SetLoading, false);
  },
};
