function EditForm({ onAddLink, activeCategory }) {
  try {
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!title.trim() || !url.trim()) {
        alert('Por favor completa todos los campos');
        return;
      }

      // Validar URL básica
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      setIsSubmitting(true);
      
      try {
        onAddLink(title.trim(), formattedUrl);
        setTitle('');
        setUrl('');
        alert('Link agregado correctamente');
      } catch (error) {
        alert('Error al agregar el link');
        console.error('Error adding link:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto mb-8" data-name="edit-form" data-file="components/EditForm.js">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
              <div className="icon-plus text-lg text-white"></div>
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Agregar Link - {activeCategory === 'completos' ? 'Videos Completos' : activeCategory === 'videosH' ? 'VideosH' : 'Videos Cortos'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                Título del Link
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ejemplo: Mi sitio web favorito"
                className="input-field"
                disabled={isSubmitting}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                URL del Link
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Ejemplo: www.ejemplo.com"
                className="input-field"
                disabled={isSubmitting}
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Se agregará https:// automáticamente si no lo incluyes
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !url.trim()}
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Agregando...
                  </>
                ) : (
                  <>
                    <div className="icon-plus text-lg"></div>
                    Agregar Link
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setUrl('');
                }}
                disabled={isSubmitting}
                className="btn-secondary"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EditForm component error:', error);
    return null;
  }
}