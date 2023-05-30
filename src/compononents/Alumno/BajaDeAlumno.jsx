import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Flip } from "react-toastify";

const BajaDeAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);


  const [selectedAlumno, setSelectedAlumno] = useState("");
//   const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Realizar la solicitud GET al cargar el componente
    axios
      .get("http://localhost:3000/alumnos")
      .then((response) => {
        setAlumnos(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Manejar errores si es necesario
      });
  }, []);

    const handleBusquedaChange = (event) => {
      setBusqueda(event.target.value);
      filterAlumnos(event.target.value);
    };

const filterAlumnos = (query) => {
  const filteredAlumnos = alumnos.filter((alumno) => {
    const nombreCompleto =
      `${alumno.nombre} ${alumno.apellido} ${alumno.DNI} ${alumno.email}`.toLowerCase();
    return nombreCompleto.includes(query.toLowerCase());
  });
  setAlumnosFiltrados(filteredAlumnos);
};

  const handleDropdownChange = (event) => {
    setSelectedAlumno(event.target.value);
  };

  const handleBajaClick = () => {
    if (selectedAlumno) {
      // Realizar la solicitud DELETE para dar de baja al alumno
      axios
        .delete(`http://localhost:3000/delete/${selectedAlumno}`)
        .then((response) => {
        //   setMensaje(`Alumno ${selectedAlumno} dado de baja exitosamente.`);
          toast.success(`Alumno dado de baja exitosamente.`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          // Actualizar la lista de alumnos después de la baja
          setAlumnos(alumnos.filter((alumno) => alumno.id  !== selectedAlumno));
          setSelectedAlumno("");
        })
        .catch((error) => {
          console.error(error);
        //   setMensaje("Error al dar de baja al alumno.");
            toast.error(" Ocurrió un error al dar de baja al alumno", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
        });
    }
  };

  return (
    <div className="container">
      <h2>Baja de Alumno</h2>
      <div className="mb-3">
        <label htmlFor="busquedaInput" className="form-label">
          Buscar alumno:
        </label>
        <input
          type="text"
          className="form-control"
          id="busquedaInput"
          value={busqueda}
          onChange={handleBusquedaChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="alumnoDropdown" className="form-label">
          Selecciona un alumno:
        </label>
        <select
          id="alumnoDropdown"
          className="form-select"
          value={selectedAlumno}
          onChange={handleDropdownChange}
        >
          <option value="">-- Seleccione --</option>
          {alumnosFiltrados.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre} {alumno.apellido} {alumno.DNI}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-danger" onClick={handleBajaClick}>
        Dar de Baja
      </button>
      <ToastContainer transition={Flip} />

      {/* {mensaje && <p className="mt-3">{mensaje}</p>} */}
    </div>
  );
};

export default BajaDeAlumno;
