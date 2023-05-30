import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [alumnoModificado, setAlumnoModificado] = useState({});
  const [mensaje, setMensaje] = useState("");

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

  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const filteredAlumnos = alumnos.filter((alumno) => {
    const datosAlumnos =
      `${alumno.nombre} ${alumno.apellido} ${alumno.email}${alumno.sucursal}${alumno.inicio}${alumno.telefono}${alumno.direccion}${alumno.DNI}${alumno.curso}`.toLowerCase();
    return datosAlumnos.includes(busqueda.toLowerCase());
  });

  const abrirModal = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setAlumnoModificado(alumno);
  };

  const cerrarModal = () => {
    setAlumnoSeleccionado(null);
    setAlumnoModificado({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAlumnoModificado((prevAlumnoModificado) => ({
      ...prevAlumnoModificado,
      [name]: value,
    }));
  };

  const guardarCambios = () => {
    const { id } = alumnoSeleccionado;
    axios
      .put(`http://localhost:3000/update/${id}`, alumnoModificado)
      .then((response) => {
        setMensaje(`Datos del alumno ${id} modificados exitosamente.`);
        setAlumnos((prevAlumnos) => {
          const updatedAlumnos = prevAlumnos.map((alumno) => {
            if (alumno.id === id) {
              return { ...alumno, ...alumnoModificado };
            }
            return alumno;
          });
          return updatedAlumnos;
        });
        cerrarModal();
      })
      .catch((error) => {
        console.error(error);
        setMensaje("Error al modificar los datos del alumno.");
      });
  };

  return (
    <div className="container">
      <h2>Lista de Alumnos</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={busqueda}
          onChange={handleBusqueda}
        />
      </div>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="table-dark text-center">
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Dirección</th>
            <th scope="col">DNI</th>
            <th scope="col">Sucursal</th>
            <th scope="col">Inicio</th>
            <th scope="col">Curso</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{alumno.email}</td>
              <td>{alumno.telefono}</td>
              <td>{alumno.direccion}</td>
              <td>{alumno.DNI}</td>
              <td>{alumno.sucursal}</td>
              <td>{alumno.inicio}</td>
              <td>{alumno.curso}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => abrirModal(alumno)}
                >
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {alumnoSeleccionado && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modificar Alumno</h5>
                <button type="button" className="close" onClick={cerrarModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={alumnoModificado.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                 <div className="form-group">
                   <label htmlFor="apellido">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={alumnoModificado.apellido}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={alumnoModificado.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={alumnoModificado.telefono}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion">Dirección:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    value={alumnoModificado.direccion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="DNI">DNI:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="DNI"
                    name="DNI"
                    value={alumnoModificado.DNI}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sucursal">Sucursal:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sucursal"
                    name="sucursal"
                    value={alumnoModificado.sucursal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inicio">Inicio:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inicio"
                    name="inicio"
                    value={alumnoModificado.inicio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="curso">Curso:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso"
                    name="curso"
                    value={alumnoModificado.curso}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cerrarModal}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={guardarCambios}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alumnos;

