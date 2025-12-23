import * as styles from './LoadingSpinner.styles.css';

export const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <span className={styles.text}>Loading...</span>
    </div>
  );
};
