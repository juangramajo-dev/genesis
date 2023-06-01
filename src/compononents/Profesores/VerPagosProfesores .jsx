import  { useState, useEffect } from "react";
import axios from "axios";



const TeacherPaymentDetails = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    // Obtener los pagos de profesores al cargar el componente
    obtenerPagos();
  }, []);

  const obtenerPagos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pagos");
      setPagos(response.data);
    } catch (error) {
      console.error("Error al obtener los pagos:", error);
    }
  };

   const descargarComprobante = (nombreArchivo, idPago) => {
     const url = `http://localhost:3001/public/pago${idPago}.pdf`;

     fetch(url)
       .then((response) => response.blob())
       .then((blob) => {
         const downloadLink = document.createElement("a");
         downloadLink.href = URL.createObjectURL(blob);
         downloadLink.target = "_self";
         downloadLink.download = nombreArchivo;
         downloadLink.click();
       })
       .catch((error) => {
         console.error("Error al descargar el comprobante:", error);
       });
   };




  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Comprobante</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pagos.map((pago) => (
          <tr key={pago.id}>
            <td>{pago.id}</td>
            <td>{pago.nombre}</td>
            <td>{pago.apellido}</td>
            <td>
              <a
                href={`http://localhost:3001/public/pago${pago.id}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver comprobante
              </a>
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => descargarComprobante(pago.comprobante, pago.id)}
              >
                Descargar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherPaymentDetails;
