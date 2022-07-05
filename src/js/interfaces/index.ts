export interface IState {
  houses: IHouse[];
  loading: boolean;
}

export interface IHouse {
  name: string;
  region: string;
  coatOfArms: string;
}
