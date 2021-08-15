export type BrandItem = {
  _id: string;
  title: string;
  main: boolean;
  isEditing?: boolean;
};

export type State = {
  isLoading: boolean;
  items: BrandItem[];
};

export const state: State = {
  isLoading: false,
  items: [],
};
