import { useEffect, useState } from "react";
import axios from "axios";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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
    // Filtrar los alumnos según la búsqueda (nombre o apellido)
    const nombreCompleto = `${alumno.nombre} ${alumno.apellido}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

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
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alumnos;

