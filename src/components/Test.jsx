import { useState } from "react";
import { useTransition, animated } from "react-spring";
import { CSSTransition } from "react-transition-group";
import "./Test.css";

export const Test = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <CSSTransition in={show} timeout={1300} classNames="fade">
        <div onClick={() => setShow((prev) => !prev)}>Hello world</div>
      </CSSTransition>
    </div>
  );
};
