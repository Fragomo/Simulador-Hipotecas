import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mt-100 ml-100">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Simulador de Hipotecas</h1>
      <Link to="/Simuladorpage">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Ir al Simulador
        </button>
      </Link>
    </div>
  );
};

export default Home;

