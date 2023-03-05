import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(true);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return toggleVisible;
  });
  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisible}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = "Toggleable";

export default Toggleable;
