"use client";
import { useState, useMemo } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    interes: "",
    plazo: "",
    instalacion: "",
    valor: "",
    origen: "",
    correo: "",
    descripcion: "",
    empresa: "",
    inversion: "",
    fecha: "",
    recepcion: "",
    telefono: "",
  });

  const [errores, setErrores] = useState({}); // ✅ Nuevo estado para errores
  // ---------------- VALIDACIONES ----------------
  const validarCampo = (campo, valor) => {
    let error = "";

    if (!valor || valor.trim() === "") {
      error = "Este campo es obligatorio";
    } else {
      switch (campo) {
        case "correo":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            error = "Correo inválido (ej: ejemplo@mail.com)";
          }
          break;

        case "telefono":
          const tel = valor.replace(/\D/g, "");
          if (tel.length < 10) {
            error = "El teléfono debe tener al menos 10 dígitos";
          }
          break;

        case "descripcion":
          if (valor.length < 15) {
            error = "La descripción debe tener al menos 15 caracteres";
          }
          break;

        case "empresa":
          if (valor.length < 3) {
            error = "El nombre de la empresa es demasiado corto";
          }
          break;

        case "fecha":
        case "recepcion":
          if (!/^[A-Za-z]+\s\d{4}$/.test(valor)) {
            error = "Formato inválido (ej: Octubre 2025)";
          }
          break;
      }
    }
    return error;
  };
  
  const [mostrarFase2, setMostrarFase2] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la carga

  const weightsF1 = {
    interes: {renovar: 1, abrir: 2, personal: 0},
    plazo: {inmediato: 3, mediano: 1, explorando: -1},
    instalacion: {comercial: 3, personal: 1, casa: 0},
    valor: {durabilidad: 2, diseno: 1, precio: -1},
    origen: {recomendacion: 1, instagram: 0, facebook: 0, google: 0, otro: 0}
  };

  const scoreF1 = useMemo(() => {
    let s = 0;
    s += weightsF1.interes[formData.interes] || 0;
    s += weightsF1.plazo[formData.plazo] || 0;
    s += weightsF1.instalacion[formData.instalacion] || 0;
    s += weightsF1.valor[formData.valor] || 0;
    s += weightsF1.origen[formData.origen] || 0;
    return s;
  }, [formData]);

  
  const camposFase1 = ['interes', 'plazo', 'instalacion', 'valor', 'origen', 'correo'];
  const camposFase2 = ['descripcion', 'empresa', 'inversion', 'fecha', 'recepcion', 'telefono'];

  const progreso1 = useMemo(() => {
    const completados = camposFase1.filter(campo => formData[campo] && formData[campo] !== '').length;
    return Math.round((completados / camposFase1.length) * 100);
  }, [formData, camposFase1]);

  const progreso2 = useMemo(() => {
    const completados = camposFase2.filter(campo => formData[campo] && formData[campo] !== '').length;
    return Math.round((completados / camposFase2.length) * 100);
  }, [formData, camposFase2]);

  const puedeAvanzar = camposFase1.every(campo => formData[campo] && formData[campo] !== '');
  const puedeEnviar = camposFase2.every(campo => formData[campo] && formData[campo] !== '');

  const handleInputChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));

    // ✅ Validar en tiempo real
    const error = validarCampo(campo, valor);
    setErrores((prev) => ({ ...prev, [campo]: error }));
  };
  const limpiarFormulario = () => {
    setFormData({
      interes: '', plazo: '', instalacion: '', valor: '', origen: '', correo: '',
      descripcion: '', empresa: '', inversion: '', fecha: '', recepcion: '', telefono: ''
    });
    setMostrarFase2(false);
    setMensaje(null);
    setResultado(null);
  };
  
  const limpiarFase2 = () => {
    setFormData(prev => ({
      ...prev,
      descripcion: '', 
      empresa: '', 
      inversion: '', 
      fecha: '', 
      recepcion: '', 
      telefono: ''
    }));
  };

  const avanzarFase2 = () => {
    if (!puedeAvanzar) {
      setMensaje({tipo: 'error', texto: 'Completa todos los campos para continuar.'});
      return;
    }

    const threshold = 3;
    if (scoreF1 >= threshold) {
      setMostrarFase2(true);
      setMensaje({tipo: 'success', texto: 'Perfecto. Continuemos con los detalles para tu cotización personalizada.'});
    } else {
      setMensaje({
        tipo: 'warning', 
        texto: 'Gracias por tu interés. Te recomendamos explorar nuestro catálogo. Si tu proyecto avanza, vuelve a completar el formulario.'
      });
    }
  };
  
  const volverAFase1 = () => {
    setMostrarFase2(false);
    setMensaje(null);
  };

  const detectarContradicciones = () => {
    const contradictions = [];
    const fecha = formData.fecha.toLowerCase();
    const recepcion = formData.recepcion.toLowerCase();
    
    if (formData.plazo === 'inmediato' && (fecha.includes('2026') || fecha.includes('diciembre'))) {
      contradictions.push('Plazo inmediato pero fecha lejana');
    }
    if (formData.plazo === 'explorando' && (fecha.includes('oct') || fecha.includes('nov') || fecha.includes('2025'))) {
      contradictions.push('Solo explorando pero fecha cercana');
    }
    
    return contradictions;
  };

  const calcularTiering = () => {
    let score = scoreF1;
    const desc = formData.descripcion.trim();
    const contradictions = detectarContradicciones();
    
    if (desc.length > 60) score += 2;
    else if (desc.length > 20) score += 1;
    else score -= 1;
    
    if (formData.inversion === 'nd') score -= 1;
    else if (formData.inversion === '200-500') score += 1;
    else if (formData.inversion === '500-1000') score += 2;
    else if (formData.inversion === '>1000') score += 3;
    
    const tel = formData.telefono.replace(/\D/g, '');
    if (tel.length >= 10) score += 1;
    else score -= 1;
    
    score -= contradictions.length * 2;
    
    let tier = 'C';
    let mensaje = 'Gracias por tu interés. Puedes explorar nuestro catálogo completo y contactarnos cuando tu proyecto avance.';
    
    if (score >= 8 && contradictions.length === 0) {
      tier = 'A';
      mensaje = 'Proyecto prioritario. Un asesor te contactará para cotización personalizada.';
    } else if (score >= 4) {
      tier = 'B';
      mensaje = 'Proyecto con potencial. Podemos avanzar con una llamada exploratoria.';
    }
    
    return { tier, mensaje, score, contradictions: contradictions.length };
  };

  const enviarSolicitud = async () => {
    if (!puedeEnviar) {
      setMensaje({ tipo: 'error', texto: 'Completa todos los campos requeridos para enviar.' });
      return;
    }
    
    setIsLoading(true);
    setMensaje(null);
    const resultadoEvaluacion = calcularTiering();
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, resultadoEvaluacion }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Algo salió mal al enviar el correo.');
      }
      
      setResultado(resultadoEvaluacion);

    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const nuevaSolicitud = () => {
    limpiarFormulario();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="h-px bg-red-600 w-8 sm:w-12 lg:w-16"></div>
          <span className="mx-2 sm:mx-3 lg:mx-4 text-gray-700 text-sm sm:text-base lg:text-lg font-medium">Conecta con nosotros</span>
          <div className="h-px bg-red-600 w-8 sm:w-12 lg:w-16"></div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-5 lg:mb-6 tracking-wide px-2">
          CONÉCTATE CON REALLEADER
        </h1>
        
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl lg:max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-4">
          Visita nuestro showroom, conoce nuestros expertos y descubre cómo podemos 
          transformar tu espacio fitness
        </p>
      </div>

      <div id="formulario" className="max-w-7xl mx-auto mb-10 sm:mb-12 lg:mb-16">
        <div className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Solicitud de Cotización Personalizada
            </h2>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-2">
              Completa este formulario para recibir una propuesta ajustada a tus necesidades
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {!resultado ? (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Información General</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">Datos básicos para entender tu proyecto (Tiempo estimado: 1 minuto)</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div className="bg-red-500 h-2 rounded-full transition-all duration-300 ease-out" style={{width: `${progreso1}%`}}></div>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">¿Cuál es tu principal interés?</label>
                        <select 
                          disabled={mostrarFase2}
                          value={formData.interes} 
                          onChange={(e) => handleInputChange('interes', e.target.value)}
                          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="renovar">Renovar equipo existente</option>
                          <option value="abrir">Abrir nuevo gimnasio</option>
                          <option value="personal">Uso personal/hogar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Plazo para tu compra</label>
                        <select 
                          disabled={mostrarFase2}
                          value={formData.plazo} 
                          onChange={(e) => handleInputChange('plazo', e.target.value)}
                          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="inmediato">Inmediato (1-2 meses)</option>
                          <option value="mediano">Mediano plazo (3-6 meses)</option>
                          <option value="explorando">Solo explorando opciones</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">¿Dónde instalarías el equipo?</label>
                        <select 
                          disabled={mostrarFase2}
                          value={formData.instalacion} 
                          onChange={(e) => handleInputChange('instalacion', e.target.value)}
                          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="casa">Casa/departamento</option>
                          <option value="personal">Gimnasio personal</option>
                          <option value="comercial">Gimnasio comercial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">¿Qué valoras más?</label>
                        <select 
                          disabled={mostrarFase2}
                          value={formData.valor} 
                          onChange={(e) => handleInputChange('valor', e.target.value)}
                          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="durabilidad">Durabilidad y calidad</option>
                          <option value="precio">Mejor precio</option>
                          <option value="diseno">Diseño y personalización</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">¿Cómo supiste de nosotros?</label>
                        <select 
                          disabled={mostrarFase2}
                          value={formData.origen} 
                          onChange={(e) => handleInputChange('origen', e.target.value)}
                          className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="instagram">Instagram</option>
                          <option value="recomendacion">Recomendación</option>
                          <option value="facebook">Facebook</option>
                          <option value="google">Google</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
                        <input
                          disabled={mostrarFase2}
                          type="email"
                          value={formData.correo}
                          onChange={(e) => handleInputChange("correo", e.target.value)}
                          placeholder="tu@email.com"
                          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                        />
                        {errores.correo && <p className="text-red-500 text-sm mt-1">{errores.correo}</p>}
                      </div>
                    </div>

                    {!mostrarFase2 && (
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                        <button 
                          onClick={avanzarFase2}
                          disabled={!puedeAvanzar}
                          className={`flex-1 py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 ${
                            puedeAvanzar 
                              ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Continuar → Detalles del Proyecto
                        </button>
                        <button 
                          onClick={limpiarFormulario}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 active:scale-95"
                        >
                          Limpiar
                        </button>
                      </div>
                    )}

                    {mensaje && !mostrarFase2 && (
                      <div className={`p-4 rounded-lg border-l-4 mt-4 ${
                        mensaje.tipo === 'success' ? 'bg-green-50 border-green-500 text-green-700' :
                        mensaje.tipo === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' :
                        'bg-red-50 border-red-500 text-red-700'
                      }`}>
                        {mensaje.texto}
                        {mensaje.tipo === 'warning' && (
                          <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button 
                              onClick={limpiarFormulario}
                              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 active:scale-95"
                            >
                              Nueva Solicitud
                            </button>
                            <button 
                              onClick={() => window.location.href = '/pages/tienda-gym'}
                              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 active:scale-95"
                            >
                              Ver Catálogo
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>

                {mostrarFase2 && (
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    {/* --- INICIO DEL CAMBIO --- */}
                    {/* Este bloque ahora muestra CUALQUIER tipo de mensaje en la Fase 2 */}
                    {mensaje && (
                      <div className={`p-4 rounded-lg border-l-4 mb-6 ${
                        mensaje.tipo === 'success' ? 'bg-green-50 border-green-500 text-green-700' :
                        'bg-red-50 border-red-500 text-red-700'
                      }`}>
                        {mensaje.texto}
                      </div>
                    )}
                    {/* --- FIN DEL CAMBIO --- */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Detalles del Proyecto</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">Información específica para una cotización personalizada</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div className="bg-red-500 h-2 rounded-full transition-all duration-300 ease-out" style={{width: `${progreso2}%`}}></div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="lg:col-span-2">
                          <label className="block text-sm text-black font-semibold text-gray-700 mb-2">Describe tu proyecto</label>
                          <textarea 
                            value={formData.descripcion} 
                            onChange={(e) => handleInputChange('descripcion', e.target.value)}
                            placeholder="Ej: Gimnasio de 200 m² en Monterrey; necesito 12 máquinas de fuerza y 6 de cardio; área libre de 60 m²"
                            rows={4}
                            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de tu empresa/gimnasio</label>
                          <input 
                            type="text" 
                            value={formData.empresa} 
                            onChange={(e) => handleInputChange('empresa', e.target.value)}
                            placeholder="Ej: Titan Gym Monterrey"
                            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Rango de inversión aproximado</label>
                          <select 
                            value={formData.inversion} 
                            onChange={(e) => handleInputChange('inversion', e.target.value)}
                            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="">Selecciona un rango</option>
                            <option value="200-500">$200,000 - $500,000 MXN</option>
                            <option value="500-1000">$500,000 - $1,000,000 MXN</option>
                            <option value=">1000">Más de $1,000,000 MXN</option>
                            <option value="nd">Aún no definido</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha para iniciar el proyecto</label>
                          <input 
                            type="text" 
                            value={formData.fecha} 
                            onChange={(e) => handleInputChange('fecha', e.target.value)}
                            placeholder="Ej: Octubre 2025"
                            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">¿Cuándo necesitas el equipo?</label>
                          <input 
                            type="text" 
                            value={formData.recepcion} 
                            onChange={(e) => handleInputChange('recepcion', e.target.value)}
                            placeholder="Ej: Noviembre 2025"
                            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
                          <input
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => handleInputChange("telefono", e.target.value)}
                            placeholder="+52 55 0000 0000"
                            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          {errores.telefono && <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button 
                          onClick={enviarSolicitud}
                          disabled={!puedeEnviar || isLoading}
                          className={`flex-1 py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 ${
                            puedeEnviar && !isLoading
                              ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
                        </button>
                        <button 
                          onClick={limpiarFase2}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 active:scale-95"
                        >
                          Limpiar Fase 2
                        </button>
                        <button 
                          onClick={volverAFase1}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 active:scale-95"
                        >
                          Volver a la Fase 1
                        </button>
                      </div>

                      <p className="text-sm text-gray-500 text-center">
                        Al enviar, aceptas que revisemos la información para priorizar la atención según tu proyecto.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Resultado de Evaluación</h3>
                <div className={`p-6 rounded-lg border-l-4 ${
                  resultado.tier === 'A' ? 'bg-green-50 border-green-500' :
                  resultado.tier === 'B' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <p className={`text-lg font-semibold ${
                    resultado.tier === 'A' ? 'text-green-700' :
                    resultado.tier === 'B' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    {resultado.mensaje} (Categoría {resultado.tier})
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    {resultado.contradictions > 0 && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                  <button 
                    onClick={nuevaSolicitud}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 active:scale-95"
                  >
                    Nueva Solicitud
                  </button>
                  {resultado.tier === 'C' && (
                    <button 
                      onClick={() => window.location.href = '/pages/tienda-gym'}
                      className="flex-1 bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 active:scale-95"
                    >
                      Ver Catálogo
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Why Visit Section */}
      <div className="max-w-6xl mx-auto mb-10 sm:mb-12 lg:mb-16">
        <div className="bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              ¿Por qué visitarnos?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Más de 10 años de experiencia nos avalan. Descubre por qué somos la mejor 
              opción para tu proyecto fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[
              {
                icon: "👁️",
                title: "Experiencia Real",
                desc: "Prueba personalmente cada máquina, siente la calidad de los materiales y comprueba la suavidad de los movimientos antes de decidir."
              },
              {
                icon: "🎓", 
                title: "Asesoría Especializada",
                desc: "Nuestros expertos te guiarán en la selección perfecta según tu espacio, presupuesto y objetivos específicos."
              },
              {
                icon: "🛠️",
                title: "Servicio Integral",
                desc: "Desde la entrega hasta la instalación y mantenimiento. Un solo contacto para todo tu proyecto fitness."
              }
            ].map((benefit, idx) => (
              <div 
                key={idx}
                className="text-center p-6 sm:p-7 lg:p-8 rounded-xl lg:rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 text-white text-2xl sm:text-3xl">
                  {benefit.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-800 px-4">Síguenos en nuestras redes</h3>
        
        <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
          {/* Facebook */}
          <button 
            onClick={() => window.open('https://www.facebook.com/Realleadermx', '_blank')}
            className="bg-blue-600 text-white p-3 sm:p-4 rounded-full hover:bg-blue-700 transform hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
            title="Síguenos en Facebook"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          {/* Instagram */}
          <button 
            onClick={() => window.open('https://www.instagram.com/realleader_mexico/', '_blank')} 
            className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 sm:p-4 rounded-full hover:from-purple-700 hover:to-pink-600 transform hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl" 
            title="Síguenos en Instagram"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>

          {/* TikTok */}
          <button 
            onClick={() => window.open('https://www.tiktok.com/@realleader.mexico?_t=ZS-8zprbDCSPi4&_r=1', '_blank')}
            className="bg-black text-white p-3 sm:p-4 rounded-full hover:bg-gray-800 transform hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
            title="Síguenos en TikTok"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </button>
        </div>

        <p className="text-gray-600 text-sm sm:text-base px-4">
          Mantente al día con nuestras últimas ofertas y novedades del mundo fitness.
        </p>
      </div>



    </section>
  );
}