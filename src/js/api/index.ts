import { IFetchData } from "../interfaces";

export const GET_HOUSES = ({ page, pageSize }: IFetchData) => {
  console.log({ page, pageSize });
  return `https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}`;
};
