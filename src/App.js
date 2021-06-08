import React, { useState, useRef, useCallback, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': //새로추가
      //{ type: 'INSERT', todo: {id: 1, text: 'todo', checked: false}}
      return todos.concat(action.todo);
    case 'REMOVE': //삭제
      //{ type: 'REMOVE', id: 1}
      return todos.filter(todo => todo.id !== action.id)
    case 'TOGGLE': //토글
      //{ type: 'TOGGLE', id: 1}
      return todos.map(todo => todo.id === action.id ?
        { ...todo, checked: !todo.checked } : todo)
    default:
      return todos;
  }
}

function App() {

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);


  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false,
      };
      // setTodos(todos => todos.concat(todo)); //리스트에 추가된 정보를 포함한 값 추가
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1; //nextId 1씩 더하기
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      //setTodos(todos => todos.filter(todo => todo.id !== id));
      dispatch({ type: 'REMOVE', id });
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      // setTodos(
      //   todos.map(todo =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      //   ),
      // );
      dispatch({ type: 'TOGGLE', id });
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
