import { IFetchData } from "../interfaces";

export const GET_HOUSES = ({ page, pageSize }: IFetchData) => {
  return `https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}`;
};
