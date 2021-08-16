import { MutationTree } from 'vuex';
import { BrandItem, State } from './state';

//Перечисление ключей типов мутаций
export enum MutationType {
  SetItems = 'SET_ITEMS',
  SetLoading = 'SET_LOADING',
}

//Типы мутаций
export type Mutations = {
  [MutationType.SetItems](state: State, items: BrandItem[]): void;
  [MutationType.SetLoading](state: State, value: boolean): void;
};

//Реализация типов
export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetItems](state, items) {
    state.items = items;
  },
  [MutationType.SetLoading](state, value) {
    state.isLoading = value;
  },
};
