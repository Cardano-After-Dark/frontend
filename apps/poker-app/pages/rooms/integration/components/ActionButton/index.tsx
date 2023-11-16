import styles from './styles.module.css';

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  text: string;
  buttonType?: string;
}

export default function ActionButton({
  onClick,
  children,
  text,
  buttonType,
}: Props) {
  // Dynamically select the class based on the buttonType prop
  const buttonClass = styles[buttonType] || styles.defaultButton;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}