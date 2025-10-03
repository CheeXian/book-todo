import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import AddBook from "./pages/AddBook";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, } from "react-router-dom";

import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { logout } from "./features/user/userSlice";

export function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user2.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }


  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Book Tracker</Navbar.Brand>
          {isAuthenticated ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/add">
                  Add Book
                </Nav.Link>
              </Nav>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

const AuthGuard = () => {
  const isAuthenticated = useSelector((state) => state.user2.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/book-todo/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<AuthGuard />}>
              <Route index element={<Home />} />
              <Route path="add" element={<AddBook />} />

              {/* Button/link → navigates to /edit/:id
              App.jsx → matches route and renders EditBook
              EditBook.jsx → uses useParams() to get id and loads the book data */}

              <Route path="edit/:id" element={<EditBook />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
