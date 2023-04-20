import './Button.scss';
export const Button = ({ onClick }) => {
  return (
    <div className="button__container">
      <button className="button" type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
