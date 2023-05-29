import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"

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
    // Filtrar los alumnos según la búsqueda (datos del alumnos)
    const datosAlumnos =
      `${alumno.nombre} ${alumno.apellido} ${alumno.email}${alumno.sucursal}${alumno.inicio}${alumno.telefono}${alumno.direccion}${alumno.DNI}${alumno.curso}`.toLowerCase();
    return datosAlumnos.includes(busqueda.toLowerCase());
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
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="table-dark text-center">
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">
              <div className="ancho-columna">Dirección</div>
            </th>
            <th scope="col">DNI</th>
            <th scope="col">Sucursal</th>
            <th scope="col">Inicio </th>
            <th scope="col">Curso</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alumnos;
