'use client';
import React from 'react';
import Link from "next/link";

// --- Iconos SVG ---
const IconHouse = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const IconMail = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
const IconPhone = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>;
const IconLocation = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const IconFacebook = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>;
const IconLinkedIn = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>;

export default function GoldStoneFooter() {
  const navigationLinks = [ { href: '/', label: 'Inicio' }, { href: '/pages/tienda-gym', label: 'Oportunidades' }, { href: '/pages/como-funciona', label: '¿Cómo Funciona?' }, { href: '/pages/servicios-legales', label: 'Servicios Legales' }, { href: '/pages/faq', label: 'Preguntas Frecuentes' }, { href: '/pages/contacto', label: 'Contacto' }];
  const resourceLinks = [ { href: '/pages/guia-inversionista', label: 'Guía del Inversionista' }, { href: '/pages/glosario', label: 'Glosario Legal' }, { href: '/pages/calculadora', label: 'Calculadora ROI' }, { href: '/pages/testimonios', label: 'Casos de Éxito' }];

  return (
    <footer className="bg-stone-800 border-t border-stone-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-stone-700 rounded-lg flex items-center justify-center">
                  <IconHouse className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="text-xl font-bold text-white">InvertiMax</span>
            </Link>
            <p className="text-stone-400 text-sm mb-6">Conectamos inversionistas con oportunidades inmobiliarias de alta rentabilidad a través de procesos legales transparentes.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-yellow-500 transition-colors"><IconFacebook /></a>
              <a href="#" className="text-stone-400 hover:text-yellow-500 transition-colors"><IconLinkedIn /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navegación</h3>
            <ul className="space-y-3">
              {navigationLinks.map(link => (
                <li key={link.label}><Link href={link.href} className="text-sm text-stone-400 hover:text-yellow-500 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Recursos</h3>
            <ul className="space-y-3">
              {resourceLinks.map(link => (
                <li key={link.label}><Link href={link.href} className="text-sm text-stone-400 hover:text-yellow-500 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3"><IconMail className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" /><a href="mailto:info@invertimax.com" className="text-stone-400 hover:text-yellow-500 transition-colors">info@invertimax.com</a></li>
              <li className="flex items-start gap-3"><IconPhone className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" /><span className="text-stone-400">+52 (55) 1234-5678</span></li>
              <li className="flex items-start gap-3"><IconLocation className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" /><span className="text-stone-400">Ciudad de México, México</span></li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="bg-stone-900 border-t border-stone-700">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="text-center sm:flex sm:justify-between sm:items-center">
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} <span className="font-semibold text-yellow-500">InvertiMax</span>. Todos los derechos reservados.
            </p>
            <div className="flex justify-center space-x-6 mt-4 sm:mt-0 text-sm text-stone-500">
              <Link href="/pages/aviso-privacidad" className="hover:text-yellow-500 transition-colors">Aviso de Privacidad</Link>
              <Link href="/pages/terminos" className="hover:text-yellow-500 transition-colors">Términos y Condiciones</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}