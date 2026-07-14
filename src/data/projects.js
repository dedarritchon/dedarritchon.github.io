// Datos de proyectos del portafolio.
//
// Cada proyecto soporta una galería de imágenes tipo carrusel.
// Los campos de texto son bilingües: { es, en }. Usa `pick(field, lang)`.
// Para agregar más fotos: sube las imágenes a `public/images/projects/<proyecto>/`
// y añade entradas al array `gallery` con { src, caption: { es, en } }.

// Devuelve la variante de idioma de un campo bilingüe (con respaldo en español).
export const pick = (field, lang) => {
  if (field && typeof field === 'object' && ('es' in field || 'en' in field)) {
    return field[lang] ?? field.es ?? field.en;
  }
  return field;
};

export const projects = [
  {
    id: 'micrecimiento',
    title: 'MiCrecimien.to',
    summary: {
      es: 'Plataforma de seguimiento del crecimiento pediátrico que digitaliza las consultas y reemplaza las curvas en papel por una solución moderna y accesible.',
      en: 'Pediatric growth-tracking platform that digitizes consultations and replaces paper growth charts with a modern, accessible solution.',
    },
    description: {
      es: 'Plataforma de seguimiento del crecimiento pediátrico que digitaliza las consultas, reemplazando las curvas de crecimiento en papel por una solución moderna y accesible para el seguimiento del desarrollo infantil. Incluye ficha del paciente, indicaciones, reportes de la consulta y notificaciones automáticas por WhatsApp y email.',
      en: 'A pediatric growth-tracking platform that digitizes consultations, replacing paper growth charts with a modern, accessible solution for monitoring child development. It includes patient records, prescriptions, consultation reports and automatic notifications via WhatsApp and email.',
    },
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'WhatsApp API', 'Sendgrid'],
    liveLink: 'https://micrecimien.to/show/example',
    githubLink: null,
    cover: '/images/projects/micrecimiento/dashboard.png',
    gallery: [
      { src: '/images/projects/micrecimiento/dashboard.png', caption: { es: 'Panel principal de la plataforma', en: 'Main platform dashboard' } },
      { src: '/images/projects/micrecimiento/growth-profile.jpeg', caption: { es: 'Perfil de crecimiento con curvas digitales, compartido con los padres del paciente', en: 'Growth profile with digital charts, shared with the patient\u2019s parents' } },
      { src: '/images/projects/micrecimiento/patients-crm.png', caption: { es: 'Gestión de pacientes (CRM)', en: 'Patient management (CRM)' } },
      { src: '/images/projects/micrecimiento/patients-profile.png', caption: { es: 'Ficha detallada del paciente', en: 'Detailed patient record' } },
      { src: '/images/projects/micrecimiento/prescriptions.png', caption: { es: 'Indicaciones y recetas médicas', en: 'Prescriptions and medical instructions' } },
      { src: '/images/projects/micrecimiento/report.png', caption: { es: 'Reporte de la consulta', en: 'Consultation report' } },
    ],
  },
  {
    id: 'pares',
    title: 'Pares.cl',
    summary: {
      es: 'Plataforma para gestionar evaluaciones entre pares (peer reviews) en cursos y equipos, con importación desde Canvas y analítica de resultados.',
      en: 'Platform to manage peer reviews in courses and teams, with Canvas import and results analytics.',
    },
    description: {
      es: 'Pares.cl es una plataforma para administrar evaluaciones entre pares (peer reviews). Permite importar cursos y estudiantes desde Canvas, organizar grupos de trabajo, generar enlaces de evaluación individuales, analizar los resultados con métricas y exportar todo a CSV. Simplifica un proceso que normalmente es manual y tedioso para profesores y equipos.',
      en: 'Pares.cl is a platform for managing peer reviews. It lets you import courses and students from Canvas, organize working groups, generate individual evaluation links, analyze results with metrics and export everything to CSV. It simplifies a process that is normally manual and tedious for teachers and teams.',
    },
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Canvas LMS', 'Resend.io'],
    liveLink: 'https://pares.cl',
    githubLink: null,
    cover: '/images/projects/pares/landing.png',
    gallery: [
      { src: '/images/projects/pares/landing.png', caption: { es: 'Página de inicio', en: 'Landing page' } },
      { src: '/images/projects/pares/canvas-import.png', caption: { es: 'Importación de cursos desde Canvas', en: 'Importing courses from Canvas' } },
      { src: '/images/projects/pares/group-management.png', caption: { es: 'Gestión de grupos de trabajo', en: 'Working group management' } },
      { src: '/images/projects/pares/evaluation-links.png', caption: { es: 'Enlaces de evaluación por estudiante', en: 'Per-student evaluation links' } },
      { src: '/images/projects/pares/analytics.png', caption: { es: 'Analítica de resultados', en: 'Results analytics' } },
      { src: '/images/projects/pares/csv-export.png', caption: { es: 'Exportación de datos a CSV', en: 'CSV data export' } },
    ],
  },
  {
    id: 'agendamiento',
    title: 'Agendamiento Accountability',
    summary: {
      es: 'Plataforma integral de agendamiento de eventos: organiza, confirma asistentes y envía encuestas y recordatorios por WhatsApp y email.',
      en: 'End-to-end event scheduling platform: organize events, confirm attendees and send surveys and reminders via WhatsApp and email.',
    },
    description: {
      es: 'Plataforma integral de agendamiento de eventos: permite organizar eventos, calendarizar reservas, confirmar asistentes, gestionar proveedores, enviar encuestas de satisfacción y recordatorios por WhatsApp y email, además de analizar los resultados. Automatiza la comunicación y el seguimiento de la asistencia de principio a fin.',
      en: 'An end-to-end event scheduling platform: organize events, schedule bookings, confirm attendees, manage vendors, send satisfaction surveys and reminders via WhatsApp and email, and analyze the results. It automates communication and attendance tracking from start to finish.',
    },
    tech: ['Flask', 'Python', 'WhatsApp API', 'OAuth2', 'Gmail API', 'Calendarific API'],
    liveLink: 'https://agendamiento.accountability.cl',
    githubLink: null,
    cover: '/images/projects/agendamiento/dashboard.png',
    gallery: [
      { src: '/images/projects/agendamiento/dashboard.png', caption: { es: 'Panel de control', en: 'Control panel' } },
      { src: '/images/projects/agendamiento/calendarizacion.png', caption: { es: 'Calendarización de eventos', en: 'Event scheduling' } },
      { src: '/images/projects/agendamiento/formulario-de-reserva.png', caption: { es: 'Formulario de reserva', en: 'Booking form' } },
      { src: '/images/projects/agendamiento/reservas.jpeg', caption: { es: 'Listado de reservas', en: 'Bookings list' } },
      { src: '/images/projects/agendamiento/crm-proveedores.png', caption: { es: 'CRM de proveedores', en: 'Vendor CRM' } },
      { src: '/images/projects/agendamiento/analitica.png', caption: { es: 'Analítica y métricas', en: 'Analytics and metrics' } },
    ],
  },
  {
    id: 'comparto-depto',
    title: 'Mensajes Masivos Comparto Depto',
    summary: {
      es: 'Extensión de navegador que añade el envío de mensajes masivos a Comparto Depto, permitiendo contactar a varias personas de forma fácil y rápida.',
      en: 'Browser extension that adds bulk messaging to Comparto Depto, making it easy and fast to contact several people at once.',
    },
    description: {
      es: 'Comparto Depto no cuenta con una forma de enviar mensajes masivos. Este plugin de navegador agrega esa funcionalidad, permitiendo contactar a varias personas de forma fácil y automática, ahorrando tiempo en la búsqueda y comunicación con potenciales compañeros de departamento.',
      en: 'Comparto Depto has no way to send bulk messages. This browser plugin adds that functionality, letting you contact several people easily and automatically, saving time when searching for and communicating with potential flatmates.',
    },
    tech: ['JavaScript', 'Browser Extension', 'Chrome Web Store'],
    liveLink: 'https://chromewebstore.google.com/detail/mensajes-autom%C3%A1ticos-en-c/cancfdhcdlhclhkkhbnpcmibgdpfabel',
    githubLink: 'https://github.com/dedarritchon/autoSendMessagesOnCompartoDepto',
    cover: '/images/projects/comparto-depto/chrome-plugin.jpg',
    gallery: [
      { src: '/images/projects/comparto-depto/chrome-plugin.jpg', caption: { es: 'Extensión de Chrome en acción', en: 'Chrome extension in action' } },
      { src: '/images/projects/comparto-depto/appstore-page.png', caption: { es: 'Página en la Chrome Web Store', en: 'Chrome Web Store page' } },
    ],
  },
  {
    id: 'spotify',
    title: 'Front Spotify Plugin',
    summary: {
      es: 'Extensión de navegador para controlar Spotify sin salir de Front. Aprobada por Spotify Developers.',
      en: 'Browser extension to control Spotify without leaving Front. Approved by Spotify Developers.',
    },
    description: {
      es: 'Extensión de navegador para controlar la reproducción de Spotify sin cambiar de pestaña en Front. Mejora la productividad integrando el control de música directamente en la interfaz. Aprobada por Spotify Developers.',
      en: 'A browser extension to control Spotify playback without switching tabs in Front. It boosts productivity by integrating music control directly into the interface. Approved by Spotify Developers.',
    },
    tech: ['React', 'Plugin', 'Spotify Web API', 'Front'],
    liveLink: 'https://front.com/integrations?search=spotify&category=all',
    githubLink: 'https://github.com/dedarritchon/front-spotify',
    cover: '/images/spotify.png',
    gallery: [
      { src: '/images/spotify.png', caption: { es: 'Control de reproducción integrado', en: 'Integrated playback control' } },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portafolio Web',
    summary: {
      es: 'Sitio de portafolio moderno y responsivo con estética dark refinada y animaciones sutiles.',
      en: 'Modern, responsive portfolio site with a refined dark aesthetic and subtle animations.',
    },
    description: {
      es: 'Sitio de portafolio moderno y responsivo construido con React y styled-components, con estética dark, scroll suave con Locomotive Scroll, fondo interactivo y una galería de proyectos interactiva.',
      en: 'A modern, responsive portfolio site built with React and styled-components, featuring a refined dark aesthetic, smooth scrolling with Locomotive Scroll, an interactive background and an interactive project gallery.',
    },
    tech: ['React', 'Styled-Components', 'Locomotive Scroll', 'JavaScript'],
    liveLink: 'https://dedarritchon.github.io',
    githubLink: 'https://github.com/dedarritchon/dedarritchon.github.io',
    cover: '/images/projects/portfolio/portfolio.jpeg',
    gallery: [
      { src: '/images/projects/portfolio/portfolio.jpeg', caption: { es: 'Página de inicio', en: 'Landing page' } },
    ],
  },
];

export const workExperience = [
  {
    title: { es: 'Profesor Instructor Adjunto', en: 'Adjunct Instructor Professor' },
    company: 'Pontificia Universidad Católica de Chile',
    duration: { es: '2022 – Actualidad', en: '2022 – Present' },
    start: 2022,
    end: null,
    current: true,
    description: {
      es: 'En paralelo a mi trabajo en la industria, soy docente del curso IIC3103 Taller de Integración, especializado en integración de software: APIs, servicios, eventos, integración por datos y seguridad en la integración, con un enfoque práctico orientado a problemas reales.',
      en: 'Alongside my industry work, I teach the course IIC3103 Integration Workshop, specialized in software integration: APIs, services, events, data integration and integration security, with a hands-on approach oriented to real-world problems.',
    },
    link: 'https://www.ing.uc.cl/academicos-e-investigadores/daniel-eduardo-darritchon-lama/',
  },
  {
    title: { es: 'Senior Software Engineer', en: 'Senior Software Engineer' },
    company: 'Front',
    duration: { es: '2024 – Actualidad', en: '2024 – Present' },
    start: 2024,
    end: null,
    current: true,
    description: {
      es: 'Mi rol actual en la industria. Diseño, desarrollo y mantengo integraciones clave con partners de la empresa, construyendo frameworks y documentación amigables para desarrolladores. Participo en la estrategia de integraciones y colaboro con product managers, diseñadores e ingenieros para conceptualizar, construir y probar nuevas funcionalidades.',
      en: 'My current industry role. I design, build and maintain key integrations with the company\u2019s partners, building developer-friendly frameworks and documentation. I contribute to the integrations strategy and collaborate with product managers, designers and engineers to conceptualize, build and test new features.',
    },
    link: 'https://front.com/',
  },
  {
    title: { es: 'Software Engineer', en: 'Software Engineer' },
    company: 'Adereso',
    duration: { es: '2020 – 2024', en: '2020 – 2024' },
    start: 2020,
    end: 2024,
    description: {
      es: 'Creé y mantuve servicios web escalables de punta a punta y lideré el desarrollo de Adereso BSP, habilitando a Adereso como Whatsapp Business Partner. Además, brindé liderazgo técnico y mentoría a otros desarrolladores del equipo.',
      en: 'I built and maintained scalable web services end to end and led the development of Adereso BSP, enabling Adereso as a WhatsApp Business Partner. I also provided technical leadership and mentorship to other developers on the team.',
    },
    link: 'https://adereso.ai/',
  },
];
