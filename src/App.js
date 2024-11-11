import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const SigeserApp = () => {
  const [reportes, setReportes] = useState([
    { id: 1, titulo: 'Reporte 1', descripcion: 'Descripción del reporte 1', estado: 'Pendiente' },
    { id: 2, titulo: 'Reporte 2', descripcion: 'Descripción del reporte 2', estado: 'En proceso' },
    { id: 3, titulo: 'Reporte 3', descripcion: 'Descripción del reporte 3', estado: 'Resuelto' },
  ]);

  const [nuevoReporte, setNuevoReporte] = useState({
    id: 0,
    titulo: '',
    descripcion: '',
    estado: 'Pendiente',
  });

  const agregarReporte = () => {
    setReportes([...reportes, { ...nuevoReporte, id: reportes.length + 1 }]);
    setNuevoReporte({ id: 0, titulo: '', descripcion: '', estado: 'Pendiente' });
  };

  const cambiarEstado = (id, estado) => {
    setReportes(reportes.map((reporte) => (reporte.id === id ? { ...reporte, estado } : reporte)));
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'text-red-500';
      case 'En proceso':
        return 'text-yellow-500';
      case 'Resuelto':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold uppercase">Sigeser</h1>
            <div className="flex gap-4 mb-4">
              <Link to="/nuevo-reporte" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg inline-block transition duration-200 ease-in-out">
                Nuevo Reporte
              </Link>
              <Link to="/estados-reporte" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg inline-block transition duration-200 ease-in-out">
                Estados de Reporte
              </Link>
            </div>
            <h2 className="text-2xl font-bold mb-2">Reportes</h2>
            <ul>
              {reportes.map((reporte) => (
                <li key={reporte.id} className="mb-2">
                  <span className="font-bold">{reporte.titulo}</span>: {reporte.descripcion} (<span className={getColorEstado(reporte.estado)}>{reporte.estado}</span>)
                </li>
              ))}
            </ul>
          </div>
        } />
        <Route path="/nuevo-reporte" element={
          <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-2">Nuevo reporte</h2>
            <form>
              <div className="mb-2">
                <label className="block font-bold mb-2">Título:</label>
                <input
                  type="text"
                  value={nuevoReporte.titulo}
                  onChange={(e) => setNuevoReporte({ ...nuevoReporte, titulo: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold mb-2">Descripción:</label>
                <textarea
                  value={nuevoReporte.descripcion}
                  onChange={(e) => setNuevoReporte({ ...nuevoReporte, descripcion: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={agregarReporte}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg inline-block transition duration-200 ease-in-out"
              >
                Agregar reporte
              </button>
              <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg inline-block ml-2 transition duration-200 ease-in-out">
                Volver a inicio
              </Link>
            </form>
          </div>
        } />
        <Route path="/estados-reporte" element={
          <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-2">Estados de reportes</h2>
            <ul>
              {reportes.map((reporte) => (
                <li key={reporte.id} className="mb-2">
                  <span className="font-bold">{reporte.titulo}</span>: <span className={getColorEstado(reporte.estado)}>{reporte.estado}</span>
                  <select
                    value={reporte.estado}
                    onChange={(e) => cambiarEstado(reporte.id, e.target.value)}
                    className="ml-2 p-2 border border-gray-300 rounded"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Resuelto">Resuelto</option>
                  </select>
                </li>
              ))}
            </ul>
            <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg inline-block transition duration-200 ease-in-out">
              Volver a inicio
            </Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default SigeserApp;
