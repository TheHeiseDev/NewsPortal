import styles from "./ImageModal.module.scss";
import { FC, useEffect, useRef, useState } from "react";

interface IImageModal {
  imageUrl: string;
}

export const ImageModal: FC<IImageModal> = ({ imageUrl }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const modalViewCloseHandle = (event: MouseEvent | KeyboardEvent) => {
    if (event.target === ref.current) {
      setIsFullScreen(false);
    }
    if (event.type === "keydown" && (event as KeyboardEvent).key === "Escape") {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleOverflow = () => {
      document.body.style.overflow = isFullScreen ? "hidden" : "";
    };
    handleOverflow();

    return () => {
      handleOverflow();
    };
  }, [isFullScreen]);

  useEffect(() => {
    window.addEventListener("click", modalViewCloseHandle);
    window.addEventListener("keydown", modalViewCloseHandle);

    return () => {
      window.removeEventListener("click", modalViewCloseHandle);
      window.removeEventListener("keydown", modalViewCloseHandle);
    };
  }, []);

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
