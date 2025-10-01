"use client";

import { useState, useEffect, use } from 'react'; // Se importa 'use'
import { useRouter } from 'next/navigation';
import { allProperties } from '../../products'; 
import Link from 'next/link';

export default function PropertyDetailPage({ params }) {
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [infoView, setInfoView] = useState('descripcion');

  // Se añade 'use(params)' para desenvolver los parámetros
  const resolvedParams = use(params); 

  useEffect(() => {
    // Se usa la variable 'resolvedParams'
    const propertyId = resolvedParams?.id; 
    
    if (propertyId) {
      const foundProperty = allProperties.find(p => p.id === parseInt(propertyId));
      
      if (foundProperty) {
        setProperty(foundProperty);
        const related = allProperties
          .filter(p => p.primaryCategory === foundProperty.primaryCategory && p.id !== foundProperty.id)
          .slice(0, 4);
        setRelatedProperties(related);
      }
    }
    
    setIsLoading(false);
  }, [resolvedParams]); // Se cambia la dependencia

  const handleGoBack = () => {
    router.push('/pages/tienda-gym');
  };

  const handleCategoryClick = (category) => {
    router.push(`/pages/tienda-gym?category=${encodeURIComponent(category)}`);
  };

  const handlePropertyClick = (propertyId) => {
    router.push(`/pages/tienda-gym/productos/${propertyId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h1>
          <p className="text-gray-600 mb-6">La propiedad que buscas no existe o ha sido eliminada.</p>
          <button 
            onClick={() => router.push('/pages/tienda-gym')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const renderPropertyInfoTabs = () => (
    <div className="mt-4">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-6">
          <button
            onClick={() => setInfoView('descripcion')}
            className={`py-3 px-1 border-b-2 font-bold text-sm ${infoView === 'descripcion' ? 'border-amber-600 text-amber-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Descripción
          </button>
          <button
            onClick={() => setInfoView('detalles')}
            className={`py-3 px-1 border-b-2 font-bold text-sm ${infoView === 'detalles' ? 'border-amber-600 text-amber-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Detalles Legales
          </button>
          <button
            onClick={() => setInfoView('especificaciones')}
            className={`py-3 px-1 border-b-2 font-bold text-sm ${infoView === 'especificaciones' ? 'border-amber-600 text-amber-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Especificaciones
          </button>
        </nav>
      </div>
      <div className="py-6">
        {infoView === 'descripcion' && (
          <div className="space-y-4 animate-fade-in">
            {Array.isArray(property.description) ? (
              property.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed text-xs md:text-sm">{paragraph}</p>
              ))
            ) : (
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm">{property.description}</p>
            )}
          </div>
        )}
        {infoView === 'detalles' && (
          <div className="animate-fade-in">
            {property.detallesLegales ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {Object.entries(property.detallesLegales).map(([key, value]) => value && (
                  <div key={key} className="border-b pb-2">
                    <span className="font-bold text-gray-700 capitalize text-xs md:text-sm">{key}:</span>
                    <span className="text-gray-600 ml-2 text-xs md:text-sm">{value}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500">No hay detalles legales disponibles.</p>}
          </div>
        )}
        {infoView === 'especificaciones' && (
          <div className="animate-fade-in">
            {property.especificaciones ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {Object.entries(property.especificaciones).map(([key, value]) => value && (
                  <div key={key} className="border-b pb-2">
                    <span className="font-bold text-gray-700 capitalize text-xs md:text-sm">{key}:</span>
                    <span className="text-gray-600 ml-2 text-xs md:text-sm">{value}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500">No hay especificaciones disponibles.</p>}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-8 md:pt-1">
      <div className="bg-white shadow-md border-b mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button onClick={handleGoBack} className="flex items-center text-gray-600 hover:text-red-600 transition-colors self-start bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              <span className="font-medium">Volver al Catálogo</span>
            </button>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border text-sm overflow-x-auto">
              <Link href="/pages/tienda-gym" className="text-gray-600 hover:text-red-800 font-medium transition-colors whitespace-nowrap">Catálogo</Link>
              <svg className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <button onClick={() => handleCategoryClick(property.primaryCategory)} className="text-gray-600 hover:text-red-800 font-medium transition-colors whitespace-nowrap">
                {property.primaryCategory}
              </button>
              <svg className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-gray-700 font-medium truncate whitespace-nowrap">{property.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="p-6 flex items-center justify-center">
              <div className="aspect-square bg-gray-100 rounded-lg w-full flex items-center justify-center">
                <img src={property.image} alt={property.alt} className="max-w-full max-h-full object-contain" />
              </div>
            </div>
            <div className="p-6 flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{property.name}</h1>
              <div className="mb-4 flex flex-wrap gap-2">
                {property.subCategories.map(sc => (
                  <span key={sc} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-sm font-medium rounded-full">{sc}</span>
                ))}
              </div>
              {renderPropertyInfoTabs()}
              
              <div className="mt-auto pt-6 border-t">
                <Link
                  href="/pages/contacto" 
className="w-full md:w-auto group/btn bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {relatedProperties.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Propiedades relacionadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProperties.map((relatedProperty) => (
                <div key={relatedProperty.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border" onClick={() => handlePropertyClick(relatedProperty.id)}>
                  <div className="aspect-square bg-white flex items-center justify-center p-4">
                    <img src={relatedProperty.image} alt={relatedProperty.alt} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 text-xs font-semibold rounded-full mb-2">{relatedProperty.primaryCategory}</span>
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 h-12">{relatedProperty.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}