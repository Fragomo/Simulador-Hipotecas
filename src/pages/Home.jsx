import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-indigo-100 px-4">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-xl w-full animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Bienvenido al Simulador de Hipotecas
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Descubre cuánto pagarás cada mes con nuestro simulador interactivo.
        </p>
        <Link to="/Simuladorpage">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
            Ir al Simulador
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

