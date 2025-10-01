import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  // En el App Router, los datos se obtienen con req.json()
  const { formData, resultadoEvaluacion } = await req.json();

  // Objeto para mapear los valores internos a texto legible
  const valueMap = {
    interes: {
      renovar: 'Renovar equipo existente',
      abrir: 'Abrir nuevo gimnasio',
      personal: 'Uso personal/hogar'
    },
    plazo: {
      inmediato: 'Inmediato (1-2 meses)',
      mediano: 'Mediano plazo (3-6 meses)',
      explorando: 'Solo explorando opciones'
    },
    instalacion: {
      casa: 'Casa/departamento',
      personal: 'Gimnasio personal',
      comercial: 'Gimnasio comercial'
    },
    valor: {
      durabilidad: 'Durabilidad y calidad',
      precio: 'Mejor precio',
      diseno: 'Diseño y personalización'
    },
    origen: {
      instagram: 'Instagram',
      recomendacion: 'Recomendación',
      facebook: 'Facebook',
      google: 'Google',
      otro: 'Otro'
    },
    inversion: {
      '200-500': '$200,000 - $500,000 MXN',
      '500-1000': '$500,000 - $1,000,000 MXN',
      '>1000': 'Más de $1,000,000 MXN',
      'nd': 'Aún no definido'
    }
  };

  // La configuración de nodemailer es la misma
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // El formato del HTML del correo es el mismo
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1 style="color: #333;">Nueva Solicitud de Cotización</h1>
      <p>Has recibido un nuevo prospecto desde el formulario de tu web.</p>
      
      <h2 style="color: #c00; border-bottom: 2px solid #c00; padding-bottom: 5px;">Resultado de la Evaluación</h2>
      <p><strong>Categoría:</strong> ${resultadoEvaluacion.tier}</p>
      <p><strong>Puntuación:</strong> ${resultadoEvaluacion.score}</p>
      <p><strong>Mensaje Sugerido:</strong> ${resultadoEvaluacion.mensaje}</p>
      <p><strong>Contradicciones Detectadas:</strong> ${resultadoEvaluacion.contradictions}</p>
      
      <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px;">Detalles del Prospecto</h2>
      <ul>
        <li><strong>Correo:</strong> ${formData.correo}</li>
        <li><strong>Teléfono/WhatsApp:</strong> ${formData.telefono}</li>
        <li><strong>Empresa/Gimnasio:</strong> ${formData.empresa}</li>
        <li><strong>Interés Principal:</strong> ${valueMap.interes[formData.interes] || formData.interes}</li>
        <li><strong>Plazo de Compra:</strong> ${valueMap.plazo[formData.plazo] || formData.plazo}</li>
        <li><strong>Lugar de Instalación:</strong> ${valueMap.instalacion[formData.instalacion] || formData.instalacion}</li>
        <li><strong>Qué Valora Más:</strong> ${valueMap.valor[formData.valor] || formData.valor}</li>
        <li><strong>Cómo nos conoció:</strong> ${valueMap.origen[formData.origen] || formData.origen}</li>
        <li><strong>Inversión Aproximada:</strong> ${valueMap.inversion[formData.inversion] || formData.inversion}</li>
        <li><strong>Fecha de Inicio:</strong> ${formData.fecha}</li>
        <li><strong>Fecha de Recepción Equipo:</strong> ${formData.recepcion}</li>
      </ul>
      
      <h3 style="color: #555;">Descripción del Proyecto:</h3>
      <p style="background-color: #f9f9f9; border-left: 4px solid #ccc; padding: 10px; margin: 0;">
        ${formData.descripcion}
      </p>
    </div>
  `;

  const mailOptions = {
    from: `"Tu Web RealLeader" <${process.env.EMAIL_SERVER_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Nueva Propuesta (Categoría ${resultadoEvaluacion.tier}) - ${formData.empresa || formData.correo}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    // La respuesta en el App Router se maneja con NextResponse
    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al enviar el correo' }, { status: 500 });
  }
}

