"use client";
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function MapPage() {
  const MapComponentWithNoSSR = useMemo(() => dynamic(
    () => import('../../components/MapComponent'),
    { 
      loading: () => <div className="w-full h-full flex justify-center items-center bg-gray-200"><p>Cargando mapa...</p></div>,
      ssr: false 
    }
  ), []);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-800 py-12 md:py-10 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black">Nuestra Red Global</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Descubre nuestros distribuidores oficiales alrededor del mundo. Haz clic en un punto para visitar su sitio web.
          </p>
        </div>
      </section>

<div className="max-w-[1700px] mx-auto py-5">
  <div className="w-full h-[700px] rounded-xl shadow-2xl overflow-hidden border-4 border-gray-200">
    <MapComponentWithNoSSR />
  </div>
</div>


    </div>
  );
}