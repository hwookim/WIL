interface ButtonProps {
  text: boolean;
}

const Button = (props: ButtonProps) => {
  return <button>{props.text}</button>;
};

export default Button;
