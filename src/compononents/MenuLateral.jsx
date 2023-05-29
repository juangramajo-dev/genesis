import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import '../style.css'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faLineChart,
  faUserPlus,
  faUserSlash,
  faUserGraduate,
  faUserTie,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

import AddStudentForm from "./Alumno/AddStudentForm"
import ListaDeAlumnos from "./Alumno/ListaDeAlumnos";
import OpcionesProfesores from './Profesores/OpcionesProfesor';
import Dashboard from './Dashboard';
import BajaDeAlumno from "./Alumno/BajaDeAlumno";
import ModificarAlumno from "./Alumno/ModificarAlumno";



const MenuLateral = () => {


    // const [sidebarContent, setSidebarContent] = useState('');
    // const [agregarAlumno, setagregarAlumno] = useState('');

    // const handleProfesores = () => {
    // setSidebarContent(<PagoProfesores />);

    // };
    // const handleAgregarAlumno = () => {
    // setagregarAlumno(<AddStudentForm />);
    // };

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        if (selectedOption === 'dashboard') {
            return <div>
                <div><Dashboard/></div>
            </div>;
        } else if (selectedOption === 'agregarAlumno') {
            return <div><AddStudentForm/></div>;
        } else if (selectedOption === 'listaDeAlumnos') {
            return <div><ListaDeAlumnos/></div>;
        } else if (selectedOption === 'pagoProfesores') {
            return <div><OpcionesProfesores/></div>;
        } else if (selectedOption === 'bajaDeAlumno') {
            return <div><BajaDeAlumno/></div>;
        } else if (selectedOption === 'modificarAlumno') {
            return <div><ModificarAlumno/></div>;
        } else {
            return <div><div><Dashboard/></div></div>;  
                  
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
                    className="nav-link text-info active pt-4"
                    href="#"
                    onClick={() => handleOptionClick("dashboard")}
                  >
                    <FontAwesomeIcon icon={faLineChart} />
                    Dashboard
                  </a>
                </li>
                <hr />
                <li className="nav-item">
                  <a
                    className="nav-link text-info pt-3"
                    href="#"
                    onClick={() => handleOptionClick("agregarAlumno")}
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    Agregar alumnos
                  </a>
                </li>

                <li className="nav-item  pt-3">
                  <a
                    className="nav-link text-info"
                    href="#"
                    onClick={() => handleOptionClick("listaDeAlumnos")}
                  >
                    <FontAwesomeIcon icon={faUserGraduate} />
                    Alumnos
                  </a>
                </li>
                <li className="nav-item  pt-3">
                  <a
                    className="nav-link text-info"
                    href="#"
                    onClick={() => handleOptionClick("bajaDeAlumno")}
                  >
                    <FontAwesomeIcon icon={faUserSlash} />
                    Baja de alumno
                  </a>
                </li>
                <li className="nav-item  pt-3">
                  <a
                    className="nav-link text-info"
                    href="#"
                    onClick={() => handleOptionClick("modificarAlumno")}
                  >
                    <FontAwesomeIcon icon={faUserEdit} />
                    Modificar alumno
                  </a>
                </li>

                <hr />

                <li className="nav-item  pt-3">
                  <a
                    className="nav-link text-info"
                    href="#"
                    onClick={() => handleOptionClick("pagoProfesores")}
                  >
                    <FontAwesomeIcon icon={faUserTie} />
                    Profesores
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
}

export default MenuLateral;
