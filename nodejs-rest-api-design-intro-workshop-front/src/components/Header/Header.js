import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/AuthContext";
import Button from "../Button/Button";
import { signOut } from "../../firebase/firebase";

function Header() {
  const currentUser = useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="bg-light">
      <header className="container">
        <nav className="navbar navbar-expand navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav w-100">
                {currentUser ? (
                  <>
                    <li className="nav-item ms-auto">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Button variant="outlined" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item ms-auto">
                      <Link className="nav-link" to="/sign-up">
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
