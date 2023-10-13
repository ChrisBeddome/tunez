import { Transition } from "react-transition-group";

export default function Fade({ in: inProp, duration, children }) {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out, visibility 0s`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1, visibility: "visible" },
    entered: { opacity: 1, visibility: "visible" },
    exiting: { opacity: 0, visibility: "visible" },
    exited: { opacity: 0, visibility: "hidden" },
  };

  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}
