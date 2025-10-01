
import React from 'react';
import { Truck, Package, RefreshCw, Clock, Shield, Phone, Mail, MapPin } from 'lucide-react';

const ShippingReturnsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Envío y Devoluciones</h1>
          <p className="text-xl text-center opacity-90">
            Información sobre nuestras políticas de envío y devoluciones
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Navegación interna */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#shipping" className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Política de Envío</span>
            </div>
          </a>
          <a href="#returns" className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-green-600" />
              <span className="font-medium">Cambios y Devoluciones</span>
            </div>
          </a>
        </div>

        {/* Política de Envío */}
        <section id="shipping" className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Política de Envío</h2>
            </div>

          </div>
        </section>

        {/* Política de Cambios y Devoluciones */}
        <section id="returns" className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Política de Cambios y Devoluciones</h2>
            </div>

          </div>
        </section>

        {/* Contacto */}
        <section className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">¿Necesitas ayuda?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p>+593 4 123-4567</p>
              <p className="text-sm opacity-90">Lun-Vie: 8:00 AM - 6:00 PM</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p>info@saludpet.com</p>
              <p className="text-sm opacity-90">Respuesta en 24 horas</p>
            </div>
            
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Dirección</h3>
              <p>Calle Principal 123</p>
              <p className="text-sm opacity-90">Guayaquil, Ecuador</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;