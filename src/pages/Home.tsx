import { useState, useEffect } from "react";
import { Todo } from "../types/Todo";
import styled from "@emotion/styled";
import {
  collection,
  deleteDoc,
  updateDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { db, dbTimestamp } from "../firebase";
import TodoItem from "../components/TodoItem";

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const List = styled.ul`
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const updateTodo = async (updateTodo: Todo) => {
    const newTodos = todos.map((todo) =>
      todo.id === updateTodo.id ? updateTodo : todo
    );
    setTodos(newTodos);

    await updateDoc(doc(db, "todos", updateTodo.id), {
      ...updateTodo,
      updated_at: dbTimestamp.now(),
    });
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "todos"), orderBy("created_at"), limit(50)),
      (snapshot) => {
        const dbTodos: Todo[] = [];
        snapshot.docs.map((doc) => {
          dbTodos.push({
            id: doc.data().id,
            title: doc.data().title,
            detail: doc.data().detail,
            status: doc.data().status,
            created_at: doc.data().created_at,
            updated_at: doc.data().updated_at,
          });
        });
        setTodos(dbTodos);
      }
    );

    return () => unsub();
  }, []);

  return (
    <Container>
      <Title>TODOリスト</Title>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
