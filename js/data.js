var films = [
    {
        'name': 'El Caballero Oscuro',
        'id': 'batman',
        'img': 'img/001_p.jpg',
        'rate': 10,
        'sinopsis': 'A pesar de que las calles de Gotham nunca habían sido tan seguras, Batman no puede él solo desmantelar la mafia que domina la ciudad, ni tampoco acabar con toda la corrupción que hay incluso en la policía. Pero para limpiar las calles de Gotham de una vez por todas, Bruce Wayne contará con la ayuda del teniente de la policía Jim Gordon y el nuevo fiscal, Harvey Dent, quien por primera vez está tratando a los criminales con mano dura. Cuando este triunvirato parece haber encontrado la fórmula, aparece un extraño personaje con la cara pintada, el Joker, quien desatará el caos y llevará a estos tres personajes al límite, y deberán decidir hasta donde están dispuestos a llegar para atrapar al Joker.'
    },
    {
        'name': 'American History X',
        'id': 'AmericanHistory',
        'img': 'img/002_p.jpg',
        'rate': 6,
        'sinopsis': 'Derek Vinyard es un Neonazi al que encarcelan después de asesinar a dos hombres de color que intentó robarle el coche. Su hermano Daniel está siguiendo sus pasos mientras Derek está en la cárcel. Su director le llama a su despacho por un ensayo que ha presentado sobre el libro "Mi lucha" de Adolf Hitler. Es entonces cuando le obligan en el instituto a hacer un trabajo sobre el encarcelamiento de su hermano y lo que le llevó hasta allí. Cuando Derek sale de la cárcel, ha cambiado completamente de ideología. Sus vivencias en la cárcel le han alejado del movimiento neo-nazi y ahora lo único que quiere es que su hermano salga también de ese mundillo. Pero no será tarea fácil, puesto que Cameron Alexander, el líder del grupo al que Derek pertenecía, ve ahora a Daniel como su futuro líder.'
    },
    {
        'name': 'Cadena Perpetua',
        'id': 'CadenaPerpetua',
        'img': 'img/003_p.jpg',
        'rate': 4,
        'sinopsis': 'Andy Dufresne es un banquero condenado a cadena perpetua por el asesinato de su mujer y el amante de ésta. Poco a poco se gana el respeto de los demás reclusos y la amistad de Red, que dirige el mercado negro de la prisión. Andy adquiere ciertos privilegios por resolver problemas fiscales a los guardias así como al alcaide, para quien organiza una extensa red de corrupciones políticas. Andy se entera por otro recluso de que el verdadero asesino de su mujer está encerrado en otro penal, por lo que pide que se reabra su caso. El alcaide ordena entonces asesinar a este nuevo recluso para evitar la marcha de Andy y que salgan a la luz sus sucios negocios. A partir de ese momento Andy pierde todos sus privilegios, por lo que decide jugarse el todo por el todo y aprovecha los servicios que el alcaide todavía requiere de él para recuperar su honor y su libertad.'
    },
    {
        'name': 'El Pianista',
        'id': 'ElPianista',
        'img': 'img/004_p.jpg',
        'rate': 7,
        'sinopsis': 'Wladyslaw Szpilman (Adrien Brody) es un músico polaco de origen judío que trabaja en la radio de Varsovia tocando el piano. Se dice de él que es uno de los músicos más talentosos que hay. Con la llegada del nazismo a Polonia, la calidad de vida de los judíos empeora sucesivamente, son obligados a vivir en el gueto de Varsovia, pero ni por esas se libran de las humillaciones a las que los nazis les someten. Pero la situación empeora aún más cuando son enviados a un campo de concentración. Wladyslaw se salva de ir debido a un amigo suyo que le reconoce. Separado de sus seres queridos, Wladyslaw debe sobrevivir como pueda, manteniéndose escondido de los nazis, viviendo muy de cerca los horrores que provoca el nazismo.'
    },
    {
        'name': 'Interstellar',
        'id': 'Interstellar',
        'img': 'img/005_p.jpg',
        'rate': 6,
        'sinopsis': 'Un grupo de astronautas se lanza al espacio para buscar un futuro para la raza humana que parece perdido en "Interstellar". Ahora que la Tierra se acerca poco a poco al fin de su sus días debido a una más que preocupante escasez de comida por el mal estado de las tierras. Cooper deberá elegir entre quedarse con sus hijos o liderar esta expedición, que aprovechará los descubrimientos en astrofísica para abandonar el sistema solar y encontrar un lugar libre de contaminación, donde poder empezar una nueva vida para la raza humana. Noveno largometraje del aclamado director y guionista Christopher Nolan (trilogía de "El Caballero Oscuro") su guion está basado en las teorías del físico Kip Thorne.'
    },
    {
        'name': 'Capitán América. El Soldado de Invierno',
        'id': 'CapAmericaInvierno',
        'img': 'img/006_p.jpg',
        'rate': 3,
        'sinopsis': 'Tras los devastadores acontecimientos acaecidos en Nueva York con Los Vengadores, "Capitán América. El Soldado de Invierno" de Marvel nos cuenta cómo Steve Rogers, alias el Capitán América, vive tranquilamente en Washington, D.C. intentando adaptarse al mundo moderno. Pero cuando atacan a un colega de S.H.I.E.L.D., Steve se ve envuelto en una trama de intrigas que amenaza con poner en peligro al mundo. El Capitán América une fuerzas con la Viuda Negra y lucha por sacar a la luz una conspiración cada vez mayor mientras hace frente a asesinos profesionales enviados para silenciarle. Cuando por fin se revela la magnitud de la malvada trama, el Capitán América y la Viuda Negra van a contar con la ayuda de un nuevo aliado, el Halcón. Pero deberán enfrentarse a un enemigo inesperado y extraordinario: el Soldado de Invierno.'
    },
    {
        'name': 'Vengadores: La Era de Ultrón',
        'id': 'Vengadores',
        'img': 'img/007_p.jpg',
        'rate': 3,
        'sinopsis': 'Joss Whedon vuelve a ponerse detrás de las cámaras en "Vengadores: La era de Ultrón". Después de los peligros a los que se han tenido que enfrentar, Tony Stark decide retomar un programa de mantenimiento de la paz que había abandonado, basado en una inteligencia artificial. Pero consigue el efecto contrario, poniendo en peligro al planeta entero. Los Vengadores tendrán que reunirse de nuevo para impedir que Ultrón cumpla con sus deseos. Iron Man, Thor, Capitán América, Hulk, Viuda Negra y Ojo de Halcón vuelven a reunirse en "Vengadores: La era de Ultrón".'
    },
    {
        'name': 'Gladiator',
        'id': 'Gladiator',
        'img': 'img/008_p.jpg',
        'rate': 9,
        'sinopsis': 'En el año 180 después de cristo, en el campo de batalla, el general romano Maximus es el hombre de confianza del emperador Marcus Aurelius. Pero su reinado acaba cuando su hijo Commodus lo mata para subir al trono. El joven e inestable emperador decide acabar también con la vida de Maximus y de toda su familia porque les considera una amenaza para mantenerse en el trono de Roma. Pero sólo consigue acabar con su mujer y su hija, a quien Maximus encuentra muertas. Vendido como esclavo, Maximus solo tiene una salida: convertirse en gladiador y luchar por su vida. Desde la arena del circo se alza como héroe del pueblo romano y ve más cercana la posibilidad de ejecutar su venganza contra el nuevo César.'
    },
    {
        'name': 'Blade Runner',
        'id': 'BladeRunner',
        'img': 'img/009_p.jpg',
        'rate': 9,
        'sinopsis': 'Basándose en el relato de Philip K. Dick, "¿Sueñan los androides con ovejas eléctricas?", "Blade Runner" se sitúa en una recreación futurista de Los Ángeles, en el año 2019. Durante esta época, Tyrell Corporation, haciendo uso de los avances en ingeniería genética, ha creado a los Replicantes (o Nexus 6), unos robots con una apariencia completamente humana que sólo pueden contar con 4 años de vida. A raíz de esto, la policía comienza a contar con una unidad especial formada por Blade Runners, cuya misión es eliminar a los Replicantes. Ahora, llega el momento de que Rick Deckard (Harrison Ford), un ex Blade Runner, vuelva a su trabajo habitual para encargarse de la peor fuga de Replicantes que ha tenido la Tierra hasta ahora.'
    },
    {
        'name': 'Deadpool',
        'id': 'Deadpool',
        'img': 'img/010_p.jpg',
        'rate': 4,
        'sinopsis': 'Protagonizada por Ryan Reynolds y dirigida por Tim Miller, este superhéroe de Marvel es uno de los personajes más singulares de los cómics de la Casa de las Ideas. Poco convencional y gamberro, la película narrará la vida de un ex-operativo de las fuerzas especiales llamado Wade Wilson. Sin embargo, tiempo después se convirtió en un mercenario que tras quedar desfigurado y enfermo de cáncer, es sometido a crueles experimentos que le permiten tener el poder de curarse rápidamente. Sin embargo, el resultado no es del todo exitoso, ya que le dejará unas horribles cicatrices. Es entonces cuando Wade se convierte en Deadpool y tendrá un único objetivo: Dar caza a la persona que casi acaba con su vida. Pero este vengador justiciero no será como los vistos anteriormente, bien armado, experto en artes marciales y dotado un ácido, irónico y muy negro sentido del humor, este anti-héroe será una pesadilla para sus enemigos, pero también para sus aliados.'
    },
    // {
    //     'name': 'Capitan America: Civil War',
    //     'id': 'CapAmericaCvlWar',
    //     'img': 'img/011_p.jpg',
    //     'rate': 7,
        // 'sinopsis': ''
    // },
    // {
    //     'name': 'Star Wars: Episodio II -El Ataque de los Clones',
    //     'id': 'StarWars',
    //     'img': 'img/012_p.jpg',
    //     'rate': 5,
        // 'sinopsis': ''
    // },
    // {
    //     'name': 'Guardianes de la Galaxia',
    //     'id': 'Guardianes',
    //     'img': 'img/013_p.jpg',
        // 'rate': 8,
        // 'sinopsis': ''
    // },
    // {
    //     'name': 'Django Desencadenado',
    //     'id': 'Django',
    //     'img': 'img/014_p.jpg',
    //     'rate': 6,
        // 'sinopsis': ''
    // },
    // {
    //     'name': 'Piratas del Caribe: En el Fin del Mundo',
    //     'id': 'Piratas',
    //     'img': 'img/015_p.jpg',
    //     'rate': 6,
        // 'sinopsis': ''
    // },
    // {
    //     'name': 'Matrix',
    //     'id': 'Matrix',
    //     'img': 'img/016_p.jpg',
    //     'rate': 8,
        // 'sinopsis': ''
    // },
];