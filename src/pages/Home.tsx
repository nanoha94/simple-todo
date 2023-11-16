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
import { ORDER_ASC, ORDER_DEC, ORDER_STATUS } from "../constants/TodoSort";

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

  const orderFunc = (option: string) => {
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
