
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { SpecializationId, QuizQuestion, User, QuizAttempt, QuizQuestionOption, Specialization } from '../types';
import { getSpecializationById } from '../constants';

interface QuizHandlerProps {
  user: User;
  onQuizComplete: (attempt: QuizAttempt) => void;
  isResultsView?: boolean;
}

const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></svg>;
const ArrowPathIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.206 4.068l-.158-.205.158.205A.75.75 0 016 14.932V13.5A.75.75 0 017.5 13.5h1.398a.75.75 0 01.688.43l.284.568a3.5 3.5 0 105.285-3.388.75.75 0 01.505-1.128 5.503 5.503 0 011.927 4.128.75.75 0 01-1.06.811l-.1-.043a3.993 3.993 0 00-1.01.043zM10 2a.75.75 0 01.75.75v2.519l.19.024a3.502 3.502 0 012.835 5.72.75.75 0 01-.729 1.216 3.993 3.993 0 00-1.01.044l-.103.043a.75.75 0 01-1.06-.811 5.503 5.503 0 011.928-4.128.75.75 0 01.504-1.128 3.5 3.5 0 10-5.285-3.388l-.284.568A.75.75 0 018.898 6H7.5A.75.75 0 017.5 4.5V3.068a.75.75 0 01.08-.353l.15-.302A5.5 5.5 0 0115.312 3.85Z" clipRule="evenodd" /></svg>;


const QuizHandler: React.FC<QuizHandlerProps> = ({ user, onQuizComplete, isResultsView = false }) => {
  const { specId } = useParams<{ specId: SpecializationId }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [specialization, setSpecialization] = useState<Specialization | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(isResultsView);
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(isResultsView ? location.state?.attempt : null);

  useEffect(() => {
    if (specId) {
      const specData = getSpecializationById(specId);
      if (specData) {
        setSpecialization(specData);
        if(isResultsView && location.state?.attempt) {
            setQuizAttempt(location.state.attempt);
            setAnswers(location.state.attempt.answers); // Populate answers for review
        }
      } else {
        navigate('/'); // Redirect if specId is invalid
      }
    }
  }, [specId, navigate, isResultsView, location.state]);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    if (showResults) return; // Don't allow changing answers on results screen
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitQuiz = () => {
    if (!specialization) return;
    let score = 0;
    specialization.quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerId) {
        score++;
      }
    });
    const attempt: QuizAttempt = {
      specializationId: specialization.id,
      userName: user.name,
      userEmail: user.email,
      score,
      totalQuestions: specialization.quiz.questions.length,
      answers,
      timestamp: new Date(),
    };
    setQuizAttempt(attempt);
    setShowResults(true);
    onQuizComplete(attempt); // This will navigate to results page via App.tsx
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setQuizAttempt(null);
    navigate(`/quiz/${specId}`);
  }

  if (!specialization) {
    return <div className="text-center py-10">Cargando quiz...</div>;
  }

  const currentQuestion: QuizQuestion | undefined = specialization.quiz.questions[currentQuestionIndex];

  if (showResults && quizAttempt) {
    const { score, totalQuestions, userName, userEmail } = quizAttempt;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    
    const subject = `Resultados de Evaluación: ${specialization.title} - ${userName}`;
    let body = `Resultados de la Evaluación para ${specialization.title}:\n`;
    body += `Estudiante: ${userName}\n`;
    body += `Correo: ${userEmail}\n`;
    body += `Puntuación: ${score} de ${totalQuestions} (${percentage}%)\n\n`;
    body += `Detalles de las respuestas:\n`;
    specialization.quiz.questions.forEach((q, idx) => {
        const userAnswerId = quizAttempt.answers[q.id];
        const userAnswerText = q.options.find(opt => opt.id === userAnswerId)?.text || "No respondida";
        const correctAnswerText = q.options.find(opt => opt.id === q.correctAnswerId)?.text;
        const isCorrect = userAnswerId === q.correctAnswerId;
        body += `\nPregunta ${idx + 1}: ${q.text}\n`;
        body += `Tu respuesta: ${userAnswerText} (${isCorrect ? "Correcta" : "Incorrecta"})\n`;
        if (!isCorrect) {
            body += `Respuesta correcta: ${correctAnswerText}\n`;
        }
    });

    const mailtoLinkStudent = `mailto:${userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoLinkInstructor = `mailto:uriel.akira@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
      <div className="container mx-auto p-4 sm:p-8 max-w-2xl">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-3xl font-bold text-sky-700 mb-4">Resultados de la Evaluación</h2>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">{specialization.title}</h3>
          <p className="text-lg text-slate-600 mb-1">Estudiante: <span className="font-semibold">{userName}</span></p>
          <p className="text-lg text-slate-600 mb-6">Correo: <span className="font-semibold">{userEmail}</span></p>
          
          <div className={`p-6 rounded-lg mb-6 ${percentage >= 70 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-2`}>
            <p className="text-4xl font-bold mb-2">{percentage}%</p>
            <p className="text-xl text-slate-700">Obtuviste {score} de {totalQuestions} respuestas correctas.</p>
            {percentage >= 70 ? 
                <p className="text-green-700 font-semibold mt-2">¡Felicidades, has aprobado!</p> :
                <p className="text-red-700 font-semibold mt-2">Sigue estudiando y vuelve a intentarlo.</p>
            }
          </div>

          <div className="mb-8 text-left">
            <h4 className="text-xl font-semibold text-sky-700 mb-3">Resumen de respuestas:</h4>
            {specialization.quiz.questions.map((q, idx) => {
                const userAnswerId = quizAttempt.answers[q.id];
                const isCorrect = userAnswerId === q.correctAnswerId;
                const userAnswerText = q.options.find(opt => opt.id === userAnswerId)?.text || "No respondida";
                const correctAnswerText = q.options.find(opt => opt.id === q.correctAnswerId)?.text;
                return (
                    <div key={q.id} className="mb-4 p-3 border border-slate-200 rounded-md">
                        <p className="font-medium text-slate-800">{idx + 1}. {q.text}</p>
                        <div className={`flex items-center mt-1 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? <CheckCircleIcon /> : <XCircleIcon />}
                            <span className="ml-2">Tu respuesta: {userAnswerText}</span>
                        </div>
                        {!isCorrect && <p className="text-sm text-slate-500 mt-1">Respuesta correcta: {correctAnswerText}</p>}
                        {q.explanation && <p className="text-xs text-slate-500 mt-1 italic">Explicación: {q.explanation}</p>}
                    </div>
                );
            })}
          </div>
          
          <div className="space-y-3 mb-6">
            <a href={mailtoLinkStudent} className="block w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition duration-150">Enviar resultados a mi correo</a>
            <a href={mailtoLinkInstructor} className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition duration-150">Enviar resultados al instructor</a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button onClick={handleRetakeQuiz} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-md transition duration-150 flex items-center justify-center">
                <ArrowPathIcon /> <span className="ml-2">Reintentar Evaluación</span>
            </button>
            <button onClick={() => navigate('/')} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-md transition duration-150">
                Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
        <div className="container mx-auto p-8 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-sky-700 mb-4">¡Evaluación Completada!</h2>
            <p className="text-slate-600 mb-6">Has respondido todas las preguntas.</p>
            <button
            onClick={handleSubmitQuiz}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
            Ver Resultados
            </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-3xl">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <header className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-700 mb-2">{specialization.quiz.title}</h2>
          <p className="text-sm text-slate-500">Pregunta {currentQuestionIndex + 1} de {specialization.quiz.questions.length}</p>
        </header>

        <div className="mb-8">
          <p className="text-lg sm:text-xl font-semibold text-slate-800 mb-6 text-center">{currentQuestion.text}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((option: QuizQuestionOption) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                className={`block w-full text-left p-4 rounded-lg border-2 transition-all duration-150 ease-in-out
                  ${answers[currentQuestion.id] === option.id 
                    ? 'bg-sky-500 border-sky-600 text-white font-semibold shadow-md ring-2 ring-sky-300' 
                    : 'bg-slate-50 hover:bg-sky-100 border-slate-300 hover:border-sky-300 text-slate-700'}`}
              >
                <span className={`inline-block w-6 h-6 mr-3 rounded-full border-2 text-center font-bold ${answers[currentQuestion.id] === option.id ? 'border-white bg-white text-sky-600' : 'border-slate-400 text-slate-600'}`}>
                    {option.id.toUpperCase()}
                </span>
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50 transition-colors"
          >
            Anterior
          </button>
          {currentQuestionIndex < specialization.quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={!answers[currentQuestion.id]} // Disable if current question not answered
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={!answers[currentQuestion.id]} // Disable if current question not answered
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50 transition-colors"
            >
              Finalizar Evaluación
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizHandler;
