import { useState } from 'react';




const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('Enero');
    const [studentCount, setStudentCount] = useState(100);
    const [totalRevenue, setTotalRevenue] = useState(5000);
    const [teacherPayment, setTeacherPayment] = useState(3000);
    const [royaltiesPayment, setRoyaltiesPayment] = useState(1000);
    const [totalProfit, setTotalProfit] = useState(1000);
    const [annualTotal, setAnnualTotal] = useState(12000);
const [PorcentajeCobranza, setPorcentajeCobranza] = useState('80%');


    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        // Aquí podrías realizar una llamada a la API para obtener los datos correspondientes al mes seleccionado
        // y actualizar los estados de las variables con los datos reales.
    };

    return (
<>

        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Cantidad de Alumnos</h5>
                            <p className="card-text">
                                {studentCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Facturación</h5>
                            <p className="card-text">
                                {totalRevenue}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total a Pagar a Docentes</h5>
                            <p className="card-text">
                                {teacherPayment}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Regalías a Pagar</h5>
                            <p className="card-text">
                                {royaltiesPayment}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Ganancias Totales del Mes</h5>
                            <p className="card-text">
                                {totalProfit}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Acumulado Anual</h5>
                            <p className="card-text">
                                {annualTotal}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Porcentaje de cobranza</h5>
                            <p className="card-text">
                                {PorcentajeCobranza}</p>
                        </div>
                    </div>
                </div>
            </div>
           

            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="btn-group" role="group" aria-label="Cambiar Mes">
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Enero')
                        }>
                            Enero
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Febrero')
                        }>
                            Febrero
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Marzo')
                        }>
                            Marzo
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Abril')
                        }>
                            Abril
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Mayo')
                        }>
                            Mayo
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Junio')
                        }>
                            Junio
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Julio')
                        }>
                            Julio
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Agosto')
                        }>
                            Agosto
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Septiembre')
                        }>
                            Septiembre
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Octubre')
                        }>
                            Octubre
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Noviembre')
                        }>
                            Nobiembre
                        </button>
                        <button type="button" className="btn btn-secondary"
                            onClick={
                                () => handleMonthChange('Diciembre')
                        }>
                            Diciembre
                        </button>
                        {/* Agrega más botones para los demás meses */} </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Dashboard;

