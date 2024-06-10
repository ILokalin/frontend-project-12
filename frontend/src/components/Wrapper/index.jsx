import classNames from 'classnames';
import Loader from './Loader';

const getWrapperClass = (isPage) => (
  classNames('h-100', {
    'container-fluid': !isPage,
    'container my-4 overflow-hidden rounded shadow': isPage,
  })
);

const Wrapper = ({ isLoading, children, isPage }) => (
  <div className={getWrapperClass(isPage)}>
    {isLoading ? <Loader /> : children}
  </div>
);

export default Wrapper;
