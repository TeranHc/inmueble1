// products.js

export const allProperties = [
  // Propiedades detalladas
  {
    id: 1,
    name: "Casa Residencial Premium - Polanco",
    primaryCategory: "Casas",
    subCategories: ["Residencial", "Premium"],
    image: "/casas/1.jpg",
    alt: "Casa en Polanco",
    precioCesion: "1,850,000",
    valorComercial: "8,500,000",
    ahorro: "78.2%",
    estatus: "Sentencia Ejecutoriada",
    ubicacion: "Polanco, CDMX",
    m2: "450",
    recamaras: "4",
    banos: "3.5",
    estacionamientos: "3",
    tiempoEstimado: "3-6 meses",
    description: ["Oportunidad excepcional en una de las zonas más exclusivas de la Ciudad de México. Esta propiedad cuenta con acabados de lujo y amplios espacios.", "El proceso judicial ha concluido con sentencia ejecutoriada, lo que facilita la recuperación del inmueble. Ideal para inversionistas que buscan propiedades de alto valor."],
    features: ["Ubicación premium en Polanco", "Sentencia ejecutoriada - proceso judicial concluido", "Acabados de primera calidad y espacios amplios", "Jardín privado de 80 m²"],
    detallesLegales: { "Tipo de proceso": "Juicio Hipotecario", "Estatus": "Sentencia Ejecutoriada", "Tiempo estimado": "3-6 meses" },
    especificaciones: { "Superficie terreno": "450 m²", "Recámaras": "4", "Baños": "3.5", "Estacionamientos": "3" }
  },
  {
    id: 2,
    name: "Departamento Moderno - Santa Fe",
    primaryCategory: "Departamentos",
    subCategories: ["Moderno", "Zona Corporativa"],
    image: "/casas/2.jpg",
    alt: "Departamento en Santa Fe",
    precioCesion: "950,000",
    valorComercial: "3,800,000",
    ahorro: "75.0%",
    estatus: "En Proceso Judicial - Fase Avanzada",
    ubicacion: "Santa Fe, CDMX",
    m2: "180",
    recamaras: "3",
    banos: "2",
    estacionamientos: "2",
    tiempoEstimado: "8-12 meses",
    description: ["Departamento ubicado en torre corporativa de Santa Fe con amenidades de primer nivel. Excelente plusvalía en zona de alta demanda.", "El proceso judicial se encuentra en fase avanzada. Estimado de 8-12 meses para adjudicación final."],
    features: ["Torre moderna con amenidades completas (alberca, gym)", "Vista panorámica de la ciudad", "Seguridad 24/7 con acceso controlado", "Excelente conectividad y transporte"],
    detallesLegales: { "Tipo de proceso": "Juicio Especial Hipotecario", "Estatus": "Fase Avanzada", "Tiempo estimado": "8-12 meses" },
    especificaciones: { "Superficie": "180 m²", "Recámaras": "3", "Baños": "2", "Estacionamientos": "2" }
  },
  // --- 4 NUEVOS EJEMPLOS ---
  {
    id: 3,
    name: "Terreno Comercial sobre Carretera",
    primaryCategory: "Terrenos",
    subCategories: ["Comercial", "Carretera"],
    image: "/casas/3.jpg",
    alt: "Terreno Comercial en Carretera",
    precioCesion: "2,200,000",
    valorComercial: "9,800,000",
    ahorro: "77.6%",
    estatus: "Sentencia Ejecutoriada",
    ubicacion: "Carretera México-Querétaro",
    m2: "2,500",
    recamaras: "N/A",
    banos: "N/A",
    estacionamientos: "N/A",
    tiempoEstimado: "4-7 meses",
    description: ["Terreno comercial estratégicamente ubicado sobre carretera federal con alto flujo vehicular. Ideal para desarrollo de plaza comercial o gasolinera.", "Con sentencia ejecutoriada y avalúo actualizado. Excelente oportunidad para inversionistas que buscan desarrollos comerciales."],
    features: ["Ubicación estratégica con alto flujo vehicular", "Uso de suelo comercial", "Sentencia ejecutoriada", "Superficie plana y regular"],
    detallesLegales: { "Tipo de proceso": "Juicio Mercantil", "Estatus": "Sentencia Ejecutoriada", "Tiempo estimado": "4-7 meses" },
    especificaciones: { "Superficie total": "2,500 m²", "Frente": "50 m", "Fondo": "50 m", "Uso de Suelo": "Comercial" }
  },
  {
    id: 4,
    name: "Local en Plaza Comercial - Coyoacán",
    primaryCategory: "Comercial",
    subCategories: ["Local", "Plaza"],
    image: "/casas/4.jpg",
    alt: "Local en Plaza Comercial",
    precioCesion: "720,000",
    valorComercial: "2,900,000",
    ahorro: "75.2%",
    estatus: "En Proceso Judicial",
    ubicacion: "Coyoacán, CDMX",
    m2: "90",
    recamaras: "N/A",
    banos: "1",
    estacionamientos: "10 (compartidos)",
    tiempoEstimado: "12-18 meses",
    description: ["Local comercial ubicado dentro de una plaza concurrida en el corazón de Coyoacán, ideal para boutique, cafetería o servicios.", "El proceso judicial se encuentra en etapa intermedia. Es una inversión a mediano plazo con alto potencial de rentabilidad por la ubicación."],
    features: ["Alta afluencia peatonal", "Ubicado en plaza comercial establecida", "Zona de alto valor turístico y residencial", "Seguridad en la plaza"],
    detallesLegales: { "Tipo de proceso": "Juicio de Arrendamiento", "Estatus": "En Proceso Judicial", "Tiempo estimado": "12-18 meses" },
    especificaciones: { "Superficie": "90 m²", "Baños": "1", "Ubicación": "Planta Baja", "Estacionamiento": "Compartido" }
  },
  {
    id: 5,
    name: "Casa Colonial - Centro Histórico, Puebla",
    primaryCategory: "Casas",
    subCategories: ["Histórica", "Centro"],
    image: "/casas/5.jpg",
    alt: "Casa Colonial en Puebla",
    precioCesion: "1,100,000",
    valorComercial: "5,200,000",
    ahorro: "78.8%",
    estatus: "En Proceso Judicial - Fase Inicial",
    ubicacion: "Centro Histórico, Puebla",
    m2: "380",
    recamaras: "5",
    banos: "3",
    estacionamientos: "1",
    tiempoEstimado: "18-24 meses",
    description: ["Hermosa casona colonial en el corazón del centro histórico. Estructura original conservada con potencial para restauración como hotel boutique o residencia.", "Proceso judicial en fase inicial. Oportunidad para inversionistas con visión a largo plazo en una propiedad con valor histórico."],
    features: ["Patrimonio arquitectónico", "Ubicación inmejorable en centro histórico", "Alto potencial para proyecto turístico", "Patio central tradicional"],
    detallesLegales: { "Tipo de proceso": "Juicio Sucesorio", "Estatus": "Fase Inicial", "Tiempo estimado": "18-24 meses" },
    especificaciones: { "Superficie terreno": "300 m²", "Superficie construcción": "380 m²", "Recámaras": "5", "Niveles": "2" }
  },
  {
    id: 6,
    name: "Departamento Vista al Mar - Cancún",
    primaryCategory: "Departamentos",
    subCategories: ["Turístico", "Playa"],
    image: "/casas/6.jpg",
    alt: "Departamento en Cancún",
    precioCesion: "1,450,000",
    valorComercial: "6,200,000",
    ahorro: "76.6%",
    estatus: "Sentencia Ejecutoriada",
    ubicacion: "Zona Hotelera, Cancún",
    m2: "120",
    recamaras: "2",
    banos: "2",
    estacionamientos: "1",
    tiempoEstimado: "5-8 meses",
    description: ["Moderno departamento con vista al mar Caribe en un desarrollo turístico consolidado. Alto potencial de renta vacacional o para disfrutar.", "El juicio ha concluido y cuenta con sentencia, lo que agiliza el proceso de toma de posesión del inmueble."],
    features: ["Vista directa al mar Caribe", "Acceso a playa privada", "Alberca infinity y amenidades de lujo", "Alto retorno de inversión por rentas vacacionales"],
    detallesLegales: { "Tipo de proceso": "Juicio Hipotecario", "Estatus": "Sentencia Ejecutoriada", "Tiempo estimado": "5-8 meses" },
    especificaciones: { "Superficie": "120 m²", "Recámaras": "2", "Baños": "2", "Terraza": "Sí, con vista al mar" }
  }
];

export const primaryCategories = [
  'Todos',
  'Casas',
  'Departamentos',
  'Terrenos',
  'Comercial'
];

export const subCategories = [
  'Todos', 'Residencial', 'Premium', 'Moderno', 'Zona Corporativa',
  'Comercial', 'Carretera', 'Histórica', 'Centro', 'Local',
  'Plaza', 'Turístico', 'Playa', 'Industrial', 'Parque Industrial'
];

export const estatusOptions = [
  'Todos', 'Sentencia Ejecutoriada', 'En Proceso Judicial - Fase Avanzada',
  'En Proceso Judicial', 'En Proceso Judicial - Fase Inicial'
];