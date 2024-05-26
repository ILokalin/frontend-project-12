import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Navbar, Container } from "react-bootstrap";
import { selectIsAuth, clearAuth } from "redux/slices/authSlice";
import PAGES from "configs/routs";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const logout = () => {
    dispatch(clearAuth());
  }
  return (
    <Navbar className="shadow-sm bg-white">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand as={Link} to={PAGES.MAIN}>Hexlet Chat</Navbar.Brand>
        {isAuth && <Button onClick={logout}>Выход</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
