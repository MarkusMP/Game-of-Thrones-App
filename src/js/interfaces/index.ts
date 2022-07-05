export interface IState {
  houses: IHouse[];
  loading: boolean;
  error: boolean;
}

export interface IHouse {
  name: string;
  region: string;
  coatOfArms: string;
}
