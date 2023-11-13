import { useState, useEffect } from "react";
import { Todo } from "../types/Todo";
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
import SortSelect from "../components/SortSelect";
import { useRecoilState } from "recoil";
import { todoSortOption } from "../recoil/store";
import { orderFunc } from "../constants/TodoSort";

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
  const [option, setOption] = useRecoilState(todoSortOption);

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
      <SortSelect todoSortOption={todoSortOption} />
      <List>
        {todos.sort(orderFunc(option)).map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
