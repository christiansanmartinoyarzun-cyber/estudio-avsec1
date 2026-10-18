'use strict';

/* =========================================================
   Estudio AVSEC · Contenido didáctico
   Módulos, banco de preguntas y glosario.

   Las reglas por elemento (cabina / bodega / límites) NO se
   escriben aquí: se leen de catalogo.json, que se edita desde
   el mantenedor. Así el estudio nunca contradice la consulta.

   Los valores del catálogo son referenciales: validar siempre
   con la normativa vigente (Doc 9284, PNSAC, DAR 17).
   ========================================================= */

window.EAA = window.EAA || {};

/* ---------- Módulos ----------
   Tipos de bloque: p, h, ul, callout, tabla, pasos, items, clases, calcWh */
EAA.MODULOS = [
  {
    id: 'm1',
    titulo: 'Marco normativo',
    resumen: 'Qué documentos mandan: Anexos 17 y 18, Doc 9284, Doc 8973, DAR 17 y PNSAC.',
    minutos: 10,
    objetivos: [
      'Identificar los documentos OACI y DGAC que regulan los objetos prohibidos y las mercancías peligrosas.',
      'Distinguir qué norma responde a seguridad contra actos de interferencia ilícita y cuál a seguridad operacional.'
    ],
    bloques: [
      { t: 'p', x: 'Cada vez que un pasajero pregunta «¿por qué no puedo llevar esto?», la respuesta está en una norma concreta. Conocer cuál es parte del trabajo: te permite explicar con precisión y escalar bien cuando hay dudas.' },
      { t: 'h', x: 'Dos familias de normas' },
      { t: 'tabla', cab: ['Documento', 'Qué regula', 'Enfoque'],
        filas: [
          ['Anexo 17 al Convenio de Chicago', 'Protección de la aviación civil internacional contra los actos de interferencia ilícita.', 'Seguridad de la aviación (AVSEC)'],
          ['Doc 8973 (OACI)', 'Manual de seguridad de la aviación: orienta cómo aplicar el Anexo 17. Es de distribución restringida.', 'Seguridad de la aviación (AVSEC)'],
          ['Anexo 18 al Convenio de Chicago', 'Transporte sin riesgos de mercancías peligrosas por vía aérea.', 'Seguridad operacional'],
          ['Doc 9284 (OACI)', 'Instrucciones Técnicas para el transporte sin riesgos de mercancías peligrosas por vía aérea. Su Parte 8 y la Tabla 8-1 indican qué pueden llevar los pasajeros.', 'Seguridad operacional'],
          ['IATA DGR', 'Reglamento de mercancías peligrosas de IATA, basado en las Instrucciones Técnicas de la OACI.', 'Seguridad operacional']
        ] },
      { t: 'h', x: 'Y en Chile' },
      { t: 'ul', items: [
        '<strong>DAR 17</strong>: reglamento de la DGAC sobre seguridad de la aviación civil, que lleva el Anexo 17 a la normativa nacional.',
        '<strong>PNSAC</strong>: Programa Nacional de Seguridad de la Aviación Civil. Fija las medidas que se aplican en los aeropuertos y cuáles artículos se controlan.',
        '<strong>Edición DGAC del Doc 9284 (2025–2026) y su Adenda 1</strong>, vigente desde el 27 de marzo de 2026, con nuevas reglas para baterías de litio y bancos de energía.'
      ] },
      { t: 'callout', tono: 'clave', titulo: 'Una idea para llevarte', x: 'El Anexo 17 pregunta «¿puede este objeto usarse para atacar a la aviación?». El Anexo 18 pregunta «¿puede este objeto poner en riesgo el vuelo por sí mismo?». Un mismo objeto puede caer en una, en la otra o en ambas.' }
    ],
    clave: [
      'Anexo 17 y Doc 8973: seguridad de la aviación (AVSEC).',
      'Anexo 18 y Doc 9284: mercancías peligrosas.',
      'DAR 17 y PNSAC aterrizan lo anterior en Chile.',
      'Los valores concretos cambian con las adendas: consulta siempre la edición vigente.'
    ]
  },
  {
    id: 'm2',
    titulo: 'Objeto prohibido, restringido o mercancía peligrosa',
    resumen: 'Tres estados, dos zonas del avión y por qué una regla cambia entre cabina y bodega.',
    minutos: 10,
    objetivos: [
      'Diferenciar objeto prohibido, objeto restringido y mercancía peligrosa.',
      'Explicar por qué un mismo objeto puede ser permitido en bodega y prohibido en cabina, o al revés.'
    ],
    bloques: [
      { t: 'p', x: 'En este sitio cada elemento tiene un estado para <strong>cabina</strong> (equipaje de mano) y otro para <strong>bodega</strong> (equipaje facturado). Los estados son tres:' },
      { t: 'tabla', cab: ['Estado', 'Significa', 'Ejemplo'],
        filas: [
          ['✅ Permitido', 'Puede viajar en esa zona sin condiciones especiales.', 'Medicamentos'],
          ['⚠️ Restringido', 'Puede viajar solo si cumple condiciones: límite de cantidad, tamaño, embalaje, ubicación o aprobación de la aerolínea.', 'Cuchillo con hoja de hasta 4 cm en cabina'],
          ['❌ Prohibido', 'No puede viajar en esa zona.', 'Cortacartones en cabina']
        ] },
      { t: 'h', x: 'Por qué cambia entre cabina y bodega' },
      { t: 'p', x: 'La cabina es una zona donde el pasajero tiene acceso al objeto durante el vuelo; la bodega no. Por eso:' },
      { t: 'ul', items: [
        '<strong>Riesgo de uso como arma</strong> (AVSEC): los cortopunzantes y las herramientas se prohíben en cabina, pero suelen aceptarse en bodega.',
        '<strong>Riesgo de incendio sin que nadie pueda reaccionar</strong> (mercancías peligrosas): los power banks y las baterías de repuesto viajan solo en cabina, donde la tripulación puede actuar si se calientan.'
      ] },
      { t: 'items', titulo: 'Compara el caso contrario', ids: ['cortacartones', 'power-bank', 'encendedor-fosforos'] },
      { t: 'h', x: 'La aprobación de la aerolínea' },
      { t: 'p', x: 'Algunos elementos agregan un tercer requisito: que el explotador (la aerolínea) lo apruebe antes del viaje. En el catálogo se marcan con el aviso «requiere aprobación». Aunque la norma permita el elemento, la aerolínea puede prohibirlo.' },
      { t: 'callout', tono: 'alerta', titulo: 'Cuidado con la simplificación', x: '«Prohibido» no siempre significa prohibido en todas partes. Antes de responder, pregúntate dos cosas: ¿en qué zona? y ¿bajo qué condiciones?' }
    ],
    clave: [
      'Tres estados: permitido, restringido y prohibido.',
      'Se evalúan por separado para cabina y para bodega.',
      'AVSEC prohíbe pensando en el uso como arma; mercancías peligrosas, pensando en el riesgo del propio objeto.',
      'La aerolínea puede ser más estricta que la norma.'
    ]
  },
  {
    id: 'm3',
    titulo: 'Las 9 clases de mercancías peligrosas',
    resumen: 'Cómo se clasifican y qué ejemplos cotidianos aparecen en el equipaje de un pasajero.',
    minutos: 15,
    objetivos: [
      'Nombrar las 9 clases de mercancías peligrosas.',
      'Clasificar objetos cotidianos del equipaje de pasajeros en su clase.'
    ],
    bloques: [
      { t: 'p', x: 'Las Instrucciones Técnicas de la OACI agrupan las mercancías peligrosas en nueve clases según el peligro principal. Toca cada rombo para ver qué incluye y qué ejemplos encontrarás en un control.' },
      { t: 'clases' },
      { t: 'callout', tono: 'info', titulo: 'Cómo leer las divisiones', x: 'Un número con punto (por ejemplo 2.1 o 4.3) es una división de la clase. La clase 1 también usa una letra de compatibilidad: la «1.4S» de las municiones indica un riesgo que se limita al propio bulto.' },
      { t: 'h', x: 'Lo que ve un agente en la práctica' },
      { t: 'ul', items: [
        'Aerosoles, cartuchos de CO₂ y gas de camping son <strong>gases</strong> (clase 2).',
        'Bencina, diluyente y pintura son <strong>líquidos inflamables</strong> (clase 3).',
        'Las baterías de litio y el hielo seco están en la <strong>clase 9</strong>, la de «misceláneas». Es la clase que más preguntas genera en el equipaje de mano.',
        'El marcapasos implantado contiene material radiactivo, pero la norma lo permite por ser consecuencia de un tratamiento médico.'
      ] },
      { t: 'items', titulo: 'Ejemplos del catálogo', ids: ['municiones', 'fuegos-artificiales', 'liquidos-inflamables', 'hielo-seco', 'marcapasos'] }
    ],
    clave: [
      'Nueve clases, ordenadas por tipo de peligro (no por gravedad).',
      'Baterías de litio y hielo seco: clase 9.',
      'Municiones para armas deportivas: clase 1, división 1.4S.',
      'Algunas mercancías peligrosas están permitidas a pasajeros con condiciones: es lo que lista la Tabla 8-1.'
    ]
  },
  {
    id: 'm4',
    titulo: 'Baterías de litio y power banks',
    resumen: 'Los límites en Wh, la Adenda 1 y una calculadora para decidir en segundos.',
    minutos: 15,
    objetivos: [
      'Calcular la energía de una batería en Wh a partir de mAh y voltaje.',
      'Aplicar los límites de 100 Wh y 160 Wh y las reglas de la Adenda 1 a un caso concreto.'
    ],
    bloques: [
      { t: 'p', x: 'Es el tema con más cambios recientes y el que más consultan los pasajeros. Dos tipos de batería:' },
      { t: 'ul', items: [
        '<strong>Ion de litio</strong> (celulares, notebooks, power banks): se mide en <strong>Wh</strong> (watt-hora).',
        '<strong>Metal de litio</strong> (pilas no recargables, algunos aparatos médicos): se mide en <strong>gramos de litio</strong>.'
      ] },
      { t: 'h', x: 'Los umbrales de energía' },
      { t: 'tabla', cab: ['Energía por batería', 'Qué ocurre'],
        filas: [
          ['Hasta 100 Wh', 'Puede viajar sin aprobación, con las reglas de cabina y bodega que se indican abajo.'],
          ['Más de 100 Wh y hasta 160 Wh', 'Requiere aprobación de la aerolínea. Máximo 2 baterías de repuesto por persona, en cabina.'],
          ['Más de 160 Wh', 'No puede viajar como equipaje de pasajero.']
        ] },
      { t: 'h', x: 'Lo nuevo de la Adenda 1 (desde el 27 de marzo de 2026)' },
      { t: 'ul', items: [
        'Máximo <strong>2 power banks</strong> por persona.',
        'Solo en <strong>cabina</strong>; prohibidos en el equipaje facturado.',
        'No se recargan a bordo ni se usan para recargar otros aparatos durante el vuelo.',
        'Los explotadores pueden prohibirlos aunque estén dentro del límite.'
      ] },
      { t: 'h', x: 'Calcula los Wh' },
      { t: 'p', x: 'Muchos power banks traen los mAh impresos pero no los Wh. La fórmula es <strong>Wh = mAh × voltaje ÷ 1000</strong>. Prueba con tus propios equipos.' },
      { t: 'calcWh' },
      { t: 'items', titulo: 'Reglas del catálogo', ids: ['power-bank', 'bateria-100-160', 'baterias-repuesto', 'dispositivos-electronicos', 'bateria-mas-160'] },
      { t: 'callout', tono: 'alerta', titulo: 'Los repuestos van protegidos', x: 'Toda batería de repuesto o power bank debe ir protegida contra cortocircuitos: en su embalaje original, con cinta sobre los bornes o en una funda individual.' }
    ],
    clave: [
      'Wh = mAh × V ÷ 1000.',
      '100 Wh y 160 Wh son los dos cortes que debes recordar.',
      'Power banks y baterías de repuesto: solo en cabina, protegidos contra cortocircuitos.',
      'La Adenda 1 limita a 2 power banks por persona y prohíbe recargarlos a bordo.'
    ]
  },
  {
    id: 'm5',
    titulo: 'Líquidos, aerosoles, geles y alcohol',
    resumen: 'Qué cambia según el envase, el destino y la graduación alcohólica.',
    minutos: 12,
    objetivos: [
      'Aplicar los límites de cantidad para aerosoles, bebidas alcohólicas y hielo seco.',
      'Explicar por qué algunos líquidos se limitan por seguridad AVSEC y otros por mercancías peligrosas.'
    ],
    bloques: [
      { t: 'p', x: 'Los líquidos se regulan por dos razones distintas, y conviene no mezclarlas:' },
      { t: 'ul', items: [
        '<strong>Razón AVSEC</strong>: un líquido podría ocultar un explosivo. Por eso muchos países limitan los envases en cabina a 100 ml. En el catálogo, esta restricción aparece para vuelos a Estados Unidos.',
        '<strong>Razón de mercancías peligrosas</strong>: el líquido es inflamable, corrosivo o presurizado, como los aerosoles y el alcohol de alta graduación.'
      ] },
      { t: 'callout', tono: 'info', titulo: 'Las reglas de 100 ml varían por destino', x: 'El límite de envases de 100 ml en cabina lo aplican distintos países con diferencias. Confirma el requisito vigente del PNSAC y del país de destino antes de enseñar un caso como regla general.' },
      { t: 'h', x: 'Alcohol según su graduación' },
      { t: 'tabla', cab: ['Graduación', 'Regla', 'Ejemplo'],
        filas: [
          ['Menos de 24 %', 'Sin restricción como mercancía peligrosa.', 'Vino, cerveza'],
          ['Más de 24 % y menos de 70 %', 'Máximo 5 litros por persona, en envases de venta al detalle.', 'Pisco, whisky, ron'],
          ['70 % o más', 'Prohibido en cualquier equipaje.', 'Alcohol de 96°']
        ] },
      { t: 'h', x: 'Aerosoles de tocador y hielo seco' },
      { t: 'ul', items: [
        '<strong>Artículos de tocador y aerosoles</strong> (perfume, desodorante, laca): cada envase de hasta 0,5 kg o 0,5 L, y un total de 2 kg o 2 L por persona.',
        '<strong>Hielo seco</strong>: hasta 2,5 kg por persona, con aprobación de la aerolínea, en un bulto que deje escapar el gas.'
      ] },
      { t: 'items', titulo: 'Reglas del catálogo', ids: ['liquidos-100ml', 'articulos-tocador', 'alcohol-24-70', 'alcohol-mas-70', 'hielo-seco'] }
    ],
    clave: [
      'Límite de 100 ml: razón AVSEC, varía según destino.',
      'Alcohol: menos de 24 %, sin restricción; de 24 % a menos de 70 %, hasta 5 L; 70 % o más, prohibido.',
      'Aerosoles de tocador: 0,5 kg o L por envase y 2 kg o L en total.',
      'Hielo seco: 2,5 kg con aprobación de la aerolínea.'
    ]
  },
  {
    id: 'm6',
    titulo: 'Cortopunzantes, armas y municiones',
    resumen: 'El criterio detrás de los límites de longitud y el trato de armas de fuego.',
    minutos: 12,
    objetivos: [
      'Aplicar los límites de longitud de hoja o varilla permitidos en cabina.',
      'Explicar el tratamiento de armas de fuego, municiones y sprays de defensa.'
    ],
    bloques: [
      { t: 'p', x: 'Aquí el criterio es AVSEC puro: ¿puede el objeto servir como arma dentro de la cabina? Lo que se mide es el filo, la punta y la longitud.' },
      { t: 'tabla', cab: ['Elemento', 'En cabina', 'En bodega'],
        filas: [
          ['Cuchillos y cortaplumas', '⚠️ Solo con hoja de hasta 4 cm', '✅ Permitido, bien envuelto'],
          ['Tijeras', '⚠️ Solo con hojas de hasta 4 cm', '✅ Permitido'],
          ['Palillos para tejer', '⚠️ Solo de hasta 15 cm', '✅ Permitido'],
          ['Pie de metro', '⚠️ Solo de hasta 20 cm', '✅ Permitido'],
          ['Cortacartones, hojas sueltas y bisturís', '❌ Prohibido', '✅ Con las hojas protegidas'],
          ['Herramientas (martillo, alicate, llave inglesa)', '❌ Prohibido', '✅ Permitido']
        ] },
      { t: 'h', x: 'Armas y municiones' },
      { t: 'ul', items: [
        '<strong>Arma de fuego</strong>: nunca en cabina. En bodega solo con autorización y siguiendo el procedimiento de la aerolínea y la autoridad competente.',
        '<strong>Municiones</strong> (cartuchos, división 1.4S): solo en bodega, bien embaladas, máximo 5 kg por persona, con aprobación de la aerolínea y la documentación para su traslado.',
        '<strong>Gas pimienta y sprays de defensa</strong>: no figuran en la Tabla 8-1, así que no pueden viajar en ningún equipaje.',
        '<strong>Equipos de artes marciales</strong>: los elementos regulados por la Ley N.° 18.356 están prohibidos en cabina.'
      ] },
      { t: 'items', titulo: 'Reglas del catálogo', ids: ['cuchillos', 'herramientas', 'armas-fuego', 'municiones', 'gas-pimienta'] },
      { t: 'callout', tono: 'alerta', titulo: 'Los límites en centímetros son referenciales', x: 'Las medidas de este módulo vienen del catálogo del proyecto, marcadas como origen AVSEC. Antes de usarlas para evaluar a alguien, contrástalas con el PNSAC vigente.' }
    ],
    clave: [
      'El criterio AVSEC es el potencial de uso como arma en cabina.',
      'Límites en cabina: cuchillos y tijeras 4 cm, palillos 15 cm, pie de metro 20 cm.',
      'Arma de fuego y municiones: solo bodega, con autorización.',
      'Gas pimienta: no puede viajar en ningún equipaje.'
    ]
  },
  {
    id: 'm7',
    titulo: 'Inflamables, gases y otros químicos',
    resumen: 'Encendedores, combustibles, gases y la regla del «sobre ti».',
    minutos: 10,
    objetivos: [
      'Identificar qué inflamables pueden llevar los pasajeros y bajo qué condiciones.',
      'Reconocer los combustibles y gases que no pueden viajar en ningún equipaje.'
    ],
    bloques: [
      { t: 'p', x: 'La Tabla 8-1 acepta unos pocos inflamables de uso personal. Todo lo que no figura en ella queda fuera.' },
      { t: 'h', x: 'Lo que sí puede viajar, con condiciones' },
      { t: 'ul', items: [
        '<strong>Encendedor o fósforos de seguridad</strong>: uno por persona y llevado sobre ti (en el bolsillo), no en el bolso ni en la maleta.',
        '<strong>Rizador o plancha a gas</strong>: uno por persona, con la cubierta de seguridad puesta y sin cartuchos de repuesto.',
        '<strong>Cartuchos pequeños de CO₂</strong>: hasta 4 de 50 ml cada uno, con aprobación de la aerolínea.',
        '<strong>Motores de combustión</strong>: solo en bodega, sin combustible y limpios.'
      ] },
      { t: 'h', x: 'Lo que no puede viajar' },
      { t: 'ul', items: [
        'Gas de camping, bencina blanca y combustibles de cocinilla.',
        'Pinturas, diluyentes, bencina y otros líquidos inflamables.',
        'Fuegos artificiales, bengalas y petardos.'
      ] },
      { t: 'items', titulo: 'Reglas del catálogo', ids: ['encendedor-fosforos', 'plancha-gas', 'motores-combustion', 'gas-camping', 'fuegos-artificiales'] },
      { t: 'callout', tono: 'clave', titulo: 'Por qué el encendedor va «sobre ti»', x: 'En el bolsillo el pasajero lo controla y puede reaccionar si ocurre algo. En una maleta facturada, un encendedor es una fuente de ignición que nadie vigila: por eso en bodega está prohibido.' }
    ],
    clave: [
      'Encendedor o fósforos: uno por persona, sobre ti y nunca en bodega.',
      'Ningún combustible ni cartucho de gas de camping puede viajar.',
      'Fuegos artificiales: prohibidos en todo equipaje.',
      'Lo que no figura en la Tabla 8-1 no está autorizado como equipaje de pasajero.'
    ]
  },
  {
    id: 'm8',
    titulo: 'Qué hacer en el punto de control',
    resumen: 'Un marco de cuatro pasos para detectar, evaluar, resolver y comunicar.',
    minutos: 12,
    objetivos: [
      'Aplicar un proceso ordenado ante un elemento prohibido o restringido.',
      'Comunicar la decisión al pasajero con claridad y respeto.'
    ],
    bloques: [
      { t: 'p', x: 'Conocer las reglas es la mitad del trabajo. La otra mitad es qué hacer cuando aparece el elemento frente a ti. Este es un marco de referencia general; el procedimiento exacto que debes aplicar es el que establece el PNSAC y los manuales de tu aeropuerto.' },
      { t: 'pasos', items: [
        { t: 'Detectar', x: 'Identifica el elemento por la imagen radiográfica, el detector de metales o la inspección manual. Una imagen sospechosa se resuelve revisando el bulto, no suponiendo.' },
        { t: 'Evaluar', x: 'Pregúntate: ¿qué es?, ¿en qué zona va a viajar?, ¿está prohibido, restringido o permitido? Si es restringido, ¿cumple las condiciones (cantidad, tamaño, embalaje, aprobación)?' },
        { t: 'Resolver', x: 'Según el caso: permitir el paso, devolver el elemento para que viaje en bodega si aún es posible, ofrecer el abandono voluntario, o escalar al supervisor.' },
        { t: 'Comunicar y registrar', x: 'Explica la decisión al pasajero y deja el registro que exige el procedimiento.' }
      ] },
      { t: 'h', x: 'Cómo comunicar la decisión' },
      { t: 'ul', items: [
        'Explica <strong>el motivo</strong> en una frase simple: «Este elemento no puede ir en cabina porque…».',
        'Ofrece <strong>una alternativa</strong> cuando exista: llevarlo en bodega, dejarlo con un acompañante, abandonarlo voluntariamente.',
        'Mantén un trato <strong>cortés y firme</strong>. No negocies la norma ni discutas.',
        'Trata a todos los pasajeros con respeto y sin discriminación: la decisión se basa en el objeto, nunca en la persona.'
      ] },
      { t: 'callout', tono: 'alerta', titulo: 'Si aparece un arma o algo que parece un explosivo', x: 'No lo manipules. Aplica de inmediato el protocolo de alerta de tu aeropuerto y avisa al supervisor. Estas situaciones no se resuelven en el mostrador del control.' }
    ],
    clave: [
      'Cuatro pasos: detectar, evaluar, resolver, comunicar y registrar.',
      'Evaluar siempre por zona (cabina y bodega) y por condiciones.',
      'Explica el motivo y ofrece una alternativa cuando la haya.',
      'Armas y explosivos sospechosos: no se manipulan, se activa el protocolo.'
    ]
  }
];

/* ---------- Las 9 clases ---------- */
EAA.CLASES = [
  { n: '1', nombre: 'Explosivos', fondo: '#F7931E', texto: '#141A24', ej: 'Municiones (1.4S), fuegos artificiales, bengalas.', nota: 'Las municiones deportivas empacadas correctamente son la excepción que admite la Tabla 8-1.' },
  { n: '2', nombre: 'Gases', fondo: 'linear-gradient(135deg,#D1344B 0 33%,#1B8F4F 33% 66%,#fff 66%)', texto: '#141A24', ej: 'Aerosoles, cartuchos de CO₂, gas de camping, oxígeno medicinal.', nota: 'Se divide en 2.1 inflamables (rojo), 2.2 no inflamables ni tóxicos (verde) y 2.3 tóxicos (blanco).' },
  { n: '3', nombre: 'Líquidos inflamables', fondo: '#D1344B', texto: '#fff', ej: 'Bencina, diluyentes, pinturas, alcohol de alta graduación.', nota: 'Su peligro es el vapor, que se enciende a temperaturas bajas.' },
  { n: '4', nombre: 'Sólidos inflamables', fondo: 'repeating-linear-gradient(90deg,#D1344B 0 8px,#fff 8px 16px)', texto: '#141A24', ej: 'Fósforos de seguridad, ciertos productos de campamento.', nota: '4.1 sólidos inflamables, 4.2 combustión espontánea, 4.3 peligrosos en contacto con agua.' },
  { n: '5', nombre: 'Comburentes y peróxidos orgánicos', fondo: '#FFD21F', texto: '#141A24', ej: 'Blanqueadores concentrados, algunos kits de reparación.', nota: 'Alimentan un fuego aunque no ardan por sí solos.' },
  { n: '6', nombre: 'Tóxicas e infecciosas', fondo: '#fff', texto: '#141A24', ej: 'Pesticidas, muestras biológicas.', nota: '6.1 tóxicas, 6.2 infecciosas. Las muestras requieren embalaje especial.' },
  { n: '7', nombre: 'Radiactivos', fondo: 'linear-gradient(180deg,#FFD21F 0 55%,#fff 55%)', texto: '#141A24', ej: 'Material radiactivo; marcapasos implantado (permitido).', nota: 'Los dispositivos médicos implantados son una excepción de la Tabla 8-1.' },
  { n: '8', nombre: 'Corrosivos', fondo: 'linear-gradient(180deg,#fff 0 50%,#141A24 50%)', texto: '#8A8F99', ej: 'Ácido de batería, mercurio, limpiadores fuertes.', nota: 'El termómetro de mercurio va solo en bodega, uno por persona y con su estuche.' },
  { n: '9', nombre: 'Misceláneas', fondo: 'repeating-linear-gradient(90deg,#141A24 0 3px,#fff 3px 9px)', texto: '#141A24', ej: 'Baterías de litio, hielo seco, imanes.', nota: 'Peligros que no calzan en las otras clases. Aquí viven las baterías de litio.' }
];

/* ---------- Banco de preguntas ----------
   m: módulo · q: enunciado · o: opciones · a: índice correcto · e: explicación */
EAA.PREGUNTAS = [
  /* m1 */
  { m: 'm1', q: '¿Qué Anexo de la OACI protege a la aviación civil contra los actos de interferencia ilícita?', o: ['Anexo 6', 'Anexo 14', 'Anexo 17', 'Anexo 18'], a: 2, e: 'El Anexo 17 trata la seguridad de la aviación (AVSEC). El Anexo 18 regula las mercancías peligrosas.' },
  { m: 'm1', q: 'El Anexo 18 y el Doc 9284 regulan principalmente…', o: ['el control de acceso a áreas restringidas', 'el transporte sin riesgos de mercancías peligrosas por vía aérea', 'la formación de pilotos', 'la inspección de carga'], a: 1, e: 'El Doc 9284 contiene las Instrucciones Técnicas; su Parte 8 y la Tabla 8-1 indican qué mercancías peligrosas pueden llevar los pasajeros.' },
  { m: 'm1', q: '¿Qué es el Doc 8973 de la OACI?', o: ['La lista de aerolíneas autorizadas', 'El manual de seguridad de la aviación que orienta la aplicación del Anexo 17', 'La tabla de baterías de litio', 'El reglamento de tarifas'], a: 1, e: 'Es un manual de distribución restringida con orientaciones para implementar las medidas AVSEC.' },
  { m: 'm1', q: 'En Chile, el programa que fija las medidas nacionales de seguridad de la aviación civil es el…', o: ['PNSAC', 'IATA DGR', 'Doc 9284', 'Anexo 18'], a: 0, e: 'PNSAC: Programa Nacional de Seguridad de la Aviación Civil.' },
  /* m2 */
  { m: 'm2', q: 'Un cortacartones, según el catálogo, es…', o: ['Permitido en cabina y en bodega', 'Prohibido en cabina y permitido en bodega con hojas protegidas', 'Prohibido en cabina y en bodega', 'Permitido en cabina y prohibido en bodega'], a: 1, e: 'Nunca en cabina; en bodega con las hojas protegidas.' },
  { m: 'm2', q: 'Un power bank puede viajar…', o: ['Solo en bodega', 'En cabina y en bodega', 'Solo en cabina, con condiciones', 'En ningún equipaje'], a: 2, e: 'Los power banks van solo en cabina; están prohibidos en el equipaje facturado.' },
  { m: 'm2', q: 'Un elemento «restringido» es aquel que…', o: ['Siempre se decomisa', 'Puede viajar si cumple condiciones como límite, embalaje o aprobación', 'Solo puede llevar la tripulación', 'No necesita ninguna condición'], a: 1, e: 'Restringido significa permitido bajo condiciones.' },
  { m: 'm2', q: '¿Cuál es la diferencia de enfoque entre un objeto prohibido AVSEC y una mercancía peligrosa?', o: ['No hay diferencia', 'AVSEC busca prevenir actos de interferencia ilícita; las mercancías peligrosas, riesgos del propio objeto para el vuelo', 'AVSEC solo aplica a la carga', 'Las mercancías peligrosas solo aplican a pasajeros'], a: 1, e: 'Un mismo objeto puede caer en una, en la otra o en ambas.' },
  /* m3 */
  { m: 'm3', q: 'Los líquidos inflamables como la bencina o el diluyente pertenecen a la clase…', o: ['1', '2', '3', '8'], a: 2, e: 'Clase 3: líquidos inflamables.' },
  { m: 'm3', q: '¿En qué clase se ubican las baterías de litio?', o: ['Clase 2', 'Clase 4', 'Clase 7', 'Clase 9'], a: 3, e: 'La clase 9 reúne las mercancías peligrosas misceláneas, como las baterías de litio y el hielo seco.' },
  { m: 'm3', q: 'Las municiones deportivas están clasificadas en la clase…', o: ['1, división 1.4S', '3', '5', '6'], a: 0, e: 'Son explosivos de bajo riesgo (1.4S), por eso la Tabla 8-1 las admite en bodega con condiciones.' },
  { m: 'm3', q: 'El ácido de batería y el mercurio son ejemplos de la clase…', o: ['Clase 5 (comburentes)', 'Clase 8 (corrosivos)', 'Clase 6 (tóxicas)', 'Clase 9 (misceláneas)'], a: 1, e: 'Clase 8: corrosivos.' },
  { m: 'm3', q: 'Un marcapasos implantado, pese a contener material radiactivo, está…', o: ['Prohibido', 'Permitido, por ser consecuencia de un tratamiento médico', 'Permitido solo en bodega', 'Sujeto a un límite de 2 por persona'], a: 1, e: 'Es una excepción de la Tabla 8-1.' },
  /* m4 */
  { m: 'm4', q: 'Un power bank de 20.000 mAh a 3,7 V tiene una energía de…', o: ['7,4 Wh', '74 Wh', '740 Wh', '20 Wh'], a: 1, e: '20.000 × 3,7 ÷ 1000 = 74 Wh.' },
  { m: 'm4', q: 'Una batería de ion de litio de 120 Wh…', o: ['Viaja libremente', 'Requiere aprobación de la aerolínea', 'Está prohibida', 'Solo viaja en bodega'], a: 1, e: 'Entre 100 y 160 Wh se requiere aprobación; el repuesto va en cabina, máximo 2 por persona.' },
  { m: 'm4', q: 'Una batería de más de 160 Wh…', o: ['Necesita aprobación', 'Va solo en bodega', 'No puede viajar como equipaje de pasajero', 'Se permite con cinta en los bornes'], a: 2, e: 'Más de 160 Wh queda fuera del equipaje de pasajeros.' },
  { m: 'm4', q: 'Según la Adenda 1, ¿cuántos power banks se pueden llevar por persona?', o: ['1', '2', '4', 'Sin límite'], a: 1, e: 'Máximo 2, solo en cabina y sin recargarlos a bordo.' },
  { m: 'm4', q: 'Las baterías de litio de repuesto deben viajar…', o: ['En bodega, envueltas en ropa', 'En cabina, protegidas contra cortocircuitos', 'En cabina, sin protección', 'No pueden viajar'], a: 1, e: 'Solo en cabina y con protección de los bornes.' },
  /* m5 */
  { m: 'm5', q: 'Una botella de alcohol de 96° …', o: ['Va en bodega con 5 L máximo', 'Va en cabina', 'Está prohibida en cualquier equipaje', 'Requiere aprobación de la aerolínea'], a: 2, e: 'Las bebidas de 70 % o más no pueden viajar en ningún equipaje.' },
  { m: 'm5', q: 'Pisco, whisky o ron (más de 24 % y menos de 70 %)…', o: ['Sin límite', 'Máximo 5 litros por persona, en envases de venta al detalle', 'Máximo 1 litro', 'Prohibidos'], a: 1, e: 'Es la regla del ítem 6 de la Tabla 8-1.' },
  { m: 'm5', q: 'Para los aerosoles de tocador, el total por persona es de…', o: ['0,5 kg o L', '1 kg o L', '2 kg o L', '5 kg o L'], a: 2, e: 'Cada envase hasta 0,5 kg o L, y 2 kg o L en total.' },
  { m: 'm5', q: 'El hielo seco puede transportarse…', o: ['Sin límite', 'Hasta 2,5 kg por persona, con aprobación de la aerolínea', 'Solo en cabina', 'Está prohibido'], a: 1, e: 'En un bulto que deje escapar el gas.' },
  { m: 'm5', q: 'El vino y la cerveza (menos de 24 % de alcohol)…', o: ['Están prohibidos', 'Tienen límite de 5 L', 'No tienen restricción como mercancía peligrosa', 'Solo viajan en bodega'], a: 2, e: 'Quedan fuera de las restricciones de mercancías peligrosas.' },
  /* m6 */
  { m: 'm6', q: 'Un cuchillo con hoja de más de 4 cm…', o: ['Va en cabina', 'Va en bodega, bien envuelto', 'Está prohibido en bodega', 'Requiere aprobación de la aerolínea'], a: 1, e: 'En cabina solo se admiten hojas de hasta 4 cm.' },
  { m: 'm6', q: 'Las armas de fuego…', o: ['Pueden ir en cabina con permiso', 'Nunca van en cabina; en bodega solo con autorización', 'Viajan libremente en bodega', 'Están prohibidas en todo equipaje'], a: 1, e: 'Se sigue el procedimiento de la aerolínea y de la autoridad competente.' },
  { m: 'm6', q: 'Las municiones pueden viajar…', o: ['En cabina, hasta 5 kg', 'Solo en bodega, hasta 5 kg, con aprobación de la aerolínea', 'En cualquier equipaje', 'Nunca'], a: 1, e: 'División 1.4S, bien embaladas y con documentación.' },
  { m: 'm6', q: 'El gas pimienta…', o: ['Se permite en cabina', 'Se permite en bodega', 'No puede viajar en ningún equipaje', 'Se permite con hasta 100 ml'], a: 2, e: 'No figura en la Tabla 8-1.' },
  { m: 'm6', q: '¿Cuál es el largo máximo en cabina de los palillos para tejer, según el catálogo?', o: ['4 cm', '15 cm', '20 cm', 'Sin límite'], a: 1, e: 'Hasta 15 cm; los más largos van en bodega.' },
  /* m7 */
  { m: 'm7', q: 'El encendedor de cigarrillos viaja…', o: ['En bodega', 'En la maleta de mano', 'Sobre la persona, uno por persona', 'No puede viajar'], a: 2, e: 'En el bolsillo y nunca en bodega.' },
  { m: 'm7', q: 'El gas de camping y la bencina blanca…', o: ['Viajan en bodega', 'Viajan en cabina', 'No pueden viajar en ningún equipaje', 'Requieren aprobación de la aerolínea'], a: 2, e: 'No figuran en la Tabla 8-1.' },
  { m: 'm7', q: 'Una plancha de pelo a gas puede viajar si…', o: ['Es una por persona, con su cubierta de seguridad y sin cartuchos de repuesto', 'Tiene cartuchos de repuesto', 'Va en bodega con gas', 'Nunca puede viajar'], a: 0, e: 'Ítem 11 de la Tabla 8-1.' },
  { m: 'm7', q: 'Los fuegos artificiales…', o: ['Se permiten en bodega', 'Se permiten con aprobación', 'No pueden viajar en ningún equipaje', 'Se permiten en cabina'], a: 2, e: 'Son explosivos fuera de lo que admite la Tabla 8-1.' },
  /* m8 */
  { m: 'm8', q: '¿Cuál es el primer paso del marco de control?', o: ['Resolver', 'Detectar', 'Registrar', 'Comunicar'], a: 1, e: 'Detectar, evaluar, resolver y comunicar y registrar.' },
  { m: 'm8', q: 'Aparece una herramienta en el equipaje de mano. Lo más adecuado es…', o: ['Dejarla pasar', 'Explicar el motivo y ofrecer una alternativa, por ejemplo llevarla en bodega', 'Retenerla sin explicar', 'Discutir con el pasajero'], a: 1, e: 'Se explica con cortesía y se ofrece una alternativa cuando existe.' },
  { m: 'm8', q: 'Al comunicar una decisión al pasajero, lo correcto es…', o: ['Ser cortés y firme, explicando el motivo', 'Negociar la norma', 'Evitar dar explicaciones', 'Decidir según el aspecto de la persona'], a: 0, e: 'La decisión se basa en el objeto, nunca en la persona.' },
  { m: 'm8', q: 'Si se detecta algo que parece un explosivo, se debe…', o: ['Abrirlo para revisarlo', 'No manipularlo y activar el protocolo de alerta', 'Devolverlo al pasajero', 'Dejarlo en el mostrador'], a: 1, e: 'Estas situaciones se escalan; no se resuelven en el control.' }
];

/* ---------- Glosario ---------- */
EAA.GLOSARIO = [
  { es: 'Abandono voluntario', en: 'Voluntary surrender', d: 'Decisión del pasajero de dejar en el control un elemento que no puede llevar, para continuar su viaje.' },
  { es: 'Acto de interferencia ilícita', en: 'Act of unlawful interference', d: 'Acto o intento que compromete la seguridad de la aviación civil, como el apoderamiento ilícito de una aeronave.' },
  { es: 'Adenda', en: 'Addendum', d: 'Modificación oficial a un documento vigente. La Adenda 1 del Doc 9284 (27/3/2026) cambió las reglas de baterías de litio.' },
  { es: 'Anexo 17', en: 'Annex 17', d: 'Anexo al Convenio de Chicago sobre seguridad: protección de la aviación civil internacional contra los actos de interferencia ilícita.' },
  { es: 'Anexo 18', en: 'Annex 18', d: 'Anexo al Convenio de Chicago sobre el transporte sin riesgos de mercancías peligrosas por vía aérea.' },
  { es: 'Aprobación del explotador', en: 'Operator approval', d: 'Autorización previa de la aerolínea para transportar un elemento que la norma permite con condiciones.' },
  { es: 'AVSEC', en: 'Aviation security (AVSEC)', d: 'Seguridad de la aviación: medidas para proteger la aviación civil contra actos de interferencia ilícita.' },
  { es: 'Bodega (equipaje facturado)', en: 'Hold (checked) baggage', d: 'Equipaje entregado a la aerolínea, que viaja en la bodega de la aeronave sin acceso del pasajero.' },
  { es: 'Cabina (equipaje de mano)', en: 'Cabin (carry-on) baggage', d: 'Equipaje que el pasajero lleva consigo en la cabina de la aeronave.' },
  { es: 'Cortocircuito', en: 'Short circuit', d: 'Contacto entre los bornes de una batería que puede generar calor e incendio. Por eso los repuestos se protegen.' },
  { es: 'DAR 17', en: 'DAR 17', d: 'Reglamento de la DGAC sobre seguridad de la aviación civil, basado en el Anexo 17.' },
  { es: 'Disposición especial', en: 'Special provision', d: 'Condición adicional de las Instrucciones Técnicas para ciertas mercancías, identificada con un código (por ejemplo A180 o A41).' },
  { es: 'Doc 8973', en: 'Doc 8973', d: 'Manual de seguridad de la aviación de la OACI, de distribución restringida.' },
  { es: 'Doc 9284', en: 'Doc 9284 (Technical Instructions)', d: 'Instrucciones Técnicas de la OACI para el transporte sin riesgos de mercancías peligrosas. Su Tabla 8-1 regula lo que pueden llevar los pasajeros.' },
  { es: 'Explotador', en: 'Operator', d: 'Persona u organización que opera aeronaves; en la práctica, la aerolínea.' },
  { es: 'Hielo seco', en: 'Dry ice', d: 'Dióxido de carbono sólido, usado para conservar alimentos. Clase 9; máximo 2,5 kg por persona con aprobación.' },
  { es: 'IATA DGR', en: 'IATA DGR', d: 'Reglamento de mercancías peligrosas de IATA, basado en las Instrucciones Técnicas de la OACI.' },
  { es: 'Imagen radiográfica', en: 'X-ray image', d: 'Imagen estática del contenido de un bulto obtenida con rayos X, que el agente analiza para detectar elementos prohibidos.' },
  { es: 'Inspección manual', en: 'Hand search', d: 'Revisión física del equipaje o de la persona cuando la imagen o el detector requieren aclaración.' },
  { es: 'Ion de litio', en: 'Lithium-ion', d: 'Tipo de batería recargable. Su energía se mide en Wh.' },
  { es: 'LAG', en: 'LAGs (liquids, aerosols and gels)', d: 'Líquidos, aerosoles y geles: categoría que muchos países limitan en cabina por razones AVSEC.' },
  { es: 'Mercancía peligrosa', en: 'Dangerous goods', d: 'Artículo o sustancia que puede poner en riesgo la salud, la seguridad o los bienes durante el transporte aéreo.' },
  { es: 'Metal de litio', en: 'Lithium metal', d: 'Pila no recargable de litio. Su límite se expresa en gramos de litio.' },
  { es: 'Objeto prohibido', en: 'Prohibited item', d: 'Elemento que no puede llevarse en una zona determinada (cabina o bodega) por motivos de seguridad.' },
  { es: 'PNSAC', en: 'National Civil Aviation Security Programme', d: 'Programa Nacional de Seguridad de la Aviación Civil de Chile.' },
  { es: 'Power bank', en: 'Power bank', d: 'Banco de energía portátil. Solo en cabina, máximo 2 por persona, sin recargar a bordo (Adenda 1).' },
  { es: 'Punto de inspección', en: 'Screening checkpoint', d: 'Lugar donde se controlan personas y equipaje de mano antes de acceder a la zona estéril.' },
  { es: 'STEB', en: 'Security tamper-evident bag (STEB)', d: 'Bolsa de seguridad inviolable que sella compras de líquidos en tiendas del aeropuerto.' },
  { es: 'Wh (watt-hora)', en: 'Watt-hour (Wh)', d: 'Unidad de energía de una batería. Wh = mAh × voltaje ÷ 1000.' }
];

/* ---------- Banco de evaluación ----------
   Ítems distintos de los de práctica. b: nivel de Bloom (revisado).
   El examen toma 2 ítems al azar por módulo (16 en total).
   La primera opción de cada ítem es la correcta; el orden se baraja al rendir. */
EAA.EVALUACION = [
  /* m1 */
  { m: 'm1', b: 'Comprender', q: 'El Anexo 17 pregunta si un objeto puede usarse para atacar a la aviación. ¿Qué pregunta responde, en cambio, el Anexo 18?', o: ['¿Puede el objeto poner en riesgo el vuelo por sí mismo?', '¿Quién debe inspeccionar el objeto?', '¿Cuánto cuesta transportar el objeto?', '¿En qué aeropuerto se controla el objeto?'], r: 'El Anexo 18 trata el transporte sin riesgos de mercancías peligrosas: el peligro del propio objeto para la seguridad operacional.' },
  { m: 'm1', b: 'Aplicar', q: 'Un pasajero pregunta por qué no puede llevar su encendedor en la maleta que va a facturar. ¿A qué documento recurres para responder con precisión?', o: ['A la Tabla 8-1 del Doc 9284', 'Al Doc 8973, por ser el manual AVSEC', 'Al Anexo 17, porque trata de armas', 'A ninguno: es criterio del agente'], r: 'Es un tema de mercancías peligrosas: lo regula la Tabla 8-1 del Doc 9284 (ítem 5 para encendedores y fósforos).' },
  { m: 'm1', b: 'Recordar', q: 'El DAR 17 es…', o: ['el reglamento de la DGAC que lleva el Anexo 17 a la normativa nacional', 'el manual de mercancías peligrosas de IATA', 'la tabla de objetos que pueden llevar los pasajeros', 'el programa de formación de los agentes AVSEC'], r: 'El DAR 17 es el reglamento de la DGAC sobre seguridad de la aviación civil, basado en el Anexo 17.' },
  /* m2 */
  { m: 'm2', b: 'Aplicar', q: 'Un pasajero lleva un power bank dentro de la maleta que va a facturar. ¿Qué corresponde?', o: ['Retirarlo y llevarlo en cabina', 'Dejarlo en la maleta con cinta sobre los bornes', 'Impedirle viajar', 'Permitirlo si tiene menos de 100 Wh'], r: 'Los power banks están prohibidos en el equipaje facturado y solo pueden ir en cabina, sin importar su energía.' },
  { m: 'm2', b: 'Analizar', q: '¿Por qué un cortacartones está prohibido en cabina pero permitido en bodega?', o: ['Porque en cabina el pasajero tiene acceso a él durante el vuelo y podría usarlo como arma', 'Porque es una mercancía peligrosa de clase 9', 'Porque en bodega nadie lo controla y es inflamable', 'Porque la norma no distingue entre cabina y bodega'], r: 'El criterio AVSEC es el acceso y el potencial de uso como arma: en bodega el pasajero no puede alcanzarlo.' },
  { m: 'm2', b: 'Comprender', q: 'Un elemento figura como «restringido» en cabina. ¿Qué implica para tu decisión?', o: ['Verificar que cumpla las condiciones (cantidad, tamaño, embalaje, aprobación) antes de dejarlo pasar', 'Retenerlo siempre', 'Dejarlo pasar sin revisar nada más', 'Derivarlo siempre a la policía'], r: 'Restringido significa permitido bajo condiciones: la decisión depende de comprobarlas.' },
  /* m3 */
  { m: 'm3', b: 'Aplicar', q: 'Un pasajero lleva un frasco de diluyente de pintura. ¿Qué clase es y qué corresponde?', o: ['Clase 3; no puede viajar en ningún equipaje', 'Clase 2; puede ir en bodega', 'Clase 8; puede ir en cabina con tapa', 'Clase 3; puede ir en bodega hasta 5 L'], r: 'Los líquidos inflamables son clase 3 y no figuran en la Tabla 8-1, así que no están autorizados como equipaje de pasajero.' },
  { m: 'm3', b: 'Recordar', q: '¿Qué clase agrupa las baterías de litio y el hielo seco?', o: ['Clase 9, misceláneas', 'Clase 4, sólidos inflamables', 'Clase 5, comburentes', 'Clase 7, radiactivos'], r: 'Ambas son mercancías peligrosas misceláneas, clase 9.' },
  { m: 'm3', b: 'Analizar', q: 'Un marcapasos implantado contiene material radiactivo (clase 7) y aun así su portador viaja sin problema. ¿Por qué?', o: ['Porque la Tabla 8-1 lo permite expresamente cuando está implantado o es consecuencia de un tratamiento médico', 'Porque la clase 7 no se aplica a los pasajeros', 'Porque es tan pequeño que no se controla', 'Porque requiere siempre aprobación de la aerolínea'], r: 'Es una excepción explícita de la Tabla 8-1 (ítem 15).' },
  /* m4 */
  { m: 'm4', b: 'Aplicar', q: 'Un power bank indica 10.000 mAh y 3,7 V. ¿Cuántos Wh tiene y qué corresponde?', o: ['37 Wh; sin aprobación, solo en cabina', '3,7 Wh; puede ir en bodega', '370 Wh; está prohibido', '37 Wh; requiere aprobación de la aerolínea'], r: 'Wh = mAh × V ÷ 1000 = 10.000 × 3,7 ÷ 1000 = 37 Wh. Bajo 100 Wh no requiere aprobación, pero un power bank va solo en cabina.' },
  { m: 'm4', b: 'Aplicar', q: 'Un fotógrafo lleva una batería de repuesto de ion de litio de 130 Wh. ¿Qué corresponde?', o: ['Requiere aprobación de la aerolínea, solo en cabina y máximo 2 de repuesto', 'Está prohibida', 'Puede ir libremente en bodega', 'Puede ir libremente en cabina'], r: 'Entre 100 y 160 Wh se requiere aprobación; las baterías de repuesto viajan solo en cabina.' },
  { m: 'm4', b: 'Analizar', q: 'Un pasajero lleva 3 power banks de 20.000 mAh a 3,7 V cada uno. ¿Qué observas?', o: ['Cada uno tiene 74 Wh, bajo el límite de energía, pero son más de los 2 permitidos por persona', 'Todo está en regla porque cada uno es menor a 100 Wh', 'Todos están prohibidos porque suman más de 160 Wh', 'Pueden ir 2 en cabina y 1 en bodega'], r: 'Se cumple el límite de energía por unidad, pero la Adenda 1 limita a 2 power banks por persona, y ninguno puede ir en bodega.' },
  /* m5 */
  { m: 'm5', b: 'Aplicar', q: 'Un pasajero quiere llevar 6 botellas de pisco de 1 L (40 %). ¿Qué corresponde?', o: ['Excede el máximo de 5 litros por persona', 'Está permitido sin límite', 'Está prohibido por su graduación', 'Se permite si lo declara'], r: 'Entre 24 % y 70 % se permite hasta 5 L por persona en envases de venta al detalle.' },
  { m: 'm5', b: 'Recordar', q: '¿Cuánto hielo seco puede llevar un pasajero?', o: ['Hasta 2,5 kg, con aprobación de la aerolínea', 'Hasta 5 kg sin aprobación', 'Hasta 1 kg en cabina', 'No puede llevar'], r: 'Ítem 18 de la Tabla 8-1: máximo 2,5 kg por persona, con aprobación y en un bulto que deje escapar el gas.' },
  { m: 'm5', b: 'Comprender', q: '¿En qué se diferencia la razón del límite de 100 ml de la de los aerosoles de tocador?', o: ['El de 100 ml es AVSEC (un líquido podría ocultar un explosivo); el de aerosoles es de mercancías peligrosas', 'Ambos son razones AVSEC', 'Ambos son razones de mercancías peligrosas', 'Ninguno tiene razón de seguridad'], r: 'Un mismo grupo de objetos puede regularse por motivos distintos: conviene identificar de cuál se trata antes de explicarlo.' },
  /* m6 */
  { m: 'm6', b: 'Aplicar', q: 'Un pasajero lleva tijeras con hojas de 6 cm en el equipaje de mano. ¿Qué haces?', o: ['Explicar que no pasan en cabina y ofrecer llevarlas en bodega', 'Dejarlas pasar por ser de uso cotidiano', 'Retenerlas sin ofrecer alternativa', 'Pedir que las envuelvan y dejarlas pasar'], r: 'En cabina solo se admiten tijeras con hojas de hasta 4 cm; en bodega son permitidas.' },
  { m: 'm6', b: 'Analizar', q: '¿Qué criterio justifica los límites de 4 cm, 15 cm y 20 cm en cabina?', o: ['El potencial de uso como arma: filo, punta y longitud', 'El riesgo de incendio', 'El peso del objeto', 'El valor del objeto'], r: 'Son medidas AVSEC referenciales: mientras más largo y filoso, mayor su potencial como arma.' },
  { m: 'm6', b: 'Aplicar', q: 'Un pasajero declara que lleva 3 kg de municiones deportivas. ¿Qué corresponde?', o: ['Solo en bodega, bien embaladas, con aprobación de la aerolínea y la documentación necesaria', 'En cabina, con permiso del agente', 'Están prohibidas en todo equipaje', 'En bodega, sin ninguna condición'], r: 'Las municiones (1.4S) van solo en bodega, hasta 5 kg por persona, con aprobación y documentación.' },
  /* m7 */
  { m: 'm7', b: 'Aplicar', q: 'Un pasajero lleva dos encendedores de cigarrillos. ¿Qué corresponde?', o: ['Solo uno, llevado sobre sí; el segundo no puede viajar', 'Uno en cabina y otro en bodega', 'Ambos en el bolso de mano', 'Ambos en el bolsillo'], r: 'Se permite un encendedor por persona y llevado sobre sí; en bodega está prohibido.' },
  { m: 'm7', b: 'Comprender', q: '¿Cuál de estos elementos no puede viajar en ningún equipaje?', o: ['Un cartucho de gas de camping', 'Una plancha de pelo a gas, con su cubierta y sin repuestos', 'Un encendedor llevado en el bolsillo', 'Hasta 4 cartuchos pequeños de CO₂ con aprobación'], r: 'Los gases y combustibles de campamento no figuran en la Tabla 8-1.' },
  { m: 'm7', b: 'Analizar', q: '¿Por qué el encendedor puede ir en el bolsillo del pasajero pero no en la maleta facturada?', o: ['En el bolsillo el pasajero lo controla y puede reaccionar; en bodega sería una fuente de ignición sin vigilancia', 'Porque en la bodega hace demasiado frío', 'Porque el equipaje facturado no se inspecciona', 'Porque la norma solo regula la cabina'], r: 'El riesgo es el mismo; cambia la posibilidad de reaccionar ante un problema.' },
  /* m8 */
  { m: 'm8', b: 'Aplicar', q: 'En la imagen radiográfica de un bolso de mano aparece una herramienta pesada. ¿Cómo procedes?', o: ['Revisar el bolso, evaluar su estado en cabina, ofrecer llevarla en bodega y explicar el motivo', 'Dejar pasar el bolso sin revisarlo', 'Retener el bolso y no dar explicación', 'Pedir al pasajero que la esconda mejor'], r: 'Detectar, evaluar, resolver con una alternativa y comunicar.' },
  { m: 'm8', b: 'Analizar', q: 'Un pasajero molesto dice «siempre me dejan pasar con esto». ¿Qué respuesta es adecuada?', o: ['Mantener la cortesía y la firmeza, explicar el motivo y ofrecer una alternativa', 'Ceder para evitar el conflicto', 'Discutir hasta que acepte', 'Pasarlo a otro agente sin motivo'], r: 'La norma no se negocia, pero el trato respetuoso y una alternativa ayudan a resolver.' },
  { m: 'm8', b: 'Aplicar', q: 'Durante una inspección manual aparece algo que parece un artefacto explosivo. ¿Qué haces?', o: ['No lo manipulas, activas el protocolo de alerta y avisas al supervisor', 'Lo abres para comprobarlo', 'Se lo devuelves al pasajero', 'Lo dejas en el mostrador y sigues con la fila'], r: 'Estas situaciones se escalan: no se resuelven en el mostrador del control.' }
];

/* =========================================================
   Recorrido por procesos
   Cinco etapas con progresión de aplicación:
   estudiar → comprender → aplicar con apoyo → aplicar en situación → demostrar.
   ========================================================= */
EAA.ETAPAS = [
  { n: 1, verbo: 'Estudiar', titulo: 'Estudiar las normas y los objetos', secciones: ['modulos'], bloom: 'Recordar y comprender', tiempo: 'Cerca de 1 h 30 min en total (8 módulos de 10 a 15 min)',
    resumen: 'Lees los 8 módulos: primero las normas y los conceptos, luego las reglas de cada familia de objetos y, al final, el proceso del punto de control. Cada módulo cierra con un caso para aplicar.' },
  { n: 2, verbo: 'Comprender', titulo: 'Fijar el vocabulario y la regla de cada objeto', secciones: ['glosario', 'fichas'], bloom: 'Comprender', tiempo: '15 a 20 min por sesión, las veces que necesites',
    resumen: 'Consolidas lo estudiado: el glosario te da los términos normativos en español e inglés, y las fichas te hacen recordar la regla exacta de cada uno de los objetos del catálogo.' },
  { n: 3, verbo: 'Aplicar con apoyo', titulo: 'Aplicar las reglas con retroalimentación inmediata', secciones: ['practica'], bloom: 'Aplicar', tiempo: '5 a 10 min por módulo practicado',
    resumen: 'Respondes preguntas por módulo y ves al instante si acertaste y por qué. Es el espacio seguro para equivocarte y corregir antes de decidir sin ayuda.' },
  { n: 4, verbo: 'Aplicar en situación', titulo: 'Decidir como en el punto de control', secciones: ['puesto'], bloom: 'Aplicar y analizar', tiempo: '5 min por partida de 10 objetos',
    resumen: 'Frente a un objeto al azar, decides sin pistas su estado en cabina y en bodega. Integras varios módulos a la vez, como ocurre en el trabajo real.' },
  { n: 5, verbo: 'Demostrar', titulo: 'Demostrar el logro en la evaluación final', secciones: ['evaluacion'], bloom: 'Todos los niveles, de recordar a analizar', tiempo: 'Unos 20 min sin interrupciones',
    resumen: 'Rindes la evaluación sumativa: 16 ítems sin retroalimentación hasta entregar. Obtienes tu desglose por módulo y por nivel de Bloom, y un código de resultado para tu docente.' }
];

/* Guía detallada de cada sección: para qué sirve, qué harás, cómo aprovecharla y qué lograrás. */
EAA.GUIA = {
  modulos: {
    nombre: 'Módulos', etapa: 1,
    para: 'Es la base de todo el recorrido. En 8 módulos breves estudias las normas que regulan lo que un pasajero puede llevar en un avión (Anexos 17 y 18 de la OACI, Doc 9284 y su Tabla 8-1, DAR 17 y PNSAC) y las reglas concretas para cada familia de objetos: baterías, líquidos, cortopunzantes, armas e inflamables. El último módulo traslada todo eso al proceso que sigue un agente en el punto de control.',
    haras: [
      'Leer cada módulo, que parte con sus objetivos y con una explicación de para qué te sirve en el trabajo.',
      'Usar las herramientas interactivas: los rombos de las 9 clases y la calculadora de Wh.',
      'Revisar las reglas del catálogo que aparecen dentro de cada módulo.',
      'Resolver el caso para aplicar que cierra cada módulo y comparar tu respuesta con la solución.',
      'Marcar el módulo como estudiado para seguir tu avance.'
    ],
    como: [
      'Sigue el orden. El bloque A (módulos 1 a 3) entrega las normas y conceptos que los bloques B y C dan por sabidos.',
      'Estudia un módulo por sesión: cada uno toma entre 10 y 15 minutos.',
      'Intenta resolver el caso final antes de abrir la solución; si te cuesta, vuelve a «Lo esencial».'
    ],
    logras: 'Identificar qué norma responde cada pregunta, explicar las reglas de cada familia de objetos y describir el proceso de decisión en el punto de control.'
  },
  glosario: {
    nombre: 'Glosario', etapa: 2,
    para: 'Los documentos de la OACI y de la DGAC usan un vocabulario preciso, y muchos términos aparecen en inglés en manuales, etiquetas, la IATA DGR y el trato con tripulaciones o pasajeros extranjeros. El glosario reúne 29 términos clave con su equivalente en inglés y una definición breve, para que leas y expliques la normativa con la terminología correcta.',
    haras: [
      'Buscar un término por su nombre en español o en inglés, o por una palabra de su definición.',
      'Comparar cada término con su equivalente en inglés.'
    ],
    como: [
      'Tenlo a mano mientras estudias los módulos y consulta cada término que no tengas claro.',
      'Repasa los equivalentes en inglés: son los que encontrarás en el Doc 9284 y en la IATA DGR.',
      'Pon a prueba tu comprensión explicando cada término con tus propias palabras antes de leer su definición.'
    ],
    logras: 'Comprender y usar con precisión los términos normativos, en español y en inglés.'
  },
  fichas: {
    nombre: 'Fichas', etapa: 2,
    para: 'Cada ficha es uno de los objetos del catálogo. Ves el objeto, intentas recordar su regla en cabina y en bodega, y luego compruebas. Es práctica de recuperación: recordar activamente fija la información mucho mejor que releerla, y te prepara para decidir sin consultar.',
    haras: [
      'Ver el objeto y decir, antes de voltear, su estado en cabina y en bodega y sus condiciones.',
      'Voltear la ficha para comprobar la regla, sus límites y su fuente normativa.',
      'Marcar «La sabía» para sacarla del mazo o «Repasar de nuevo» para que vuelva al final.'
    ],
    como: [
      'Filtra por la categoría del módulo que acabas de estudiar; cuando la domines, usa todas.',
      'Responde en voz alta o por escrito antes de voltear: si solo «reconoces» la respuesta, no cuenta.',
      'Vuelve a las fichas después de cada partida del puesto de control para repasar los objetos que fallaste.'
    ],
    logras: 'Recordar con exactitud el estado de cada objeto en cabina y en bodega, con sus condiciones y su fuente.'
  },
  practica: {
    nombre: 'Práctica', etapa: 3,
    para: 'Aquí aplicas lo estudiado con apoyo: después de cada pregunta ves si acertaste y la explicación de por qué. Es práctica formativa, así que los errores son parte del aprendizaje, puedes repetir sin límite y nada se informa a tu docente.',
    haras: [
      'Practicar un módulo con su banco de preguntas (36 en total).',
      'Rendir el examen integrador: 12 preguntas que mezclan todos los módulos y casos tomados del catálogo.',
      'Revisar al final las preguntas falladas, con su explicación y los módulos que conviene releer.'
    ],
    como: [
      'Practica cada módulo justo después de estudiarlo, mientras está fresco.',
      'Lee la explicación también cuando aciertes: confirma que acertaste por la razón correcta.',
      'Repite hasta lograr al menos 80 % en cada módulo antes de pasar al puesto de control.'
    ],
    logras: 'Aplicar las reglas a preguntas concretas y saber qué módulos necesitas reforzar.'
  },
  puesto: {
    nombre: 'Puesto de control', etapa: 4,
    para: 'Simula la decisión que se toma en un punto de inspección: aparece un objeto y debes decidir, sin ayuda previa, su estado en el equipaje de mano y en el facturado. Exige integrar varios módulos a la vez (normas, clases, límites y zonas), como ocurre en el trabajo real.',
    haras: [
      'Jugar partidas de 10 objetos al azar del catálogo, con todas las categorías o con una sola.',
      'Elegir el estado en cabina y en bodega de cada objeto (permitido, restringido o prohibido).',
      'Recibir 1 punto por cada zona acertada y la regla completa después de verificar.',
      'Revisar al final los objetos fallados.'
    ],
    como: [
      'Empieza por las categorías que ya estudiaste y luego juega con todas.',
      'Antes de responder, recorre tres preguntas: ¿qué familia de objeto es?, ¿qué norma aplica?, ¿hay condiciones?',
      'Repasa con las fichas los objetos que fallaste y vuelve a jugar.'
    ],
    logras: 'Decidir con rapidez y fundamento qué ocurre con un objeto en cada zona del avión.'
  },
  evaluacion: {
    nombre: 'Evaluación', etapa: 5,
    para: 'Es la evaluación sumativa final del recorrido. Demuestra lo que lograste en las etapas anteriores con preguntas nuevas que no aparecen en la práctica, y entrega a tu docente un código de resultado como evidencia de logro.',
    haras: [
      'Responder 16 ítems: 2 por módulo, tomados al azar de un banco propio con niveles de Bloom de recordar a analizar.',
      'Avanzar y retroceder libremente, cambiando respuestas antes de entregar.',
      'Recibir al entregar tu puntaje, tu nivel de logro, el desglose por módulo y por nivel de Bloom y la revisión de cada respuesta.',
      'Obtener un código de resultado para copiar o imprimir en PDF.'
    ],
    como: [
      'Ríndela cuando hayas completado las etapas 1 a 4.',
      'Resérvate unos 20 minutos sin interrupciones.',
      'Usa el desglose por módulo para decidir qué volver a estudiar.'
    ],
    logras: 'Evidencia de tu logro para el docente y un diagnóstico preciso de lo que conviene reforzar.'
  }
};

/* Bloques de módulos, propósito de cada módulo y caso para aplicar */
EAA.BLOQUES = [
  { id: 'A', titulo: 'Bloque A · Normas y conceptos', desc: 'Qué documentos mandan, cómo se lee una regla y cómo se clasifican las mercancías peligrosas.', modulos: ['m1', 'm2', 'm3'] },
  { id: 'B', titulo: 'Bloque B · Objetos y sus reglas', desc: 'Las reglas exactas para cada familia de objetos que llevan los pasajeros.', modulos: ['m4', 'm5', 'm6', 'm7'] },
  { id: 'C', titulo: 'Bloque C · Proceso de control', desc: 'Cómo se aplica todo lo anterior frente a un objeto real en el punto de inspección.', modulos: ['m8'] }
];

EAA.PROPOSITO = {
  m1: {
    para: 'Este módulo te da el mapa normativo. Sirve para saber a qué documento recurrir ante cada pregunta del punto de control, distinguir si una restricción es de seguridad de la aviación (AVSEC) o de mercancías peligrosas, y fundamentar tu decisión cuando la explicas a un pasajero o la escalas a tu supervisor. Todos los módulos siguientes citan estas normas.',
    usos: ['Un pasajero pregunta por qué no puede llevar algo y espera una razón concreta.', 'Una regla cambió, por ejemplo con una adenda, y necesitas saber qué documento la modifica.', 'Escalas una duda al supervisor y debes indicar qué norma la regula.'],
    caso: { s: 'Un pasajero reclama que en otro país le dejaron llevar su encendedor en la maleta facturada y pide que le muestres «dónde dice» que no puede. ¿Qué norma corresponde y qué tipo de restricción es?',
      r: 'Es una restricción de mercancías peligrosas, no de AVSEC: el riesgo es el propio objeto como fuente de ignición. La norma es la Tabla 8-1 del Doc 9284 (ítem 5): un encendedor por persona, llevado sobre sí, y prohibido en el equipaje facturado. En Chile se aplica la edición DGAC de esas Instrucciones Técnicas.' }
  },
  m2: {
    para: 'Sirve para leer correctamente cualquier regla del catálogo. Cada objeto tiene un estado distinto en cabina y en bodega, y «restringido» exige comprobar condiciones antes de decidir. Este módulo evita el error más común: responder «prohibido» o «permitido» sin decir en qué zona ni bajo qué condición, y te muestra cuándo existe una alternativa para el pasajero.',
    usos: ['Interpretas una ficha o una consulta del catálogo.', 'Decides si un objeto puede pasar a bodega en vez de quedar retenido.', 'Explicas al pasajero qué alternativa tiene.'],
    caso: { s: 'En el control aparece una navaja con hoja de 7 cm en el bolso de mano. El pasajero aún no ha entregado su maleta. ¿Qué estado tiene la navaja en cada zona y qué alternativa le ofreces?',
      r: 'En cabina es restringida: solo se admiten hojas de hasta 4 cm, así que esta navaja no pasa. En bodega está permitida, bien envuelta. Como el pasajero aún no factura, le ofreces llevarla en la maleta facturada; si no es posible, el abandono voluntario.' }
  },
  m3: {
    para: 'Las 9 clases son el lenguaje común de las mercancías peligrosas: aparecen en etiquetas, documentos y en la Tabla 8-1. Clasificar un objeto te permite anticipar su riesgo (gas, inflamable, corrosivo) aunque no figure en el catálogo, y entender por qué la norma lo trata como lo trata.',
    usos: ['Aparece un producto que no figura en el catálogo y debes estimar su riesgo.', 'Lees un rombo o una etiqueta de peligro en un envase.', 'Justificas por qué un producto químico no puede viajar.'],
    caso: { s: 'Un pasajero lleva un frasco sin etiqueta que, según dice, es «líquido para encender la parrilla». No figura así en el catálogo. ¿Cómo lo clasificas y qué decides?',
      r: 'Por su función es un líquido inflamable, clase 3. Los líquidos inflamables no están autorizados como equipaje de pasajero, ni en cabina ni en bodega, así que no puede viajar. Ante un producto sin identificar, además, corresponde consultar al supervisor.' }
  },
  m4: {
    para: 'Las baterías de litio son hoy la consulta más frecuente y la que más cambió con la Adenda 1. Este módulo sirve para calcular en el momento la energía de una batería, aplicar los cortes de 100 Wh y 160 Wh y las reglas de los power banks, y decidir con exactitud dónde puede viajar cada aparato y cada repuesto.',
    usos: ['Un power bank trae impresos los mAh pero no los Wh.', 'Un fotógrafo o un técnico viaja con baterías de repuesto.', 'Un pasajero quiere llevar un scooter, una bicicleta eléctrica o una estación de energía.'],
    caso: { s: 'Un pasajero lleva en su mochila de cabina un power bank de 26.800 mAh a 3,7 V y otro de 10.000 mAh a 3,7 V. ¿Pueden viajar?',
      r: '26.800 × 3,7 ÷ 1000 = 99,16 Wh, y 10.000 × 3,7 ÷ 1000 = 37 Wh. Ambos están bajo 100 Wh, son 2 (el máximo por persona) y van en cabina, así que pueden viajar, protegidos contra cortocircuitos y sin recargarse a bordo. Aun así, la aerolínea podría prohibirlos.' }
  },
  m5: {
    para: 'Sirve para resolver las consultas de líquidos sin confundir sus dos razones: la de seguridad AVSEC (límite de envases en cabina, que varía según el destino) y la de mercancías peligrosas (aerosoles, alcohol de alta graduación, hielo seco). Saber cuál aplica te permite dar la regla correcta y la explicación correcta.',
    usos: ['Un pasajero viaja con botellas de alcohol de regalo.', 'Revisas perfumes, desodorantes y otros aerosoles de tocador.', 'Alguien transporta alimentos perecibles con hielo seco.'],
    caso: { s: 'Una pasajera lleva en su maleta facturada 3 botellas de 1 L de pisco (40 %), un perfume de 100 ml y un desodorante en aerosol de 200 ml. ¿Cumple las reglas?',
      r: 'Sí. El alcohol suma 3 L, bajo el máximo de 5 L para bebidas de más de 24 % y menos de 70 %, en envases de venta al detalle. Los artículos de tocador no superan 0,5 kg o 0,5 L por envase y suman 0,3 L, bajo el total de 2 kg o 2 L por persona.' }
  },
  m6: {
    para: 'Sirve para aplicar el criterio AVSEC puro: evaluar si un objeto puede usarse como arma dentro de la cabina según su filo, su punta y su longitud. También te entrega el tratamiento especial de armas de fuego, municiones y sprays de defensa, que siempre exigen autorización o están prohibidos.',
    usos: ['Un técnico viaja con herramientas en el bolso de mano.', 'Un deportista lleva bates, palos o equipos de artes marciales.', 'Un cazador o tirador deportivo viaja con su arma y sus municiones.'],
    caso: { s: 'Un técnico lleva en su bolso de mano un destornillador de precisión pequeño, un alicate de punta y unas tijeras con hojas de 3 cm. ¿Qué pasa con cada uno?',
      r: 'El destornillador de precisión de menor tamaño es la excepción admitida en cabina. El alicate de punta es una herramienta prohibida en cabina: debe ir en bodega. Las tijeras, con hojas de hasta 4 cm, pueden ir en cabina.' }
  },
  m7: {
    para: 'Sirve para reconocer las pocas fuentes de ignición y gases que la Tabla 8-1 acepta (encendedor o fósforos, plancha a gas, cartuchos de CO₂), con sus condiciones exactas, y para identificar sin dudar los combustibles y la pirotecnia que no pueden viajar en ningún equipaje.',
    usos: ['Un fumador viaja con encendedor o fósforos.', 'Un viajero de camping lleva gas o combustible para cocinar.', 'Alguien quiere llevar fuegos artificiales o bengalas para una celebración.'],
    caso: { s: 'Un viajero que va de camping lleva en su maleta facturada un cartucho de gas para su cocinilla y un encendedor. ¿Qué corresponde?',
      r: 'El cartucho de gas de camping no puede viajar en ningún equipaje. El encendedor tampoco puede ir en bodega: se admite uno por persona, llevado sobre sí (en el bolsillo).' }
  },
  m8: {
    para: 'Es el módulo de aplicación. Integra todo lo anterior en el proceso que sigue un agente frente a un objeto real (detectar, evaluar, resolver, comunicar y registrar) y en la forma de comunicar la decisión con respeto y firmeza. Es el puente directo hacia el puesto de control simulado y la evaluación final.',
    usos: ['Aparece un objeto prohibido o restringido en la imagen radiográfica o en la inspección manual.', 'Debes comunicar una decisión a un pasajero molesto o apurado.', 'Hay más de un objeto en el mismo bulto y cada uno tiene una regla distinta.'],
    caso: { s: 'En la imagen radiográfica aparecen, en el mismo bolso de mano, un power bank y un spray de defensa personal. El pasajero tiene prisa. Ordena tu actuar.',
      r: 'Detectar: revisas el bolso para confirmar ambos objetos. Evaluar: el power bank puede ir en cabina si cumple (hasta 100 Wh, máximo 2 por persona); el spray de defensa no puede viajar en ningún equipaje. Resolver: permites el power bank y ofreces el abandono voluntario del spray. Comunicar y registrar: explicas el motivo en una frase, con cortesía y firmeza, y registras según el procedimiento.' }
  }
};
