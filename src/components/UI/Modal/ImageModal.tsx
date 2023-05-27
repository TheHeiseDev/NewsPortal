import styles from "./ImageModal.module.scss";
import React, { FC, useEffect, useRef, useState } from "react";

interface IImageModal {
  imageUrl: string;
}

export const ImageModal: FC<IImageModal> = ({ imageUrl }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const modalViewCloseHandle = (event: MouseEvent | KeyboardEvent) => {
    if (event.target === ref.current) {
      setIsFullScreen(false);
    }
    if (isKeyboardEvent(event) && event.key === "Escape") {
      setIsFullScreen(false);
    }
  };
  // Extension key is MouseEvent
  const isKeyboardEvent = (event: MouseEvent | KeyboardEvent): event is KeyboardEvent => {
    return "key" in event;
  };

  useEffect(() => {
    window.addEventListener("click", modalViewCloseHandle);
    window.addEventListener("keydown", modalViewCloseHandle);

    return () => {
      window.removeEventListener("click", modalViewCloseHandle);
      window.addEventListener("keydown", modalViewCloseHandle);
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
