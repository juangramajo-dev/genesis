import { useState, useEffect } from "react";
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

  const formatearMarcaTiempo = (marcaTiempo) => {
    const fecha = new Date(marcaTiempo);
    return fecha.toLocaleString(); // Formato personalizado
  };

    return (
      <>
        <h2 className="mt-2 mb-4">Ver pago de profesores</h2>

        <table className="table table-striped table-bordered table-hover">
          <thead className="tabla-fija">
            <tr className="table-dark text-center">
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Pago del Mes de</th>
              <th>Fecha de pago</th>
              <th>Comprobante</th>
              <th>Descargar comprobante</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id}>
                <td>{pago.id}</td>
                <td>{pago.nombre}</td>
                <td>{pago.apellido}</td>
                <td>{pago.mes_pago}</td>
                <td>
                  {formatearMarcaTiempo(pago.marca_temporal_profesor)}
                </td>{" "}
                {/* Utilizar función de formateo */}
                <td>
                  <a
                    href={`http://localhost:3001/public/pago${pago.id}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver comprobante
                  </a>
                </td>
                <td className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      descargarComprobante(pago.comprobante, pago.id)
                    }
                  >
                    Descargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

export default TeacherPaymentDetails;
