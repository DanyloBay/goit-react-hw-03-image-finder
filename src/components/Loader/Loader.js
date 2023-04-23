import { Audio } from 'react-loader-spinner';
import './Loader.scss';
export const Loader = () => {
  return (
    <div className="loader__item">
      <Audio
        height="50"
        width="50"
        radius="50"
        color="#3f51b5"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};
