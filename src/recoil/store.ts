import { atom } from "recoil";
import { ORDER_ASC } from "../constants/Sort";

export const todoSortOption = atom({
  key: "todoSortOption",
  default: ORDER_ASC,
});
