window.addEventListener('DOMContentLoaded', () => {

  /* MÚSICA DE FONDO */
  const musica = document.getElementById('bg-music');
  if (musica) {
    musica.volume = 0.2;

    window.addEventListener("load", () => {
      setTimeout(() => {
        musica.muted = false;
      }, 200);
    });
  }

  /* SECCIONES */
  const secciones = document.querySelectorAll('.seccion');
  let index = 0;

  function mostrarSeccion(i) {
    if (!secciones.length) return;
    secciones.forEach(sec => sec.classList.remove('activa'));
    secciones[i].classList.add('activa');

    const nombres = ["PERFIL", "EXPERIENCIA", "EDUCACIÓN", "SKILLS"];
    console.log("Sección actual:", nombres[i]);
  }

  /* SONIDOS 8-BIT */
  const sonidoClick = new Audio('./sounds/floraphonic.mp3');
  const sonidoSelect = new Audio('./sounds/floraphonic.mp3');
  const sonidoError = new Audio('./sounds/floraphonic.mp3');

  /* MENÚ (estrella) */
  const opciones = document.querySelectorAll('.menu .opcion');
  let seleccion = 0;

  function actualizarMenu() {
    if (!opciones.length) return;
    opciones.forEach((op, i) => {
      if (i === seleccion) {
        op.classList.add('activa');
        op.textContent = "★ " + op.textContent.replace(/^★ /, "").replace(/^> /, "");
      } else {
        op.classList.remove('activa');
        op.textContent = "> " + op.textContent.replace(/^★ /, "").replace(/^> /, "");
      }
    });
  }

  actualizarMenu();

  /* NAVEGACIÓN POR TECLADO */
  document.addEventListener('keydown', (e) => {

    // FLECHA ABAJO
    if (e.key === "ArrowDown") {

      if (secciones.length) {
        index = (index + 1) % secciones.length;
        mostrarSeccion(index);
      }

      if (opciones.length) {
        seleccion = (seleccion + 1) % opciones.length;
        actualizarMenu();
      }

      sonidoClick.currentTime = 0;
      sonidoClick.play();
    }

    // FLECHA ARRIBA
    if (e.key === "ArrowUp") {

      if (secciones.length) {
        index = (index - 1 + secciones.length) % secciones.length;
        mostrarSeccion(index);
      }

      if (opciones.length) {
        seleccion = (seleccion - 1 + opciones.length) % opciones.length;
        actualizarMenu();
      }

      sonidoClick.currentTime = 0;
      sonidoClick.play();
    }

    // ENTER
    if (e.key === "Enter") {
      sonidoSelect.currentTime = 0;
      sonidoSelect.play();
    }

    // ESCAPE
    if (e.key === "Escape") {
      sonidoError.currentTime = 0;
      sonidoError.play();
    }
  });

});
