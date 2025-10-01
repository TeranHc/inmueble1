'use client';
import { useState } from 'react';
import Link from 'next/link';

// --- Iconos para la UI ---
const IconCheck = () => <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;

export default function ServiciosLegalesPage() {
  // --- TODA TU LÓGICA Y DATOS SE MANTIENEN INTÁCTOS ---
  const servicios = [
    { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>, title: "Análisis de Documentación", descripcion: "Revisión exhaustiva de todos los documentos legales del proceso judicial, incluyendo sentencias, avalúos y gravámenes.", incluye: ["Verificación de autenticidad", "Revisión de estatus procesal", "Análisis de gravámenes y adeudos", "Validación de avalúos comerciales"] },
    { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>, title: "Asesoría en Cesión de Derechos", descripcion: "Acompañamiento legal completo en el proceso de adquisición de derechos litigiosos con garantía jurídica.", incluye: ["Redacción de contratos de cesión", "Asesoría en negociación de términos", "Protocolización ante notario", "Registro de cesión de derechos"] },
    { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>, title: "Gestión de Recuperación", descripcion: "Seguimiento completo del proceso judicial hasta la adjudicación final del inmueble a tu nombre.", incluye: ["Continuación del juicio hipotecario", "Gestión de sentencia ejecutoriada", "Trámites de desalojo (si aplica)", "Inscripción en Registro Público"] },
    { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>, title: "Due Diligence Legal", descripcion: "Investigación profunda del inmueble y su historial legal para garantizar una inversión segura.", incluye: ["Investigación de antecedentes", "Verificación de libertad de gravámenes", "Análisis de riesgos legales", "Reporte ejecutivo de factibilidad"] }
  ];
  const paquetes = [
    { nombre: "Básico", precio: "15,000", descripcion: "Ideal para inversionistas con experiencia que necesitan asesoría puntual.", caracteristicas: ["Análisis de documentación", "Asesoría en cesión de derechos", "Consultas ilimitadas (3 meses)", "Revisión de contratos"], destacado: false },
    { nombre: "Integral", precio: "35,000", descripcion: "La opción más completa para garantizar el éxito de tu inversión.", caracteristicas: ["Todo lo del paquete Básico", "Gestión completa de recuperación", "Due Diligence profundo", "Seguimiento hasta adjudicación", "Acompañamiento en desalojo", "Inscripción en Registro Público"], destacado: true },
    { nombre: "Premium", precio: "Consultar", descripcion: "Servicio personalizado para carteras de múltiples propiedades.", caracteristicas: ["Todo lo del paquete Integral", "Asesoría para múltiples inmuebles", "Estrategia de inversión personalizada", "Abogado dedicado", "Prioridad en comunicación", "Reporte mensual de avances"], destacado: false }
  ];
  const proceso = [
    { numero: "01", titulo: "Consulta Inicial", descripcion: "Reunión sin costo donde analizamos tu caso y te explicamos las opciones legales disponibles." },
    { numero: "02", titulo: "Análisis Preliminar", descripcion: "Revisamos la documentación de la oportunidad que te interesa y emitimos un dictamen de viabilidad." },
    { numero: "03", titulo: "Contratación", descripcion: "Firmamos el contrato de servicios legales y definimos el plan de trabajo específico." },
    { numero: "04", titulo: "Ejecución", descripcion: "Iniciamos el proceso legal con actualizaciones constantes sobre el avance de tu caso." }
  ];

  return (
    <div className="bg-white">
      {/* --- Encabezado de Página --- */}
      <section className="relative py-15  bg-stone-200 overflow-hidden">
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-8 text-left">
          <div className="max-w-xl">
            <h2 className="text-base font-semibold tracking-wide uppercase text-emerald-700">Protección Legal para tu Inversión</h2>
            <p className="mt-3 text-3xl sm:text-5xl font-bold text-stone-800 leading-tight">Servicios Legales Especializados</p>
            <p className="mt-4 text-lg text-stone-600 leading-relaxed">Te brindamos la certeza jurídica que necesitas en cada etapa del proceso, desde el análisis inicial hasta la adjudicación de tu propiedad.</p>
          </div>
        </div>
      </section>

      {/* --- Sección de Servicios --- */}
      <section className="py-10 sm:py-10 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Nuestros Servicios</h2><p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">Cobertura legal integral para tu inversión inmobiliaria, diseñada para darte tranquilidad y seguridad.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {servicios.map((servicio) => (
              <div key={servicio.title} className="bg-stone-50 border border-stone-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-500/10 text-yellow-600 rounded-xl mb-6">{servicio.icon}</div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">{servicio.title}</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">{servicio.descripcion}</p>
                <div className="space-y-3">
                  {servicio.incluye.map((item) => (<div key={item} className="flex items-start gap-3"><IconCheck /><span className="text-stone-600 text-sm">{item}</span></div>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sección Cómo Trabajamos --- */}
      <section className="py-10 sm:py-10 bg-stone-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16"><h2 className="text-base font-semibold leading-7 text-emerald-700">Nuestro Proceso</h2><p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Cómo Trabajamos Contigo</p><p className="mt-6 text-lg leading-8 text-stone-600">Un flujo de trabajo simple y transparente diseñado para tu tranquilidad de principio a fin.</p></div>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {proceso.map((paso) => (<div key={paso.numero} className="text-center"><div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 text-stone-900 font-bold text-2xl mx-auto mb-6 shadow-md">{paso.numero}</div><h3 className="text-xl leading-7 font-semibold text-stone-900">{paso.titulo}</h3><p className="mt-3 text-base text-stone-600">{paso.descripcion}</p></div>))}
          </div>
        </div>
      </section>

      {/* --- CTA Final --- */}
      <section className="bg-stone-100 py-20 sm:py-24">
        <div className="max-w-screen-md mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">¿Listo para Proteger tu Inversión?</h2>
          <p className="text-lg text-stone-600 mb-8">Agenda una consulta gratuita con nuestros expertos legales y da el siguiente paso con total confianza.</p>
          <Link href="/pages/contacto" className="inline-block px-8 py-4 bg-yellow-500 text-stone-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 shadow-lg transform hover:scale-105">Agendar Consulta Legal</Link>
        </div>
      </section>
    </div>
  );
}