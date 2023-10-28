import s from './ErrorCard.module.css';
type ErrorCardProps = {
  children: string;
};

export const ErrorCard = ({ children }: ErrorCardProps) => {
  return <div className={s.error}>{children}</div>;
};
