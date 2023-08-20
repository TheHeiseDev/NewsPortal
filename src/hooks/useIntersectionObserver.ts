import { useRef, useEffect } from "react";
import { PostType } from "../store/slice/posts/postsTypes";

export const useIntersectionObserver = (
  page: number,
  totalPages: number,
  data: PostType[] | null,
  className: string,
  setPage: Function
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage((prevPage: number) => prevPage + 1);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [page, totalPages]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const postNodes = document.querySelectorAll(`.${className}`);
    if (postNodes.length > 0) {
      observerRef.current && observerRef.current.observe(postNodes[postNodes.length - 1]);
    }
  }, [data]);

  return observerRef;
};
