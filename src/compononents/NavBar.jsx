const Navbar = () => {
  return (
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
  );
};

export default Navbar;
