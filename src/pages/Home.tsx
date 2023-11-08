import { useState, useEffect } from "react";
import { DbTodo, TodoType } from "../types/Todo";
import styled from "@emotion/styled";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
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
  const [todos, setTodos] = useState<TodoType[]>([]);

  const updateTodo = () => {};

  const deleteTodo = () => {};

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "todos"), orderBy("created_at"), limit(50)),
      (snapshot) => {
        const dbTodos: DbTodo[] = [];
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
            key={todo.title} // TODO: 見直し
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
