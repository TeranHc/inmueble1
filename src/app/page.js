'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";


// --- SE USA LA RUTA DE IMPORTACIÓN CORRECTA ---
import { allProperties } from './pages/tienda-gym/products';
// --- Iconos para las secciones ---
const IconChart = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;
const IconShield = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>;
const IconUsers = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
const IconMoney = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

export default function FinalHomePage() {

  const [openFaq, setOpenFaq] = useState(1);
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  // Se usan los datos importados de 'allProducts'
// Asegúrate que esta línea use allProperties
const featuredProperties = allProperties.slice(0, 3);
  const beneficios = [
    { icon: <IconChart />, title: 'Alta Rentabilidad', description: 'Oportunidades de inversión hasta 60% por debajo del valor de mercado.' },
    { icon: <IconShield />, title: 'Proceso Transparente', description: 'Cada propiedad cuenta con un expediente legal verificado para tu seguridad.' },
    { icon: <IconUsers />, title: 'Asesoría Especializada', description: 'Te acompañamos con expertos legales durante todo el proceso de adquisición.' },
    { icon: <IconMoney />, title: 'Inversión Inteligente', description: 'Adquiere activos inmobiliarios de contado, sin intermediarios bancarios.' },
  ];

  const steps = [
    { number: '01', title: 'Explora Oportunidades', description: 'Analiza nuestro catálogo de inmuebles con cesión de derechos litigiosos.' },
    { number: '02', title: 'Recibe Asesoría', description: 'Revisamos contigo el estatus del proceso y el potencial de la inversión.' },
    { number: '03', title: 'Adquiere los Derechos', description: 'Realizas el pago de contado y te conviertes en el cesionario.' },
    { number: '04', title: 'Adjudica y Gana', description: 'Nuestro equipo legal te apoya para finalizar el juicio y adjudicarte la propiedad.' },
  ];

  const successStories = [
    { id: 1, quote: "El retorno de inversión superó todas mis expectativas. El equipo me guió en cada paso, haciendo un proceso complejo mucho más sencillo.", author: "Carlos R.", stats: "Ahorro del 55% | Adjudicado en 11 meses", image:"https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, quote: "Tenía mis dudas sobre los remates, pero la transparencia y el profesionalismo de InvertiMax me dieron la confianza para invertir. ¡La mejor decisión financiera que he tomado!", author: "Sofía L.", stats: "Rentabilidad del 120% | Proceso Transparente", image:"https://randomuser.me/api/portraits/women/44.jpg" },
  ];
  
  const faqs = [
    { id: 1, question: "¿Cuáles son los riesgos de esta inversión?", answer: "El riesgo principal es el tiempo que puede tomar el proceso judicial. Sin embargo, solo ofrecemos propiedades con expedientes previamente analizados para minimizar la incertidumbre. Nuestro equipo legal te explicará el estatus y los tiempos estimados de cada oportunidad." },
    { id: 2, question: "¿Por qué no se aceptan créditos hipotecarios?", answer: "La naturaleza de la transacción es una 'cesión de derechos litigiosos', no una compra-venta tradicional. Esto requiere liquidez inmediata (pago de contado) para asegurar los derechos de la propiedad ante el juzgado, lo cual no es compatible con los tiempos y procesos de un crédito bancario." },
    { id: 3, question: "¿Puedo ver la propiedad por dentro antes de invertir?", answer: "Generalmente no es posible, ya que la propiedad aún puede estar habitada. La inversión se basa en el análisis del expediente legal, el avalúo comercial y la información externa del inmueble. Este factor es clave para obtener el alto descuento en el precio." },
    { id: 4, question: "Además del precio de cesión, ¿qué otros gastos hay?", answer: "Debes considerar los honorarios de tu abogado para finalizar el juicio, así como gastos notariales, impuestos (ISR, ISAI) y derechos de registro una vez que te adjudiques la propiedad. Te proporcionamos un estimado de estos costos para que tengas total claridad." },
  ];

  return (
    <main>
      <section className="relative h-[85vh] min-h-[650px] flex items-center text-white overflow-hidden">
<Image
  src="/casas/1.png"
  alt="Casa moderna de lujo"
  fill
  className="object-cover"
/>        <div className="absolute inset-0 bg-stone-900/60 backdrop-brightness-75"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">La Forma Inteligente de Invertir en Bienes Raíces</h1>
          <p className="text-lg sm:text-xl text-stone-200 mb-10 max-w-3xl mx-auto drop-shadow-md">Accede a propiedades de alto valor con descuentos de hasta el 60% a través de nuestro modelo de inversión legal y transparente.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pages/tienda-gym" className="px-8 py-4 bg-yellow-500 text-stone-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-xl transform hover:scale-105">Ver Oportunidades</Link>
            <Link href="/pages/contacto" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-stone-900 transition-all duration-300 shadow-xl transform hover:scale-105">Agenda una Consulta</Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-emerald-700 font-semibold tracking-wide uppercase">Inversiones Destacadas</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900">Oportunidades con Potencial Excepcional</p>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto">Una selección de nuestras mejores propiedades con alto potencial de rentabilidad.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <div key={prop.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
{/* --- CÓDIGO CORREGIDO --- */}
<div className="relative h-64 w-full"> {/* <-- 1. El tamaño (h-64) se pone en el div contenedor */}
  <Image 
    src={prop.image} 
    alt={prop.alt} 
    fill // <-- 2. Se añade la propiedad 'fill'
    style={{ objectFit: 'cover' }} // <-- 3. Se reemplaza la clase 'object-cover' por esto
  />
  <div className="absolute top-4 right-4 bg-emerald-700 text-white px-3 py-1 text-xs font-bold rounded-full">Ahorro {prop.ahorro}</div>
</div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-600">{prop.primaryCategory}</span>
                    <span className="text-xs text-stone-500">{prop.ubicacion}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-4 h-16">{prop.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <div className="text-sm text-stone-500">Precio Cesión</div>
                      <div className="text-2xl font-bold text-emerald-800">${prop.precioCesion}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-stone-500">Valor Comercial</div>
                      <div className="text-lg font-semibold text-stone-500 line-through">${prop.valorComercial}</div>
                    </div>
                  </div>
                  <Link href={`/pages/tienda-gym/productos/${prop.id}`} className="block w-full text-center px-4 py-3 bg-stone-800 text-white font-semibold rounded-lg hover:bg-stone-700 transition-colors duration-300">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-stone-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-700">EL PROCESO</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Tu Inversión en 4 Pasos Sencillos</p>
            <p className="mt-6 text-lg leading-8 text-stone-600">Hemos simplificado la inversión en derechos inmobiliarios para que sea segura, transparente y rentable.</p>
          </div>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 text-stone-900 font-bold text-2xl mx-auto mb-6 shadow-md">
                  {step.number}
                </div>
                <h3 className="text-xl leading-7 font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-3 text-base text-stone-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-700">NUESTRAS VENTAJAS</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Por Qué Somos Tu Mejor Opción</p>
            <p className="mt-6 text-lg leading-8 text-stone-600">Maximizamos tu seguridad y rentabilidad en cada paso del proceso de inversión.</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {beneficios.map((item) => (
                <div key={item.title} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-stone-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700">
                      <div className="h-6 w-6 text-white">{item.icon}</div>
                    </div>
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-stone-600">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-stone-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-700">RESULTADOS REALES</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Inversiones que Transforman</p>
            <p className="mt-6 text-lg leading-8 text-stone-600">Nuestros clientes son la mejor prueba de que nuestro modelo funciona. Descubre sus historias.</p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {successStories.map((story) => (
              <div key={story.id} className="flex flex-col rounded-2xl bg-white shadow-lg border border-neutral-200">
                <div className="flex-1 relative p-8">
                    <div className="flex items-center gap-x-4 mb-4">
                      {/* 1. Contenedor con tamaño, forma y posición relativa */}
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image 
                          src={story.image} 
                          alt={`Foto de ${story.author}`}
                          fill // 2. Propiedad 'fill' para que llene el contenedor
                          style={{ objectFit: 'cover' }} // 3. Estilo para que la imagen cubra
                        />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-stone-900">{story.author}</div>
                        <div className="text-stone-600 text-sm">{story.stats}</div>
                      </div>
                    </div>
                  <blockquote className="text-stone-700">
                    <p>“{story.quote}”</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-700">RESOLVIENDO TUS DUDAS</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Preguntas Frecuentes</p>
            <p className="mt-6 text-lg leading-8 text-stone-600">Creemos en la transparencia total. Aquí respondemos las preguntas más importantes que podrías tener.</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-neutral-200 pb-4">
                  <button onClick={() => toggleFaq(faq.id)} className="w-full flex justify-between items-center text-left text-stone-900 py-2">
                    <span className="text-lg font-semibold">{faq.question}</span>
                    <span className={`transition-transform duration-300 ${openFaq === faq.id ? 'rotate-45' : ''}`}>
                      <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ease-in-out ${openFaq === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="pt-4 text-base text-stone-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-stone-200 py-20 sm:py-24">
        <div className="max-w-screen-md mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">¿Listo para Realizar una Inversión Inteligente?</h2>
          <p className="text-lg text-stone-600 mb-8">
            Nuestro equipo está listo para asesorarte. Agenda una consulta gratuita y sin compromiso para resolver todas tus dudas.
          </p>
          <Link href="/pages/contacto" className="inline-block px-8 py-4 bg-yellow-500 text-stone-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 shadow-lg transform hover:scale-105">
            Agendar Consulta Gratuita
          </Link>
        </div>
      </section>
    </main>
  );
}