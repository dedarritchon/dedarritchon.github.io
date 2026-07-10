// Datos de proyectos del portafolio.
//
// Cada proyecto soporta una galería de imágenes tipo carrusel.
// Para agregar más fotos: sube las imágenes a `public/images/projects/<proyecto>/`
// y añade entradas al array `gallery` con { src, caption }.
//
//   gallery: [
//     { src: '/images/projects/pares/landing.png', caption: 'Página de inicio' },
//     { src: '/images/projects/pares/analytics.png', caption: 'Analítica de resultados' },
//   ]

export const projects = [
  {
    id: 'micrecimiento',
    title: 'MiCrecimien.to',
    summary:
      'Plataforma de seguimiento del crecimiento pediátrico que digitaliza las consultas y reemplaza las curvas en papel por una solución moderna y accesible.',
    description:
      'Plataforma de seguimiento del crecimiento pediátrico que digitaliza las consultas, reemplazando las curvas de crecimiento en papel por una solución moderna y accesible para el seguimiento del desarrollo infantil. Incluye ficha del paciente, indicaciones, reportes de la consulta y notificaciones automáticas por WhatsApp y email.',
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'WhatsApp API', 'Sendgrid'],
    liveLink: 'https://micrecimien.to/show/example',
    githubLink: null,
    cover: '/images/projects/micrecimiento/dashboard.png',
    gallery: [
      { src: '/images/projects/micrecimiento/dashboard.png', caption: 'Panel principal de la plataforma' },
      { src: '/images/projects/micrecimiento/growth-profile.jpeg', caption: 'Perfil de crecimiento con curvas digitales, compartido con los padres del paciente' },
      { src: '/images/projects/micrecimiento/patients-crm.png', caption: 'Gestión de pacientes (CRM)' },
      { src: '/images/projects/micrecimiento/patients-profile.png', caption: 'Ficha detallada del paciente' },
      { src: '/images/projects/micrecimiento/prescriptions.png', caption: 'Indicaciones y recetas médicas' },
      { src: '/images/projects/micrecimiento/report.png', caption: 'Reporte de la consulta' },
    ],
  },
  {
    id: 'pares',
    title: 'Pares.cl',
    summary:
      'Plataforma para gestionar evaluaciones entre pares (peer reviews) en cursos y equipos, con importación desde Canvas y analítica de resultados.',
    description:
      'Pares.cl es una plataforma para administrar evaluaciones entre pares (peer reviews). Permite importar cursos y estudiantes desde Canvas, organizar grupos de trabajo, generar enlaces de evaluación individuales, analizar los resultados con métricas y exportar todo a CSV. Simplifica un proceso que normalmente es manual y tedioso para profesores y equipos.',
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Canvas LMS'],
    liveLink: 'https://pares.cl',
    githubLink: null,
    cover: '/images/projects/pares/landing.png',
    gallery: [
      { src: '/images/projects/pares/landing.png', caption: 'Página de inicio' },
      { src: '/images/projects/pares/canvas-import.png', caption: 'Importación de cursos desde Canvas' },
      { src: '/images/projects/pares/group-management.png', caption: 'Gestión de grupos de trabajo' },
      { src: '/images/projects/pares/evaluation-links.png', caption: 'Enlaces de evaluación por estudiante' },
      { src: '/images/projects/pares/analytics.png', caption: 'Analítica de resultados' },
      { src: '/images/projects/pares/csv-export.png', caption: 'Exportación de datos a CSV' },
    ],
  },
  {
    id: 'agendamiento',
    title: 'Agendamiento Accountability',
    summary:
      'Plataforma integral de agendamiento de eventos: organiza, confirma asistentes y envía encuestas y recordatorios por WhatsApp y email.',
    description:
      'Plataforma integral de agendamiento de eventos: permite organizar eventos, calendarizar reservas, confirmar asistentes, gestionar proveedores, enviar encuestas de satisfacción y recordatorios por WhatsApp y email, además de analizar los resultados. Automatiza la comunicación y el seguimiento de la asistencia de principio a fin.',
    tech: ['Flask', 'Python', 'WhatsApp API', 'Sendgrid'],
    liveLink: 'https://agendamiento.accountability.cl',
    githubLink: null,
    cover: '/images/projects/agendamiento/dashboard.png',
    gallery: [
      { src: '/images/projects/agendamiento/dashboard.png', caption: 'Panel de control' },
      { src: '/images/projects/agendamiento/calendarizacion.png', caption: 'Calendarización de eventos' },
      { src: '/images/projects/agendamiento/formulario-de-reserva.png', caption: 'Formulario de reserva' },
      { src: '/images/projects/agendamiento/reservas.jpeg', caption: 'Listado de reservas' },
      { src: '/images/projects/agendamiento/crm-proveedores.png', caption: 'CRM de proveedores' },
      { src: '/images/projects/agendamiento/analitica.png', caption: 'Analítica y métricas' },
    ],
  },
  {
    id: 'spotify',
    title: 'Front Spotify Plugin',
    summary:
      'Extensión de navegador para controlar Spotify sin salir de Front. Aprobada por Spotify Developers.',
    description:
      'Extensión de navegador para controlar la reproducción de Spotify sin cambiar de pestaña en Front. Mejora la productividad integrando el control de música directamente en la interfaz. Aprobada por Spotify Developers.',
    tech: ['JavaScript', 'Browser Extension', 'Spotify Web API', 'Front'],
    liveLink: 'https://front.com/integrations?search=spotify&category=all',
    githubLink: null,
    cover: '/images/spotify.png',
    gallery: [
      { src: '/images/spotify.png', caption: 'Control de reproducción integrado' },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portafolio Web',
    summary:
      'Sitio de portafolio moderno y responsivo con estética dark refinada y animaciones sutiles.',
    description:
      'Sitio de portafolio moderno y responsivo construido con React y styled-components, con estética dark refinada, scroll suave con Locomotive Scroll, fondo interactivo y una galería de proyectos interactiva.',
    tech: ['React', 'Styled-Components', 'Locomotive Scroll', 'JavaScript'],
    liveLink: 'https://dedarritchon.github.io',
    githubLink: 'https://github.com/dedarritchon/dedarritchon.github.io',
    cover: '/images/projects/portfolio/portfolio.jpeg',
    gallery: [
      { src: '/images/projects/portfolio/portfolio.jpeg', caption: 'Página de inicio' },
    ],
  },
];

export const workExperience = [
  {
    title: 'Senior Software Engineer',
    company: 'Front',
    duration: '2 años',
    description:
      'Lideré el desarrollo de soluciones e integraciones innovadoras, incluyendo el Front Spotify Plugin, que mejora la productividad de los usuarios integrando el control de música dentro de Front.',
  },
  {
    title: 'Software Engineer',
    company: 'Adereso',
    duration: '4 años',
    description:
      'Desarrollé y mantuve diversas aplicaciones de software, contribuyendo a las iniciativas de transformación digital y a la mejora de la infraestructura técnica de la empresa.',
  },
];
