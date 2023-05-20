import styles from "./ImageModal.module.scss";
import { useEffect, useRef, useState } from "react";

export const ImageModal = ({ imageUrl }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const ref = useRef(null);

  const modalViewCloseHandle = (event) => {
    const target = event.target;
    if (event.target === ref.current) {
      setIsFullScreen(false);
    }
    if (event.key === "Escape") {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", modalViewCloseHandle);
    window.addEventListener("keydown", modalViewCloseHandle);

    return () => {
      window.removeEventListener("click", modalViewCloseHandle);
    };
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      {isFullScreen ? (
        <div ref={ref} className={styles.modal}>
          <img src={imageUrl} alt="Post Image" />
          <button onClick={toggleFullScreen}>Закрыть</button>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="thumbnail"
          onClick={toggleFullScreen}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};
