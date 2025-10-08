class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo salió mal</h1>
            <p className="text-gray-600 mb-4">Lo sentimos, ocurrió un error inesperado.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [isAgeVerified, setIsAgeVerified] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [links, setLinks] = React.useState([]);
    const [editPassword, setEditPassword] = React.useState('');
    const [isNightMode, setIsNightMode] = React.useState(false);
    const [activeCategory, setActiveCategory] = React.useState('completos');

    React.useEffect(() => {
      const verified = localStorage.getItem('ageVerified');
      if (verified === 'true') {
        setIsAgeVerified(true);
      }
      
      const nightMode = localStorage.getItem('nightMode');
      if (nightMode === 'true') {
        setIsNightMode(true);
        document.body.classList.add('night-mode');
      }

      const savedCategory = localStorage.getItem('activeCategory');
      if (savedCategory) {
        setActiveCategory(savedCategory);
      }
      
      const savedLinks = loadLinks(savedCategory || 'completos');
      setLinks(savedLinks);
    }, []);

    const handleAgeVerification = () => {
      setIsAgeVerified(true);
      localStorage.setItem('ageVerified', 'true');
    };

    const handleEditToggle = () => {
      if (!isEditMode) {
        const username = prompt('Ingrese el usuario:');
        if (username === 'Kairo.Soren.Star') {
          const password = prompt('Ingrese la contraseña:');
          if (password === 'KAIRO.soren.STAR755799@') {
            setIsEditMode(true);
            setEditPassword(password);
          } else {
            alert('Contraseña incorrecta');
          }
        } else {
          alert('Usuario incorrecto');
        }
      } else {
        setIsEditMode(false);
        setEditPassword('');
      }
    };

    const handleAddLink = (title, url) => {
      const newLink = {
        id: Date.now(),
        title,
        url,
        createdAt: new Date().toISOString()
      };
      const updatedLinks = [...links, newLink];
      setLinks(updatedLinks);
      saveLinks(updatedLinks, activeCategory);
    };

    const handleDeleteLink = (id) => {
      const updatedLinks = links.filter(link => link.id !== id);
      setLinks(updatedLinks);
      saveLinks(updatedLinks, activeCategory);
    };

    const toggleNightMode = () => {
      const newNightMode = !isNightMode;
      setIsNightMode(newNightMode);
      localStorage.setItem('nightMode', newNightMode.toString());
      
      if (newNightMode) {
        document.body.classList.add('night-mode');
      } else {
        document.body.classList.remove('night-mode');
      }
    };

    const handleCategoryChange = (category) => {
      setActiveCategory(category);
      localStorage.setItem('activeCategory', category);
      const categoryLinks = loadLinks(category);
      setLinks(categoryLinks);
    };

    if (!isAgeVerified) {
      return <AgeWarning onVerify={handleAgeVerification} />;
    }

    return (
      <div className="min-h-screen animated-bg" data-name="app" data-file="app.js">
        <button
          onClick={handleEditToggle}
          className="edit-mode-toggle"
          title={isEditMode ? 'Salir del modo edición' : 'Modo edición'}
        >
          <div className={`icon-${isEditMode ? 'lock' : 'edit'} text-lg`}></div>
        </button>

        <button
          onClick={toggleNightMode}
          className="night-mode-toggle"
          title={isNightMode ? 'Activar modo día' : 'Activar modo noche'}
        >
          <div className={`icon-${isNightMode ? 'sun' : 'moon'} text-xl`}></div>
        </button>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow mb-4">
              LINKS PARA MAYORES
            </h1>
            <p className="text-white text-lg opacity-90 mb-6">
              Contenido exclusivo para adultos
            </p>

            <div className="category-tabs">
              <button
                onClick={() => handleCategoryChange('completos')}
                className={`category-tab ${activeCategory === 'completos' ? 'active' : 'inactive'}`}
              >
                Videos Completos
              </button>
              <button
                onClick={() => handleCategoryChange('videosH')}
                className={`category-tab ${activeCategory === 'videosH' ? 'active' : 'inactive'}`}
              >
                VideosH
              </button>
              <button
                onClick={() => handleCategoryChange('cortos')}
                className={`category-tab ${activeCategory === 'cortos' ? 'active' : 'inactive'}`}
              >
                Videos Cortos
              </button>
            </div>
          </div>

          {isEditMode && (
            <EditForm onAddLink={handleAddLink} activeCategory={activeCategory} />
          )}

          <LinksList 
            links={links} 
            isEditMode={isEditMode}
            onDeleteLink={handleDeleteLink}
            activeCategory={activeCategory}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);