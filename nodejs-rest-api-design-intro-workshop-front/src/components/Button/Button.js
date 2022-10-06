import cn from "clsx";

function Button({ variant = "primary", type = "button", children, ...props }) {
  const classes = cn({ btn: true }, `btn-${variant}`);

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
