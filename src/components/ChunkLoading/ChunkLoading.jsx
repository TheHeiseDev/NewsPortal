import styles from "./ChunkLoading.module.scss";

export const ChunkLoading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingText}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
};
