import * as styles from './LoadingSpinner.styles.css';

export const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};
