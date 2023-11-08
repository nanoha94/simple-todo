import { Timestamp } from "firebase/firestore";

export type TodoType = {
  title: string;
  detail: string;
  status: string;
};

export type DbTodo = {
  id: string;
  title: string;
  detail: string;
  status: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type TodoStatus = {
  id: number;
  status: string;
};
