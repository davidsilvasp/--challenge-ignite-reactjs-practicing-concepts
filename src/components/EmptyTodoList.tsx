import clipBoardIcon from "../assets/clipboard-icon.svg";

import styles from "./EmptyTodoList.module.css";

export function EmptyTodoList() {
  return (
    <div className={styles.emptyTodoList}>
      <img src={clipBoardIcon} alt="Clipboard icon" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  );
}
