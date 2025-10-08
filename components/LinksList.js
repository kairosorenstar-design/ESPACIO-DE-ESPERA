function LinksList({ links, isEditMode, onDeleteLink, activeCategory }) {
  try {
    if (links.length === 0) {
      return (
        <div className="text-center py-12" data-name="empty-links" data-file="components/LinksList.js">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="icon-link text-2xl text-white"></div>
          </div>
          <p className="text-white text-lg opacity-75">
            No hay links en {activeCategory === 'completos' ? 'Videos Completos' : activeCategory === 'videosH' ? 'VideosH' : 'Videos Cortos'}
          </p>
          {isEditMode && (
            <p className="text-white text-sm opacity-60 mt-2">
              Agrega el primer link para esta categoría
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto" data-name="links-list" data-file="components/LinksList.js">
        <div className="grid gap-4">
          {links.map((link, index) => (
            <div key={link.id} className="link-item">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-2xl font-bold text-[var(--primary-color)] min-w-[3rem]">
                    #{index + 1}
                  </span>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                      {link.title}
                    </h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm break-all inline-flex items-center gap-1"
                    >
                      {link.url}
                      <div className="icon-external-link text-xs"></div>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    <div className="icon-external-link text-sm"></div>
                    Ir
                  </a>
                  
                  {isEditMode && (
                    <button
                      onClick={() => onDeleteLink(link.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      <div className="icon-trash-2 text-sm"></div>
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-white text-sm opacity-75">
            {activeCategory === 'completos' ? 'Videos Completos' : activeCategory === 'videosH' ? 'VideosH' : 'Videos Cortos'}: {links.length} links
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LinksList component error:', error);
    return null;
  }
}