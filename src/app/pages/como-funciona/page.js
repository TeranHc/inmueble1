'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

// --- Iconos para la UI ---
const IconCheck = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>;

export default function ComoFuncionaPage() {
  const [activeFaq, setActiveFaq] = useState(1);
  const toggleFaq = (id) => setActiveFaq(activeFaq === id ? null : id);

  const pasos = [
    { numero: "01", titulo: "Selecciona tu Oportunidad", descripcion: "Explora nuestro catálogo. Cada propiedad incluye información detallada sobre precio, ubicación y estatus legal para que calcules tu potencial de ganancia.", detalles: ["Revisa precio de cesión vs valor comercial", "Verifica el estatus del proceso judicial", "Analiza la ubicación y características"], image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop" },
    { numero: "02", titulo: "Análisis Legal y Due Diligence", descripcion: "Nuestro equipo legal revisa exhaustivamente la documentación del inmueble y el estatus del proceso judicial para garantizar la viabilidad de tu inversión.", detalles: ["Verificación de documentos legales", "Revisión de sentencias y avalúos", "Análisis de gravámenes existentes", "Reporte ejecutivo de factibilidad"], image: "https://images.unsplash.com/photo-1556761175-577389e0a4da?q=80&w=2070&auto=format&fit=crop" },
    { numero: "03", titulo: "Adquisición de Derechos", descripcion: "Una vez aprobada la factibilidad, realizas el pago de contado por la cesión de derechos litigiosos. Este proceso se formaliza ante notario público.", detalles: ["Firma del contrato de cesión de derechos", "Pago completo de la cesión (contado)", "Protocolización ante notario", "Registro de la cesión"], image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" },
    { numero: "04", titulo: "Recuperación del Inmueble", descripcion: "Con nuestro apoyo legal, continúas el proceso judicial hasta obtener la adjudicación definitiva de la propiedad a tu nombre y la entrega física del inmueble.", detalles: ["Continuación del proceso judicial", "Gestión de sentencia y desalojo", "Inscripción en Registro Público", "Entrega física del inmueble"], image: "https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?q=80&w=1974&auto=format&fit=crop" }
  ];

  const conceptos = [
    { id: 1, pregunta: "¿Qué es la cesión de derechos litigiosos?", respuesta: "Es un acto jurídico donde una persona (cedente) transfiere a otra (cesionario) los derechos que tiene sobre un inmueble dentro de un juicio. El cesionario adquiere el derecho a continuar el juicio y, al concluir, adjudicarse la propiedad." },
    { id: 2, pregunta: "¿Por qué las propiedades cuestan menos?", respuesta: "El precio es menor porque no compras la propiedad directamente, sino los derechos de un proceso judicial. El descuento compensa el tiempo y los trámites necesarios para completar la recuperación del inmueble." },
    { id: 3, pregunta: "¿Qué significa 'Sentencia Ejecutoriada'?", respuesta: "Significa que el juez ya emitió una sentencia final que no puede ser apelada. Es el estatus más favorable porque el juicio está prácticamente concluido, solo faltando la posesión física." },
    { id: 4, pregunta: "¿Puedo usar crédito hipotecario?", respuesta: "No. Las cesiones de derechos deben pagarse de contado porque los bancos no otorgan créditos para propiedades con litigios pendientes. Se requiere liquidez para la transacción." },
  ];
  
  return (
    <div className="bg-white">
      <section className="bg-stone-100 py-14 sm:py-14 border-b border-stone-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase text-emerald-700">El Proceso, Simplificado</h2>
          <p className="mt-3 text-3xl sm:text-5xl font-bold text-stone-800 leading-tight">¿Cómo Funciona la Inversión?</p>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">Entender el proceso es clave para una inversión exitosa. Te explicamos cada paso de forma clara y sencilla.</p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {pasos.map((paso, index) => (
              <div key={paso.numero} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 text-stone-900 font-bold text-2xl shadow-md">{paso.numero}</div>
                    <h3 className="text-3xl font-bold text-stone-800">{paso.titulo}</h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed mb-6">{paso.descripcion}</p>
                  <ul className="space-y-3">
                    {paso.detalles.map((detalle) => (<li key={detalle} className="flex items-start gap-3"><IconCheck className="w-5 h-5 text-emerald-600 mt-1" /> <span className="text-stone-700">{detalle}</span></li>))}
                  </ul>
                </div>
                <div className={`rounded-2xl overflow-hidden shadow-xl ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                  <Image src={paso.image} alt={paso.titulo} className="w-full h-80 object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-14 bg-stone-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16"><h2 className="text-base font-semibold leading-7 text-emerald-700">Conceptos Clave</h2><p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Glosario para el Inversionista</p><p className="mt-6 text-lg leading-8 text-stone-600">Estos son los términos más importantes que debes conocer antes de invertir.</p></div>
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {conceptos.map((faq) => (<div key={faq.id} className="border-b border-stone-200 pb-4"><button onClick={() => toggleFaq(faq.id)} className="w-full flex justify-between items-center text-left text-stone-900 py-2"><span className="text-lg font-semibold">{faq.pregunta}</span><span className={`transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-45' : ''}`}><svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></span></button><div className={`grid transition-all duration-500 ease-in-out ${activeFaq === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><p className="pt-4 text-base text-stone-600">{faq.respuesta}</p></div></div></div>))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-14 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0"><svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">Requisitos Indispensables</h3>
                <div className="space-y-4 text-stone-700">
                  <div className="flex items-start gap-3"><IconCheck className="w-6 h-6 mt-0.5"/><div><strong>Pago de Contado:</strong> No se aceptan créditos hipotecarios. La adquisición de derechos requiere liquidez completa.</div></div>
                  <div className="flex items-start gap-3"><IconCheck className="w-6 h-6 mt-0.5"/><div><strong>Asesoría Legal:</strong> Es obligatorio contar con un abogado especializado para completar el proceso.</div></div>
                  <div className="flex items-start gap-3"><IconCheck className="w-6 h-6 mt-0.5"/><div><strong>Perfil de Inversionista:</strong> Ideal para personas con capital disponible que entienden y aceptan los tiempos del proceso legal a cambio de una alta rentabilidad.</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-200 py-20 sm:py-24">
        <div className="max-w-screen-md mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">¿Tienes más preguntas?</h2>
          <p className="text-lg text-stone-600 mb-8">Nuestro equipo está listo para asesorarte. Agenda una consulta gratuita y sin compromiso para resolver todas tus dudas.</p>
          <Link href="/pages/contacto" className="inline-block px-8 py-4 bg-yellow-500 text-stone-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 shadow-lg transform hover:scale-105">Agendar Consulta Gratuita</Link>
        </div>
      </section>
    </div>
  );
}