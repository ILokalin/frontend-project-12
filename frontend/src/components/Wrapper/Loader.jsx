import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Загрузка</span>
    </Spinner>
  </div>
);

export default Loader;
