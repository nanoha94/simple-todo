import { Timestamp } from "firebase/firestore";

export type Todo = {
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
