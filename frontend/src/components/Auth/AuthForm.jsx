import { Col, Row, Card } from 'react-bootstrap';
import Wrapper from 'components/Wrapper';

const AuthForm = ({ img, children, footer, isLoading }) => (
  <Wrapper isForm isLoading={isLoading}>
    <Row className="justify-content-center align-content-center h-100">
      <Col xs="12" xxl="6" md="8">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <Row>
              <Col
                md="6"
                xs="12"
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  className="rounded-circle"
                  src={img}
                  alt="login form page" 
                />
              </Col>
              <Col md="6" xs="12" className="mt-3 mt-mb-0">
                {children}
              </Col>
            </Row>
          </Card.Body>
          {footer && (
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{footer.text}</span>{' '}
                <a href={footer.href}>{footer.action}</a>
              </div>
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  </Wrapper>
);

export default AuthForm;
