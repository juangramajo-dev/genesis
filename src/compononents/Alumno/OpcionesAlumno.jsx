import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BajaDeAlumno from "./BajaDeAlumno";
import ListaDeAlumnos from "./ListaDeAlumnos";
import ReciboDePagoAlumnos from "./ReciboDePagoAlumnos";
import PedidoDeCertificado from "./PedidoDeCertificado";

const OpcionesAlumno = () => {
  const [mostrarTarjetas, setMostrarTarjetas] = useState(true);

  const handleClickEnlace = () => {
    setMostrarTarjetas(false);
  };

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className={`col-md-6 ${mostrarTarjetas ? "" : "d-none"}`}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Lista de Alumnos</h5>
                <Link
                  to="/lista"
                  className="btn btn-primary"
                  onClick={handleClickEnlace}
                >
                  Ir a Lista de Alumnos
                </Link>
              </div>
            </div>
          </div>
          <div className={`col-md-6 ${mostrarTarjetas ? "" : "d-none"}`}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Recibo de Pago de Alumnos</h5>
                <Link
                  to="/recibo"
                  className="btn btn-primary"
                  onClick={handleClickEnlace}
                >
                  Ir a Recibo de Pago de Alumnos
                </Link>
              </div>
            </div>
          </div>
          <div className={`col-md-6 ${mostrarTarjetas ? "" : "d-none"}`}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Baja de Alumno</h5>
                <Link
                  to="/baja"
                  className="btn btn-primary"
                  onClick={handleClickEnlace}
                >
                  Ir a Baja de Alumno
                </Link>
              </div>
            </div>
          </div>
          <div className={`col-md-6 ${mostrarTarjetas ? "" : "d-none"}`}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Pedido de Certificado</h5>
                <Link
                  to="/certificado"
                  className="btn btn-primary"
                  onClick={handleClickEnlace}
                >
                  Ir a Pedido de Certificado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Switch>
        {mostrarTarjetas && (
          <>
            <Route path="/lista" component={ListaDeAlumnos} />
            <Route path="/recibo" component={ReciboDePagoAlumnos} />
            <Route path="/baja" component={BajaDeAlumno} />
            <Route path="/certificado" component={PedidoDeCertificado} />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default OpcionesAlumno;
