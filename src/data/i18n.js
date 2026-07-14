// UI copy for both languages. Project and work data live in `projects.js`.
export const translations = {
  es: {
    nav: {
      links: [
        { href: '#sobre-mi', label: 'Sobre mí' },
        { href: '#servicios', label: 'Servicios' },
        { href: '#proyectos', label: 'Proyectos' },
        { href: '#experiencia', label: 'Experiencia' },
        { href: '#valoraciones', label: 'Valoraciones' },
      ],
      cta: 'Agendar consultoría',
      openMenu: 'Abrir menú',
    },
    hero: {
      status: 'Disponible para nuevos proyectos',
      titleA: 'Ingeniero de Software ',
      titleB: '& Consultor',
      subtitle:
        'Diseño y construyo software a medida, integraciones y automatizaciones que impulsan negocios. Te ayudo a llevar tu idea de un concepto a un producto escalable y confiable.',
      ctaPrimary: 'Agendar consultoría',
      ctaSecondary: 'Ver proyectos',
      stats: [
        { value: '+6 años', label: 'de experiencia' },
        { value: 'Full-stack', label: 'web, APIs y cloud' },
        { value: 'Producto real', label: 'en producción' },
      ],
      portraitAlt: 'Retrato de Daniel Darritchon',
    },
    profile: {
      eyebrow: 'Sobre mí',
      title: 'Ingeniería con foco en resultados',
      bio: [
        'Soy Daniel Darritchon, ingeniero de software con más de cinco años construyendo aplicaciones web full-stack, integraciones y automatizaciones para empresas. Me especializo en transformar necesidades de negocio en productos escalables, mantenibles y confiables.',
        'He trabajado desde startups hasta plataformas en producción usadas a diario, cubriendo el ciclo completo: arquitectura, desarrollo, despliegue en la nube y mantenimiento. Creo en el código limpio, la comunicación clara y en entregar valor real, no solo funcionalidades.',
        'Hoy combino ese recorrido técnico con consultoría, ayudando a clientes a tomar mejores decisiones tecnológicas y a llevar sus ideas a la práctica.',
      ],
      panelTitle: 'Stack & herramientas',
      skills: [
        'JavaScript / TypeScript',
        'React',
        'Node.js / Express',
        'Python / Django',
        'FastAPI / Flask',
        'PostgreSQL / SQL',
        'Docker / Kubernetes',
        'GCP / AWS',
        'Integraciones & APIs',
        'Git / CI/CD',
      ],
    },
    services: {
      eyebrow: 'Consultoría',
      title: 'Servicios que ofrezco',
      intro:
        'Trabajo con empresas, startups y fundadores para construir y mejorar su tecnología. Estas son las formas en que puedo ayudarte.',
      items: [
        {
          title: 'Desarrollo full-stack a medida',
          text: 'Aplicaciones web y APIs desde cero, con foco en escalabilidad, rendimiento y código mantenible.',
        },
        {
          title: 'Integraciones & automatización',
          text: 'Conecto tus herramientas y automatizo procesos: WhatsApp, email, pagos y APIs de terceros.',
        },
        {
          title: 'Arquitectura & cloud',
          text: 'Diseño de arquitecturas robustas y despliegues en la nube (GCP/AWS) listos para crecer.',
        },
        {
          title: 'Asesoría técnica',
          text: 'Acompaño a equipos y fundadores en decisiones técnicas, revisiones de código y hoja de ruta.',
        },
      ],
      cta: 'Conversemos tu proyecto',
    },
    projects: {
      eyebrow: 'Portafolio',
      title: 'Proyectos destacados',
      intro:
        'Una selección de productos reales que he construido. Haz clic en un proyecto para ver su galería de imágenes y más detalles.',
      imageSingular: 'imagen',
      imagePlural: 'imágenes',
      viewProject: 'Ver proyecto',
      scrollHint: 'Desplázate para recorrer los proyectos',
    },
    experience: {
      eyebrow: 'Trayectoria',
      title: 'Experiencia profesional',
      intro:
        'Actualmente combino en paralelo mi rol de ingeniero en Front con la docencia en la Pontificia Universidad Católica de Chile.',
      current: 'Actual',
    },
    modal: {
      close: 'Cerrar',
      viewDemo: 'Ver demo',
    },
    testimonials: {
      eyebrow: 'Testimonios',
      title: 'Lo que dicen mis clientes',
      intro: 'Valoraciones de personas y equipos con los que he trabajado.',
      starsLabel: '5 de 5 estrellas',
      roles: {
        'Dr. Carlos Uc': 'Médico Pediatra',
        'Aldo Novion': 'Fundador, Accountability.cl',
        'Camilo López': 'CEO, Adereso',
        'José Ossa': 'Engineering Manager, Front',
      },
      quotes: {
        'Dr. Carlos Uc':
          'Daniel entendió nuestro problema desde el primer día y entregó una solución sólida y a tiempo. Su capacidad técnica y su comunicación clara marcaron la diferencia en el proyecto.',
        'Aldo Novion':
          'Trabajar con Daniel fue muy fácil. Automatizó procesos que antes nos tomaban horas y el resultado superó nuestras expectativas. Sin duda volveríamos a contar con él.',
        'Camilo López':
          'Daniel fue clave para llevar a Adereso al siguiente nivel. Lideró proyectos técnicos complejos con criterio y responsabilidad, y siempre elevó el estándar del equipo. Un profesional de primer nivel.',
        'José Ossa':
          'Daniel es un ingeniero excepcional. Diseñó y construyó integraciones críticas con gran autonomía y una calidad impecable. Su compromiso y colaboración lo hacen destacar en cualquier equipo.',
      },
    },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Tienes un proyecto en mente?',
      intro: 'Cuéntame qué necesitas y agendemos una conversación. Respondo dentro de 24 horas.',
      email: 'Escríbeme',
      whatsapp: 'WhatsApp',
    },
    footer: {
      copy: 'Ingeniero de Software & Consultor',
      resume: 'Currículum',
    },
    langSwitch: {
      label: 'Idioma',
      toEnglish: 'English',
      toSpanish: 'Español',
    },
  },
  en: {
    nav: {
      links: [
        { href: '#sobre-mi', label: 'About' },
        { href: '#servicios', label: 'Services' },
        { href: '#proyectos', label: 'Projects' },
        { href: '#experiencia', label: 'Experience' },
        { href: '#valoraciones', label: 'Testimonials' },
      ],
      cta: 'Book a consultation',
      openMenu: 'Open menu',
    },
    hero: {
      status: 'Available for new projects',
      titleA: 'Software Engineer ',
      titleB: '& Consultant',
      subtitle:
        'I design and build custom software, integrations and automations that drive businesses forward. I help you take your idea from concept to a scalable, reliable product.',
      ctaPrimary: 'Book a consultation',
      ctaSecondary: 'View projects',
      stats: [
        { value: '6+ years', label: 'of experience' },
        { value: 'Full-stack', label: 'web, APIs & cloud' },
        { value: 'Real product', label: 'in production' },
      ],
      portraitAlt: 'Portrait of Daniel Darritchon',
    },
    profile: {
      eyebrow: 'About me',
      title: 'Engineering focused on results',
      bio: [
        "I'm Daniel Darritchon, a software engineer with over five years building full-stack web applications, integrations and automations for companies. I specialize in turning business needs into scalable, maintainable and reliable products.",
        "I've worked everywhere from startups to production platforms used daily, covering the full cycle: architecture, development, cloud deployment and maintenance. I believe in clean code, clear communication and delivering real value, not just features.",
        'Today I combine that technical background with consulting, helping clients make better technology decisions and bring their ideas to life.',
      ],
      panelTitle: 'Stack & tools',
      skills: [
        'JavaScript / TypeScript',
        'React',
        'Node.js / Express',
        'Python / Django',
        'FastAPI / Flask',
        'PostgreSQL / SQL',
        'Docker / Kubernetes',
        'GCP / AWS',
        'Integrations & APIs',
        'Git / CI/CD',
      ],
    },
    services: {
      eyebrow: 'Consulting',
      title: 'Services I offer',
      intro:
        'I work with companies, startups and founders to build and improve their technology. Here are the ways I can help you.',
      items: [
        {
          title: 'Custom full-stack development',
          text: 'Web apps and APIs from scratch, focused on scalability, performance and maintainable code.',
        },
        {
          title: 'Integrations & automation',
          text: 'I connect your tools and automate processes: WhatsApp, email, payments and third-party APIs.',
        },
        {
          title: 'Architecture & cloud',
          text: 'Robust architecture design and cloud deployments (GCP/AWS) ready to scale.',
        },
        {
          title: 'Technical advisory',
          text: 'I support teams and founders with technical decisions, code reviews and roadmaps.',
        },
      ],
      cta: "Let's talk about your project",
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Featured projects',
      intro:
        'A selection of real products I have built. Click a project to see its image gallery and more details.',
      imageSingular: 'image',
      imagePlural: 'images',
      viewProject: 'View project',
      scrollHint: 'Scroll to move through the projects',
    },
    experience: {
      eyebrow: 'Career',
      title: 'Professional experience',
      intro:
        'I currently balance my engineering role at Front with teaching at the Pontificia Universidad Católica de Chile.',
      current: 'Current',
    },
    modal: {
      close: 'Close',
      viewDemo: 'View demo',
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What my clients say',
      intro: 'Reviews from people and teams I have worked with.',
      starsLabel: '5 out of 5 stars',
      roles: {
        'Dr. Carlos Uc': 'Pediatrician',
        'Aldo Novion': 'Founder, Accountability.cl',
        'Camilo López': 'CEO, Adereso',
        'José Ossa': 'Engineering Manager, Front',
      },
      quotes: {
        'Dr. Carlos Uc':
          'Daniel understood our problem from day one and delivered a solid solution on time. His technical skill and clear communication made the difference in the project.',
        'Aldo Novion':
          'Working with Daniel was very easy. He automated processes that used to take us hours and the result exceeded our expectations. We would definitely work with him again.',
        'Camilo López':
          'Daniel was key to taking Adereso to the next level. He led complex technical projects with judgment and ownership, and always raised the team standard. A top-tier professional.',
        'José Ossa':
          'Daniel is an exceptional engineer. He designed and built critical integrations with great autonomy and impeccable quality. His commitment and collaboration make him stand out on any team.',
      },
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Have a project in mind?',
      intro: "Tell me what you need and let's schedule a conversation. I reply within 24 hours.",
      email: 'Email me',
      whatsapp: 'WhatsApp',
    },
    footer: {
      copy: 'Software Engineer & Consultant',
      resume: 'Resume',
    },
    langSwitch: {
      label: 'Language',
      toEnglish: 'English',
      toSpanish: 'Español',
    },
  },
};
