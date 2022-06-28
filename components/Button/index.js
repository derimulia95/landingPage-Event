import React from "react";

function Button({ action, children, variant }) {
  return (
    <button type="button" className={variant} onClick={action}>
      {children}
    </button>
  );
}

export default Button;
