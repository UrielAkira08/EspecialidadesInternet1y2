
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { SPECIALIZATIONS_DATA, getSpecializationById } from './constants';
import { SpecializationId, User, Specialization, QuizAttempt } from './types';
import ContentRenderer from './components/ContentRenderer';
import QuizHandler from './components/QuizHandler';

// Icons (simple SVGs)
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.992 9.992 0 0010 12c-2.31 0-4.438.784-6.131 2.095z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 16.835A1.5 1.5 0 0010 18.25h.004c.883 0 1.274-.772.906-1.415Zm0-3.337A1.5 1.5 0 0010 14.918h.004c.883 0 1.274-.772.906-1.416Zm0-3.337A1.5 1.5 0 0010 11.58h.004c.883 0 1.274-.772.906-1.416Z" /><path fillRule="evenodd" d="M5.75 3a1.75 1.75 0 00-1.75 1.75v10.5A1.75 1.75 0 005.75 17h8.5A1.75 1.75 0 0016 15.25V4.75A1.75 1.75 0 0014.25 3h-8.5ZM4.5 4.75A.25.25 0 014.75 4.5h9.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25h-9.5a.25.25 0 01-.25-.25V4.75Z" clipRule="evenodd" /></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 10.707V17.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0111 17.5V15a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v2.5A1.5 1.5 0 017.5 19h-3A1.5 1.5 0 013 17.5V10.707a1 1 0 01.293-.707l7-7z" clipRule="evenodd" /></svg>;
const AcademicCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2"><path d="M7.226 12.344c-.328.344-.701.633-1.082.877L4.95 13.95A.75.75 0 014 13.36V9.019l2.162-1.081a.25.25 0 00-.086-.481L3 8.999V6.75a.75.75 0 01.75-.75h12.5a.75.75 0 01.75.75v2.25L13.924 7.437a.25.25 0 00-.086.481L16 9.02v4.34a.75.75 0 01-.95.717l-1.194-.732c-.38-.244-.754-.533-1.082-.877L10 9.118l-2.774 3.226z" /><path d="M10 6a.75.75 0 01.75.75v1.519l1.707 1.024a.75.75 0 11-.714 1.19l-2.08-1.248a.75.75 0 010-1.19l2.08-1.248a.75.75 0 01-.714-1.19L10.75 7.52V6.75A.75.75 0 0110 6z" /><path d="M3 15.5V17a1 1 0 001 1h12a1 1 0 001-1v-1.5a.75.75 0 011.5 0V17a2.5 2.5 0 01-2.5 2.5H4A2.5 2.5 0 011.5 17v-1.5a.75.75 0 011.5 0z" /></svg>;

const UserModal: React.FC<{ onSubmit: (user: User) => void; isOpen: boolean; }> = ({ onSubmit, isOpen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Nombre y correo electrónico son obligatorios.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    setError('');
    onSubmit({ name, email });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-6 text-sky-700 text-center">Bienvenido/a</h2>
        <p className="text-sm text-gray-600 mb-4">Por favor, ingresa tu nombre y correo electrónico para continuar y guardar tu progreso.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Tu nombre completo"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="tu.correo@ejemplo.com"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Comenzar
          </button>
        </form>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ userName?: string }> = ({ userName }) => {
  return (
    <nav className="bg-sky-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-sky-200 transition-colors flex items-center">
          <AcademicCapIcon />
          <span className="ml-2">Computación Didáctica</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-sky-200 transition-colors flex items-center"><HomeIcon /><span className="ml-1 hidden sm:inline">Inicio</span></Link>
          {userName && (
            <div className="flex items-center">
              <UserIcon />
              <span className="ml-2 hidden sm:inline">{userName}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-700 mb-4">Especialidades de Computación</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explora los módulos de Computación 1 y Computación 2. Aprende conceptos clave, realiza actividades prácticas y evalúa tus conocimientos.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        {SPECIALIZATIONS_DATA.map((spec) => (
          <Link
            key={spec.id}
            to={`/specialization/${spec.id}`}
            className="block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center text-sky-600 mb-4">
              <BookOpenIcon />
              <h2 className="text-2xl font-semibold ml-3">{spec.title}</h2>
            </div>
            <p className="text-slate-600 mb-6">{spec.description}</p>
            <span className="inline-block bg-sky-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-sky-700 transition-colors">
              Comenzar Módulo
            </span>
          </Link>
        ))}
      </div>
       <footer className="text-center mt-12 py-6 border-t border-slate-200">
        <p className="text-sm text-slate-500">Aplicación desarrollada para fines educativos.</p>
      </footer>
    </div>
  );
};

const SpecializationPage: React.FC = () => {
  const { specId } = useParams<{ specId: SpecializationId }>();
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState<Specialization | null>(null);

  useEffect(() => {
    if (specId) {
      const specData = getSpecializationById(specId);
      if (specData) {
        setSpecialization(specData);
      } else {
        navigate('/'); // Redirect if specId is invalid
      }
    }
  }, [specId, navigate]);

  if (!specialization) {
    return <div className="text-center py-10">Cargando especialización...</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 mb-2">{specialization.title}</h1>
        <p className="text-md text-slate-600">{specialization.description}</p>
      </header>
      
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <ContentRenderer sections={specialization.sections} />
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(`/quiz/${specialization.id}`)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out text-lg"
        >
          Iniciar Evaluación de {specialization.title}
        </button>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]); // To store history if needed later
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('educationalAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsModalOpen(false);
    }
  }, []);

  const handleUserSubmit = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('educationalAppUser', JSON.stringify(userData));
    setIsModalOpen(false);
    navigate('/'); // Navigate to home after user submission
  }, [navigate]);

  const handleQuizComplete = useCallback((attempt: QuizAttempt) => {
    setQuizAttempts(prev => [...prev, attempt]);
    // Potentially save attempts to localStorage if persistence across sessions is desired
    // localStorage.setItem('quizAttempts', JSON.stringify([...quizAttempts, attempt]));
    navigate(`/results/${attempt.specializationId}`, { state: { attempt } });
  }, [navigate]);


  if (!user && isModalOpen) {
     return <UserModal onSubmit={handleUserSubmit} isOpen={isModalOpen} />;
  }
  
  // This ensures modal is shown if user is not set (e.g. cleared local storage)
  // but prevents flicker if user is already set from local storage.
  if (!user && !isModalOpen) { 
    // This case should ideally not happen if logic is correct, but as a fallback:
    setIsModalOpen(true);
    return <UserModal onSubmit={handleUserSubmit} isOpen={true} />;
  }


  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar userName={user?.name} />
      <main className="flex-grow">
        <UserModal onSubmit={handleUserSubmit} isOpen={isModalOpen && !user} />
        {user && !isModalOpen && ( // Only render routes if user is set and modal is not forced open
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/specialization/:specId" element={<SpecializationPage />} />
            <Route path="/quiz/:specId" element={user ? <QuizHandler user={user} onQuizComplete={handleQuizComplete} /> : <HomePage />} />
            <Route path="/results/:specId" element={user ? <QuizHandler user={user} onQuizComplete={handleQuizComplete} isResultsView={true}/> : <HomePage />} />
            </Routes>
        )}
      </main>
      <footer className="bg-sky-800 text-white text-center p-4 text-sm">
        &copy; {new Date().getFullYear()} Aplicación Educativa de Computación. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default App;
