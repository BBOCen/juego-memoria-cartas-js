🎮 Minijuego de Memoria (Memory Game) 🎮

Este proyecto es un juego interactivo desarrollado en JavaScript, diseñado para poner a prueba tu memoria visual y lógica mientras disfrutas de una experiencia atractiva y divertida. La interfaz del juego es dinámica, generada completamente mediante código, y está optimizada tanto para computadoras como para dispositivos móviles.

🚀 Funcionalidades principales

🔹 Generación dinámica del tablero:

El juego crea una cuadrícula de cartas configurada por tamaño (4x4, 6x6, etc.), generada automáticamente con JavaScript.
Cada carta tiene un diseño uniforme al inicio, ocultando su contenido único (pares de imágenes o atributos).
La distribución de las cartas es completamente aleatoria en cada partida para ofrecer una experiencia nueva cada vez.

🔹 Interactividad de las cartas:

Las cartas pueden voltearse al hacer clic, revelando su contenido oculto.

Restricciones: Solo se pueden voltear dos cartas a la vez. Intentar voltear una tercera carta mientras hay dos activas no tendrá efecto.

Lógica de coincidencia:
Si las cartas volteadas coinciden, permanecen descubiertas.
Si no coinciden, se vuelven a ocultar automáticamente después de un breve intervalo.
Animaciones y transiciones CSS que brindan un efecto de volteo fluido y visualmente agradable.

🔹 Gestión del estado del juego:

Verificación de victoria: El sistema detecta cuando todas las cartas están descubiertas, mostrando un mensaje de felicitación: "¡Has ganado!".

Reinicio del juego:
Un botón permite comenzar de nuevo con cartas barajadas y el estado reiniciado.
Puedes cambiar el tamaño del tablero antes de iniciar una nueva partida.

🔹 Extras para mejorar la experiencia:

Contador de movimientos: Lleva un registro del número de intentos realizados.

Temporizador: Cronometra el tiempo que tardas en completar la partida.

Puedes jugar el juego en este enlace: https://bbocen.github.io/juego-memoria-cartas-js/juego_memoria_cartas_js/
