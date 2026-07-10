// Datos de proyectos del portafolio.
//
// Cada proyecto soporta una galería de imágenes tipo carrusel.
// Para agregar más fotos: sube las imágenes a `public/images/` y añade
// entradas al array `gallery` con { src, caption }.
//
//   gallery: [
//     { src: '/images/micrecimiento.png', caption: 'Pantalla principal' },
//     { src: '/images/micrecimiento-2.png', caption: 'Ficha del paciente' },
//     { src: '/images/micrecimiento-3.png', caption: 'Curvas de crecimiento' },
//   ]

export const projects = [
  {
    id: 'micrecimiento',
    title: 'MiCrecimien.to',
    summary:
      'Plataforma de seguimiento del crecimiento pediátrico que digitaliza las consultas y reemplaza las curvas en papel por una solución moderna y accesible.',
    description:
      'Plataforma de seguimiento del crecimiento pediátrico que digitaliza las consultas, reemplazando las curvas de crecimiento en papel por una solución moderna y accesible para el seguimiento del desarrollo infantil. Incluye notificaciones automáticas por WhatsApp y email para recordatorios y resultados.',
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'WhatsApp API', 'Sendgrid'],
    liveLink: 'https://micrecimien.to/show/example',
    githubLink: null,
    cover: '/images/micrecimiento.png',
    gallery: [
      { src: '/images/micrecimiento.png', caption: 'Vista general de la plataforma' },
      // Añade más imágenes aquí (ej: '/images/micrecimiento-2.png')
    ],
  },
  {
    id: 'agendamiento',
    title: 'Agendamiento Accountability',
    summary:
      'Plataforma integral de agendamiento de eventos: organiza, confirma asistentes y envía encuestas y recordatorios por WhatsApp y email.',
    description:
      'Plataforma integral de agendamiento de eventos: permite organizar eventos, confirmar asistentes, enviar encuestas de satisfacción y recordatorios por WhatsApp y email. Automatiza la comunicación y el seguimiento de la asistencia de principio a fin.',
    tech: ['Flask', 'Python', 'WhatsApp API', 'Sendgrid'],
    liveLink: 'https://agendamiento.accountability.cl',
    githubLink: null,
    cover: '/images/agendamiento.png',
    gallery: [
      { src: '/images/agendamiento.png', caption: 'Panel de agendamiento' },
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
      'Sitio de portafolio moderno y responsivo construido con React y styled-components, con estética dark refinada, animaciones al hacer scroll y una galería de proyectos interactiva.',
    tech: ['React', 'Styled-Components', 'JavaScript'],
    liveLink: 'https://dedarritchon.github.io',
    githubLink: 'https://github.com/dedarritchon/dedarritchon.github.io',
    cover: '/images/portfolio.png',
    gallery: [
      { src: '/images/portfolio.png', caption: 'Página de inicio' },
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
