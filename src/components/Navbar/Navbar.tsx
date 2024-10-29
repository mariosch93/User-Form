import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";

interface navProps {
  children?: React.ReactNode;
}

const MyNavbar: React.FC<navProps> = ({ children }) => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">Add User Form</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">HTML/CSS</Nav.Link>
            <Nav.Link href="#features">Javascript/PHP</Nav.Link>
            <Nav.Link href="#pricing">
              <a href="#pricing">Links</a>
            </Nav.Link> */}
          </Nav>
          {children}
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
