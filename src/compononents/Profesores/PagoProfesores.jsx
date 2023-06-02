import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Flip } from "react-toastify";

function PagoForm() {
  const [profesores, setProfesores] = useState([]);
  const [meses, setMeses] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState("");
  const [selectedMes, setSelectedMes] = useState("");
  const [comprobante, setComprobante] = useState(null);

  useEffect(() => {
    obtenerProfesores();
    generarMeses();
  }, []);

  const obtenerProfesores = async () => {
    try {
      const response = await axios.get("http://localhost:3001/profesores");
      setProfesores(response.data);
    } catch (error) {
      console.error("Error al obtener los profesores:", error);
    }
  };

  const generarMeses = () => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    setMeses(meses);
  };

  const handleProfesorChange = (event) => {
    setSelectedProfesor(event.target.value);
  };

  const handleMesChange = (event) => {
    setSelectedMes(event.target.value);
  };

  const handleComprobanteChange = (event) => {
    setComprobante(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("profesorId", selectedProfesor); // Cambio aquí
    formData.append("mesPago", selectedMes); // Cambio aquí
    formData.append("comprobante", comprobante);

    try {
      const response = await axios.post(
        "http://localhost:3001/pagos",
        formData
      );

      if (response.status === 200) {
        // console.log("Pago agregado exitosamente");
        toast.success("Pago del profesor registrado exitosamente", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.error(
          //   "Error al agregar el pago del profesor:",

          response.status
        );
      }
    } catch (error) {
      //   console.error("Error al agregar el pago del profesor:", error);
      toast.error("Error al registrar el pago del profesor:", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <h2 className="mt-2 mb-4">Pago de profesores</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="form-group">
            <label htmlFor="profesor" className="form-label">
              Profesor:
            </label>
            <select
              id="profesor"
              className="form-control"
              value={selectedProfesor}
              onChange={handleProfesorChange}
            >
              <option value="">Seleccione un profesor</option>
              {profesores.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre} {profesor.apellido}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-group">
            <label htmlFor="mes" className="form-label">
              Mes:
            </label>
            <select
              id="mes"
              className="form-control"
              value={selectedMes}
              onChange={handleMesChange}
            >
              <option value="">Seleccione un mes</option>
              {meses.map((mes, index) => (
                <option key={index} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-label ">
          <label htmlFor="comprobante form-label">Comprobante:</label>
          <input
            type="file"
            id="comprobante"
            className="form-control"
            accept="image/jpeg, image/png, application/pdf"
            onChange={handleComprobanteChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cargar Pago
          <ToastContainer transition={Flip} />
        </button>
      </form>
    </>
  );
}

export default PagoForm;
