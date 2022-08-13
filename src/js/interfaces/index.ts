export interface IState {
  houses: IHouse[];
  loading: boolean;
  error: boolean;
  success: boolean;
  page: number;
  pageSize: number;
}

export interface IHouse {
  name: string;
  region: string;
  coatOfArms: string;
}

export interface IFetchData {
  page: number;
  pageSize: number;
}
