window.addEventListener('DOMContentLoaded', () => {

  /* ============================
        MÚSICA DE FONDO
  ============================ */
  const musica = document.getElementById('bg-music');
  if (musica) {
    musica.volume = 0.2;
  }

  /* ============================
        PANTALLA DE INICIO
  ============================ */
  document.addEventListener(
    "keydown",
    () => {
      const overlay = document.getElementById("overlay-start");
      if (overlay) overlay.style.display = "none";

      if (musica) {
        musica.muted = false;
        musica.play().catch(() => {});
      }
    },
    { once: true }
  );

  /* ============================
      CARGAR DATOS DEL CV
  ============================ */
  fetch("./cv.json")
    .then(res => res.json())
    .then(data => {
      window.cvData = data;

      /* ============================
            PERFIL
      ============================ */
      const p = data.personal_info;
      document.querySelector("#perfil").innerHTML = `
        <p>> NOMBRE: ${p.nombre}</p>
        <p>> APELLIDOS: ${p.apellidos}</p>
        <p>> TELÉFONO: ${p.telefono1}</p>
        <p>> EMAIL: ${p.email_profesional1}</p>
        <p>> CIUDAD: ${p.ciudad}</p>
        <p>> PAÍS: ${p.pais}</p>
        <p>> DISPONIBILIDAD: ${p.disponibilidad}</p>
      `;

      /* ============================
            EXPERIENCIA
      ============================ */
      const expList = data.work_experience
        .sort((a, b) => a.orden - b.orden)
        .map(exp => `
          <p>> ${exp.fecha_inicio} — ${exp.puesto} ${exp.trabajo_actual ? "(ACTUAL)" : ""}</p>
        `)
        .join("");

      document.querySelector("#experiencia").innerHTML = `
        <h3>> EXPERIENCIA</h3>
        ${expList}
      `;

      /* ============================
            EDUCACIÓN
      ============================ */
      const eduList = data.education
        .sort((a, b) => a.orden - b.orden)
        .map(edu => `
          <p>> ${edu.fecha_inicio} — ${edu.titulo} ${edu.en_curso ? "(EN CURSO)" : ""}</p>
        `)
        .join("");

      document.querySelector("#educacion").innerHTML = `
        <h3>> EDUCACIÓN</h3>
        ${eduList}
      `;

      /* ============================
            SKILLS
      ============================ */
      const skillList = data.skills
        .sort((a, b) => a.orden - b.orden)
        .map(s => `
          <p>> ${s.tipo}: ${s.nombre}</p>
        `)
        .join("");

      document.querySelector("#skills").innerHTML = `
        <h3>> SKILLS</h3>
        ${skillList}
      `;

      /* ============================
            IDIOMAS
      ============================ */
      const langList = data.languages
        .sort((a, b) => a.orden - b.orden)
        .map(l => `
          <p>> ${l.idioma}: ${l.nivel}</p>
        `)
        .join("");

      document.querySelector("#idiomas").innerHTML = `
        <h3>> IDIOMAS</h3>
        ${langList}
      `;

      /* ============================
            FORMACIÓN NO REGLADA
      ============================ */
      const formList = data.complementary_training
        .sort((a, b) => a.orden - b.orden)
        .map(f => `
          <p>> ${f.tipo}: ${f.nombre}</p>
        `)
        .join("");

      document.querySelector("#formacion_no_reglada").innerHTML = `
        <h3>> FORMACIÓN NO REGLADA</h3>
        ${formList}
      `;

      /* ============================
            PROYECTOS
      ============================ */
      const projList = data.projects
        .sort((a, b) => a.orden - b.orden)
        .map(p => `
          <p>> ${p.nombre}</p>
        `)
        .join("");

      document.querySelector("#proyectos").innerHTML = `
        <h3>> PROYECTOS</h3>
        ${projList}
      `;

      /* ============================
            LOGROS
      ============================ */
      const logroList = data.achievements
        .sort((a, b) => a.orden - b.orden)
        .map(l => `
          <p>> ${l.titulo} (${l.tipo})</p>
        `)
        .join("");

      document.querySelector("#logros").innerHTML = `
        <h3>> LOGROS</h3>
        ${logroList}
      `;

      /* ============================
            VOLUNTARIADO
      ============================ */
      const volList = data.volunteering
        .sort((a, b) => a.orden - b.orden)
        .map(v => `
          <p>> ${v.organizacion}: ${v.funcion} ${v.en_curso ? "(EN CURSO)" : ""}</p>
        `)
        .join("");

      document.querySelector("#voluntariado").innerHTML = `
        <h3>> VOLUNTARIADO</h3>
        ${volList}
      `;

      /* ============================
            INTERESES
      ============================ */
      const intList = data.interests
        .sort((a, b) => a.orden - b.orden)
        .map(i => `
          <p>> ${i.nombre}</p>
        `)
        .join("");

      document.querySelector("#intereses").innerHTML = `
        <h3>> INTERESES</h3>
        ${intList}
      `;
    });

  /* ============================
        VARIABLES PRINCIPALES
  ============================ */
  const nombresNiveles = [
    "PERFIL",
    "EXPERIENCIA",
    "EDUCACIÓN",
    "SKILLS",
    "IDIOMAS",
    "FORMACIÓN",
    "PROYECTOS",
    "LOGROS",
    "VOLUNTARIADO",
    "INTERESES"
  ];

  const opciones = document.querySelectorAll('.menu .opcion');
  const secciones = document.querySelectorAll('.seccion');

  let seleccion = 0;

  /* ============================
        ACTUALIZAR NIVEL
  ============================ */
  function actualizarNivel() {
    const nivelTexto = document.querySelector(".nivel");
    nivelTexto.textContent = `★ NIVEL ${seleccion + 1}: ${nombresNiveles[seleccion]}`;
  }

  /* ============================
        MOSTRAR SECCIÓN
  ============================ */
  function mostrarSeccion(i) {
    secciones.forEach(sec => sec.classList.remove('activa'));
    secciones[i].classList.add('activa');
  }

  /* ============================
        ACTUALIZAR MENÚ
  ============================ */
  function actualizarMenu() {
    opciones.forEach((op, i) => {
      const textoBase = nombresNiveles[i];

      if (i === seleccion) {
        op.classList.add('activa');
        op.textContent = "★ " + textoBase;
      } else {
        op.classList.remove('activa');
        op.textContent = "> " + textoBase;
      }
    });

    actualizarNivel();
  }

  /* ============================
        DESLIZAR MENÚ
  ============================ */
  function deslizarMenu() {
    const menu = document.querySelector(".menu.horizontal");
    const opcionActiva = opciones[seleccion];

    const menuRect = menu.getBoundingClientRect();
    const opcionRect = opcionActiva.getBoundingClientRect();

    const offset = opcionRect.left - menuRect.left - (menuRect.width / 2) + (opcionRect.width / 2);

    menu.scrollBy({
      left: offset,
      behavior: "smooth"
    });
  }

  /* ============================
        SONIDOS
  ============================ */
  const sonidoClick = new Audio('./sounds/click.mp3');
  const sonidoSelect = new Audio('./sounds/select.mp3');
  const sonidoError = new Audio('./sounds/error.mp3');

  /* ============================
        NAVEGACIÓN POR TECLADO
  ============================ */
  document.addEventListener('keydown', (e) => {

    if (e.key === "ArrowRight") {
      seleccion = (seleccion + 1) % opciones.length;
      actualizarMenu();
      mostrarSeccion(seleccion);
      deslizarMenu();
      sonidoClick.currentTime = 0;
      sonidoClick.play();
    }

    if (e.key === "ArrowLeft") {
      seleccion = (seleccion - 1 + opciones.length) % opciones.length;
      actualizarMenu();
      mostrarSeccion(seleccion);
      deslizarMenu();
      sonidoClick.currentTime = 0;
      sonidoClick.play();
    }

    if (e.key === "Enter") {
      sonidoSelect.currentTime = 0;
      sonidoSelect.play();
    }

    if (e.key === "Escape") {
      sonidoError.currentTime = 0;
      sonidoError.play();
    }

  });

  /* ============================
        ESTADO INICIAL
  ============================ */
  actualizarMenu();
  mostrarSeccion(seleccion);
  deslizarMenu();

});
