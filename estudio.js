'use strict';

/* =========================================================
   Estudio AVSEC · Lógica
   Router por hash, vistas, práctica, puesto de control, fichas.
   Sin dependencias: HTML + CSS + JS.
   ========================================================= */
(function () {
  var $main = document.getElementById('contenido');
  var $nav = document.getElementById('nav');

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function barajar(a) {
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = r[i]; r[i] = r[j]; r[j] = t;
    }
    return r;
  }
  function azar(a) { return a[Math.floor(Math.random() * a.length)]; }
  function modulo(id) { return EAA.MODULOS.filter(function (m) { return m.id === id; })[0]; }

  /* ---------- Almacenamiento (puede fallar: modo privado, bloqueado) ---------- */
  var memoria = {};
  function leer(k, def) {
    try { var v = localStorage.getItem(k); return v == null ? (k in memoria ? memoria[k] : def) : JSON.parse(v); }
    catch (e) { return k in memoria ? memoria[k] : def; }
  }
  function guardar(k, v) {
    memoria[k] = v;
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
  var CLAVE = 'eaa-progreso';
  function progreso() {
    var p = leer(CLAVE, null) || {};
    p.vistos = p.vistos || {};
    p.quiz = p.quiz || {};
    p.puesto = p.puesto || { mejor: 0, jugadas: 0 };
    p.fichas = p.fichas || {};
    return p;
  }
  function salvar(p) { guardar(CLAVE, p); }

  /* ---------- Tema ---------- */
  var $tema = document.getElementById('toggleTema');
  var $perilla = document.getElementById('temaPerilla');
  function aplicarTema(oscuro, persistir) {
    document.documentElement.classList.toggle('dark', oscuro);
    $tema.setAttribute('aria-checked', String(oscuro));
    $perilla.textContent = oscuro ? '🌙' : '☀️';
    if (persistir) guardar('tema', oscuro ? 'oscuro' : 'claro');
    try { if (persistir) localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro'); } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', oscuro ? '#232C3A' : '#FFC72C');
  }
  aplicarTema(document.documentElement.classList.contains('dark'), false);
  $tema.addEventListener('click', function () {
    aplicarTema(!document.documentElement.classList.contains('dark'), true);
  });

  /* ---------- Catálogo (mismo que la consulta y el mantenedor) ---------- */
  var catalogo = { elementos: [], error: false, cargado: false };
  var promesaCatalogo = fetch('./catalogo.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
    .then(function (d) { catalogo.elementos = d.elementos || []; catalogo.cargado = true; })
    .catch(function () { catalogo.error = true; catalogo.cargado = true; });

  var CATEGORIAS = [
    { id: 'liquidos', n: 'Líquidos y geles' }, { id: 'electronica', n: 'Electrónica y baterías' },
    { id: 'cortopunzantes', n: 'Cortopunzantes' }, { id: 'armas', n: 'Armas y municiones' },
    { id: 'inflamables', n: 'Inflamables y químicos' }, { id: 'deportivos', n: 'Artículos deportivos' },
    { id: 'salud', n: 'Salud y medicamentos' }, { id: 'alimentos', n: 'Alimentos' }, { id: 'otros', n: 'Otros' }
  ];
  var ESTADO = {
    permitido: { ico: '✅', t: 'Permitido' },
    restringido: { ico: '⚠️', t: 'Restringido' },
    prohibido: { ico: '❌', t: 'Prohibido' }
  };
  var ICONO_RESPALDO = { 'svg:arma-fuego': '🎯', 'svg:spray-defensa': '🧴' };

  function elemento(id) { return catalogo.elementos.filter(function (e) { return e.id === id; })[0]; }
  function icono(e) { var i = e.icono || '📦'; return ICONO_RESPALDO[i] || (i.indexOf('svg:') === 0 ? '📦' : i); }
  function chipEstado(zona, estado, extra) {
    var s = ESTADO[estado] || ESTADO.restringido;
    return '<span class="est ' + esc(estado) + '"><span aria-hidden="true">' + s.ico + '</span>' + esc(zona) + ': ' + s.t + (extra || '') + '</span>';
  }
  function tarjetaItem(e) {
    return '<li class="item-cat"><span class="icono" aria-hidden="true">' + esc(icono(e)) + '</span><div>' +
      '<strong>' + esc(e.nombre.es) + '</strong>' +
      '<div class="estados">' + chipEstado('Cabina', e.mano) + chipEstado('Bodega', e.bodega) +
      (e.aprobacion === true ? '<span class="est restringido">Requiere aprobación</span>' : '') + '</div>' +
      '<p class="limite">' + esc(e.limite.es) + '</p></div></li>';
  }

  /* ---------- Navegación ---------- */
  var SECCIONES = [
    { r: '', ico: '🏠', t: 'Inicio' },
    { r: 'modulos', ico: '📘', t: 'Módulos' },
    { r: 'practica', ico: '📝', t: 'Práctica' },
    { r: 'puesto', ico: '🛃', t: 'Puesto de control' },
    { r: 'fichas', ico: '🗂️', t: 'Fichas' },
    { r: 'glosario', ico: '🔤', t: 'Glosario' },
    { r: 'fuentes', ico: '📚', t: 'Fuentes', escritorio: true }
  ];
  function dibujarNav(actual) {
    $nav.innerHTML = SECCIONES.map(function (s) {
      return '<a href="#/' + s.r + '"' + (s.r === actual ? ' aria-current="page"' : '') + (s.escritorio ? ' class="solo-escritorio"' : '') + '>' +
        '<span class="ico" aria-hidden="true">' + s.ico + '</span><span>' + (s.r === 'puesto' ? 'Puesto' : s.t) + '</span></a>';
    }).join('');
    // etiqueta completa para lectores de pantalla
    var as = $nav.querySelectorAll('a');
    SECCIONES.forEach(function (s, i) { as[i].setAttribute('aria-label', s.t); });
  }

  /* ---------- Router ---------- */
  function ruta() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var partes = h.split('/');
    return { seccion: partes[0] || '', arg: partes[1] || '' };
  }
  function pintar(html, opciones) {
    $main.innerHTML = html;
    if (!opciones || !opciones.sinFoco) {
      window.scrollTo(0, 0);
      var h1 = $main.querySelector('h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
  }
  function navegar() {
    var r = ruta();
    dibujarNav(r.seccion === 'modulo' ? 'modulos' : r.seccion);
    document.title = 'Estudio AVSEC · Objetos prohibidos y mercancías peligrosas';
    detenerJuegos();
    promesaCatalogo.then(function () {
      switch (r.seccion) {
        case '': vistaInicio(); break;
        case 'modulos': vistaModulos(); break;
        case 'modulo': vistaModulo(r.arg); break;
        case 'practica': vistaPractica(r.arg); break;
        case 'puesto': vistaPuesto(); break;
        case 'fichas': vistaFichas(); break;
        case 'glosario': vistaGlosario(); break;
        case 'fuentes': vistaFuentes(); break;
        default: vistaInicio();
      }
    });
  }
  window.addEventListener('hashchange', navegar);

  var limpiezas = [];
  function detenerJuegos() { limpiezas.forEach(function (f) { f(); }); limpiezas = []; }

  function avisoCatalogo() {
    return catalogo.error
      ? '<div class="callout alerta"><h3>No se pudo cargar el catálogo</h3><p>Esta sección usa <code>catalogo.json</code>. Si abriste el archivo directamente desde tu computador, ábrelo a través de GitHub Pages o de un servidor local.</p></div>'
      : '';
  }

  /* =======================================================
     INICIO
     ======================================================= */
  function vistaInicio() {
    var p = progreso();
    var total = EAA.MODULOS.length;
    var vistos = EAA.MODULOS.filter(function (m) { return p.vistos[m.id]; }).length;
    var pct = Math.round(vistos / total * 100);
    var mejores = Object.keys(p.quiz).map(function (k) { return p.quiz[k]; });
    var mejorQuiz = mejores.length ? Math.max.apply(null, mejores) : null;
    var siguiente = EAA.MODULOS.filter(function (m) { return !p.vistos[m.id]; })[0];

    var html = '<section class="portada">' +
      '<h1>Aprende qué puede y qué no puede viajar en un avión</h1>' +
      '<p class="lead">Ruta de estudio para estudiantes TNS AVSEC sobre objetos prohibidos y mercancías peligrosas, con las reglas del catálogo que mantiene la ETA.</p>' +
      '<div class="fila-btn">' +
        (siguiente
          ? '<a class="btn btn-primario" href="#/modulo/' + siguiente.id + '">' + (vistos ? 'Continuar: ' : 'Empezar: ') + esc(siguiente.titulo) + '</a>'
          : '<a class="btn btn-primario" href="#/practica">Rendir el examen integrador</a>') +
        '<a class="btn" href="#/puesto">Probar el puesto de control</a>' +
      '</div>' +
      '<div class="progreso-global" role="group" aria-label="Tu avance">' +
        '<div class="fila"><span>Módulos estudiados</span><span>' + vistos + ' de ' + total + '</span></div>' +
        '<div class="barra-prog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>' +
        '<div class="stats"><div><strong>' + (mejorQuiz == null ? '—' : mejorQuiz + '%') + '</strong>mejor puntaje en práctica</div>' +
        '<div><strong>' + (p.puesto.jugadas ? p.puesto.mejor + '/10' : '—') + '</strong>mejor en puesto de control</div>' +
        '<div><strong>' + Object.keys(p.fichas).filter(function (k) { return p.fichas[k]; }).length + '</strong>fichas dominadas</div></div>' +
      '</div></section>';

    if (catalogo.elementos.length) {
      html += '<section class="reto" aria-labelledby="retoT"><h2 id="retoT">Reto rápido</h2><div id="retoCaja"></div></section>';
    }
    html += avisoCatalogo();
    html += '<h2>Módulos</h2><ul class="lista-modulos">' + EAA.MODULOS.map(function (m, i) { return tarjetaModulo(m, i, p); }).join('') + '</ul>';
    pintar(html);
    if (catalogo.elementos.length) retoRapido();
  }

  function tarjetaModulo(m, i, p) {
    return '<li><a class="tarjeta-mod" href="#/modulo/' + m.id + '"><span class="placa" aria-hidden="true">' + (i + 1) + '</span>' +
      '<span class="cuerpo"><strong><span class="sr-only">Módulo ' + (i + 1) + ': </span>' + esc(m.titulo) + '</strong>' +
      '<span class="res">' + esc(m.resumen) + '</span>' +
      '<span class="meta">' + m.minutos + ' min de lectura</span></span>' +
      (p.vistos[m.id] ? '<span class="visto">✓ Estudiado</span>' : '') + '</a></li>';
  }

  function retoRapido() {
    var caja = document.getElementById('retoCaja');
    if (!caja) return;
    var e = azar(catalogo.elementos);
    caja.innerHTML = '<div class="reto-objeto"><span class="icono" aria-hidden="true">' + esc(icono(e)) + '</span><strong>' + esc(e.nombre.es) + '</strong></div>' +
      '<p id="retoP">¿Puede viajar en el <strong>equipaje de mano (cabina)</strong>?</p>' +
      '<div class="tres" style="margin-top:.7rem" id="retoOpc">' +
      ['permitido', 'restringido', 'prohibido'].map(function (s) {
        return '<button type="button" class="opcion" data-s="' + s + '"><span aria-hidden="true">' + ESTADO[s].ico + '</span>' + ESTADO[s].t + '</button>';
      }).join('') + '</div><div id="retoRetro" aria-live="polite"></div>';
    caja.querySelectorAll('.opcion').forEach(function (b) {
      b.addEventListener('click', function () {
        var ok = b.getAttribute('data-s') === e.mano;
        caja.querySelectorAll('.opcion').forEach(function (x) {
          x.disabled = true;
          if (x.getAttribute('data-s') === e.mano) x.classList.add('correcta');
        });
        if (!ok) b.classList.add('incorrecta');
        document.getElementById('retoRetro').innerHTML =
          '<div class="retro ' + (ok ? 'bien' : 'mal') + '"><strong>' + (ok ? 'Correcto.' : 'Casi.') + ' En cabina es: ' + ESTADO[e.mano].t.toLowerCase() + '.</strong>' + esc(e.limite.es) +
          '</div><div class="fila-btn"><button type="button" class="btn" id="otroReto">Otro objeto</button></div>';
        document.getElementById('otroReto').addEventListener('click', retoRapido);
        document.getElementById('otroReto').focus();
      });
    });
  }

  /* =======================================================
     MÓDULOS
     ======================================================= */
  function vistaModulos() {
    var p = progreso();
    pintar('<h1>Módulos</h1><p class="lead">Ocho módulos para estudiar en orden o por separado. Cada uno termina con una síntesis y su práctica.</p>' +
      '<ul class="lista-modulos" style="margin-top:1.4rem">' + EAA.MODULOS.map(function (m, i) { return tarjetaModulo(m, i, p); }).join('') + '</ul>');
  }

  function vistaModulo(id) {
    var idx = -1;
    EAA.MODULOS.forEach(function (m, i) { if (m.id === id) idx = i; });
    if (idx < 0) { location.hash = '#/modulos'; return; }
    var m = EAA.MODULOS[idx];
    var p = progreso();
    document.title = m.titulo + ' · Estudio AVSEC';

    var html = '<p class="migas"><a href="#/modulos">Módulos</a> › Módulo ' + (idx + 1) + '</p>' +
      '<div class="cab-mod"><span class="placa placa-grande" aria-hidden="true">' + (idx + 1) + '</span><div><h1>' + esc(m.titulo) + '</h1>' +
      '<p class="lead" style="margin-top:.3rem">' + esc(m.resumen) + '</p></div></div>' +
      '<section class="objetivos" aria-labelledby="objT"><h2 id="objT">Al terminar podrás</h2><ul>' +
      m.objetivos.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></section>';

    html += '<div class="texto">' + m.bloques.map(bloque).join('') + '</div>';
    html += '<section class="clave-lista" aria-labelledby="claveT"><h2 id="claveT">Lo esencial</h2><ul>' +
      m.clave.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></section>';

    html += '<div class="mod-pie"><button type="button" class="btn ' + (p.vistos[m.id] ? '' : 'btn-primario') + '" id="marcarVisto" aria-pressed="' + !!p.vistos[m.id] + '">' +
      (p.vistos[m.id] ? '✓ Estudiado (quitar marca)' : 'Marcar como estudiado') + '</button>' +
      '<a class="btn" href="#/practica/' + m.id + '">Practicar este módulo</a></div>';
    html += '<div class="mod-nav">' +
      (idx > 0 ? '<a class="btn" href="#/modulo/' + EAA.MODULOS[idx - 1].id + '">‹ ' + esc(EAA.MODULOS[idx - 1].titulo) + '</a>' : '<span></span>') +
      (idx < EAA.MODULOS.length - 1 ? '<a class="btn" href="#/modulo/' + EAA.MODULOS[idx + 1].id + '">' + esc(EAA.MODULOS[idx + 1].titulo) + ' ›</a>' : '<span></span>') + '</div>';
    html += catalogo.error ? avisoCatalogo() : '';
    pintar(html);

    document.getElementById('marcarVisto').addEventListener('click', function () {
      var q = progreso();
      if (q.vistos[m.id]) delete q.vistos[m.id]; else q.vistos[m.id] = true;
      salvar(q);
      vistaModuloRepintar(id);
    });
    montarWidgets();
  }
  function vistaModuloRepintar(id) {
    var y = window.scrollY;
    vistaModulo(id);
    window.scrollTo(0, y);
    var b = document.getElementById('marcarVisto'); if (b) b.focus({ preventScroll: true });
  }

  function bloque(b) {
    switch (b.t) {
      case 'p': return '<p>' + b.x + '</p>';
      case 'h': return '<h2>' + esc(b.x) + '</h2>';
      case 'ul': return '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
      case 'callout': return '<aside class="callout ' + b.tono + '"><h3>' + esc(b.titulo) + '</h3><p>' + b.x + '</p></aside>';
      case 'tabla':
        return '<div class="tabla-caja"><table><thead><tr>' + b.cab.map(function (c) { return '<th scope="col">' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          b.filas.map(function (f) { return '<tr>' + f.map(function (c, i) { return i === 0 ? '<th scope="row">' + c + '</th>' : '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      case 'pasos':
        return '<ol class="pasos">' + b.items.map(function (s) { return '<li><div><h3>' + esc(s.t) + '</h3><p>' + esc(s.x) + '</p></div></li>'; }).join('') + '</ol>';
      case 'items':
        var lista = b.ids.map(elemento).filter(Boolean);
        if (!lista.length) return '';
        return '<section class="items" aria-label="' + esc(b.titulo) + '"><h3>' + esc(b.titulo) + '</h3><ul class="items-lista">' + lista.map(tarjetaItem).join('') + '</ul></section>';
      case 'clases': return '<section class="clases" id="widgetClases" aria-label="Las 9 clases de mercancías peligrosas"></section>';
      case 'calcWh': return '<section class="calc" id="widgetWh" aria-label="Calculadora de Wh"></section>';
    }
    return '';
  }

  function montarWidgets() {
    var c = document.getElementById('widgetClases');
    if (c) {
      c.innerHTML = '<ul class="rombos">' + EAA.CLASES.map(function (k, i) {
        return '<li><button type="button" class="rombo" data-i="' + i + '" aria-pressed="false" aria-label="Clase ' + k.n + ': ' + esc(k.nombre) + '">' +
          '<span class="forma" style="background:' + k.fondo + '"></span><span class="n" style="color:' + k.texto + '">' + k.n + '</span></button></li>';
      }).join('') + '</ul><div class="clase-detalle" id="claseDetalle" aria-live="polite"><p>Toca un rombo para ver la clase.</p></div>';
      var ver = function (i) {
        var k = EAA.CLASES[i];
        c.querySelectorAll('.rombo').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-i') === i)); });
        document.getElementById('claseDetalle').innerHTML = '<h3>Clase ' + k.n + ': ' + esc(k.nombre) + '</h3><p><strong>Ejemplos:</strong> ' + esc(k.ej) + '</p><p>' + esc(k.nota) + '</p>';
      };
      c.querySelectorAll('.rombo').forEach(function (b) { b.addEventListener('click', function () { ver(+b.getAttribute('data-i')); }); });
      ver(8);
    }
    var w = document.getElementById('widgetWh');
    if (w) {
      w.innerHTML = '<div class="calc-campos"><div><label for="inMah">Capacidad (mAh)</label><input id="inMah" type="number" inputmode="decimal" min="0" step="any" placeholder="Ej.: 20000" value="20000"></div>' +
        '<div><label for="inV">Voltaje (V)</label><input id="inV" type="number" inputmode="decimal" min="0" step="any" value="3.7"></div></div>' +
        '<div class="calc-res vacio" id="calcRes" aria-live="polite"></div>';
      var calc = function () {
        var mah = parseFloat(document.getElementById('inMah').value);
        var v = parseFloat(String(document.getElementById('inV').value).replace(',', '.'));
        var r = document.getElementById('calcRes');
        if (!(mah > 0) || !(v > 0)) { r.className = 'calc-res vacio'; r.textContent = 'Ingresa los mAh y el voltaje para calcular los Wh.'; return; }
        var wh = Math.round(mah * v / 10) / 100;
        var txt = wh.toLocaleString('es-CL', { maximumFractionDigits: 2 });
        if (wh <= 100) { r.className = 'calc-res ok'; r.innerHTML = '<div class="wh">' + txt + ' Wh</div>Hasta 100 Wh: no requiere aprobación. Si es un power bank o una batería de repuesto, solo en cabina, máximo 2 por persona y protegido contra cortocircuitos.'; }
        else if (wh <= 160) { r.className = 'calc-res warn'; r.innerHTML = '<div class="wh">' + txt + ' Wh</div>Entre 100 y 160 Wh: requiere aprobación de la aerolínea. Máximo 2 de repuesto por persona, en cabina.'; }
        else { r.className = 'calc-res no'; r.innerHTML = '<div class="wh">' + txt + ' Wh</div>Más de 160 Wh: no puede viajar como equipaje de pasajero.'; }
      };
      document.getElementById('inMah').addEventListener('input', calc);
      document.getElementById('inV').addEventListener('input', calc);
      calc();
    }
  }

  /* =======================================================
     PRÁCTICA (preguntas)
     ======================================================= */
  var quiz = null;

  function generarPreguntasCatalogo(n) {
    var base = barajar(catalogo.elementos).slice(0, n);
    return base.map(function (e) {
      var zona = Math.random() < 0.5 ? 'mano' : 'bodega';
      var zonaTxt = zona === 'mano' ? 'equipaje de mano (cabina)' : 'equipaje facturado (bodega)';
      var opts = ['permitido', 'restringido', 'prohibido'];
      return {
        m: 'cat', q: 'En ' + zonaTxt + ', «' + e.nombre.es + '» está…',
        o: opts.map(function (s) { return ESTADO[s].t; }), a: opts.indexOf(e[zona]),
        e: e.limite.es, fijo: true
      };
    });
  }

  function vistaPractica(arg) {
    var p = progreso();
    if (arg) { iniciarQuiz(arg); return; }
    var html = '<h1>Práctica</h1><p class="lead">Preguntas con retroalimentación inmediata. Elige un módulo o rinde el examen integrador.</p>' + avisoCatalogo() + '<div class="selector">';
    html += '<button type="button" class="opc-modo" data-q="todo"><span class="placa" aria-hidden="true">★</span><span><strong>Examen integrador</strong><small>12 preguntas de todos los módulos, más casos tomados del catálogo.</small></span>' +
      (p.quiz.todo != null ? '<span class="mejor">Mejor: ' + p.quiz.todo + '%</span>' : '') + '</button>';
    EAA.MODULOS.forEach(function (m, i) {
      var n = EAA.PREGUNTAS.filter(function (q) { return q.m === m.id; }).length;
      html += '<button type="button" class="opc-modo" data-q="' + m.id + '"><span class="placa" aria-hidden="true">' + (i + 1) + '</span><span><strong>' + esc(m.titulo) + '</strong><small>' + n + ' preguntas</small></span>' +
        (p.quiz[m.id] != null ? '<span class="mejor">Mejor: ' + p.quiz[m.id] + '%</span>' : '') + '</button>';
    });
    html += '</div>';
    pintar(html);
    $main.querySelectorAll('.opc-modo').forEach(function (b) {
      b.addEventListener('click', function () { location.hash = '#/practica/' + b.getAttribute('data-q'); });
    });
  }

  function iniciarQuiz(que) {
    var preguntas;
    if (que === 'todo') {
      preguntas = barajar(EAA.PREGUNTAS).slice(0, 9).concat(generarPreguntasCatalogo(3));
    } else if (modulo(que)) {
      preguntas = barajar(EAA.PREGUNTAS.filter(function (q) { return q.m === que; }));
    } else { location.hash = '#/practica'; return; }
    preguntas = barajar(preguntas).map(prepararPregunta);
    quiz = { que: que, preguntas: preguntas, i: 0, aciertos: 0, fallos: [], respondida: false };
    pintarPregunta();
  }

  function prepararPregunta(q) {
    if (q.fijo) return { m: q.m, q: q.q, ord: q.o.map(function (t, i) { return { t: t, ok: i === q.a }; }), e: q.e };
    return { m: q.m, q: q.q, ord: barajar(q.o.map(function (t, i) { return { t: t, ok: i === q.a }; })), e: q.e };
  }

  function pintarPregunta() {
    var q = quiz.preguntas[quiz.i];
    var titulo = quiz.que === 'todo' ? 'Examen integrador' : modulo(quiz.que).titulo;
    var html = '<p class="migas"><a href="#/practica">Práctica</a> › ' + esc(titulo) + '</p>' +
      '<div class="cabecera-juego"><span>Pregunta ' + (quiz.i + 1) + ' de ' + quiz.preguntas.length + '</span><span>Aciertos: ' + quiz.aciertos + '</span></div>' +
      '<div class="barra-prog" aria-hidden="true"><i style="width:' + (quiz.i / quiz.preguntas.length * 100) + '%"></i></div>' +
      '<h1 class="pregunta" style="font-size:1.35rem" id="enunciado">' + esc(q.q) + '</h1>' +
      '<div class="opciones" role="group" aria-labelledby="enunciado">' +
      q.ord.map(function (o, i) { return '<button type="button" class="opcion" data-i="' + i + '"><span class="letra">' + 'ABCD'[i] + '.</span><span>' + esc(o.t) + '</span></button>'; }).join('') +
      '</div><div id="retroQ" aria-live="polite"></div>';
    pintar(html, { sinFoco: true });
    var h = document.getElementById('enunciado'); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true });
    window.scrollTo(0, 0);
    quiz.respondida = false;
    $main.querySelectorAll('.opcion').forEach(function (b) {
      b.addEventListener('click', function () { responder(+b.getAttribute('data-i')); });
    });
  }

  function responder(i) {
    if (quiz.respondida) return;
    quiz.respondida = true;
    var q = quiz.preguntas[quiz.i];
    var ok = q.ord[i].ok;
    if (ok) quiz.aciertos++; else quiz.fallos.push(q);
    $main.querySelectorAll('.opcion').forEach(function (b, k) {
      b.disabled = true;
      if (q.ord[k].ok) b.classList.add('correcta');
      else if (k === i) b.classList.add('incorrecta');
    });
    var ultima = quiz.i === quiz.preguntas.length - 1;
    document.getElementById('retroQ').innerHTML =
      '<div class="retro ' + (ok ? 'bien' : 'mal') + '"><strong>' + (ok ? 'Correcto.' : 'No es esa.') + '</strong>' + esc(q.e) + '</div>' +
      '<div class="fila-btn"><button type="button" class="btn btn-primario" id="sigQ">' + (ultima ? 'Ver resultado' : 'Siguiente') + '</button></div>';
    var sig = document.getElementById('sigQ');
    sig.focus();
    sig.addEventListener('click', function () {
      if (ultima) resultadoQuiz(); else { quiz.i++; pintarPregunta(); }
    });
  }

  function resultadoQuiz() {
    var total = quiz.preguntas.length;
    var pct = Math.round(quiz.aciertos / total * 100);
    var p = progreso();
    if (p.quiz[quiz.que] == null || pct > p.quiz[quiz.que]) p.quiz[quiz.que] = pct;
    salvar(p);

    var mods = {};
    quiz.fallos.forEach(function (q) { if (q.m !== 'cat') mods[q.m] = true; });
    var rec = Object.keys(mods).map(function (id) { var m = modulo(id); return '<a href="#/modulo/' + id + '">' + esc(m.titulo) + '</a>'; });
    var msg = pct === 100 ? 'Puntaje perfecto.' : pct >= 70 ? 'Buen resultado. Revisa lo que falló para afianzarlo.' : 'Vale la pena repasar antes de volver a intentar.';

    var html = '<h1>Resultado</h1><div class="resultado"><p class="puntaje">' + quiz.aciertos + ' de ' + total + '</p><p class="lead" style="margin-top:.4rem">' + pct + '% de aciertos. ' + msg + '</p>';
    if (quiz.fallos.length) {
      html += '<h2>Para repasar</h2><ul class="repaso">' + quiz.fallos.map(function (q) {
        var ok = q.ord.filter(function (o) { return o.ok; })[0];
        return '<li><strong>' + esc(q.q) + '</strong><br>Respuesta: ' + esc(ok.t) + '. ' + esc(q.e) + '</li>';
      }).join('') + '</ul>';
      if (rec.length) html += '<p style="margin-top:1rem">Módulos para releer: ' + rec.join(', ') + '.</p>';
    }
    html += '<div class="fila-btn"><button type="button" class="btn btn-primario" id="repetirQ">Intentar de nuevo</button><a class="btn" href="#/practica">Elegir otra práctica</a></div></div>';
    pintar(html);
    document.getElementById('repetirQ').addEventListener('click', function () { iniciarQuiz(quiz.que); });
  }

  /* =======================================================
     PUESTO DE CONTROL (simulador)
     ======================================================= */
  var puesto = null;

  function vistaPuesto() {
    if (!catalogo.elementos.length) { pintar('<h1>Puesto de control</h1>' + avisoCatalogo()); return; }
    var opts = '<option value="">Todas las categorías</option>' + CATEGORIAS.map(function (c) { return '<option value="' + c.id + '">' + esc(c.n) + '</option>'; }).join('');
    pintar('<h1>Puesto de control</h1><p class="lead">Te mostramos un objeto del catálogo. Decide qué estado tiene en cabina y en bodega. Son 10 objetos por partida.</p>' +
      '<div class="filtro-cat"><label for="selCat" style="font-weight:700;display:block;margin-bottom:.3rem">Categoría</label><select id="selCat">' + opts + '</select></div>' +
      '<div class="fila-btn"><button type="button" class="btn btn-primario" id="jugar">Empezar</button></div>');
    document.getElementById('jugar').addEventListener('click', function () {
      var cat = document.getElementById('selCat').value;
      var base = catalogo.elementos.filter(function (e) { return !cat || e.categoria === cat; });
      if (!base.length) return;
      puesto = { cola: barajar(base).slice(0, 10), i: 0, puntos: 0, max: 0, fallos: [], cat: cat };
      puesto.max = puesto.cola.length * 2;
      pintarPuesto();
    });
  }

  function pintarPuesto() {
    var e = puesto.cola[puesto.i];
    puesto.sel = { mano: null, bodega: null };
    puesto.revisado = false;
    var zona = function (clave, nombre) {
      return '<fieldset><legend>' + nombre + '</legend><div class="tres" data-z="' + clave + '">' +
        ['permitido', 'restringido', 'prohibido'].map(function (s) {
          return '<button type="button" class="opcion" aria-pressed="false" data-s="' + s + '"><span aria-hidden="true">' + ESTADO[s].ico + '</span>' + ESTADO[s].t + '</button>';
        }).join('') + '</div></fieldset>';
    };
    pintar('<p class="migas"><a href="#/puesto">Puesto de control</a> › Partida</p>' +
      '<div class="cabecera-juego"><span>Objeto ' + (puesto.i + 1) + ' de ' + puesto.cola.length + '</span><span>Puntos: ' + puesto.puntos + '</span></div>' +
      '<div class="barra-prog" aria-hidden="true"><i style="width:' + (puesto.i / puesto.cola.length * 100) + '%"></i></div>' +
      '<div class="reto" style="margin-top:1rem"><div class="reto-objeto" style="margin:0"><span class="icono" aria-hidden="true">' + esc(icono(e)) + '</span><h1 style="font-size:1.35rem" id="objP">' + esc(e.nombre.es) + '</h1></div></div>' +
      '<div class="zona-puesto">' + zona('mano', 'Equipaje de mano (cabina)') + zona('bodega', 'Equipaje facturado (bodega)') + '</div>' +
      '<div class="fila-btn"><button type="button" class="btn btn-primario" id="verificar" disabled>Verificar</button></div><div id="retroP" aria-live="polite"></div>', { sinFoco: true });
    var h = document.getElementById('objP'); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true });
    window.scrollTo(0, 0);

    $main.querySelectorAll('.tres').forEach(function (grupo) {
      grupo.querySelectorAll('.opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (puesto.revisado) return;
          puesto.sel[grupo.getAttribute('data-z')] = b.getAttribute('data-s');
          grupo.querySelectorAll('.opcion').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          document.getElementById('verificar').disabled = !(puesto.sel.mano && puesto.sel.bodega);
        });
      });
    });
    document.getElementById('verificar').addEventListener('click', function () { verificarPuesto(e); });
  }

  function verificarPuesto(e) {
    puesto.revisado = true;
    var pts = 0, fallo = false;
    ['mano', 'bodega'].forEach(function (z) {
      var ok = puesto.sel[z] === e[z];
      if (ok) pts++; else fallo = true;
      $main.querySelectorAll('.tres[data-z="' + z + '"] .opcion').forEach(function (b) {
        b.disabled = true;
        var s = b.getAttribute('data-s');
        if (s === e[z]) b.classList.add('correcta');
        else if (s === puesto.sel[z]) b.classList.add('incorrecta');
      });
    });
    puesto.puntos += pts;
    if (fallo) puesto.fallos.push(e);
    var ultimo = puesto.i === puesto.cola.length - 1;
    document.getElementById('verificar').hidden = true;
    document.getElementById('retroP').innerHTML =
      '<div class="retro ' + (fallo ? 'mal' : 'bien') + '"><strong>' + (pts === 2 ? 'Correcto en ambas zonas.' : pts === 1 ? 'Acertaste una zona.' : 'Ninguna zona acertada.') + '</strong>' +
      '<div class="estados" style="margin:.4rem 0">' + chipEstado('Cabina', e.mano) + chipEstado('Bodega', e.bodega) + '</div>' + esc(e.limite.es) + '</div>' +
      '<div class="fila-btn"><button type="button" class="btn btn-primario" id="sigP">' + (ultimo ? 'Ver resultado' : 'Siguiente objeto') + '</button></div>';
    var sig = document.getElementById('sigP'); sig.focus();
    sig.addEventListener('click', function () { if (ultimo) resultadoPuesto(); else { puesto.i++; pintarPuesto(); } });
  }

  function resultadoPuesto() {
    var p = progreso();
    var de = puesto.cola.length * 2;
    p.puesto.jugadas++;
    if (!puesto.cat && puesto.cola.length === 10 && puesto.puntos > p.puesto.mejor) p.puesto.mejor = puesto.puntos;
    salvar(p);
    pintar('<h1>Fin de la partida</h1><div class="resultado"><p class="puntaje">' + puesto.puntos + ' de ' + de + '</p><p class="lead" style="margin-top:.4rem">Cada objeto vale 2 puntos: uno por zona.</p>' +
      (puesto.fallos.length ? '<h2>Objetos para repasar</h2><ul class="items-lista" style="padding:0">' + puesto.fallos.map(tarjetaItem).join('') + '</ul>' : '<p style="margin-top:1rem">No fallaste ningún objeto.</p>') +
      '<div class="fila-btn"><a class="btn btn-primario" href="#/puesto">Jugar otra vez</a><a class="btn" href="#/fichas">Estudiar con fichas</a></div></div>');
  }

  /* =======================================================
     FICHAS
     ======================================================= */
  var fichas = null;

  function vistaFichas() {
    if (!catalogo.elementos.length) { pintar('<h1>Fichas</h1>' + avisoCatalogo()); return; }
    var p = progreso();
    var opts = '<option value="">Todas las categorías</option>' + CATEGORIAS.map(function (c) { return '<option value="' + c.id + '">' + esc(c.n) + '</option>'; }).join('');
    pintar('<h1>Fichas de estudio</h1><p class="lead">Mira el objeto, recuerda su regla y voltea la ficha para comprobarlo. Marca las que ya dominas y se quedan fuera del mazo.</p>' +
      '<div class="filtro-cat"><label for="fCat" style="font-weight:700;display:block;margin-bottom:.3rem">Categoría</label><select id="fCat">' + opts + '</select></div>' +
      '<div id="fichaCaja"></div>');
    fichas = { cat: '' };
    document.getElementById('fCat').addEventListener('change', function (ev) { fichas.cat = ev.target.value; armarMazo(); });
    armarMazo();
  }

  function armarMazo() {
    var p = progreso();
    var base = catalogo.elementos.filter(function (e) { return !fichas.cat || e.categoria === fichas.cat; });
    var pend = base.filter(function (e) { return !p.fichas[e.id]; });
    fichas.total = base.length;
    fichas.mazo = barajar(pend);
    fichas.i = 0;
    pintarFicha();
  }

  function pintarFicha() {
    var caja = document.getElementById('fichaCaja');
    var p = progreso();
    var dominadas = fichas.total - fichas.mazo.length;
    if (!fichas.mazo.length) {
      caja.innerHTML = '<div class="vacio"><strong>Mazo completo.</strong> Dominas las ' + fichas.total + ' fichas de esta selección.<div class="fila-btn"><button type="button" class="btn" id="reiniciarF">Volver a empezar</button></div></div>';
      document.getElementById('reiniciarF').addEventListener('click', function () {
        var q = progreso();
        catalogo.elementos.forEach(function (e) { if (!fichas.cat || e.categoria === fichas.cat) delete q.fichas[e.id]; });
        salvar(q); armarMazo();
      });
      return;
    }
    var e = fichas.mazo[fichas.i];
    caja.innerHTML = '<p style="margin-top:1rem;font-weight:700">Dominadas: ' + dominadas + ' de ' + fichas.total + ' · Quedan ' + fichas.mazo.length + '</p>' +
      '<div class="ficha" id="fichaCuerpo"><div class="frente"><div class="icono" aria-hidden="true">' + esc(icono(e)) + '</div><strong>' + esc(e.nombre.es) + '</strong></div></div>' +
      '<div class="fila-btn"><button type="button" class="btn btn-primario" id="voltear" aria-expanded="false">Ver la regla</button></div><div id="fichaAcc" aria-live="polite"></div>';
    document.getElementById('voltear').addEventListener('click', function () {
      var cuerpo = document.getElementById('fichaCuerpo');
      cuerpo.innerHTML = '<div class="dorso"><strong>' + esc(e.nombre.es) + '</strong><div class="estados" style="margin:.5rem 0">' + chipEstado('Cabina', e.mano) + chipEstado('Bodega', e.bodega) +
        (e.aprobacion === true ? '<span class="est restringido">Requiere aprobación</span>' : '') + '</div><p>' + esc(e.limite.es) + '</p><small>' + esc(e.fuente.es) + '</small></div>';
      this.hidden = true;
      document.getElementById('fichaAcc').innerHTML = '<div class="fila-btn"><button type="button" class="btn btn-primario" id="sabia">La sabía</button><button type="button" class="btn" id="repasar">Repasar de nuevo</button></div>';
      var s = document.getElementById('sabia'); s.focus();
      s.addEventListener('click', function () {
        var q = progreso(); q.fichas[e.id] = true; salvar(q);
        fichas.mazo.splice(fichas.i, 1);
        if (fichas.i >= fichas.mazo.length) fichas.i = 0;
        pintarFicha();
        var v = document.getElementById('voltear'); if (v) v.focus({ preventScroll: true });
      });
      document.getElementById('repasar').addEventListener('click', function () {
        var f = fichas.mazo.splice(fichas.i, 1)[0]; fichas.mazo.push(f);
        if (fichas.i >= fichas.mazo.length) fichas.i = 0;
        pintarFicha();
        var v = document.getElementById('voltear'); if (v) v.focus({ preventScroll: true });
      });
    });
  }

  /* =======================================================
     GLOSARIO
     ======================================================= */
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function vistaGlosario() {
    pintar('<h1>Glosario</h1><p class="lead">Términos clave con su equivalente en inglés, útil para leer documentos OACI.</p>' +
      '<div class="buscar"><label for="bGlos" class="sr-only">Buscar un término</label><input id="bGlos" type="search" placeholder="Buscar un término, por ejemplo «Wh» o «hold»" autocomplete="off"></div>' +
      '<p id="nGlos" class="lead" style="font-size:.95rem;margin-top:.6rem" aria-live="polite"></p><ul class="glosario" id="listaGlos"></ul>');
    var pintarLista = function () {
      var q = norm(document.getElementById('bGlos').value.trim());
      var res = EAA.GLOSARIO.filter(function (g) { return !q || norm(g.es + ' ' + g.en + ' ' + g.d).indexOf(q) !== -1; });
      document.getElementById('listaGlos').innerHTML = res.map(function (g) {
        return '<li><strong>' + esc(g.es) + '</strong> <span class="en">· ' + esc(g.en) + '</span><p>' + esc(g.d) + '</p></li>';
      }).join('');
      document.getElementById('nGlos').textContent = res.length ? res.length + ' términos' : 'No hay términos que coincidan. Prueba con otra palabra.';
    };
    document.getElementById('bGlos').addEventListener('input', pintarLista);
    pintarLista();
  }

  /* =======================================================
     FUENTES
     ======================================================= */
  function vistaFuentes() {
    pintar('<h1>Fuentes y alcance</h1><p class="lead">De dónde sale cada contenido y cómo mantenerlo al día.</p>' +
      '<dl class="fuentes texto">' +
      '<dt>OACI Doc 9284, Instrucciones Técnicas (Ed. 2025–2026, edición DGAC)</dt><dd>Parte 8 y Tabla 8-1: mercancías peligrosas que pueden llevar los pasajeros.</dd>' +
      '<dt>Adenda 1 al Doc 9284 (vigente desde el 27 de marzo de 2026)</dt><dd>Reglas de baterías de litio y bancos de energía.</dd>' +
      '<dt>Anexo 17, Doc 8973, DAR 17 y PNSAC</dt><dd>Marco de seguridad de la aviación. Los elementos AVSEC del catálogo (cortopunzantes, líquidos, etc.) están marcados con origen «avsec» y deben validarse con el área técnica.</dd>' +
      '<dt>Cómo se actualiza</dt><dd>Las reglas por elemento viven en <code>catalogo.json</code> y se editan desde el <a href="./admin.html">mantenedor</a>. El estudio las lee de ahí, así que práctica, puesto de control y fichas se actualizan solos.</dd>' +
      '<dt>Alcance</dt><dd>Material formativo de la Escuela Técnica Aeronáutica. No reemplaza la normativa vigente ni el procedimiento del aeropuerto.</dd></dl>' +
      '<div class="fila-btn"><a class="btn" href="./consulta.html">Abrir la consulta rápida</a></div>');
  }

  /* ---------- Service worker ---------- */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('./sw.js').catch(function () {}); });
  }

  navegar();
})();
