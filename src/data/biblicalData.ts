/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Image assets generated for historical and classical sacred art
import imgHeroCodex from '@/src/assets/images/hero_biblical_codex_1792412783456.jpg';
import imgAbrahamStars from '@/src/assets/images/abraham_patriarch_stars_1792412784176.jpg';
import imgMosesSea from '@/src/assets/images/moses_parting_sea_1792412785699.jpg';
import imgDavidHarp from '@/src/assets/images/king_david_harp_1792412785218.jpg';
import imgJesusSermon from '@/src/assets/images/jesus_mount_sermon_1792412785529.jpg';

export interface BiblicalEra {
  id: string;
  order: number;
  testament: 'Antiguo' | 'Nuevo';
  title: string;
  subtitle: string;
  timeframe: string;
  durationYears: string;
  summary: string;
  keyScriptures: string;
  accentColor: string;
  bannerImage?: string;
  dominantThemes: string[];
}

export interface BiblicalEvent {
  id: string;
  eraId: string;
  testament: 'Antiguo' | 'Nuevo';
  approxDate: string;
  title: string;
  scriptureReference: string;
  keyVerse: string;
  summary: string;
  historicalContext: string;
  theologicalLesson: string;
  location: string;
  associatedCharacters: string[];
  bannerImage?: string;
}

export interface BiblicalCharacter {
  id: string;
  name: string;
  originalName: string; // Hebrew or Greek
  meaning: string;
  category: 'Patriarca' | 'Libertador' | 'Juez' | 'Rey' | 'Profeta' | 'Mujer de Fe' | 'Apóstol' | 'Mesías';
  eraId: string;
  testament: 'Antiguo' | 'Nuevo';
  approxDate: string;
  scriptureBook: string;
  bibleVerse: string;
  image: string;
  shortBio: string;
  decisiveMoment: string;
  keyVirtues: string[];
  spiritualLesson: string;
  keyEvents: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  scriptureRef: string;
  era: string;
}

export const BIBLICAL_ERAS: BiblicalEra[] = [
  {
    id: 'era-creacion-patriarcas',
    order: 1,
    testament: 'Antiguo',
    title: 'Creación y Época de los Patriarcas',
    subtitle: 'El Origen del Cosmos, la Caída y el Pacto Abrahámico',
    timeframe: '~4000 a.C. – ~1800 a.C.',
    durationYears: '~2200 años',
    summary: 'Desde los orígenes de la humanidad y el llamamiento de Abraham de Ur de los Caldeos, hasta el establecimiento de la promesa de bendición universal y los doce patriarcas en Egipto.',
    keyScriptures: 'Génesis 1 – 50; Job',
    accentColor: '#92400E', // warm amber/bronze
    bannerImage: imgAbrahamStars,
    dominantThemes: ['Soberanía Divina', 'Pacto Incondicional', 'Fe y Obediencia', 'El Linaje Escogido']
  },
  {
    id: 'era-exodo-conquista',
    order: 2,
    testament: 'Antiguo',
    title: 'Éxodo, Desierto y Conquista de Canaán',
    subtitle: 'La Liberación de Egipto, la Ley en el Sinaí y la Tierra Prometida',
    timeframe: '~1446 a.C. – ~1380 a.C.',
    durationYears: '~66 años',
    summary: 'La portentosa liberación del pueblo de Israel de la esclavitud egipcia a través de Moisés, la promulgación de los Diez Mandamientos y la travesía hacia la conquista de Canaán bajo Josué.',
    keyScriptures: 'Éxodo, Levítico, Números, Deuteronomio, Josué',
    accentColor: '#B45309', // terracotta ochre
    bannerImage: imgMosesSea,
    dominantThemes: ['Redención', 'Santidad de la Ley', 'Fidelidad en el Desierto', 'Victoria por Fe']
  },
  {
    id: 'era-jueces',
    order: 3,
    testament: 'Antiguo',
    title: 'El Tiempo de los Jueces',
    subtitle: 'Ciclos de Apostasía, Opresión, Clamor y Liberación Caudilla',
    timeframe: '~1380 a.C. – ~1050 a.C.',
    durationYears: '~330 años',
    summary: 'Un turbulento periodo confederado donde "cada uno hacía lo que bien le parecía". Dios levantó jueces líderes como Débora, Gedeón y Sansón para librar a su pueblo arrepentido.',
    keyScriptures: 'Jueces, Rut, 1 Samuel 1 – 7',
    accentColor: '#78350F',
    bannerImage: imgHeroCodex,
    dominantThemes: ['Misericordia en el Arrepentimiento', 'Liderazgo Valiente', 'Fidelidad Silenciosa (Rut)']
  },
  {
    id: 'era-monarquia-unida',
    order: 4,
    testament: 'Antiguo',
    title: 'La Monarquía Unida',
    subtitle: 'La Edad de Oro de Israel: Saúl, David y Salomón',
    timeframe: '~1050 a.C. – ~931 a.C.',
    durationYears: '~120 años',
    summary: 'Israel se consolida como un reino unificado. Bajo David, Jerusalén se convierte en la capital y se establece el Pacto Davídico; Salomón erige el glorioso Templo y la sabiduría florece.',
    keyScriptures: '1 y 2 Samuel, 1 Reyes 1 – 11, Salmos, Proverbios, Eclesiastés, Cantar de los Cantares',
    accentColor: '#B45309', // Royal Bronze
    bannerImage: imgDavidHarp,
    dominantThemes: ['El Reino de Dios', 'El Corazón Conforme a Dios', 'La Adoración en el Templo', 'Sabiduría Divina']
  },
  {
    id: 'era-reino-dividido-exilio',
    order: 5,
    testament: 'Antiguo',
    title: 'Reino Dividido, Profetas y Exilio en Babilonia',
    subtitle: 'Cisma entre Israel y Judá, Caída de Samaria y Destrucción de Jerusalén',
    timeframe: '~931 a.C. – ~538 a.C.',
    durationYears: '~393 años',
    summary: 'Tras la muerte de Salomón el reino se divide en dos: Israel (Norte) y Judá (Sur). Surgen los grandes profetas que advierten del juicio divino y anuncian la futura esperanza mesiánica.',
    keyScriptures: '1 y 2 Reyes, 1 y 2 Crónicas, Isaías, Jeremías, Lamentaciones, Ezequiel, Daniel, Oseas a Malaquías',
    accentColor: '#854D0E',
    bannerImage: imgHeroCodex,
    dominantThemes: ['La Voz Profética', 'Justicia y Rectitud', 'El Remanente Fiel', 'Juicio y Restauración']
  },
  {
    id: 'era-retorno-intertestamentario',
    order: 6,
    testament: 'Antiguo',
    title: 'El Retorno del Exilio y los Cuatrocientos Años',
    subtitle: 'Reconstrucción del Templo, Muros de Jerusalén y Periodo Intertestamentario',
    timeframe: '~538 a.C. – ~4 a.C.',
    durationYears: '~534 años',
    summary: 'El decreto de Ciro permite a los judíos regresar a Jerusalén bajo Zorobabel, Esdras y Nehemías. Siguen cuatro siglos de preparación geopolítica y espiritual para la llegada del Mesías.',
    keyScriptures: 'Esdras, Nehemías, Ester, Hageo, Zacarías, Malaquías',
    accentColor: '#713F12',
    bannerImage: imgHeroCodex,
    dominantThemes: ['Reconstrucción de la Fe', 'Providencia Oculta', 'Expectativa Mesiánica']
  },
  {
    id: 'era-cristo-evangelios',
    order: 7,
    testament: 'Nuevo',
    title: 'Vida, Ministerio y Resurrección de Jesucristo',
    subtitle: 'El Cumplimiento de la Promesa: Encarnación, Cruz y Victoria sobre la Muerte',
    timeframe: '~4 a.C. – ~33 d.C.',
    durationYears: '~37 años',
    summary: 'El Verbo se hizo carne y habitó entre nosotros. El ministerio terrenal de Jesús, sus milagros, su predicación del Reino de Dios, su sacrificio sustitutorio en la cruz y su gloriosa resurrección.',
    keyScriptures: 'Mateo, Marcos, Lucas, Juan',
    accentColor: '#9A3412', // Warm sacred crimson
    bannerImage: imgJesusSermon,
    dominantThemes: ['La Gracia y la Verdad', 'El Reino Inaugurado', 'La Salvación por la Cruz', 'Vida Eterna']
  },
  {
    id: 'era-iglesia-primitiva',
    order: 8,
    testament: 'Nuevo',
    title: 'La Iglesia Primitiva y la Visión Eterna',
    subtitle: 'Pentecostés, la Gran Comisión, Epístolas Apostólicas y el Apocalipsis',
    timeframe: '~33 d.C. – ~100 d.C.',
    durationYears: '~67 años',
    summary: 'El derramamiento del Espíritu Santo impulsa a los discípulos a llevar el Evangelio hasta lo último de la tierra. La conversión de Pablo, el nacimiento de las iglesias y la revelación final.',
    keyScriptures: 'Hechos de los Apóstoles, Epístolas Paulinas y Generales, Apocalipsis',
    accentColor: '#1E3A8A', // Deep sapphire
    bannerImage: imgHeroCodex,
    dominantThemes: ['Poder del Espíritu Santo', 'Amor Comunitario', 'Misión Global', 'La Consumación Final']
  }
];

export const BIBLICAL_EVENTS: BiblicalEvent[] = [
  {
    id: 'evt-creacion',
    eraId: 'era-creacion-patriarcas',
    testament: 'Antiguo',
    approxDate: '~4000 a.C.',
    title: 'La Creación del Mundo y el Huerto del Edén',
    scriptureReference: 'Génesis 1:1 – 2:25',
    keyVerse: 'En el principio creó Dios los cielos y la tierra. Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera.',
    summary: 'Dios llama a la existencia todo lo creado mediante Su poderosa palabra en seis días culminando con la creación del ser humano a su imagen y semejanza.',
    historicalContext: 'Frente a los mitos babilónicos de caos y lucha de deidades, el relato bíblico revela a un único Creador trascendente, sabio y amoroso.',
    theologicalLesson: 'El cosmos tiene propósito divino, orden moral y dignidad intrínseca. El ser humano es colocado como mayordomo responsable de la creación.',
    location: 'El Edén / Creciente Fértil',
    associatedCharacters: ['Adán', 'Eva'],
    bannerImage: imgHeroCodex
  },
  {
    id: 'evt-llamamiento-abraham',
    eraId: 'era-creacion-patriarcas',
    testament: 'Antiguo',
    approxDate: '~2091 a.C.',
    title: 'El Llamamiento de Abraham y el Gran Pacto',
    scriptureReference: 'Génesis 12:1-3; 15:1-6',
    keyVerse: 'Y haré de ti una nación grande, y te bendeciré... y serán benditas en ti todas las familias de la tierra.',
    summary: 'A la edad de 75 años, Abram responde con fe al llamado incondicional de Dios de dejar su tierra y parentela en Ur hacia Canaán. Dios le promete una descendencia innumerable y tierra propia.',
    historicalContext: 'Ur de los Caldeos era una floreciente metrópoli idólatra del dios lunar Sin. Abraham abandonó la seguridad terrenal para seguir al Dios invisible.',
    theologicalLesson: 'La justificación por la fe: "Y creyó a Jehová, y le fue contado por justicia". El pacto abrahámico es la raíz del plan de salvación universal.',
    location: 'Ur de los Caldeos → Harán → Canaán',
    associatedCharacters: ['Abraham', 'Sara'],
    bannerImage: imgAbrahamStars
  },
  {
    id: 'evt-jose-egipto',
    eraId: 'era-creacion-patriarcas',
    testament: 'Antiguo',
    approxDate: '~1898 a.C.',
    title: 'José en Egipto y la Preservación de Israel',
    scriptureReference: 'Génesis 37 – 50',
    keyVerse: 'Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo.',
    summary: 'Vendido como esclavo por sus hermanos y encarcelado injustamente, José es exaltado por Dios como virrey de Egipto, salvando a su familia de la gran hambruna.',
    historicalContext: 'Correspondiente al periodo del Reino Medio o época Hicsa en Egipto, donde semitas alcanzaron altas posiciones en la administración estatal.',
    theologicalLesson: 'La soberanía providencial de Dios transforma la traición humana en instrumento de redención y perdón.',
    location: 'Canaán y Menfis/Gosén (Egipto)',
    associatedCharacters: ['José', 'Jacob']
  },
  {
    id: 'evt-exodo-mar-rojo',
    eraId: 'era-exodo-conquista',
    testament: 'Antiguo',
    approxDate: '~1446 a.C.',
    title: 'Las Diez Plagas, la Pascua y el Cruce del Mar Rojo',
    scriptureReference: 'Éxodo 12 – 14',
    keyVerse: 'No temáis; estad firmes, y ved la salvación que Jehová hará hoy con vosotros... Jehová peleará por vosotros, y vosotros estaréis tranquilos.',
    summary: 'Tras cuatro siglos en Egipto, Dios envía a Moisés frente al Faraón. Tras la institución de la Pascua y las plagas, el mar se abre milagrosamente ante el pueblo acorralado.',
    historicalContext: 'El Éxodo es el evento fundacional de la identidad nacional de Israel y el juicio explícito de Dios sobre los dioses del imperio egipcio.',
    theologicalLesson: 'Dios es el Libertador todopoderoso. La sangre del cordero pascual prefigura el sacrificio del Cordero de Dios que quita el pecado del mundo.',
    location: 'Delta del Nilo y Mar Rojo (Egipto / Sinaí)',
    associatedCharacters: ['Moisés', 'Aarón'],
    bannerImage: imgMosesSea
  },
  {
    id: 'evt-ley-sinai',
    eraId: 'era-exodo-conquista',
    testament: 'Antiguo',
    approxDate: '~1446 a.C.',
    title: 'El Pacto en el Monte Sinaí y el Tabernáculo',
    scriptureReference: 'Éxodo 19 – 20; 25 – 40',
    keyVerse: 'Vosotros me seréis un reino de sacerdotes, y gente santa. Estas son las palabras que dirás a los hijos de Israel.',
    summary: 'En medio de truenos y gloria divina en el monte Sinaí, Dios entrega los Diez Mandamientos y las leyes civiles y ceremoniales, junto con el diseño del Tabernáculo.',
    historicalContext: 'Estructura de pacto de vasallaje del antiguo Oriente Próximo, donde Dios se constituye en Rey soberano y protector de Israel.',
    theologicalLesson: 'La santidad moral de Dios y Su deseo de habitar en medio de su pueblo mediante un sacerdocio y un sistema de sacrificios.',
    location: 'Monte Sinaí / Península del Sinaí',
    associatedCharacters: ['Moisés']
  },
  {
    id: 'evt-caida-jerico',
    eraId: 'era-exodo-conquista',
    testament: 'Antiguo',
    approxDate: '~1406 a.C.',
    title: 'El Cruce del Jordán y la Caída de Jericó',
    scriptureReference: 'Josué 3 – 6',
    keyVerse: 'Mira, yo he entregado en tu mano a Jericó y a su rey, con sus varones de guerra. Por la fe cayeron los muros de Jericó.',
    summary: 'Josué guía a la nueva generación a cruzar el río Jordán en seco. Tras marchar siete días tocando trompetas en obediencia a Dios, los imponentes muros caen desplomados.',
    historicalContext: 'Jericó era una de las fortalezas cananeas más antiguas y estratégicas del valle del Jordán.',
    theologicalLesson: 'La victoria no depende de la fuerza bélica humana, sino de la estricta obediencia y la fe inquebrantable en las directivas de Dios.',
    location: 'Valle de Jericó (Canaán)',
    associatedCharacters: ['Josué', 'Rahab']
  },
  {
    id: 'evt-debora-victoria',
    eraId: 'era-jueces',
    testament: 'Antiguo',
    approxDate: '~1209 a.C.',
    title: 'El Liderazgo de Débora y la Derrota de Sísara',
    scriptureReference: 'Jueces 4 – 5',
    keyVerse: 'Las aldeas quedaron abandonadas en Israel, hasta que yo Débora me levanté, me levanté como madre en Israel.',
    summary: 'Débora, profetisa y jueza, convoca a Barac para liberar a Israel del ejército opresor del rey Jabín. Sísara y sus novecientos carros de hierro son derrotados providencialmente.',
    historicalContext: 'En una sociedad patriarcal y convulsionada, Dios levanta a una mujer con autoridad espiritual, sabiduría jurídica y valor militar.',
    theologicalLesson: 'Dios usa instrumentos dispuestos sin importar las limitaciones culturales, honrando la fe audaz sobre la cobardía.',
    location: 'Monte Tabor y Torrente de Cisón',
    associatedCharacters: ['Débora', 'Barac']
  },
  {
    id: 'evt-uncion-david-goliat',
    eraId: 'era-monarquia-unida',
    testament: 'Antiguo',
    approxDate: '~1024 a.C.',
    title: 'David es Ungido y Vence al Gigante Goliat',
    scriptureReference: '1 Samuel 16 – 17',
    keyVerse: 'Tú vienes a mí con espada y lanza y jabalina; mas yo vengo a ti en el nombre de Jehová de los ejércitos, a quien tú has provocado.',
    summary: 'El joven pastor David, elegido por Dios por la devoción de su corazón, derrota al temible campeón filisteo Goliat en el valle de Ela usando sólo una honda y fe total en Jehová.',
    historicalContext: 'La guerra con los filisteos amenazaba la supervivencia misma de las doce tribus de Israel en la franja costera y las colinas.',
    theologicalLesson: 'El hombre mira la apariencia externa, mas Dios mira el corazón. La batalla es del Señor y Él libra a los que confían en Su Santo Nombre.',
    location: 'Belén y Valle de Ela',
    associatedCharacters: ['David', 'Samuel', 'Saúl'],
    bannerImage: imgDavidHarp
  },
  {
    id: 'evt-templo-salomon',
    eraId: 'era-monarquia-unida',
    testament: 'Antiguo',
    approxDate: '~960 a.C.',
    title: 'La Dedicación del Primer Templo de Jerusalén',
    scriptureReference: '1 Reyes 6 – 8; 2 Crónicas 5 – 7',
    keyVerse: 'Cuando los sacerdotes salieron del santuario, la nube llenó la casa de Jehová... porque la gloria de Jehová había llenado la casa.',
    summary: 'Salomón erige en el monte Moriah una obra maestra arquitectónica revestida de cedro del Líbano y oro puro. Al descender el fuego celestial, la presencia divina consagra el recinto.',
    historicalContext: 'El auge del imperio davídico-salomónico brindó paz, rutas comerciales globales y riquezas sin precedentes para la construcción.',
    theologicalLesson: 'Dios habita con su pueblo pero es más grande que los cielos de los cielos. El Templo es casa de oración para todas las naciones.',
    location: 'Monte Moriah / Jerusalén',
    associatedCharacters: ['Salomón']
  },
  {
    id: 'evt-elias-carmelo',
    eraId: 'era-reino-dividido-exilio',
    testament: 'Antiguo',
    approxDate: '~860 a.C.',
    title: 'El Desafío de Elías en el Monte Carmelo',
    scriptureReference: '1 Reyes 18',
    keyVerse: 'Respóndeme, Jehová, respóndeme, para que conozca este pueblo que tú, oh Jehová, eres el Dios... Entonces cayó fuego de Jehová y consumió el holocausto.',
    summary: 'Frente al rey Acab y 450 profetas de Baal, el profeta Elías convoca a Israel a dejar de claudicar entre dos pensamientos. El Dios que responde con fuego es el verdadero Dios.',
    historicalContext: 'La reina Jezabel había introducido el culto sangriento y degradante a Baal y Asera en el reino del norte, persiguiendo a muerte a los profetas de Dios.',
    theologicalLesson: 'La intolerancia divina ante la idolatría. Dios demuestra su supremacía indiscutible sobre las fuerzas de la naturaleza y los falsos ídolos.',
    location: 'Monte Carmelo',
    associatedCharacters: ['Elías', 'Acab']
  },
  {
    id: 'evt-destruccion-jerusalen',
    eraId: 'era-reino-dividido-exilio',
    testament: 'Antiguo',
    approxDate: '586 a.C.',
    title: 'La Caída de Jerusalén y el Cautiverio en Babilonia',
    scriptureReference: '2 Reyes 25; Jeremías 39; 52',
    keyVerse: 'Por cuanto no quisisteis oír mis palabras, he aquí enviaré a Nabucodonosor rey de Babilonia, mi siervo, y los traeré contra esta tierra.',
    summary: 'Tras resistir un prolongado asedio, las murallas de Jerusalén son derribadas, el Templo de Salomón es quemado hasta los cimientos y el pueblo es deportado a Babilonia.',
    historicalContext: 'El poderoso imperio neobabilónico aplastó las rebeliones judías tras reiteradas advertencias de Jeremías sobre la futilidad de aliarse con Egipto.',
    theologicalLesson: 'El pecado persistente y la dureza de corazón traen consecuencias reales de juicio, pero Dios preserva un remanente según su fidelidad al pacto.',
    location: 'Jerusalén → Babilonia',
    associatedCharacters: ['Jeremías', 'Nabucodonosor', 'Sedequías']
  },
  {
    id: 'evt-daniel-leones',
    eraId: 'era-reino-dividido-exilio',
    testament: 'Antiguo',
    approxDate: '~539 a.C.',
    title: 'Daniel en el Foso de los Leones y Fidelidad en el Exilio',
    scriptureReference: 'Daniel 6',
    keyVerse: 'Mi Dios envió su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño, porque ante él fui hallado inocente.',
    summary: 'Por negarse a dejar de orar tres veces al día al Dios del cielo, Daniel es arrojado por intriga de los sátrapas al foso de fieras leonas, de donde sale ileso por mano divina.',
    historicalContext: 'La transición del imperio Babilónico al imperio Medo-Persa bajo Darío y Ciro el Grande.',
    theologicalLesson: 'La soberanía universal de Dios sobre los reyes gentiles y la protección infalible a los creyentes fieles que no comprometen sus convicciones.',
    location: 'Babilonia / Susa',
    associatedCharacters: ['Daniel', 'Darío']
  },
  {
    id: 'evt-nehemias-muros',
    eraId: 'era-retorno-intertestamentario',
    testament: 'Antiguo',
    approxDate: '445 a.C.',
    title: 'Nehemías Reconstruye las Murallas en 52 Días',
    scriptureReference: 'Nehemías 1 – 6',
    keyVerse: 'El Dios de los cielos, él nos prosperará, y nosotros sus siervos nos levantaremos y edificaremos.',
    summary: 'El copero judío del rey Artajerjes obtiene permiso para viajar a Jerusalén y dirigir la reconstrucción de los muros de la ciudad en tiempo récord frente a severa oposición armada.',
    historicalContext: 'El imperio Persa permitía cierta autonomía religiosa a los pueblos vasallos mientras mantuvieran la lealtad y el pago de tributos.',
    theologicalLesson: 'El liderazgo piadoso combina oración ferviente con planeación estratégica y trabajo tenaz frente al desánimo y la persecución.',
    location: 'Jerusalén',
    associatedCharacters: ['Nehemías', 'Esdras']
  },
  {
    id: 'evt-nacimiento-jesus',
    eraId: 'era-cristo-evangelios',
    testament: 'Nuevo',
    approxDate: '~4 a.C.',
    title: 'La Natividad: El Verbo Encarnado en Belén',
    scriptureReference: 'Lucas 2:1-20; Mateo 1:18 – 2:12',
    keyVerse: 'Porque os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor. ¡Gloria a Dios en las alturas, y en la tierra paz!',
    summary: 'Nacido humildemente en un pesebre de Belén de la virgen María, el Hijo de Dios entra en la historia humana, proclamado por ángeles a humildes pastores y adorado por sabios de Oriente.',
    historicalContext: 'Bajo el reinado del emperador romano César Augusto y Herodes el Grande en Judea.',
    theologicalLesson: 'La Encarnación: Dios se abajó y se hizo uno de nosotros para redimir a la humanidad perdida. La grandeza divina se manifiesta en la humildad.',
    location: 'Belén de Judea',
    associatedCharacters: ['Jesucristo', 'María', 'José de Nazaret']
  },
  {
    id: 'evt-sermon-monte',
    eraId: 'era-cristo-evangelios',
    testament: 'Nuevo',
    approxDate: '~28 d.C.',
    title: 'El Sermón del Monte y las Bienaventuranzas',
    scriptureReference: 'Mateo 5 – 7',
    keyVerse: 'Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos... Vosotros sois la luz del mundo.',
    summary: 'En las colinas con vista al Mar de Galilea, Jesús proclama la ética sublime del Reino de Dios: amor a los enemigos, pureza de corazón, generosidad secreta y confianza en el Padre celestial.',
    historicalContext: 'En contraste con el legalismo farisaico y el celo violento de los zelotes contra Roma, Jesús enseña un reino de paz, justicia y transformación interior.',
    theologicalLesson: 'La verdadera justicia no reside en ritos externos, sino en una regeneración del corazón guiado por el Espíritu y la gracia.',
    location: 'Monte de las Bienaventuranzas (Galilea)',
    associatedCharacters: ['Jesucristo'],
    bannerImage: imgJesusSermon
  },
  {
    id: 'evt-muerte-resurreccion',
    eraId: 'era-cristo-evangelios',
    testament: 'Nuevo',
    approxDate: '30 / 33 d.C.',
    title: 'La Pasión, Muerte en la Cruz y Gloriosa Resurrección',
    scriptureReference: 'Mateo 26 – 28; Juan 18 – 21',
    keyVerse: 'Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros... ¡No está aquí, pues ha resucitado!',
    summary: 'Jesús celebra la Última Cena, es traicionado, juzgado ante Pilato y crucificado en el Gólgota. Al tercer día, la tumba vacía testifica que ha vencido a la muerte para siempre.',
    historicalContext: 'La crucifixión era el suplicio romano más vergonzoso reservado a criminales y rebeldes. La tumba fue sellada y custodiada por soldados romanos.',
    theologicalLesson: 'El centro neurálgico del Evangelio: la expiación vicaria de los pecados y la victoria definitiva sobre la condenación, el diablo y la muerte.',
    location: 'Gólgota y Huerto del Sepulcro (Jerusalén)',
    associatedCharacters: ['Jesucristo', 'Pedro', 'Juan', 'María Magdalena'],
    bannerImage: imgJesusSermon
  },
  {
    id: 'evt-pentecostes',
    eraId: 'era-iglesia-primitiva',
    testament: 'Nuevo',
    approxDate: '30 / 33 d.C.',
    title: 'El Día de Pentecostés y el Nacimiento de la Iglesia',
    scriptureReference: 'Hechos 2',
    keyVerse: 'Y de repente vino del cielo un estruendo como de un viento recio... y fueron todos llenos del Espíritu Santo.',
    summary: 'Ciento veinte discípulos congregados en oración en el aposento alto reciben el don del Espíritu Santo. Pedro predica con denuedo y cerca de tres mil almas son bautizadas en un día.',
    historicalContext: 'La fiesta judía de Pentecostés (Shavuot) congregaba a judíos piadosos de todo el Imperio Romano en Jerusalén.',
    theologicalLesson: 'El Espíritu Santo faculta a la Iglesia para ser testigo viviente de Cristo hasta los confines de la tierra, derribando barreras culturales e idiomáticas.',
    location: 'Jerusalén',
    associatedCharacters: ['Pedro', 'Los Apóstoles']
  },
  {
    id: 'evt-conversion-pablo',
    eraId: 'era-iglesia-primitiva',
    testament: 'Nuevo',
    approxDate: '~34 d.C.',
    title: 'La Conversión de Saulo en el Camino a Damasco',
    scriptureReference: 'Hechos 9:1-19; Gálatas 1:11-24',
    keyVerse: 'Saulo, Saulo, ¿por qué me persigues? Él dijo: ¿Quién eres, Señor? Y le dijo: Yo soy Jesús, a quien tú persigues.',
    summary: 'Saulo de Tarso, celoso perseguidor fariseo de los primeros cristianos, es cegado por una luz celestial en el camino a Damasco y comisionado como apóstol a los gentiles.',
    historicalContext: 'La fe cristiana comenzaba a expandirse más allá de Judea hacia las ciudades helenísticas de Siria.',
    theologicalLesson: 'Nadie está fuera del alcance de la gracia salvadora de Dios. El peor adversario puede convertirse en el más ferviente mensajero del Evangelio.',
    location: 'Camino a Damasco',
    associatedCharacters: ['Pablo', 'Ananías']
  },
  {
    id: 'evt-apocalipsis-patmos',
    eraId: 'era-iglesia-primitiva',
    testament: 'Nuevo',
    approxDate: '~95 d.C.',
    title: 'La Visión de Patmos y la Nueva Jerusalén',
    scriptureReference: 'Apocalipsis 1; 21 – 22',
    keyVerse: 'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.',
    summary: 'El apóstol Juan, desterrado en la isla de Patmos por la persecución del emperador Domiciano, recibe la revelación profética de la victoria final de Cristo sobre el mal y la instauración de los cielos nuevos.',
    historicalContext: 'Periodo de sangrienta persecución estatal romana contra las comunidades cristianas de Asia Menor.',
    theologicalLesson: 'La historia humana no culmina en catástrofe sin sentido, sino en el triunfo glorioso de Dios, el juicio de la maldad y la comunión eterna con los redimidos.',
    location: 'Isla de Patmos (Mar Egeo)',
    associatedCharacters: ['Juan el Apóstol'],
    bannerImage: imgHeroCodex
  }
];

export const BIBLICAL_CHARACTERS: BiblicalCharacter[] = [
  {
    id: 'char-abraham',
    name: 'Abraham',
    originalName: 'אַבְרָהָם (Avraham)',
    meaning: 'Padre de una multitud de naciones',
    category: 'Patriarca',
    eraId: 'era-creacion-patriarcas',
    testament: 'Antiguo',
    approxDate: '~2166 – 1991 a.C.',
    scriptureBook: 'Génesis 11 – 25; Romanos 4; Hebreos 11',
    bibleVerse: 'Por la fe Abraham, siendo llamado, obedeció para salir al lugar que había de recibir como herencia; y salió sin saber a dónde iba.',
    image: imgAbrahamStars,
    shortBio: 'Originario de Ur de los Caldeos, fue llamado por Dios para fundar una nueva nación y convertirse en el padre de la fe monoteísta. A través de su simiente Dios prometió bendecir a todas las familias de la tierra.',
    decisiveMoment: 'La prueba suprema en el monte Moriah (Génesis 22), donde estuvo dispuesto a entregar a su hijo de la promesa Isaac, creyendo que Dios era poderoso incluso para resucitar de los muertos.',
    keyVirtues: ['Fe incondicional', 'Hospitalidad generosa', 'Intercesión por los perdidos', 'Paciencia en las promesas'],
    spiritualLesson: 'La fe verdadera actúa en obediencia aun cuando no se conocen los detalles del camino ni se comprende humanamente el plan.',
    keyEvents: ['Salida de Ur y Harán', 'El Pacto de las Estrellas', 'Intercesión por Sodoma', 'La ofrenda de Isaac']
  },
  {
    id: 'char-sara',
    name: 'Sara',
    originalName: 'שָׂרָה (Sarah)',
    meaning: 'Princesa / Noble',
    category: 'Mujer de Fe',
    eraId: 'era-creacion-patriarcas',
    testament: 'Antiguo',
    approxDate: '~2156 – 2029 a.C.',
    scriptureBook: 'Génesis 11 – 23; Hebreos 11:11; 1 Pedro 3:6',
    bibleVerse: 'Por la fe también la misma Sara, siendo estéril, recibió fuerza para concebir; y dio a luz aun fuera del tiempo de la edad, porque creyó que era fiel quien lo había prometido.',
    image: imgAbrahamStars,
    shortBio: 'Esposa de Abraham y matriarca del pueblo hebreo. A pesar de su prolongada esterilidad y avanzada edad, concibió milagrosamente a Isaac cuando tenía noventa años, cumpliendo la palabra divina.',
    decisiveMoment: 'El nacimiento de su hijo Isaac ("Risa"), convirtiendo su escepticismo inicial en gozo desbordante y testimonio imperecedero del poder de Dios.',
    keyVirtues: ['Lealtad conyugal', 'Perseverancia ante el estigma social', 'Fe en lo humanamente imposible'],
    spiritualLesson: 'Nada hay imposible para Dios; los retrasos terrenales no anulan los compromisos del Creador.',
    keyEvents: ['Salida de Ur acompañando a Abraham', 'Promesa angelical en el encinar de Mamre', 'Nacimiento de Isaac a los 90 años']
  },
  {
    id: 'char-moises',
    name: 'Moisés',
    originalName: 'מֹשֶׁה (Mosheh)',
    meaning: 'Rescatado de las aguas',
    category: 'Libertador',
    eraId: 'era-exodo-conquista',
    testament: 'Antiguo',
    approxDate: '~1526 – 1406 a.C.',
    scriptureBook: 'Éxodo, Levítico, Números, Deuteronomio',
    bibleVerse: 'Y nunca más se levantó profeta en Israel como Moisés, a quien haya conocido Jehová cara a cara.',
    image: imgMosesSea,
    shortBio: 'Salvado milagrosamente del Nilo y criado en la corte egipcia, pastoreó en Madián durante 40 años hasta el encuentro con la zarza ardiente. Condujo a Israel fuera de Egipto y transmitió la Ley de Dios.',
    decisiveMoment: 'Enfrentar el mar cerrado por delante y las cuadrigas del Faraón por detrás, alzando su vara en el nombre de Jehová para ver dividirse las aguas.',
    keyVirtues: ['Mansedumbre profunda', 'Valor frente a tiranos', 'Intercesión sacrificial por el pueblo', 'Fidelidad como mediador'],
    spiritualLesson: 'Dios no llama a los capacitados, sino capacita a los que se rinden voluntariamente a Su voluntad.',
    keyEvents: ['La zarza ardiente', 'Las diez plagas sobre Egipto', 'La entrega de las Tablas de la Ley en el Sinaí', 'La visión de la Tierra Prometida desde el Monte Nebo']
  },
  {
    id: 'char-josue',
    name: 'Josué',
    originalName: 'יְהוֹשֻׁעַ (Yehoshua)',
    meaning: 'Jehová es salvación',
    category: 'Libertador',
    eraId: 'era-exodo-conquista',
    testament: 'Antiguo',
    approxDate: '~1486 – 1376 a.C.',
    scriptureBook: 'Éxodo 17; Números 13 – 14; Libro de Josué',
    bibleVerse: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.',
    image: imgMosesSea,
    shortBio: 'Servidor leal de Moisés y uno de los dos espías fieles que confiaron en que Dios les entregaría Canaán. Sucedió a Moisés y dirigió con éxito militar y devoción espiritual la conquista.',
    decisiveMoment: 'El llamamiento ante el Jordán crecido y la victoria contra la fortaleza de Jericó confiando únicamente en la estrategia divina de adoración.',
    keyVirtues: ['Valentía intrépida', 'Obediencia exacta a la Palabra', 'Fidelidad familiar incondicional'],
    spiritualLesson: 'La promesa del respaldo de Dios exige valor humano activo y meditación constante en la ley divina.',
    keyEvents: ['Espionaje de Canaán con Caleb', 'Cruce del Jordán en seco', 'Conquista de Jericó', 'Pacto solemne en Siquem ("Yo y mi casa serviremos a Jehová")']
  },
  {
    id: 'char-debora',
    name: 'Débora',
    originalName: 'דְּבוֹרָה (Devorah)',
    meaning: 'Abeja / Diligente',
    category: 'Juez',
    eraId: 'era-jueces',
    testament: 'Antiguo',
    approxDate: '~1200 a.C.',
    scriptureBook: 'Jueces 4 y 5',
    bibleVerse: 'Despierta, despierta, Débora; despierta, despierta, entona cántico.',
    image: imgHeroCodex,
    shortBio: 'Única mujer jueza de Israel, profetisa y poetisa. Juzgaba a Israel bajo su palmera entre Ramá y Betel y fue instrumento clave para inspirar el contraataque liberador frente a los cananeos.',
    decisiveMoment: 'Acompañar a Barac al campo de batalla asegurando que la victoria procedía de la intervención celestial sobre el ejército de Sísara.',
    keyVirtues: ['Sabiduría judicial', 'Inspiración motivacional', 'Sensibilidad profética', 'Gratitud poética en la alabanza'],
    spiritualLesson: 'El liderazgo espiritual se mide por la capacidad de elevar a otros y discernir con exactitud el tiempo de la acción divina.',
    keyEvents: ['Administración de justicia bajo la palmera', 'Convocatoria del ejército de Neftalí y Zabulón', 'Cántico triunfal de Débora']
  },
  {
    id: 'char-rut',
    name: 'Rut la Moabita',
    originalName: 'רוּת (Rut)',
    meaning: 'Compañera / Amiga fiel',
    category: 'Mujer de Fe',
    eraId: 'era-jueces',
    testament: 'Antiguo',
    approxDate: '~1100 a.C.',
    scriptureBook: 'Libro de Rut; Mateo 1:5',
    bibleVerse: 'No me ruegues que te deje, y me aparte de ti; porque a dondequiera que tú fueres, iré yo... tu pueblo será mi pueblo, y tu Dios mi Dios.',
    image: imgHeroCodex,
    shortBio: 'Joven viuda moabita que rehusó abandonar a su suegra Noemí en su desgracia. Emigró a Belén, espigó en los campos de Booz y fue redimida, convirtiéndose en bisabuela del rey David y antepasada directa del Mesías.',
    decisiveMoment: 'La declaración irrevocable de fidelidad a Noemí y adopción del Dios de Israel en el cruce de fronteras de Moab a Belén.',
    keyVirtues: ['Lealtad sacrificial', 'Diligencia laboral intachable', 'Humildad respetuosa', 'Pureza de intenciones'],
    spiritualLesson: 'La providencia divina teje los mayores destinos salvíficos en la fidelidad cotidiana de personas aparentemente invisibles.',
    keyEvents: ['Éxodo voluntario con Noemí a Belén', 'Espigueo en los campos de Booz', 'Redención y matrimonio como pariente redentor', 'Nacimiento de Obed']
  },
  {
    id: 'char-david',
    name: 'David',
    originalName: 'דָּוִד (Dawid)',
    meaning: 'Amado',
    category: 'Rey',
    eraId: 'era-monarquia-unida',
    testament: 'Antiguo',
    approxDate: '~1040 – 970 a.C.',
    scriptureBook: '1 y 2 Samuel; 1 Crónicas; Libro de los Salmos',
    bibleVerse: 'He hallado a David hijo de Isaí, varón conforme a mi corazón, quien hará todo lo que yo quiero.',
    image: imgDavidHarp,
    shortBio: 'Pastor de ovejas en Belén, salmista y guerrero ungido por Samuel. Conquistó Jerusalén convirtiéndola en Sión, unificó las tribus y recibió el pacto eterno de que su linaje reinaría para siempre.',
    decisiveMoment: 'Enfrentar a Goliat en el valle de Ela cuando todo el ejército temblaba, impulsado por celo santo por la reputación del Dios viviente.',
    keyVirtues: ['Adorador apasionado', 'Arrepentimiento genuino y quebrantado', 'Generosidad hacia los enemigos', 'Valentía bélica'],
    spiritualLesson: 'Un corazón conforme a Dios no es uno que nunca tropieza, sino uno que confiesa su pecado con profundo quebranto y busca la gracia divina.',
    keyEvents: ['Unción secreta en Belén', 'Victoria sobre Goliat', 'Conquista de Jerusalén', 'Pacto Davídico eterno (2 Samuel 7)', 'Composición de los Salmos']
  },
  {
    id: 'char-salomon',
    name: 'Salomón',
    originalName: 'שְׁלֹמֹה (Shelomoh)',
    meaning: 'Pacífico / Su paz',
    category: 'Rey',
    eraId: 'era-monarquia-unida',
    testament: 'Antiguo',
    approxDate: '~990 – 931 a.C.',
    scriptureBook: '1 Reyes 1 – 11; Proverbios; Eclesiastés; Cantares',
    bibleVerse: 'Da, pues, a tu siervo corazón con entendimiento para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo.',
    image: imgDavidHarp,
    shortBio: 'Tercer rey de Israel e hijo de David y Betsabé. Cuando Dios le ofreció lo que pidiera en Gabaón, solicitó sabiduría para guiar al pueblo. Construyó el Templo de Jerusalén y escribió proverbios.',
    decisiveMoment: 'El juicio salomónico entre las dos madres que disputaban la maternidad de un bebé vivo, revelando sabiduría celestial.',
    keyVirtues: ['Sabiduría y discernimiento', 'Capacidad organizativa sublime', 'Apreciación de la belleza de la creación'],
    spiritualLesson: 'El mayor don intelectual o material es vanidad si el corazón no permanece fiel y exclusivo al Señor hasta el fin de los días.',
    keyEvents: ['La petición de sabiduría en Gabaón', 'Edificación y consagración del Primer Templo', 'Visita de la Reina de Sabá', 'Autoría sapiencial']
  },
  {
    id: 'char-elias',
    name: 'Elías el Tisbita',
    originalName: 'אֵלִיָּהוּ (Eliyahu)',
    meaning: 'Mi Dios es Jehová',
    category: 'Profeta',
    eraId: 'era-reino-dividido-exilio',
    testament: 'Antiguo',
    approxDate: '~900 – 849 a.C.',
    scriptureBook: '1 Reyes 17 – 2 Reyes 2; Lucas 1:17; Santiago 5:17',
    bibleVerse: 'Elías era hombre sujeto a pasiones semejantes a las nuestras, y oró fervientemente ni lloviese, y no llovió sobre la tierra por tres años y seis meses.',
    image: imgHeroCodex,
    shortBio: 'Profeta de fuego originario de Galaad. Desafió la corrupción idólatra del rey Acab y Jezabel, cerró los cielos mediante la oración, derrotó a los profetas de Baal en el Carmelo y fue arrebatado al cielo en un torbellino.',
    decisiveMoment: 'La oración en el monte Carmelo pidiendo que descendiera fuego para consumir el holocausto empapado, volviendo el corazón del pueblo a Dios.',
    keyVirtues: ['Celo profético intrépido', 'Poder inquebrantable en la oración', 'Dependencia radical del sustento divino'],
    spiritualLesson: 'Dios consuela a sus siervos en la depresión y el desánimo no con terremotos ni fuegos, sino con un silbo apacible y delicado.',
    keyEvents: ['Alimentado por cuervos junto al arroyo de Querit', 'Resurrección del hijo de la viuda de Sarepta', 'El desafío del Carmelo', 'Arrebatamiento en carro de fuego']
  },
  {
    id: 'char-isaias',
    name: 'Isaías',
    originalName: 'יְשַׁעְיָהוּ (Yeshayahu)',
    meaning: 'Jehová es salvación',
    category: 'Profeta',
    eraId: 'era-reino-dividido-exilio',
    testament: 'Antiguo',
    approxDate: '~740 – 681 a.C.',
    scriptureBook: 'Libro de Isaías; citado ampliamente en los Evangelios',
    bibleVerse: 'Después oí la voz del Señor, que decía: ¿A quién enviaré, y quién irá por nosotros? Entonces respondí yo: Heme aquí, envíame a mí.',
    image: imgHeroCodex,
    shortBio: 'Conocido como el "Príncipe de los Profetas" y el "profeta evangélico del Antiguo Testamento". Ejerció su ministerio en Jerusalén durante cuatro reinados y profetizó el nacimiento virginal y los sufrimientos expiatorios del Mesías.',
    decisiveMoment: 'Su visión del trono celestial en el año que murió el rey Uzías (Isaías 6), purificado por el carbón encendido del altar.',
    keyVirtues: ['Consagración inmediata', 'Visión majestuosa de la santidad de Dios', 'Consuelo y esperanza poética'],
    spiritualLesson: 'El reconocimiento de la infinita santidad de Dios nos muestra nuestra pequeñez moral e inspira una respuesta gozosa de servicio.',
    keyEvents: ['Visión celestial del Trono y los Serafines', 'La profecía de Emanuel (Isaías 7)', 'El Cántico del Siervo Sufriente (Isaías 53)']
  },
  {
    id: 'char-daniel',
    name: 'Daniel',
    originalName: 'דָּנִיֵּאל (Daniyel)',
    meaning: 'Dios es mi juez',
    category: 'Profeta',
    eraId: 'era-reino-dividido-exilio',
    testament: 'Antiguo',
    approxDate: '~620 – 536 a.C.',
    scriptureBook: 'Libro de Daniel; Mateo 24:15',
    bibleVerse: 'Y Daniel propuso en su corazón no contaminarse con la porción de la comida del rey, ni con el vino que él bebía.',
    image: imgHeroCodex,
    shortBio: 'Joven noble judío llevado cautivo a Babilonia. Sirvió con integridad y excelencia profesional en los imperios babilónico y persa, interpretó sueños proféticos y recibió revelaciones del fin de los tiempos.',
    decisiveMoment: 'Mantener su disciplina de oración tres veces al día con las ventanas abiertas hacia Jerusalén a pesar del edicto de muerte de los leones.',
    keyVirtues: ['Integridad moral innegociable', 'Excelencia académica y gubernamental', 'Humildad e intercesión profética'],
    spiritualLesson: 'Se puede vivir en medio de una cultura pagana y hostil sin claudicar en los valores sagrados si se tiene el corazón resuelto.',
    keyEvents: ['Prueba de las legumbres en Babilonia', 'Interpretación de la estatua colosal de Nabucodonosor', 'La escritura en la pared de Belsasar', 'Milagro en el foso de los leones']
  },
  {
    id: 'char-ester',
    name: 'Ester (Hadasa)',
    originalName: 'אֶסְתֵּר (Ester) / הֲדַסָּה (Hadassah)',
    meaning: 'Estrella / Mirto',
    category: 'Mujer de Fe',
    eraId: 'era-retorno-intertestamentario',
    testament: 'Antiguo',
    approxDate: '~480 a.C.',
    scriptureBook: 'Libro de Ester',
    bibleVerse: '¿Y quién sabe si para esta hora has llegado al reino?... y si perezco, que perezca.',
    image: imgHeroCodex,
    shortBio: 'Huérfana judía criada por su primo Mardoqueo en la capital persa de Susa. Escogida como reina por el rey Asuero (Jerjes I), arriesgó su propia vida para desarticular el genocidio planeado por Amán.',
    decisiveMoment: 'Presentarse sin ser llamada ante el trono del monarca persa tras tres días de ayuno de todo el pueblo judío en Susa.',
    keyVirtues: ['Valentía sacrificial', 'Prudencia estratégica', 'Amor entrañable por su pueblo', 'Confianza en la providencia'],
    spiritualLesson: 'Dios nos ubica estratégicamente en puestos de influencia no para nuestro confort personal, sino para el beneficio y salvación de otros.',
    keyEvents: ['Coronación como reina de Persia', 'El ayuno solemne de tres días', 'El banquete donde desenmascara a Amán', 'Institución de la fiesta de Purim']
  },
  {
    id: 'char-juan-bautista',
    name: 'Juan el Bautista',
    originalName: 'Ἰωάννης ὁ Βαπτιστής (Ioannes)',
    meaning: 'Jehová ha mostrado gracia',
    category: 'Profeta',
    eraId: 'era-cristo-evangelios',
    testament: 'Nuevo',
    approxDate: '~6 a.C. – 29 d.C.',
    scriptureBook: 'Mateo 3; Lucas 1; 3; Juan 1:19-34',
    bibleVerse: 'Es necesario que él crezca, pero que yo mengüe. He aquí el Cordero de Dios, que quita el pecado del mundo.',
    image: imgJesusSermon,
    shortBio: 'Hijo milagroso de Zacarías y Elisabet, llamado a preparar el camino del Señor en el espíritu de Elías. Predicó el arrepentimiento y bautizó a Jesús en las aguas del río Jordán.',
    decisiveMoment: 'Señalar públicamente a Jesús de Nazaret ante sus propios discípulos como el esperado Mesías de Israel.',
    keyVirtues: ['Humildad inigualable', 'Valentía profética sin temor a los poderosos', 'Vida de consagración austera'],
    spiritualLesson: 'El gozo supremo del servidor de Dios es exaltar a Cristo y menguar para que Él brille plenamente.',
    keyEvents: ['Ministerio en el desierto de Judea', 'Bautismo de Jesús en el Jordán', 'Testimonio sobre el Cordero de Dios', 'Martirio bajo Herodes Antipas']
  },
  {
    id: 'char-maria',
    name: 'María de Nazaret',
    originalName: 'Μαριάμ (Mariam) / Miryam',
    meaning: 'Amada de Dios / Excelencia',
    category: 'Mujer de Fe',
    eraId: 'era-cristo-evangelios',
    testament: 'Nuevo',
    approxDate: '~18 a.C. – ~50 d.C.',
    scriptureBook: 'Mateo 1 – 2; Lucas 1 – 2; Juan 19:25-27; Hechos 1:14',
    bibleVerse: 'He aquí la sierva del Señor; hágase conmigo conforme a tu palabra. Engrandece mi alma al Señor; y mi espíritu se regocija en Dios mi Salvador.',
    image: imgJesusSermon,
    shortBio: 'Humilde doncella judía de Nazaret desposada con José. Escogida por gracia para ser la madre de Jesús por obra del Espíritu Santo, acompañó a su Hijo desde el pesebre hasta la cruz y Pentecostés.',
    decisiveMoment: 'Su respuesta obediente e incondicional al arcángel Gabriel en la Anunciación, aceptando la voluntad de Dios a pesar del riesgo de rechazo social.',
    keyVirtues: ['Sumisión devota a la palabra de Dios', 'Meditación profunda del corazón', 'Fortaleza silenciosa al pie de la cruz'],
    spiritualLesson: 'La bendición de Dios se derrama sobre los humildes de corazón que dicen "sí" a Su plan sin condiciones.',
    keyEvents: ['La Anunciación del Ángel Gabriel', 'El Cántico del Magníficat', 'El alumbramiento en Belén', 'Al pie de la cruz en el Calvario', 'Oración en Pentecostés']
  },
  {
    id: 'char-jesucristo',
    name: 'Jesucristo el Mesías',
    originalName: 'Yeshúa haMashíaj (ישוע) / Ἰησοῦς Χριστός',
    meaning: 'Jehová Salva · El Ungido',
    category: 'Mesías',
    eraId: 'era-cristo-evangelios',
    testament: 'Nuevo',
    approxDate: '~4 a.C. – 30/33 d.C.',
    scriptureBook: 'Los Cuatro Evangelios; Epístolas y Apocalipsis',
    bibleVerse: 'Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí. En él estaba la vida, y la vida era la luz de los hombres.',
    image: imgJesusSermon,
    shortBio: 'El Verbo eterno encarnado, el Hijo unigénito de Dios. Vino al mundo para revelar el carácter del Padre, proclamar el Reino, sanar a los quebrantados y dar su vida en rescate por muchos en la cruz, resucitando victorioso al tercer día.',
    decisiveMoment: 'La oración angustiosa en Getsemaní ("no se haga mi voluntad, sino la tuya") y el grito de triunfo en la cruz: "¡Consumado es!"',
    keyVirtues: ['Amor sacrificial infinito', 'Santidad perfecta e impecabilidad', 'Autoridad divina compasiva', 'Obediencia hasta la muerte'],
    spiritualLesson: 'Cristo es el Alfa y la Omega, el cumplimiento de todas las profecías del Antiguo Testamento y la única fuente de vida eterna y reconciliación con Dios.',
    keyEvents: ['Bautismo y tentación en el desierto', 'Sermón del Monte y milagros mesiánicos', 'Transfiguración en el monte santo', 'Crucifixión en el Gólgota', 'Resurrección y Ascensión a los cielos']
  },
  {
    id: 'char-pedro',
    name: 'Simón Pedro',
    originalName: 'Shimeón / Κηφᾶς (Cefas) / Πέτρος (Petros)',
    meaning: 'Piedra / Roca pequeña',
    category: 'Apóstol',
    eraId: 'era-iglesia-primitiva',
    testament: 'Nuevo',
    approxDate: '~1 a.C. – ~67 d.C.',
    scriptureBook: 'Evangelios; Hechos 1 – 15; 1 y 2 Pedro',
    bibleVerse: 'Tú eres el Cristo, el Hijo del Dios viviente... Señor, ¿a quién iremos? Tú tienes palabras de vida eterna.',
    image: imgHeroCodex,
    shortBio: 'Pescador galileo de Betsaida llamado por Jesús para ser pescador de hombres. Líder natural del círculo íntimo apostólico. Tras negar a su Maestro y ser restaurado por amor, predicó con poder en Pentecostés.',
    decisiveMoment: 'La triple restauración a orillas del mar de Galilea (Juan 21): "Simón, hijo de Jonás, ¿me amas? Apacienta mis ovejas".',
    keyVirtues: ['Pasión impulsiva por Cristo', 'Valentía para levantarse tras el fracaso', 'Liderazgo fraternal pastoral'],
    spiritualLesson: 'El fracaso no es el fin del ministerio cuando media el arrepentimiento sincero; la gracia de Cristo transforma nuestras debilidades en fortaleza.',
    keyEvents: ['Caminar sobre las aguas', 'Confesión mesiánica en Cesarea de Filipo', 'Discurso inaugural de Pentecostés', 'Visión del lienzo y apertura a los gentiles (Cornelio)']
  },
  {
    id: 'char-pablo',
    name: 'Pablo de Tarso (Saulo)',
    originalName: 'שאול (Shaúl) / Παῦλος (Paulos)',
    meaning: 'Pequeño / Deseado',
    category: 'Apóstol',
    eraId: 'era-iglesia-primitiva',
    testament: 'Nuevo',
    approxDate: '~5 d.C. – ~67 d.C.',
    scriptureBook: 'Hechos 7 – 28; Epístolas Paulinas (Romanos a Filemón)',
    bibleVerse: 'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios.',
    image: imgHeroCodex,
    shortBio: 'Fariseo ilustrado de la escuela de Gamaliel y ciudadano romano. Transformado milagrosamente en el camino a Damasco, se convirtió en el gran apóstol de los gentiles, teólogo magistral y plantador de iglesias en el Mediterráneo.',
    decisiveMoment: 'El encuentro con el Cristo resucitado que transformó al perseguidor de la Iglesia en su más incansable embajador.',
    keyVirtues: ['Pasión misionera inagotable', 'Genio teológico profundo', 'Resistencia heroica en el sufrimiento', 'Amor entrañable por las iglesias'],
    spiritualLesson: 'La salvación es por pura gracia mediante la fe, no por obras de la ley, para que nadie se gloríe sino únicamente en la cruz de Cristo.',
    keyEvents: ['Conversión en camino a Damasco', 'Tres extensos viajes misioneros', 'Discurso en el Areópago de Atenas', 'Juicio en Roma y redacción de las cartas pastorales']
  },
  {
    id: 'char-juan-apostol',
    name: 'Juan el Apóstol',
    originalName: 'Ἰωάννης (Ioannes)',
    meaning: 'El discípulo amado',
    category: 'Apóstol',
    eraId: 'era-iglesia-primitiva',
    testament: 'Nuevo',
    approxDate: '~6 d.C. – ~100 d.C.',
    scriptureBook: 'Evangelio de Juan; 1, 2 y 3 Juan; Libro de Apocalipsis',
    bibleVerse: 'El que no ama, no ha conocido a Dios; porque Dios es amor. En esto se mostró el amor de Dios para con nosotros, en que Dios envió a su Hijo unigénito al mundo.',
    image: imgHeroCodex,
    shortBio: 'Hijo de Zebedeo y hermano de Jacobo, conocido como uno de los "hijos del trueno". Se recostó en el pecho de Jesús durante la Última Cena. Vivió hasta anciano en Éfeso y escribió sobre el amor, la verdad y la victoria final.',
    decisiveMoment: 'Permanecer al pie de la cruz junto a María, donde Jesús le encomendó el cuidado filial de su madre terrenal.',
    keyVirtues: ['Intimidad espiritual con Jesús', 'Defensa inquebrantable de la verdad', 'Énfasis en el amor fraternal mutuo'],
    spiritualLesson: 'Conocer a Dios es amarlo a Él y amar activamente a los hermanos. La luz disipa toda tiniebla.',
    keyEvents: ['Llamamiento junto a las redes en Galilea', 'Testigo de la Transfiguración y la Cruz', 'Encuentro con el Resucitado en la tumba vacía', 'Visión profética en la isla de Patmos']
  }
];

export const BIBLICAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué gran acontecimiento bíblico marca el inicio del pacto de fe donde Dios promete bendecir a todas las familias de la tierra?',
    options: [
      'La construcción de la Torre de Babel',
      'El llamamiento de Abraham para salir de Ur',
      'La travesía de Noé en el Arca',
      'La unción del rey Saúl'
    ],
    correctIndex: 1,
    explanation: 'En Génesis 12:1-3, Dios llama a Abraham a dejar su tierra y le promete que en su simiente serán benditas todas las familias de la tierra.',
    scriptureRef: 'Génesis 12:1-3',
    era: 'Creación y Patriarcas'
  },
  {
    id: 'q2',
    question: '¿Cuál fue el líder hebreo que sucedió a Moisés y guió al pueblo de Israel a cruzar el río Jordán y conquistar Jericó?',
    options: [
      'Gedeón',
      'Caleb',
      'Josué',
      'Aarón'
    ],
    correctIndex: 2,
    explanation: 'Josué, siervo de Moisés, fue comisionado por Dios para liderar la entrada y conquista de la Tierra Prometida.',
    scriptureRef: 'Josué 1:1-9; 6:20',
    era: 'Éxodo y Conquista'
  },
  {
    id: 'q3',
    question: '¿Qué profetisa y jueza gobernaba y juzgaba a Israel bajo su palmera antes de la victoria sobre el general Sísara?',
    options: [
      'Rut',
      'Ester',
      'Débora',
      'Mical'
    ],
    correctIndex: 2,
    explanation: 'Débora era profetisa, jueza y consejera en Israel (Jueces 4:4-5), y junto a Barac liberó al pueblo de la opresión cananea.',
    scriptureRef: 'Jueces 4:4-5',
    era: 'Tiempo de los Jueces'
  },
  {
    id: 'q4',
    question: '¿En qué valle venció el joven David al gigante Goliat en el nombre de Jehová de los ejércitos?',
    options: [
      'Valle de Ela',
      'Valle de Cedrón',
      'Valle de Jezreel',
      'Valle de Acor'
    ],
    correctIndex: 0,
    explanation: 'El combate decisivo entre David y Goliat tuvo lugar en el Valle de Ela (1 Samuel 17:2).',
    scriptureRef: '1 Samuel 17:2, 45',
    era: 'La Monarquía Unida'
  },
  {
    id: 'q5',
    question: '¿Qué monarca edificó el Primer y glorioso Templo de Jehová en el monte Moriah de Jerusalén?',
    options: [
      'David',
      'Salomón',
      'Ezequías',
      'Josías'
    ],
    correctIndex: 1,
    explanation: 'Salomón, hijo de David, completó la edificación del Templo en siete años y lo dedicó con gran solemnidad (1 Reyes 6; 8).',
    scriptureRef: '1 Reyes 6:1; 8:10-11',
    era: 'La Monarquía Unida'
  },
  {
    id: 'q6',
    question: '¿Qué profeta confrontó a 450 sacerdotes de Baal en el Monte Carmelo pidiendo que el Dios verdadero respondiese con fuego del cielo?',
    options: [
      'Eliseo',
      'Isaías',
      'Elías',
      'Jeremías'
    ],
    correctIndex: 2,
    explanation: 'El profeta Elías desafió la idolatría en el Monte Carmelo y el fuego de Dios consumió el holocausto (1 Reyes 18:36-39).',
    scriptureRef: '1 Reyes 18:36-39',
    era: 'Reino Dividido y Profetas'
  },
  {
    id: 'q7',
    question: '¿En qué año fue destruida Jerusalén y su Templo por el rey babilonio Nabucodonosor, iniciando el gran Exilio?',
    options: [
      '722 a.C.',
      '586 a.C.',
      '445 a.C.',
      '70 d.C.'
    ],
    correctIndex: 1,
    explanation: 'En el 586 a.C., las tropas de Babilonia derribaron los muros, quemaron el Templo y deportaron al pueblo de Judá.',
    scriptureRef: '2 Reyes 25:8-11',
    era: 'Exilio en Babilonia'
  },
  {
    id: 'q8',
    question: '¿Cuál de estos profetas permaneció ileso en el foso de los leones gracias a que Dios envió a su ángel para cerrar sus fauces?',
    options: [
      'Ezequiel',
      'Jonás',
      'Daniel',
      'Amós'
    ],
    correctIndex: 2,
    explanation: 'Daniel fue arrojado al foso de los leones por su fidelidad en la oración, pero Dios protegió a su siervo inocente (Daniel 6:22).',
    scriptureRef: 'Daniel 6:22',
    era: 'Exilio en Babilonia'
  },
  {
    id: 'q9',
    question: '¿Qué acontecimiento glorioso relata el capítulo 2 del libro de los Hechos con lenguas como de fuego y tres mil convertidos?',
    options: [
      'La fiesta de la Pascua',
      'El día de Pentecostés',
      'El concilio de Jerusalén',
      'El naufragio en Malta'
    ],
    correctIndex: 1,
    explanation: 'En el día de Pentecostés, el Espíritu Santo descendió con poder sobre los discípulos, marcando el nacimiento de la Iglesia (Hechos 2).',
    scriptureRef: 'Hechos 2:1-4',
    era: 'La Iglesia Primitiva'
  },
  {
    id: 'q10',
    question: '¿Dónde se encontraba exiliado el apóstol Juan cuando recibió la sublime visión del Apocalipsis y la Nueva Jerusalén?',
    options: [
      'En la isla de Creta',
      'En la isla de Patmos',
      'En la fortaleza de Masada',
      'En las catacumbas de Roma'
    ],
    correctIndex: 1,
    explanation: 'Juan escribe en Apocalipsis 1:9 que estaba en la isla llamada Patmos por causa de la palabra de Dios y el testimonio de Jesucristo.',
    scriptureRef: 'Apocalipsis 1:9; 21:1-4',
    era: 'La Iglesia Primitiva'
  }
];
