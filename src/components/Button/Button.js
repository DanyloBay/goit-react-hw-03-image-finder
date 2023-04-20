import './Button.scss';
import PropTypes from 'prop-types';
export const Button = ({ onClick }) => {
  return (
    <div className="button__container">
      <button className="button" type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
