import styles from "./Statistics.module.css";

type Data = {
  total: number;
  completed: number;
  progress: number;
};

interface StatisticsProps {
  data: Data;
}

export function Statistics({ data }: StatisticsProps) {
  return (
    <div className="statistcs">
      <ul className={styles.data}>
        <li className={styles.total}>
          <strong>Tarefas criadas</strong>
          <span>{data.total}</span>
        </li>

        <li className={styles.progress}>
          <strong>Concluídas</strong>
          <span>
            {data.completed} de {data.total}
          </span>
        </li>
      </ul>

      {data.total > 0 && (
        <div className={styles.progressBar}>
          <progress id="progress" value={data.progress} max="100">
            {data.progress}%
          </progress>
        </div>
      )}
    </div>
  );
}
