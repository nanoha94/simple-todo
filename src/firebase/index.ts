import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  Timestamp,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { Todo } from "../types/Todo";

initializeApp(firebaseConfig);

export const db = getFirestore();
export const dbTimestamp = Timestamp;

export const saveTodo = async ({ title, detail, status }: Todo) => {
  const data: Todo = {
    id: "",
    title,
    detail,
    status,
    created_at: dbTimestamp.now(),
    updated_at: dbTimestamp.now(),
  };

  const todosRef = doc(collection(db, "todos"));
  data.id = todosRef.id;
  await setDoc(todosRef, data);
};
