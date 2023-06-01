import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Flip } from "react-toastify";
import "../../App.css";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [alumnoModificado, setAlumnoModificado] = useState({});
  // const [mensaje, setMensaje] = useState("");

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
        // setMensaje(`Datos del alumno ${id} modificados exitosamente.`);
        toast.success("Datos del alumno modificados exitosamente.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
        // setMensaje("Error al modificar los datos del alumno.");
         toast.error("Error al modificar los datos del alumno.", {
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
      {/* {mensaje && <div className="alert alert-primary">{mensaje}</div>} */}
      <ToastContainer transition={Flip} />

      <table className="table table-striped table-bordered table-hover">
        <thead className="tabla-fija">
          <tr className="table-dark text-center">
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">
              <div className="ancho-columna"></div>
              Dirección
            </th>
            <th scope="col">DNI</th>
            <th scope="col">Sucursal</th>
            <th scope="col">Inicio</th>
            <th scope="col">Curso</th>
            <th scope="col">
              <div className="ancho-columna"></div>
              Fecha de ingreso
            </th>{" "}
            {/* Nueva columna */}
            <th scope="col">
              <div className="ancho-columna"></div>
              Última actualización
            </th>{" "}
            {/* Nueva columna */}
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
              <td>{alumno.marca_temporal}</td> {/* Nueva columna */}
              <td>{alumno.actualizar_marcaTemporal}</td> {/* Nueva columna */}
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
                  <select
                    id="sucursal"
                    name="sucursal"
                    className="form-select"
                    value={alumnoModificado.sucursal}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una sucursal</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="CABA">
                      Ciudad Autónoma de Buenos Aires
                    </option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Chubut">Chubut</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Jujuy">Jujuy</option>
                    <option value="La Pampa">La Pampa</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                    <option value="San Luis">San Luis</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Santiago del Estero">
                      Santiago del Estero
                    </option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="Tucumán">Tucumán</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="inicio">Inicio:</label>
                  <select
                    id="inicio"
                    name="inicio"
                    className="form-select"
                    value={alumnoModificado.inicio}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un inicio</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Julio">Julio</option>
                    <option value="Septiembre">Septiembre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="curso">Curso:</label>
                  <select
                    id="curso"
                    name="curso"
                    className="form-select"
                    value={alumnoModificado.curso}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un curso</option>
                    <option value="Asistente farmaceutico">
                      Asistente Farmacéutico
                    </option>
                    <option value=" Auxiliar Enfermería y Paramédico">
                      Auxiliar Enfermería y Paramédico
                    </option>
                    <option value="Secretariado Escolar y Preceptor">
                      Secretariado Escolar y Preceptor
                    </option>
                    <option value="Auxiliar Análisis Clínicos">
                      Auxiliar Análisis Clínicos
                    </option>
                    <option value="Administración de Empresas">
                      Administración de Empresas
                    </option>
                    <option value="Acompañante Terapéutico">
                      Acompañante Terapéutico
                    </option>
                  </select>
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
