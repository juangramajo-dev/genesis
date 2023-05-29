import { useState } from "react";
import axios from "axios";
 import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Flip} from "react-toastify";



const AddStudentForm = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    email: "",
    sucursal: "",
    inicio: "",
    telefono: "",
    direccion: "",
    DNI: "",
    curso: "",
  };

  const [alumno, setAlumno] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAlumno((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/add", alumno)
      .then((response) => {
        console.log(response.data);
          setAlumno(initialState);
         // Restablecer los valores del estado a los iniciales
          toast.success("Alumno registrado!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      })
      .catch((error) => {
          console.error(error);
       toast.error(" Ocurrió un error al cargar alumno", {
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
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mt-3 mb-4">Formulario de Alumnos</h2>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="mb-3 col-md-7">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={alumno.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-md-7">
          <label htmlFor="apellido" className="form-label">
            Apellido:
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={alumno.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-md-7">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={alumno.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-md-7">
          <label htmlFor="telefono" className="form-label">
            Teléfono:
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={alumno.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-md-7">
          <label htmlFor="direccion" className="form-label">
            Dirección:
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={alumno.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-md-7">
          <label htmlFor="DNI" className="form-label">
            DNI:
          </label>
          <input
            type="text"
            className="form-control"
            id="DNI"
            name="DNI"
            value={alumno.DNI}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-md-7">
          <label htmlFor="sucursal">Sucursal :</label>
          <select
            id="sucursal"
            name="sucursal"
            className="form-select"
            value={alumno.sucursal}
            onChange={handleChange}
          >
            <option value="">Selecciona una sucursal</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
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
            <option value="Santiago del Estero">Santiago del Estero</option>
            <option value="Tierra del Fuego">Tierra del Fuego</option>
            <option value="Tucumán">Tucumán</option>
          </select>
        </div>

        <div className="mb-3 col-md-7">
          <label htmlFor="inicio">Inicio :</label>
          <select
            id="inicio"
            name="inicio"
            className="form-select"
            value={alumno.inicio}
            onChange={handleChange}
          >
            <option value="">Selecciona un inicio</option>
            <option value="Marzo">Marzo</option>
            <option value="Mayo">Mayo</option>
            <option value="Julio">Julio</option>
            <option value="Septiembre">Septiembre</option>
          </select>
        </div>
        <div className="mb-3 col-md-7">
          <label htmlFor="curso">Curso :</label>
          <select
            id="curso"
            name="curso"
            className="form-select"
            value={alumno.curso}
            onChange={handleChange}
          >
            <option value="">Selecciona un curso</option>
            <option value="AsistenteFarmacéutico">
              Asistente Farmacéutico
            </option>
            <option value="Enfermería">Auxiliar Enfermería y Paramédico</option>
            <option value="Preceptor">Secretariado Escolar y Preceptor</option>
            <option value="AnálisisClínicos">Auxiliar Análisis Clínicos</option>
            <option value="Empresas">Administración de Empresas</option>
            <option value="AcompañanteTerapéutico">
              Acompañante Terapéutico
            </option>
          </select>
        </div>

        {/* Agrega los demás campos aquí */}
        <button type="submit" className="btn btn-primary">
          Enviar{" "}
        </button>
        <ToastContainer transition={Flip} />
      </form>
    </>
  );
};

export default AddStudentForm;
