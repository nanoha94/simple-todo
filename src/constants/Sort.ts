import { Todo } from "../types/Todo";

export const ORDER_ASC: string = "新着";
export const ORDER_DEC: string = "作成日";
export const ORDER_STATUS: string = "ステータス";

export const SortOptions: string[] = [ORDER_ASC, ORDER_DEC, ORDER_STATUS];

export const orderFunc = (option: string) => {
  switch (option) {
    case ORDER_ASC:
      return orderByDate;
    case ORDER_DEC:
      return orderByDateDEC;
    case ORDER_STATUS:
      return orderByStatus;
    default:
      break;
  }
};

const orderByDate = (a: Todo, b: Todo) => {
  if (a.created_at.toDate() > b.created_at.toDate()) {
    return -1;
  } else if (a.created_at.toDate() < b.created_at.toDate()) {
    return 1;
  } else {
    return 0;
  }
};

const orderByDateDEC = (a: Todo, b: Todo) => {
  if (a.created_at.toDate() < b.created_at.toDate()) {
    return -1;
  } else if (a.created_at.toDate() > b.created_at.toDate()) {
    return 1;
  } else {
    return 0;
  }
};

const orderByStatus = (a: Todo, b: Todo) => {
  if (a.status > b.status) {
    return -1;
  } else if (a.status < b.status) {
    return 1;
  } else {
    return 0;
  }
};
