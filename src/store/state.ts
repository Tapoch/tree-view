export type BrandItem = {
  _id: string;
  title: string;
  main: boolean;
  isEditing?: boolean;
};

//Типы данных в стейте
export type State = {
  isLoading: boolean;
  items: BrandItem[];
};

//Начальные значения
export const state: State = {
  isLoading: false,
  items: [],
};
