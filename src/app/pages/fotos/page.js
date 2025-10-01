"use client";
import { useState } from 'react';
import Image from 'next/image';

// --- Datos Actualizados para la Galería ---
const galleryImages = [
  { 
    id: 1, 
    src: "/galeria/instala1.jpg", // <-- CAMBIO
    alt: "Sucursal favorita", 
    category: "Instalaciones" 
  },
  { 
    id: 2, 
    src: "/galeria/instala2.jpg", // <-- CAMBIO
    alt: "Área de peso libre con racks y barras olímpicas", 
    category: "Instalaciones" 
  },
  { 
    id: 3, 
    src: "/galeria/uso1.jpg", // <-- CAMBIO
    alt: "Hombre utilizando una máquina de press de banca", 
    category: "Uso de Máquinas" 
  },
  { 
    id: 4, 
    src: "/galeria/instala3.jpg", // <-- CAMBIO
    alt: "Vista general de un gimnasio con diversas estaciones de entrenamiento", 
    category: "Instalaciones" 
  },
  { 
    id: 5, 
    src: "/galeria/instala4.jpg", // <-- CAMBIO
    alt: "Zona de entrenamiento funcional con césped artificial y equipo", 
    category: "Instalaciones" 
  },
  { 
    id: 6, 
    src: "/galeria/uso2.jpeg", // <-- CAMBIO
    alt: "Persona ajustando una máquina de ejercicio para usarla", 
    category: "Uso de Máquinas" 
  },
  { 
    id: 7, 
    src: "/galeria/mante1.jpg", // <-- CAMBIO
    alt: "Técnico realizando mantenimiento a una bicicleta de spinning", 
    category: "Mantenimiento" 
  },
  { 
    id: 8, 
    src: "/galeria/mante2.jpeg", // <-- CAMBIO
    alt: "Persona limpiando y desinfectando equipo de gimnasio", 
    category: "Mantenimiento" 
  },
  { 
    id: 9, 
    src: "/galeria/mante3.jpg", // <-- CAMBIO
    alt: "Detalle de una máquina de cardio siendo inspeccionada", 
    category: "Mantenimiento" 
  },
  { 
    id: 10, 
    src: "/galeria/uso3.jpg", // <-- CAMBIO
    alt: "Hombre utilizando una máquina de remo en un gimnasio luminoso", 
    category: "Uso de Máquinas" 
  },
];

const galleryVideos = [
  { 
    id: 1, 
    title: "Tour de un Gimnasio Comercial de Élite", 
    youtubeId: "UxZbuV_rPs0", // Ejemplo de Tour de gimnasio
    description: "Un recorrido virtual por las instalaciones de un gimnasio equipado con las últimas máquinas de RealLeader.",
    category: "Instalaciones"
  },
  { 
    id: 2, 
    title: "Técnica Correcta: Prensa de Piernas (Leg Press)", 
    youtubeId: "ao7VCzeACyI", // Ejemplo de técnica de Leg Press
    description: "Aprende la técnica correcta para maximizar tus entrenamientos de pierna con nuestra Leg Press.",
    category: "Uso de Máquinas"
  },
  { 
    id: 3, 
    title: "Cómo Mantener tus Máquinas de Gimnasio en Perfecto Estado", 
    youtubeId: "8e2iHuGdpsY", // Ejemplo de mantenimiento de equipo (genérico)
    description: "Consejos sencillos para mantener tu equipo de gimnasio en óptimas condiciones y alargar su vida útil.",
    category: "Mantenimiento"
  },
  { 
    id: 4, 
    title: "Entrenamiento de Cuerpo Completo con Cable Crossover", 
    youtubeId: "VAyGIIa5VBM", // Ejemplo de entrenamiento con Functional Trainer/Cable Crossover
    description: "Descubre la versatilidad de nuestros sistemas de poleas con esta rutina de cuerpo completo.",
    category: "Uso de Máquinas"
  },
];


export default function GalleryPage() {
  const [filter, setFilter] = useState('all'); // 'all', 'Instalaciones', 'Uso de Máquinas', 'Mantenimiento'

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const filteredVideos = filter === 'all' 
    ? galleryVideos 
    : galleryVideos.filter(vid => vid.category === filter);

  return (
    <div className="bg-white min-h-screen">
      {/* Encabezado de la página */}
      <section className="bg-gray-100 py-12 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">Realleader in the World</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explora nuestros proyectos, instalaciones de vanguardia y videos demostrativos de uso de equipo.
          </p>
        </div>
      </section>

      {/* Sección de Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <button 
            onClick={() => setFilter('all')} 
            className={`py-2 px-5 rounded-full text-sm font-medium transition-all duration-200 ${filter === 'all' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Todo
          </button>
          <button 
            onClick={() => setFilter('Instalaciones')} 
            className={`py-2 px-5 rounded-full text-sm font-medium transition-all duration-200 ${filter === 'Instalaciones' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Instalaciones
          </button>
          <button 
            onClick={() => setFilter('Uso de Máquinas')} 
            className={`py-2 px-5 rounded-full text-sm font-medium transition-all duration-200 ${filter === 'Uso de Máquinas' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Uso de Máquinas
          </button>
          <button 
            onClick={() => setFilter('Mantenimiento')} 
            className={`py-2 px-5 rounded-full text-sm font-medium transition-all duration-200 ${filter === 'Mantenimiento' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Mantenimiento
          </button>
        </div>
      </div>

      {/* Sección de Imágenes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Nuestros Proyectos en Fotos</h2>
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map(img => (
              <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-lg font-semibold">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No hay imágenes disponibles para esta categoría.</p>
        )}
      </div>

      {/* Sección de Videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Videos Destacados</h2>
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map(video => (
              <div key={video.id} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="relative w-full aspect-video">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No hay videos disponibles para esta categoría.</p>
        )}
      </div>
    </div>
  );
}