import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { DbTodoType, TodoType } from "../types/Todo";


initializeApp(firebaseConfig);

export const db = getFirestore();
export const dbTimestamp = Timestamp;

// export const dbTodosRef = await addDoc(collection(db, "todos"));

export const saveTodo =  async({title, detail, status}: TodoType) => {
  const data:DbTodoType = {
    id: '',
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
