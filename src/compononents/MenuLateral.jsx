import { useState } from "react";

import "../style.css";




import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLineChart,
  faUserPlus,
  faUserSlash,
  faUserGraduate,
  faReceipt,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

import AddStudentForm from "./Alumno/AddStudentForm";
import ListaDeAlumnos from "./Alumno/ListaDeAlumnos";
import OpcionesProfesores from "./Profesores/OpcionesProfesor";
import Dashboard from "./Dashboard";
import BajaDeAlumno from "./Alumno/BajaDeAlumno";
import VerPagosProfesores from "./Profesores/VerPagosProfesores ";
// import ModificarAlumno from "./Alumno/ModificarAlumno";

const MenuLateral = () => {
  // const [sidebarContent, setSidebarContent] = useState('');
  // const [agregarAlumno, setagregarAlumno] = useState('');

  // const handleProfesores = () => {
  // setSidebarContent(<PagoProfesores />);

  // };
  // const handleAgregarAlumno = () => {
  // setagregarAlumno(<AddStudentForm />);
  // };

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    if (selectedOption === "dashboard") {
      return (
        <div>
          <div>
            <Dashboard />
          </div>
        </div>
      );
    } else if (selectedOption === "agregarAlumno") {
      return (
        <div>
          <AddStudentForm />
        </div>
      );
    } else if (selectedOption === "listaDeAlumnos") {
      return (
        <div>
          <ListaDeAlumnos />
        </div>
      );
    } else if (selectedOption === "pagoProfesores") {
      return (
        <div>
          <OpcionesProfesores />
        </div>
      );
    } else if (selectedOption === "bajaDeAlumno") {
      return (
        <div>
          <BajaDeAlumno />
        </div>
      );
    } else if (selectedOption === "verPagoProfesores") {
      return (
        <div>
          <VerPagosProfesores />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Dashboard />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="sidebar  d-flex flex-column">
      <div className="row">
        <div className="col-md-2">
          <div className="sidebar bg-light">
            {/* Contenido del menú lateral */}

            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link text-secondary active pt-2 mt-3"
                  href="#"
                  onClick={() => handleOptionClick("dashboard")}
                >
                  <FontAwesomeIcon icon={faLineChart} />
                  <span className="m-3">Dashboard</span>
                </a>
                <hr />
                <h5 className="text-center text-primary mt-2 ">Alumnos</h5>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-secondary pt-3"
                  href="#"
                  onClick={() => handleOptionClick("agregarAlumno")}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span className="m-2">Agregar alumno</span>
                </a>
              </li>

              <li className="nav-item  pt-3">
                <a
                  className="nav-link text-secondary"
                  href="#"
                  onClick={() => handleOptionClick("listaDeAlumnos")}
                >
                  <FontAwesomeIcon icon={faUserGraduate} />
                  <span className="m-2">Alumnos</span>
                </a>
              </li>
              <li className="nav-item  pt-3">
                <a
                  className="nav-link text-secondary"
                  href="#"
                  onClick={() => handleOptionClick("bajaDeAlumno")}
                >
                  <FontAwesomeIcon icon={faUserSlash} />
                  <span className="m-2">Baja de alumno</span>
                </a>
              </li>
              <hr />
              <h5 className="text-center text-primary mt-2 ">Profesores</h5>

              <li className="nav-item  mt-2">
                <a
                  className="nav-link text-secondary"
                  href="#"
                  onClick={() => handleOptionClick("pagoProfesores")}
                >
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <span className="m-2">Cargar pago de profesores</span>
                </a>
              </li>
              <li className="nav-item  pt-3">
                <a
                  className="nav-link text-secondary"
                  href="#"
                  onClick={() => handleOptionClick("verPagoProfesores")}
                >
                  <FontAwesomeIcon icon={faReceipt} />
                  <span className="m-2">Ver pagos de profesores</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-8 sidebar">
          <div className="main-content ">
            {/* Contenido principal */}
            {renderContent()}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLateral;
