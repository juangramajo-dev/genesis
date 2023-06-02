
import { useState } from "react";
import "bootswatch/dist/cerulean/bootstrap.min.css";
// import "bootswatch/dist/superhero/bootstrap.min.css";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentTheme = isDarkMode ? "superhero" : "cerulean";
  const buttonClassName = `button ${isDarkMode ? "dark-mode" : ""}`;
  return (
    <>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container-fluid w-100">
            <a className="navbar-brand" href="/">
              <img
                src="https://i.ibb.co/StvP5MS/Logo-1700-x-700.png"
                width={190}
                alt="Logo-1700-x-700"
              />
            </a>
            <div className="navbar-collapse justify-content-center">
              <h4 className="navbar-text text-light">Instituto Salvador</h4>
            </div>
            <button className={buttonClassName} onClick={handleToggle}>
              {isDarkMode ? (
                <FontAwesomeIcon icon={faSun} className="icon" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="icon" />
              )}
              <span className="m-2">
                {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
              </span>
            </button>

            <div className="navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <link
          rel="stylesheet"
          href={`https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/${currentTheme}/bootstrap.min.css`}
        />
      </div>
    </>
  );
};

export default Navbar;
