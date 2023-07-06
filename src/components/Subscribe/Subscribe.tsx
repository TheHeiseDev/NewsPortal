import styles from "./Subscribe.module.scss";
import { useCallback, useRef, useState, memo } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../store/store";
import { fetchAddSubscriber } from "../../store/slice/email/emailThunk";
import { EmailWithoutId } from "../../store/slice/email/emailTypes";
import { selectEmail } from "../../store/slice/email/emailSlice";
import { StatusEnum } from "../../store/slice/posts/postsTypes";

import { getCurrentDateTime } from "../../utils/getCurrentDateTime";
import { useIPInfo } from "../../hooks/useIpInfo";
import { Alert, CircularProgress } from "@mui/material";
import { Button } from "../UI/Buttons/Button";

export const Subscribe = memo(() => {
  const [isAlert, setIsAlert] = useState(false);
  const { status } = useSelector(selectEmail);
  const { country } = useIPInfo();
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const alertHandler = useCallback(() => {
    setIsAlert(true);

    setTimeout(() => {
      setIsAlert(false);
    }, 2000);
  }, []);

  const subscribeHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subscriber: EmailWithoutId = {
      email: event.currentTarget.email.value,
      date: getCurrentDateTime(),
      country: country,
    };

    dispatch(fetchAddSubscriber(subscriber)).then(() => {
      alertHandler();
      if (formRef.current) {
        formRef.current.reset();
      }
    });
  };
  return (
    <div className={styles.subscribe}>
      <div className={styles.containerMini}>
        <div className={styles.subscribeWrapper}>
          {isAlert ? (
            <div className={styles.alertContainer}>
              <Alert variant="filled" severity="success">
                Подписка оформлена!
              </Alert>
            </div>
          ) : (
            <form ref={formRef} className={styles.form} onSubmit={subscribeHandle}>
              <div>
                <label htmlFor="Подпишитесь на новые посты">
                  Подпишитесь на новые посты
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="template@gmail.com"
                    required
                  />
                  <Button type="submit">
                    {status === StatusEnum.loading ? <CircularProgress /> : "OK"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
});
