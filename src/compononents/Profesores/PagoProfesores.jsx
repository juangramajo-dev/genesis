import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Flip } from "react-toastify";

const PagoProfesorForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [comprobante, setComprobante] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("comprobante", comprobante);

      await axios.post("http://localhost:3001/pagos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Aquí puedes agregar lógica adicional luego de que se haya realizado la solicitud
    //   console.log("Pago del profesor registrado exitosamente");
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
    } catch (error) {
    //   console.error("Error al registrar el pago del profesor:", error);
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="apellido" className="form-label">
          Apellido:
        </label>
        <input
          type="text"
          className="form-control"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="comprobante" className="form-label">
          Comprobante:
        </label>
        <input
          type="file"
          className="form-control"
          id="comprobante"
          name="comprobante"
          accept="image/jpeg, image/png, application/pdf"
          onChange={(e) => setComprobante(e.target.files[0])}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Registrar Pago
        <ToastContainer transition={Flip} />
      </button>
    </form>
  );
};

export default PagoProfesorForm;
