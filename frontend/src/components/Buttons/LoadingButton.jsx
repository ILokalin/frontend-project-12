import { Button, Spinner } from 'react-bootstrap';
import classNames from 'classnames';

const LoadingButton = ({
  children,
  className,
  onClick,
  isLoading,
  variant,
  type = 'button',
  disabled,
}) => (
  <Button
    className={classNames('px-5 position-relative', className)}
    onClick={onClick}
    disabled={disabled}
    variant={variant}
    type={type}
  >
    {children}
    {isLoading && (
      <div className="position-absolute d-inline-block right-1 end-0 pe-3">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </div>
    )}
  </Button>
);

export default LoadingButton;
