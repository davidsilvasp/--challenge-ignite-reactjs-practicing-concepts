import { v4 as uuidV4 } from "uuid";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { EmptyTodoList } from "./EmptyTodoList";
import { Statistics } from "./Statistics";
import { Task } from "./Task";

import styles from "./TodoList.module.css";
import ReactCanvasConfetti from "react-canvas-confetti";

type Task = {
  id: string;
  name: string | undefined;
  complete: boolean;
};

export function TodoList() {
  const [todo, setTodo] = useState<Task[]>([]);

  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [throwConffet, setThrowConffet] = useState(false);

  function handleIsDisabledButton() {
    setIsDisabledButton(!taskInputRef.current?.value);
  }

  function handleSubmitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskInputRef.current) return;

    const task: Task = {
      id: uuidV4(),
      name: taskInputRef.current?.value,
      complete: false,
    };

    setTodo([task, ...todo]);
    setIsDisabledButton(true);

    taskInputRef.current.focus();
    taskInputRef.current.value = "";
  }

  function handleToggleCompleteTask(id: string) {
    const tasks = todo.map((task) => {
      if (task.id === id) {
        return { ...task, complete: !task.complete };
      }

      return task;
    });

    const unCompletedTasks = tasks.filter((task) => !task.complete);
    const completedTasks = tasks.filter((task) => task.complete);

    setTodo([...unCompletedTasks, ...completedTasks]);

    if (completedTasks.length === todo.length) {
      setThrowConffet(true);
    } else {
      setThrowConffet(false);
    }

    console.log("setThrowConffet", throwConffet);
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = todo.filter((task) => task.id !== id);

    setTodo(tasksWithoutDeletedOne);
  }

  function getStatistics() {
    const completed = todo.reduce((acc, value) => {
      if (value.complete) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const total = todo.length;
    const percentage = completed ? (completed / total) * 100 : 0;

    const progress = Math.round(percentage);

    return { total, completed, progress };
  }

  return (
    <div className={styles.wrapper}>
      <ReactCanvasConfetti className={styles.confetti} fire={throwConffet} />

      <form onSubmit={handleSubmitTask} className={styles.form}>
        <input
          type="text"
          name="task"
          ref={taskInputRef}
          placeholder="Adicione uma nova tarefa"
          maxLength={200}
          onChange={handleIsDisabledButton}
          required
        />

        <button type="submit" disabled={isDisabledButton}>
          Criar <PlusCircle size={18} />
        </button>
      </form>

      <Statistics data={getStatistics()} />
      
      {!todo.length ? (
        <EmptyTodoList />
      ) : (
        <>
          <ul className={styles.todoList}>
            {todo.map(({ id, name, complete }) => (
              <Task
                key={id}
                id={id}
                name={name}
                complete={complete}
                onToggleCompleteTask={handleToggleCompleteTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
