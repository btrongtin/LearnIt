import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function capitalize(s) {
  //func uppercase first letter of string, use for display theme title
  return s[0].toUpperCase() + s.slice(1);
}

const listTheme = [
  "minty",
  "yeti",
  "united",
  "spacelab",
  "solar",
  "slate",
  "sketchy",
  "simplex",
  "superhero",
  "sandstone",
  "pulse",
  "materia",
  "lumen",
  "litera",
  "journal",
  "darkly",
  "cerulean",
  "lux",
  "cyborg",
  "cosmo",
  "flatly",
];

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnItLogo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        LearnIt
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>

          {/* <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link> */}
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/statistic"
            as={Link}
          >
            Statistic
          </Nav.Link>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Change theme
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* <Dropdown.Item className="change-style-menu-item" rel="minty">
                Minty
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="yeti">
                Yeti
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="united">
                United
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="spacelab">
                Spacelab
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="solar">
                Solar
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="superhero">
                Superhero
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="sandstone">
                Sandstone
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="pulse">
                Pulse
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="lux">
                Lux
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="cyborg">
                Cyborg
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="cosmo">
                Cosmo
              </Dropdown.Item>
              <Dropdown.Item className="change-style-menu-item" rel="flatly">
                Flatly
              </Dropdown.Item> */}
              {listTheme.map((theme) => (
                <Dropdown.Item
                  key={theme}
                  className="change-style-menu-item"
                  rel={theme}
                >
                  {capitalize(theme)}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="danger"
            className="font-weight-bolder text-white"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
