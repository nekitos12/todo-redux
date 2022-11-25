import React, { useState } from "react";

import "./task-list.scss";
import Task from "../task";
import { ITodo } from "../../types/todo";

const classNames = require("classnames");

interface TaskListProps {
  todoList: ITodo[]
}

export default function TaskList({
                                   todoList

                                 }: TaskListProps) {
  const [currentTask, setCurrentTask] = useState("");

  // const onTaskEdit = (todo) => (e) => {
  //   setCurrentTask(e.target.value);
  //   changeTaskDescr(e.target.value, todo.id);
  // };

  // const onSubmitChange = (todo) => (e) => {
  //   e.preventDefault();
  //   setCurrentTask("");
  //   onToggleEdit(todo.id);
  // };

  const elements = todoList.map((todo) => {
    const { status } = todo;

    const className = classNames({
      completed: status
    });
    return (
      <li key={todo.id} className={className}>
        <Task
          {...todo}
        />
        {/*{isEditing ? (*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    className="edit"*/}
        {/*    value={currentTask || todo.label}*/}
        {/*    onChange={onTaskEdit(todo)}*/}
        {/*    onBlur={onSubmitChange(todo)}*/}
        {/*  />*/}
        {/*) : null}*/}
      </li>
    );
  });

  return (<ul className="todo-list"> {elements}</ul>);
}

