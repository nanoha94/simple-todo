import { atom } from "recoil";
import { ORDER_ASC } from "../constants/TodoSort";

export const todoSortOption = atom({
  key: "todoSortOption",
  default: ORDER_ASC,
});
