import styles from "./ChunkLoading.module.scss";
import loadingGif from "../../assets/loadingChunk.gif";

export const ChunkLoading = () => {
  return (
    <div className={styles.chunkLoading}>
      <img src={loadingGif} alt="Loading" />
    </div>
  );
};
