function AgeWarning({ onVerify }) {
  try {
    const [showWarning, setShowWarning] = React.useState(true);

    const handleAccept = () => {
      setShowWarning(false);
      setTimeout(() => {
        onVerify();
      }, 500);
    };

    const handleReject = () => {
      window.location.href = 'https://www.google.com';
    };

    return (
      <div className="min-h-screen animated-bg flex items-center justify-center px-4" data-name="age-warning" data-file="components/AgeWarning.js">
        <div className={`bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all duration-500 ${showWarning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="mb-6">
            <div className="w-20 h-20 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-alert-triangle text-3xl text-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              ADVERTENCIA
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Este sitio web contiene material exclusivamente para personas mayores de 18 años.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-[var(--text-primary)] font-medium mb-2">
              ¿Eres mayor de 18 años?
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Al continuar, confirmas que tienes la edad legal requerida.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              No, salir
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 btn-primary py-3 px-4 font-medium"
            >
              Sí, continuar
            </button>
          </div>

          <p className="text-xs text-[var(--text-secondary)] mt-4">
            © 2025 - Sitio para mayores de edad
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AgeWarning component error:', error);
    return null;
  }
}