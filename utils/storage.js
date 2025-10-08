// Utilidades para el manejo de datos en localStorage

const STORAGE_KEY = 'linksParaMayores';

function saveLinks(links, category = 'completos') {
  try {
    const storageKey = `${STORAGE_KEY}_${category}`;
    localStorage.setItem(storageKey, JSON.stringify(links));
  } catch (error) {
    console.error('Error saving links to localStorage:', error);
  }
}

function loadLinks(category = 'completos') {
  try {
    const storageKey = `${STORAGE_KEY}_${category}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading links from localStorage:', error);
  }
  
  // Retornar links de ejemplo solo para la categoría 'completos'
  if (category === 'completos') {
    return [
      {
        id: 1,
        title: 'Ejemplo de Video Completo',
        url: 'https://www.ejemplo.com',
        createdAt: new Date().toISOString()
      }
    ];
  }
  
  return [];
}

function clearAllLinks(category = null) {
  try {
    if (category) {
      const storageKey = `${STORAGE_KEY}_${category}`;
      localStorage.removeItem(storageKey);
    } else {
      // Limpiar todas las categorías
      ['completos', 'videosH', 'cortos'].forEach(cat => {
        const storageKey = `${STORAGE_KEY}_${cat}`;
        localStorage.removeItem(storageKey);
      });
    }
  } catch (error) {
    console.error('Error clearing links from localStorage:', error);
  }
}

// Función para exportar/importar datos (para futuras funcionalidades)
function exportLinks(category = 'completos') {
  try {
    const links = loadLinks(category);
    const dataStr = JSON.stringify(links, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `links-para-mayores-${category}-backup.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting links:', error);
    alert('Error al exportar los links');
  }
}

function importLinks(jsonData, category = 'completos') {
  try {
    const links = JSON.parse(jsonData);
    if (Array.isArray(links)) {
      saveLinks(links, category);
      return links;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error('Error importing links:', error);
    throw new Error('Error al importar los links. Verifica el formato del archivo.');
  }
}
