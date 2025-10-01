'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- Iconos para la UI ---
const IconMail = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
const IconPhone = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>;
const IconLocation = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const IconClock = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const IconBuilding = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;
const IconVideo = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>;
const IconCheck = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;


export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', tipoInversion: '', presupuesto: '', mensaje: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ nombre: '', email: '', telefono: '', tipoInversion: '', presupuesto: '', mensaje: '' });
      setTimeout(() => { setFormStatus('idle'); }, 5000);
    }, 1500);
  };

  const contactInfo = [
    { icon: <IconMail className="w-8 h-8"/>, titulo: "Email", info: "info@invertimax.com", link: "mailto:info@invertimax.com" },
    { icon: <IconPhone className="w-8 h-8"/>, titulo: "Teléfono", info: "+52 (55) 1234-5678", link: "tel:+525512345678" },
    { icon: <IconLocation className="w-8 h-8"/>, titulo: "Oficina", info: "Ciudad de México, México", link: null },
    { icon: <IconClock className="w-8 h-8"/>, titulo: "Horario", info: "Lun - Vie: 9:00 - 18:00 hrs", link: null }
  ];

  const faqs = [
    { pregunta: "¿Cuánto tiempo tardan en responder?", respuesta: "Respondemos todas las consultas en un máximo de 24 horas hábiles." },
    { pregunta: "¿La consulta inicial tiene costo?", respuesta: "No, la primera consulta es completamente gratuita y sin compromiso." },
    { pregunta: "¿Puedo agendar una cita presencial?", respuesta: "Sí, ofrecemos citas presenciales en nuestras oficinas o videoconferencia según tu preferencia." }
  ];

  return (
    <div className="bg-white">
      <section className="bg-stone-200 border-b border-stone-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 sm:py-20">
            <div className="max-w-xl">
              <h2 className="text-base font-semibold tracking-wide uppercase text-emerald-700">Ponte en Contacto</h2>
              <p className="mt-3 text-3xl sm:text-5xl font-bold text-stone-800 leading-tight">Estamos Aquí para Ayudarte a Invertir</p>
              <p className="mt-4 text-lg text-stone-600 leading-relaxed">¿Tienes dudas o estás listo para tu próxima gran inversión? Nuestro equipo está a tu disposición.</p>
            </div>
              <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image 
                      src="/casas/7.jpg" 
                      alt="Equipo de trabajo en oficina moderna" 
                      className="w-full h-full object-cover"
                  />
              </div>          
            </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-stone-200 shadow-lg">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Envíanos un Mensaje</h2>
              {formStatus === 'success' && (<div className="mb-6 bg-green-50 border border-green-300 text-green-800 rounded-lg p-4"><p><strong>¡Mensaje enviado con éxito!</strong> Nos pondremos en contacto contigo pronto.</p></div>)}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label htmlFor="nombre" className="block text-sm font-medium text-stone-700 mb-1">Nombre Completo *</label><input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition" placeholder="Juan Pérez"/></div>
                  <div><label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition" placeholder="correo@ejemplo.com"/></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label htmlFor="telefono" className="block text-sm font-medium text-stone-700 mb-1">Teléfono *</label><input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition" placeholder="55 1234 5678"/></div>
                  <div><label htmlFor="tipoInversion" className="block text-sm font-medium text-stone-700 mb-1">Tipo de Inversión *</label><select id="tipoInversion" name="tipoInversion" value={formData.tipoInversion} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"><option value="">Selecciona una opción</option><option value="casas">Casas</option><option value="departamentos">Departamentos</option><option value="terrenos">Terrenos</option><option value="comercial">Comercial</option><option value="multiple">Múltiples propiedades</option></select></div>
                </div>
                <div><label htmlFor="presupuesto" className="block text-sm font-medium text-stone-700 mb-1">Presupuesto de Inversión *</label><select id="presupuesto" name="presupuesto" value={formData.presupuesto} onChange={handleChange} required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"><option value="">Selecciona un rango</option><option value="500k-1m">$500,000 - $1,000,000</option><option value="1m-3m">$1,000,000 - $3,000,000</option><option value="3m-5m">$3,000,000 - $5,000,000</option><option value="5m+">Más de $5,000,000</option></select></div>
                <div><label htmlFor="mensaje" className="block text-sm font-medium text-stone-700 mb-1">Mensaje *</label><textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} required rows="5" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition resize-none" placeholder="Cuéntanos más sobre tu interés o dudas..."></textarea></div>
                <div className="bg-stone-100 border border-stone-200 rounded-lg p-4"><div className="flex items-start gap-3"><svg className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p className="text-stone-600 text-sm">Al enviar este formulario, aceptas que nos comuniquemos contigo para brindarte información sobre nuestras oportunidades de inversión.</p></div></div>
                <button type="submit" disabled={formStatus === 'loading'} className={`w-full px-8 py-3 bg-stone-800 text-white font-semibold rounded-lg hover:bg-stone-700 transition-colors duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}>{formStatus === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}</button>
              </form>
            </div>
            <div className="space-y-8">
              {contactInfo.map((item) => (<div key={item.titulo} className="flex items-start gap-4"><div className="flex-shrink-0 w-14 h-14 bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center text-yellow-600">{item.icon}</div><div className="flex-1"><h3 className="font-semibold text-stone-800 text-lg">{item.titulo}</h3>{item.link ? (<a href={item.link} className="text-stone-600 hover:text-yellow-600 transition-colors">{item.info}</a>) : (<p className="text-stone-600">{item.info}</p>)}</div></div>))}
              <div className="bg-stone-100 border border-stone-200 rounded-xl p-6"><h3 className="font-semibold text-stone-800 mb-4">Preguntas Rápidas</h3><div className="space-y-3">{faqs.map((faq, index) => (<details key={index} className="group"><summary className="cursor-pointer text-sm font-medium text-stone-700 hover:text-stone-900 list-none flex items-center justify-between"><span>{faq.pregunta}</span><svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></summary><p className="mt-2 text-sm text-stone-500 pl-2">{faq.respuesta}</p></details>))}</div><Link href="/pages/faq" className="mt-4 inline-flex items-center gap-2 text-yellow-600 text-sm font-semibold hover:text-yellow-700 transition-colors">Ver todas las preguntas &rarr;</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN RESTAURADA: Reunión Presencial --- */}
      <section className="py-20 sm:py-24 bg-stone-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">¿Prefieres una Reunión Presencial?</h2>
            <p className="text-lg text-stone-600">Visita nuestras oficinas o agenda una videollamada.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-lg">
              <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3"><IconBuilding className="w-7 h-7 text-yellow-600" />Oficina Principal</h3>
              <div className="space-y-4 text-sm"><div className="flex items-start gap-3"><IconLocation className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-1" /><div><p className="font-semibold text-stone-700">Dirección</p><p className="text-stone-500">Av. Reforma 123, Piso 8, Col. Juárez, CDMX</p></div></div><div className="flex items-start gap-3"><IconClock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-1" /><div><p className="font-semibold text-stone-700">Horario</p><p className="text-stone-500">Lunes a Viernes: 9:00 - 18:00 hrs</p></div></div></div>
            </div>
            <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-lg">
              <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3"><IconVideo className="w-7 h-7 text-yellow-600" />Reuniones Virtuales</h3>
              <p className="text-stone-600 text-sm mb-4">Ofrecemos reuniones por videollamada con la misma calidad de atención.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-stone-600"><IconCheck className="w-5 h-5 text-emerald-600" />Consultas desde cualquier lugar</li>
                <li className="flex items-center gap-2 text-stone-600"><IconCheck className="w-5 h-5 text-emerald-600" />Horarios flexibles</li>
                <li className="flex items-center gap-2 text-stone-600"><IconCheck className="w-5 h-5 text-emerald-600" />Plataformas: Zoom, Meet, Teams</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN RESTAURADA: CTA Final --- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-800 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Tienes una Pregunta Específica?</h2>
            <p className="text-lg text-stone-300 mb-8">Nuestro equipo de expertos está listo para ayudarte a tomar la mejor decisión de inversión.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pages/faq" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all">Ver Preguntas Frecuentes</Link>
              <Link href="/pages/tienda-gym" className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-stone-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all">Explorar Oportunidades &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}