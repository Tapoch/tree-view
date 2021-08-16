import { GetterTree } from 'vuex';
import { State, BrandItem } from './state';

//Перечисление ключей типов геттеров
export enum GetterType {
  sortedAsc = 'SORTED_ASC',
  sortedDesc = 'SORTED_DESC',
}

//Типы геттеров
export type Getters = {
  [GetterType.sortedAsc](state: State): BrandItem[];
  [GetterType.sortedDesc](state: State): BrandItem[];
};

//Реализация геттеров
export const getters: GetterTree<State, State> & Getters = {
  [GetterType.sortedAsc](state) {
    return state.items.sort((a, b) => a.title.localeCompare(b.title));
  },
  [GetterType.sortedDesc](state) {
    return state.items.sort((a, b) => -a.title.localeCompare(b.title));
  },
};
