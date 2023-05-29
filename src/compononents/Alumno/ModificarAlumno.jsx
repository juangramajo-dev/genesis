import { useState, useEffect } from "react";
import axios from "axios";

const ModificarAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [DNI, setDNI] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [inicio, setInicio] = useState("");
  const [curso, setCurso] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);

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

  useEffect(() => {
    // Actualizar los campos cuando se selecciona un alumno
    if (selectedAlumno) {
      const alumno = alumnos.find((alumno) => alumno.id === selectedAlumno);
      if (alumno) {
        setNombre(alumno.nombre);
        setApellido(alumno.apellido);
        setEmail(alumno.email);
        setTelefono(alumno.telefono);
        setDireccion(alumno.direccion);
        setDNI(alumno.DNI);
        setSucursal(alumno.sucursal);
        setInicio(alumno.inicio);
        setCurso(alumno.curso);
      }
    }
  }, [selectedAlumno, alumnos]);

 const handleDropdownChange = (event) => {
   const selectedId = event.target.value;
   setSelectedAlumno(selectedId);

   if (selectedId) {
     const selectedAlumno = alumnos.find((alumno) => alumno.id === selectedId);
     if (selectedAlumno) {
       setNombre(selectedAlumno.nombre);
       setApellido(selectedAlumno.apellido);
       setEmail(selectedAlumno.email);
       setTelefono(selectedAlumno.telefono);
       setDireccion(selectedAlumno.direccion);
       setDNI(selectedAlumno.DNI);
       setSucursal(selectedAlumno.sucursal);
       setInicio(selectedAlumno.inicio);
       setCurso(selectedAlumno.curso);
     }
   } else {
     setNombre("");
     setApellido("");
     setEmail("");
     setTelefono("");
     setDireccion("");
     setDNI("");
     setSucursal("");
     setInicio("");
     setCurso("");
   }
 };


  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleDniChange = (event) => {
    setDNI(event.target.value);
  };

  const handleSucursalChange = (event) => {
    setSucursal(event.target.value);
  };

  const handleInicioChange = (event) => {
    setInicio(event.target.value);
  };

  const handleCursoChange = (event) => {
    setCurso(event.target.value);
    };
    
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
    filterAlumnos(event.target.value);
  };

const filterAlumnos = (query) => {
  const filteredAlumnos = alumnos.filter((alumno) => {
    const nombreCompleto = `${alumno.nombre} ${alumno.apellido}`.toLowerCase();
    return nombreCompleto.includes(query.toLowerCase());
  });
  setAlumnosFiltrados(filteredAlumnos);
};

  const handleModificarClick = () => {
    if (
      selectedAlumno &&
      nombre &&
      apellido &&
      email &&
      telefono &&
      direccion &&
      DNI &&
      sucursal &&
      inicio &&
      curso
    ) {
      // Realizar la solicitud PUT para modificar los datos del alumno
      axios
        .put(`http://localhost:3000/update/${selectedAlumno}`, {
          nombre,
          apellido,
          email,
          telefono,
          direccion,
          DNI,
          sucursal,
          inicio,
          curso,
        })
        .then((response) => {
          setMensaje(
            `Datos del alumno ${selectedAlumno} modificados exitosamente.`
          );
          // Actualizar la lista de alumnos después de la modificación
          setAlumnos(
            alumnos.map((alumno) => {
              if (alumno.id === selectedAlumno) {
                return {
                  ...alumno,
                  nombre,
                  apellido,
                  email,
                  telefono,
                  direccion,
                  DNI,
                  sucursal,
                  inicio,
                  curso,
                };
              }
              return alumno;
            })
          );
          setSelectedAlumno("");
          setNombre("");
          setApellido("");
          setEmail("");
          setTelefono("");
          setDireccion("");
          setDNI("");
          setSucursal("");
          setInicio("");
          setCurso("");
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Error al modificar los datos del alumno.");
        });
    }
  };

  return (
    <div className="container">
      <h2>Modificar Alumno</h2>
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
      <div className="mb-3">
        <label htmlFor="nombreInput" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          className="form-control"
          id="nombreInput"
          value={nombre}
          onChange={handleNombreChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="apellidoInput" className="form-label">
          Apellido:
        </label>
        <input
          type="text"
          className="form-control"
          id="apellidoInput"
          value={apellido}
          onChange={handleApellidoChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telefonoInput" className="form-label">
          Teléfono:
        </label>
        <input
          type="text"
          className="form-control"
          id="telefonoInput"
          value={telefono}
          onChange={handleTelefonoChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="direccionInput" className="form-label">
          Dirección:
        </label>
        <input
          type="text"
          className="form-control"
          id="direccionInput"
          value={direccion}
          onChange={handleDireccionChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dniInput" className="form-label">
          DNI:
        </label>
        <input
          type="text"
          className="form-control"
          id="dniInput"
          value={DNI}
          onChange={handleDniChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sucursalInput" className="form-label">
          Sucursal:
        </label>
        <input
          type="text"
          className="form-control"
          id="sucursalInput"
          value={sucursal}
          onChange={handleSucursalChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inicioInput" className="form-label">
          Inicio:
        </label>
        <input
          type="text"
          className="form-control"
          id="inicioInput"
          value={inicio}
          onChange={handleInicioChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cursoInput" className="form-label">
          Curso:
        </label>
        <input
          type="text"
          className="form-control"
          id="cursoInput"
          value={curso}
          onChange={handleCursoChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleModificarClick}>
        Modificar
      </button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ModificarAlumno;


//-----------------------------------------------------------------


