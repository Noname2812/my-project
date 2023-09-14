import { Post } from "./Types";

export const splitArrayForPagination = (list: Post[], totalPage: number) => {
  const temp: Post[] = [];
  for (let i = totalPage * 10; i < (totalPage + 1) * 10; i++) {
    temp.push(list[i]);
  }
  return temp;
};
