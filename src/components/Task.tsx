import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  name: string | undefined;
  complete: boolean;
  onToggleCompleteTask(id: string): void;
  onDeleteTask(id: string): void;
}

export function Task({
  id,
  name,
  complete = false,
  onToggleCompleteTask,
  onDeleteTask
}: TaskProps) {
  return (
    <li className={styles.task}>
      {complete ? (
        <button className={styles.complete} onClick={() => onToggleCompleteTask(id)}>
          <CheckCircle size={24} color="var(--dark-purple)" weight="fill" />
        </button>
      ) : (
        <button
          className={styles.check}
          type="button"
          onClick={() => onToggleCompleteTask(id)}
        >
          <Circle
            weight="duotone"
            size={24}
            color="var(--blue)"
            fill="transparent"
          />
        </button>
      )}
      {complete ? <s>{name}</s> : <p>{name}</p>}
      <button className={styles.delete} type="button" onClick={() => onDeleteTask(id)}>
        <Trash size={18} />
      </button>
    </li>
  );
}
