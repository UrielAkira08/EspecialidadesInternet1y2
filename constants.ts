
import { Specialization, SpecializationId, ContentItemType, QuizQuestion, Quiz } from './types';

const COMPUTACION1_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'c1q1',
    text: '¿Qué es Internet?',
    options: [
      { id: 'a', text: 'Un único supercomputador global.' },
      { id: 'b', text: 'Una red global de computadoras interconectadas.' },
      { id: 'c', text: 'Un software para navegar sitios web.' },
      { id: 'd', text: 'Una empresa de telecomunicaciones.' }
    ],
    correctAnswerId: 'b',
    explanation: 'Internet es una red global de computadoras interconectadas que permite el intercambio de información.'
  },
  {
    id: 'c1q2',
    text: '¿Quién inventó la World Wide Web (WWW)?',
    options: [
      { id: 'a', text: 'Bill Gates' },
      { id: 'b', text: 'Steve Jobs' },
      { id: 'c', text: 'Tim Berners-Lee' },
      { id: 'd', text: 'Vint Cerf' }
    ],
    correctAnswerId: 'c',
    explanation: 'La WWW fue inventada por Tim Berners-Lee en 1989.'
  },
  {
    id: 'c1q3',
    text: '¿Cuál es el propósito principal de un software antivirus?',
    options: [
      { id: 'a', text: 'Acelerar la conexión a Internet.' },
      { id: 'b', text: 'Detectar y eliminar virus informáticos.' },
      { id: 'c', text: 'Crear copias de seguridad de archivos.' },
      { id: 'd', text: 'Diseñar páginas web.' }
    ],
    correctAnswerId: 'b',
    explanation: 'Un software antivirus protege tu computadora detectando y eliminando virus y otro malware.'
  },
   {
    id: 'c1q4',
    text: '¿Qué es "descargar" en el contexto de Internet?',
    options: [
      { id: 'a', text: 'Enviar archivos desde tu dispositivo a Internet.' },
      { id: 'b', text: 'Crear un nuevo sitio web.' },
      { id: 'c', text: 'Transferir archivos desde un servidor de Internet a un dispositivo local.' },
      { id: 'd', text: 'Eliminar archivos de tu computadora.' }
    ],
    correctAnswerId: 'c',
    explanation: 'Descargar es transferir archivos desde un servidor de Internet a tu dispositivo local.'
  },
  {
    id: 'c1q5',
    text: 'Filipenses 4:8 nos anima a pensar en cosas que son:',
    options: [
      { id: 'a', text: 'Solo divertidas y entretenidas.' },
      { id: 'b', text: 'Verdaderas, honestas, justas, puras y amables.' },
      { id: 'c', text: 'Populares y de moda.' },
      { id: 'd', text: 'Rentables y exitosas.' }
    ],
    correctAnswerId: 'b',
    explanation: 'Filipenses 4:8 nos guía a enfocar nuestros pensamientos en lo verdadero, honesto, justo, puro, amable y de buen nombre.'
  }
];

const COMPUTACION1_QUIZ: Quiz = {
  id: SpecializationId.COMPUTACION1,
  title: 'Evaluación de Computación 1',
  questions: COMPUTACION1_QUIZ_QUESTIONS
};

const COMPUTACION2_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'c2q1',
    text: '¿Qué significa HTTP?',
    options: [
      { id: 'a', text: 'HyperText Transfer Protocol' },
      { id: 'b', text: 'High Tech Transfer Protocol' },
      { id: 'c', text: 'Hyperlink Text Type Protocol' },
      { id: 'd', text: 'Home Page Text Protocol' }
    ],
    correctAnswerId: 'a',
    explanation: 'HTTP significa HyperText Transfer Protocol, el protocolo para la comunicación web.'
  },
  {
    id: 'c2q2',
    text: '¿Cuál es el propósito de la etiqueta HTML `<a>`?',
    options: [
      { id: 'a', text: 'Mostrar una imagen.' },
      { id: 'b', text: 'Crear un párrafo de texto.' },
      { id: 'c', text: 'Definir un hipervínculo.' },
      { id: 'd', text: 'Aplicar estilo en negrita al texto.' }
    ],
    correctAnswerId: 'c',
    explanation: 'La etiqueta `<a>` se usa para crear hipervínculos a otras páginas o recursos.'
  },
  {
    id: 'c2q3',
    text: '¿Qué formato de imagen es ideal para fotografías y no permite transparencia?',
    options: [
      { id: 'a', text: 'GIF' },
      { id: 'b', text: 'PNG' },
      { id: 'c', text: 'JPEG (JPG)' },
      { id: 'd', text: 'SVG' }
    ],
    correctAnswerId: 'c',
    explanation: 'JPEG (JPG) es ideal para fotografías debido a su compresión con pérdida, pero no soporta transparencias.'
  },
  {
    id: 'c2q4',
    text: '¿Para qué se utiliza HTML principalmente?',
    options: [
      { id: 'a', text: 'Para programar la lógica del servidor.' },
      { id: 'b', text: 'Para diseñar bases de datos.' },
      { id: 'c', text: 'Para estructurar el contenido de una página web.' },
      { id: 'd', text: 'Para crear animaciones complejas.' }
    ],
    correctAnswerId: 'c',
    explanation: 'HTML (HyperText Markup Language) es el lenguaje base para estructurar el contenido de las páginas web.'
  },
  {
    id: 'c2q5',
    text: '¿Cuál es una buena práctica para los gráficos web mencionada en el material?',
    options: [
      { id: 'a', text: 'Usar siempre la máxima resolución posible.' },
      { id: 'b', text: 'Que sean livianos (menos de 15k si es posible) para carga rápida.' },
      { id: 'c', text: 'Convertir todas las imágenes a formato BMP.' },
      { id: 'd', text: 'Evitar el uso de imágenes para mejorar la velocidad.' }
    ],
    correctAnswerId: 'b',
    explanation: 'Los gráficos web deben ser livianos para que la página cargue rápido. Comprimir imágenes es una práctica clave.'
  }
];

const COMPUTACION2_QUIZ: Quiz = {
  id: SpecializationId.COMPUTACION2,
  title: 'Evaluación de Computación 2',
  questions: COMPUTACION2_QUIZ_QUESTIONS
};


export const SPECIALIZATIONS_DATA: Specialization[] = [
  {
    id: SpecializationId.COMPUTACION1,
    title: "Computación 1",
    description: "Aprende los conceptos básicos de Internet, la World Wide Web, seguridad informática y el uso responsable de la tecnología.",
    sections: [
      {
        id: "c1s1",
        title: "1. Defina los términos siguientes:",
        items: [
          {
            id: "c1s1i1", type: ContentItemType.DEFINITION_GROUP,
            content: {
              items: [
                { term: "Internet", description: "Una red global de computadoras interconectadas que permite el intercambio de información en forma de texto, imágenes, audio y video. Fue desarrollada inicialmente como ARPANET en 1969 por el Departamento de Defensa de EE. UU. y hoy conecta a millones de personas y dispositivos en todo el mundo." },
                { term: "World Wide Web (WWW)", description: "Es un sistema de distribución de documentos de hipertexto interconectados y accesibles a través de Internet mediante navegadores web. Fue inventado por Tim Berners-Lee en 1989 y permite visualizar sitios web mediante enlaces." },
                { term: "Sala de chat o redes sociales", description: "Lugares virtuales donde las personas pueden comunicarse en tiempo real (chat) o de forma asincrónica (redes sociales como Facebook o Instagram), compartiendo ideas, fotos y más. Son medios sociales interactivos que requieren responsabilidad cristiana al usarlos." },
                { term: "Descargar", description: "Transferir archivos desde un servidor de Internet a un dispositivo local. Por ejemplo, bajar un PDF de una página web a tu computadora." },
                { term: "Subir", description: "El proceso inverso: enviar archivos desde tu dispositivo a Internet. Ejemplo: subir una foto a Google Drive o enviar un video a YouTube." },
                { term: "Sitio web", description: "Una colección de páginas web agrupadas bajo un mismo dominio, accesibles a través de Internet. Ejemplo: www.adventistas.org" },
                { term: "Virus", description: "Un programa dañino que puede infectar archivos y sistemas, alterar funciones, robar datos o destruir información. Se propaga por medios como archivos adjuntos, sitios web inseguros o dispositivos USB." }
              ]
            }
          }
        ]
      },
      {
        id: "c1s2",
        title: "2. Defina los siguientes términos y dé ejemplos:",
        items: [
          {
            id: "c1s2i1", type: ContentItemType.DEFINITION_GROUP,
            content: {
              items: [
                { term: "Correo electrónico", description: "Servicio para enviar y recibir mensajes digitales.", example: "Gmail, Outlook. Se usa para comunicarse profesionalmente o entre amigos y familiares." },
                { term: "Navegador web", description: "Aplicación para acceder a sitios web.", example: "Google Chrome, Mozilla Firefox, Safari. Permite leer noticias, ver videos o buscar información bíblica." },
                { term: "Cliente IRC / IM (Instant Messenger)", description: "Programas para mensajería instantánea.", example: "Telegram, WhatsApp Web, o Discord. Permiten chats en tiempo real, incluyendo voz y video." },
                { term: "Transmisión", description: "Streaming en inglés. Es ver o escuchar contenido (como YouTube o Spotify) directamente desde Internet sin descargarlo." },
                { term: "Motor de búsqueda y directorios", description: "Un motor como Google, Bing o DuckDuckGo permite buscar sitios web. Un directorio es una lista organizada por categorías (como DMOZ en el pasado)." },
                { term: "Software antivirus", description: "Programa que detecta y elimina virus informáticos.", example: "Avast, Bitdefender. Protege tu computadora de amenazas." },
                { term: "Cortafuegos (firewall)", description: "Barreras que impiden accesos no autorizados a una red o dispositivo. Ayudan a proteger la privacidad y datos personales." }
              ]
            }
          }
        ]
      },
      {
        id: "c1s3",
        title: "3. Historia de Internet (resumen de 250-300 palabras)",
        items: [
          {
            id: "c1s3i1", type: ContentItemType.TEXT_BLOCK,
            content: { text: "La historia de Internet comienza en los años 60 con la creación de ARPANET, una red militar estadounidense. En 1969, la Universidad de California envió el primer mensaje electrónico. En los años 80, ARPANET se expandió y comenzó a ser usada por universidades. Fue en 1989 cuando Tim Berners-Lee propuso la World Wide Web (WWW), permitiendo la navegación por sitios con enlaces de hipertexto.\n\nEn 1993, se lanzó el primer navegador gráfico, Mosaic, que hizo la web accesible al público. Luego llegaron Netscape Navigator, el popular Internet Explorer (Microsoft), y más tarde Google Chrome y Mozilla Firefox. A finales de los 90 y principios de los 2000, Internet creció rápidamente, permitiendo correo electrónico, redes sociales, transmisión de video, tiendas en línea y más.\n\nHoy, Internet se ha convertido en una herramienta vital para la educación, el trabajo, la evangelización y la comunicación. Ha dado lugar a servicios como el almacenamiento en la nube, la inteligencia artificial, los dispositivos conectados (IoT) y plataformas adventistas que transmiten mensajes de esperanza al mundo." }
          },
          {
            id: "c1s3i2", type: ContentItemType.TEXT_BLOCK,
            content: { text: "Fuentes:\n1. https://www.history.com/topics/internet\n2. https://computerhistory.org", isBold: true }
          }
        ]
      },
      {
        id: "c1s4",
        title: "4. ¿Por qué es importante el software antivirus?",
        items: [
          {
            id: "c1s4i1", type: ContentItemType.QUESTION_ANSWER,
            content: {
              items: [
                { question: "¿Cómo pueden llegar virus desde Internet?", answer: "A través de correos con archivos infectados, sitios web maliciosos, enlaces falsos, descargas piratas o redes compartidas." },
                { question: "¿Por qué mantenerlo actualizado?", answer: "Porque cada día surgen nuevos virus. Un antivirus actualizado protege frente a amenazas recientes, asegurando que tus archivos personales y del ministerio estén seguros." },
                { question: "¿Qué pasa si no estoy protegido?", answer: "Puedes enviar archivos infectados por correo a amigos o familiares, dañando también sus equipos y propagando el virus." },
                { question: "¿Qué daño puede causar un virus?", answer: "Puede eliminar tus archivos, robar tu información (fotos, contraseñas), controlar tu computadora o hacerla inservible. También puede usarse para atacar sitios web o enviar spam." }
              ]
            }
          }
        ]
      },
      {
        id: "c1s5",
        title: "5. Filtros / Controles parentales y Pacto de uso familiar",
        items: [
          { id: "c1s5i1", type: ContentItemType.TEXT_BLOCK, content: { text: "Controles parentales como Net Nanny o Qustodio protegen a las familias al:" } },
          {
            id: "c1s5i2", type: ContentItemType.LIST,
            content: {
              items: [
                { text: "Bloquear contenido inapropiado." },
                { text: "Limitar tiempo en línea." },
                { text: "Supervisar sitios visitados." },
                { text: "Prevenir ciberacoso o adicciones digitales." }
              ]
            }
          },
          { id: "c1s5i3", type: ContentItemType.SUB_HEADING, content: { text: "Pacto familiar de uso de Internet" } },
          { id: "c1s5i4", type: ContentItemType.TEXT_BLOCK, content: { text: "Nos comprometemos a:" } },
          {
            id: "c1s5i5", type: ContentItemType.LIST,
            content: {
              items: [
                { text: "Nunca revelar datos personales (nombre completo, dirección, escuela)." },
                { text: "Recordar que no todos en línea son quienes dicen ser." },
                { text: "No conocer personas en persona sin acompañamiento de un adulto." },
                { text: "No responder a mensajes ofensivos." },
                { text: "Detenernos si vemos contenido perturbador y avisar a un adulto." },
                { text: "Usar Internet un máximo de __ horas por semana, para equilibrar deberes, culto familiar y recreación." },
                { text: "Visitar solo sitios aprobados. Evitaremos sitios de violencia, chismes, sensualidad o mentira." }
              ]
            }
          },
          { id: "c1s5i6", type: ContentItemType.SUB_HEADING, content: { text: "Principios bíblicos:" } },
          { id: "c1s5i7", type: ContentItemType.TEXT_BLOCK, content: { text: "Filipenses 4:8 – Pensar en todo lo verdadero, honesto, justo, puro y amable. Nuestro uso de Internet debe reflejar la mente de Cristo." } }
        ]
      },
      {
        id: "c1s6",
        title: "6. Demostraciones prácticas",
        introduction: "Puedes guardar las capturas para tu instructor:",
        items: [
          {
            id: "c1s6i1", type: ContentItemType.TASK_GROUP,
            content: {
              items: [
                { description: "Visita 3 sitios diferentes:", details: ["1. www.adventistas.org", "2. www.biblegateway.com", "3. www.nadadventist.org"], resources: [{ text: "Adventistas.org", url: "https://www.adventistas.org" }, { text: "Bible Gateway", url: "https://www.biblegateway.com" }, { text: "NAD Adventist", url: "https://www.nadadventist.org" }] },
                { description: "Uso de motor de búsqueda para encontrar Biblia en línea:", details: ["Buscar: “Biblia en línea”. Resultado: BibleGateway", "Versículos: Juan 3:16, Salmo 23:1, Romanos 8:28", "Versiones: NVI, RVR1960, La Palabra"] },
                { description: "Visita 3 sitios adventistas:", details: ["1. www.adventistas.org", "2. www.hopemedia.es", "3. www.educacionadventista.com"], resources: [{ text: "Adventistas.org", url: "https://www.adventistas.org" }, { text: "HopeMedia España", url: "https://www.hopemedia.es" }, { text: "Educación Adventista", url: "https://www.educacionadventista.com" }] },
                { description: "Descarga y descompresión:", details: ["Descarga un archivo .zip desde www.win-rar.com, descomprímelo y ejecuta el archivo."], resources: [{ text: "WinRAR", url: "https://www.win-rar.com" }] }
              ]
            }
          }
        ]
      },
      {
        id: "c1s7",
        title: "7. Uso del correo electrónico",
        introduction: "Demuestra:",
        items: [
          {
            id: "c1s7i1", type: ContentItemType.LIST,
            content: {
              items: [
                { text: "Crear cuenta en Gmail (si no tienes)." },
                { text: "Enviar un mensaje a un amigo o líder." },
                { text: "Descargar un archivo adjunto (como un PDF)." },
                { text: "Mostrar que sabes recibir y responder correos." }
              ]
            }
          },
          { id: "c1s7i2", type: ContentItemType.SUB_HEADING, content: { text: "5 principios del correo seguro:" } },
          {
            id: "c1s7i3", type: ContentItemType.LIST,
            content: {
              items: [
                { text: "No abras mensajes de desconocidos." },
                { text: "No descargues archivos sospechosos." },
                { text: "Usa contraseñas seguras." },
                { text: "Nunca compartas tu contraseña." },
                { text: "Cierra sesión en dispositivos públicos." }
              ]
            }
          }
        ]
      },
      {
        id: "c1s8",
        title: "8. Versículo para memorizar",
        items: [
          {
            id: "c1s8i1", type: ContentItemType.MEMORIZE_VERSE,
            content: {
              reference: "Filipenses 4:8 (RVR1960)",
              text: "«Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si algo digno de alabanza, en esto pensad.»",
              commentary: "Este versículo guía el uso cristiano de Internet, ayudándonos a filtrar lo que vemos, leemos y compartimos."
            }
          }
        ]
      }
    ],
    quiz: COMPUTACION1_QUIZ
  },
  {
    id: SpecializationId.COMPUTACION2,
    title: "Computación 2",
    description: "Profundiza en los aspectos técnicos de la web, incluyendo HTML, protocolos, colores, y el desarrollo básico de sitios web.",
    sections: [
      {
        id: "c2s1",
        title: "1. Defina los siguientes términos (o sus equivalentes), y diga cuándo y cómo se usan:",
        items: [
          {
            id: "c2s1i1", type: ContentItemType.DEFINITION_GROUP,
            content: {
              items: [
                { term: "HTTP", description: "Significa HyperText Transfer Protocol. Es el protocolo que permite la comunicación entre tu navegador y los servidores web. Se usa cada vez que visitas un sitio web (por ejemplo, http://adventistas.org). La versión segura es HTTPS, que cifra la información." },
                { term: "Hipervínculo", description: "Es un enlace que al hacer clic te lleva a otra parte de la misma página o a otro sitio web. Se usa para facilitar la navegación en documentos digitales.", example: "<a href=\"https://www.adventistas.org\">Sitio Oficial</a>" },
                { term: "HTML / PHP", description: "HTML (HyperText Markup Language): lenguaje base para estructurar una página web (títulos, párrafos, enlaces, imágenes).\nPHP (Hypertext Preprocessor): lenguaje de programación del lado del servidor, usado para crear sitios web dinámicos como WordPress o portales de iglesia." },
                { term: "Colores seguros del navegador y códigos hexadecimales", description: "Los colores seguros son los 216 colores que se ven igual en todos los navegadores antiguos. Los códigos hexadecimales son representaciones de color (ej: #FF0000 = rojo). Se usan para diseño web:", example: "body { background-color: #F5F5DC; }" },
                { term: "URL", description: "Es la dirección de un recurso en la web.", example: "https://www.hopemedia.es/sermones/salvacion\nUna URL permite a cualquier usuario acceder exactamente a una página, imagen, documento o recurso." },
                { term: "GIF / PNG", description: "GIF: formato de imagen que permite animaciones y fondo transparente. Bueno para logos simples.\nPNG: permite transparencias y buena calidad. Usado en diseño web para elementos con fondo transparente. Ideal para imágenes sin pérdida." },
                { term: "JPEG (JPG)", description: "Formato comprimido de imagen que conserva buena calidad. Ideal para fotografías. No permite transparencia." }
              ]
            }
          }
        ]
      },
      {
        id: "c2s2",
        title: "2. Aprenda y demuestre el uso de estas etiquetas HTML:",
        items: [
          {
            id: "c2s2i1", type: ContentItemType.HTML_EXAMPLE,
            content: {
              code: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Sitio</title>
  </head>
  <body>
    <h1 style="color:#2E8B57">Bienvenido</h1>
    <p>Este es un sitio web de prueba.</p>
    <b>Texto en negrita</b><br>
    <i>Texto en cursiva</i><br>
    <a href="https://www.adventistas.org">Visita Adventistas</a><br>
    <img src="https://picsum.photos/seed/logo_html/100/50" alt="Logo"><br>
    <hr>
    <table border="1">
      <tr>
        <td>Nombre</td>
        <td>Correo</td>
      </tr>
      <tr>
        <td>Uriel</td>
        <td>correo@example.com</td>
      </tr>
    </table>
  </body>
</html>`,
              explanation: "Este código HTML demuestra etiquetas básicas como encabezados, párrafos, negrita, cursiva, enlaces, imágenes, líneas horizontales y tablas. La imagen es un placeholder."
            }
          }
        ]
      },
      {
        id: "c2s3",
        title: "3. Tabla simple con diseño:",
        introduction: "Incluye texto, imagen, línea horizontal y enlace. Usa hexadecimales para color:",
        items: [
          {
            id: "c2s3i1", type: ContentItemType.HTML_TABLE_EXAMPLE,
            content: {
              code: `<html>
  <head>
    <title>Mi Tabla</title>
  </head>
  <body style="font-family:sans-serif; background:#FFFFFF; color:#333333;">
    <h1 style="color:#0055A5;">Tabla de Contacto</h1>
    <hr>
    <table border="1" cellpadding="10">
      <tr>
        <th style="background:#CDE4F2;">Nombre</th>
        <th style="background:#CDE4F2;">Correo</th>
      </tr>
      <tr>
        <td>Daniel</td>
        <td>daniel@ejemplo.com</td>
      </tr>
    </table>
    <p>Visita nuestro <a href="https://www.adventistas.org" style="color:#0055A5;">sitio web</a>.</p>
    <img src="https://picsum.photos/seed/foto_table/200/150" width="200" alt="Foto Placeholder">
  </body>
</html>`,
              explanation: "Este ejemplo muestra una tabla HTML con estilos en línea para colores de fondo, texto y fuente. También incluye un encabezado, una línea horizontal, un párrafo con un enlace y una imagen. La imagen es un placeholder."
            }
          }
        ]
      },
      {
        id: "c2s4",
        title: "4. Gráficos web y optimización",
        items: [
           {
            id: "c2s4i1", type: ContentItemType.LIST,
            content: {
                items: [
                    { text: "Gráficos Web: deben ser livianos (menos de 15k si es posible) para que se descarguen rápido y la página cargue bien." },
                    { text: "Usa TinyPNG o Squoosh.app para comprimir.", subItems: [{text: "TinyPNG", subItems: [{text:"https://tinypng.com/"}]}, {text: "Squoosh.app", subItems: [{text:"https://squoosh.app/"}]}] },
                    { text: "PNG para transparencias. JPG para fotos. GIF para iconos simples o animaciones." },
                    { text: "Botones gráficos: puedes crear con herramientas como Canva, Figma, Photoshop o editores online. Guardarlos en PNG con fondo transparente." }
                ]
            }
           }
        ]
      },
      {
        id: "c2s5",
        title: "5. Desarrollo de sitio web funcional",
        introduction: "🔗 El sitio debe tener al menos 4 páginas:",
        items: [
          {
            id: "c2s5i1", type: ContentItemType.TASK_GROUP,
            content: {
              items: [
                { description: "Página de bienvenida", details: ["Contenido: título, propósito del sitio, imagen.", "Ejemplo: “Bienvenido al Club de Conquistadores Orión de Coatzacoalcos”."] },
                { description: "Página de fotos", details: ["Imágenes de eventos como: Campori, Día del Conquistador, caminatas, etc.", "Puedes usar <img src=\"campori.jpg\"> y organizar con <div> o <table>."] },
                { description: "Libro de visitas o contacto", details: ["Puede ser un formulario simple (usando Formspree, Google Forms o PHP). O colocar tu correo:", "Contáctanos: cluborion@miiglesia.org"] },
                { description: "Página de enlaces", details: ["Al menos 8 sitios web favoritos o útiles:", "• www.adventistas.org", "• www.biblegateway.com", "• www.hopemedia.es", "• www.maranatha.org", "• www.adventist.org", "• www.conflictoinminente.com", "• www.educacionadventista.com", "• www.iasdsureste.org.mx"] },
                { description: "(Opcional pero recomendado): Página de calendario", details: ["Calendario con eventos mensuales, reuniones, fechas de investidura. Usa una tabla o incrusta un calendario de Google."] }
              ]
            }
          }
        ]
      },
      {
        id: "c2s6",
        title: "6. Mantenimiento por 3 meses",
        items: [
          {
            id: "c2s6i1", type: ContentItemType.LIST,
            content: {
              items: [
                { text: "Actualiza semanalmente el sitio." },
                { text: "Cambia imágenes, escribe novedades, actualiza el calendario." },
                { text: "Asegúrate de que todos los enlaces funcionen y las imágenes carguen correctamente." },
                { text: "Puedes subir el sitio a un servidor gratuito como GitHub Pages o Netlify." }
              ]
            }
          }
        ]
      }
    ],
    quiz: COMPUTACION2_QUIZ
  }
];

export const getSpecializationById = (id: SpecializationId): Specialization | undefined => {
  return SPECIALIZATIONS_DATA.find(spec => spec.id === id);
};