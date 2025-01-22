"use strict";

/*En este juego hay 16 o 36 cartas, dependiendo de la elección del usuario, cada par individual tendrá el mismo valor*/

/*Declaración de variables para el juego*/

let segundos=0;
let numero_cartas=0;
let contador;
let juego=document.getElementById("juego");
let cartas=[];
let cartas_objetos=[];
let cartas2=[];
let div_arriba=document.createElement("div");

/*Los valores vienen representados por pares de valores*/
let valores=[
    ["coche", "coche"], ["gato", "gato"], ["elefante", "elefante"],
    ["rosa", "rosa"], ["perro", "perro"], ["camion", "camion"],
    ["moneda", "moneda"], ["lapiz", "lapiz"], ["avion", "avion"],
    ["borrador", "borrador"], ["leon", "leon"], ["helicoptero", "helicoptero"],
    ["lavanda", "lavanda"], ["barco", "barco"], ["furgoneta", "furgoneta"],
    ["juguete", "juguete"], ["cadena", "cadena"], ["arbol", "arbol"]
];

/*Se mezclan, para que cada partida sea única*/
valores=mezclarPares(valores);

document.body.style.backgroundColor = "rgb(245, 245, 245)";

let cartas_volteadas = [];
let objetos_cartas_volteadas= [];
let clics=0;
let indices_cartas_volteadas = [];
let pares_encontrados = [];
let cartas_procesando = [];
let anadir_cartas_procesando = false;
let array_cartas_valores;

/*Funciones*/

/*Función para crear cartas, estas cartas son todas las mismas, ya que son la versión que aparece primero al no voltear las cartas*/
function crearCarta() {
    let carta = document.createElement("div");
    carta.style.width = "200px";
    carta.style.height = "300px";
    carta.style.backgroundImage = 'url("./imagenes/carta.jpg")';
    carta.style.backgroundSize = "cover";
    carta.style.backgroundPosition = "center";
    carta.style.cursor = "pointer";
    carta.style.border="0.1px solid black";
    carta.style.borderRadius = "5%";
    carta.style.boxShadow = "2px 2px 3px rgba(0, 0, 0, 0.3)";
    carta.classList.add("carta");
    return carta;
}

/*Esta función crea la parte con la imagen del valor (por ejemplo, la imagen de un perro) de la carta*/
function crearCarta2(url_imagen) {
    let carta = document.createElement("div");
    carta.style.width = "200px";
    carta.style.height = "300px";
    carta.style.backgroundImage = `url(${url_imagen})`;
    carta.style.backgroundSize = "cover";
    carta.style.backgroundPosition = "center";
    carta.style.cursor = "pointer";
    carta.style.display="none";
    carta.style.border="1px solid black";
    carta.style.borderRadius = "5%";
    carta.style.boxShadow = "10px 10px 20px rgba(0, 0, 0, 0.3)";
    carta.classList.add("carta");
    return carta;
}

/*Función para crear el array que asignará cada valor a cada carta (de manera aleatoria)*/
function crearArrayCartasValores(cartas, valores, cartas2) {
    let array_cartas_valores=[];
    let subarray_carta_valor=[];
    let indices_valores=crearIndicesAleatorios(cartas.length);

    for (let i=0; i<cartas.length; i++) {
        subarray_carta_valor=[cartas[i], valores[indices_valores[i]], cartas2[i]];
        array_cartas_valores.push(subarray_carta_valor);
    }

    return array_cartas_valores;
}

/*Función para crear un índice aleatorio para cada valor*/
function crearIndicesAleatorios(longitud) {
    let salir=false;
    let valores_generados=[]

    while (!salir) {
        let aleatorio=Math.floor(Math.random()*longitud);
        /*Si no existe el aleatorio en el array de valores generados, se inserta el valor del aleatorio generado*/
        if (valores_generados.indexOf(aleatorio) === -1) {
            valores_generados.push(aleatorio);
        }

        if (valores_generados.length===longitud) {
            salir=true;
        }
    }
    return valores_generados;
}

/*Función para encontrar la ruta de la imagen del valor*/

function encontrarRutaImagenValor(valor) {
    return `./imagenes/${valor}.jpg`;
}

/*Función para deshabilitar los clics mientras se estén procesando las cartas*/
function deshabilitarClics() {
    /*Aquí se controla los pointerEvents (no dejar hacer clic), para deshabilitar durante 1 segundo la capacidad de hacer clic sobre las cartas,
    * de esta manera, le da tiempo al juego a procesar las cartas sobre las que el usuario ha hecho click*/
    document.body.style.pointerEvents = 'none';
    setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
    }, 1000);
}

/*Esta función sirve para "mezclar" los elementos del array, básicamente hace que todos los elementos estén en sitios aleatorios*/
function mezclarPares(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    /*Se usa el método .flat() para convertir el array a un array unidimensional, ya que estaba compuesto por subarrays con los pares de valores,
    de esta manera no se perdían los pares de valores */
    return array.flat();
}

/*Esta función añade estilo al div con id juego*/
function anadirEstiloJuego() {
    juego.style.display="flex";
    juego.style.flexWrap = "wrap";
    juego.style.justifyContent = "center";
    juego.style.alignItems = "center";
    juego.style.position = "relative";
    juego.style.width = "100%";
    juego.style.height = "100%";
    juego.style.gap = "10px";
}

/*Esta función llena el array de cartas (la carta con la imagen de una carta sin voltear) y le asigna la id a carta y carta2*/
function crearCartas() {
    for (let i=0; i<numero_cartas; i++) {
        let carta = crearCarta();
        carta.id="carta-"+i;
        cartas[i]="carta-"+i;
        cartas2[i]="carta2-"+i;
        cartas_objetos[i]=carta;
    }
}

/*Esta función verifica las cartas volteadas*/
function verificarCartasVolteadas () {
    /*Estas variables representan las últimas cartas que han sido pulsadas por el usuario*/
    let penultima = cartas_volteadas[cartas_volteadas.length-2];
    let ultima = cartas_volteadas[cartas_volteadas.length-1];

    /*En esta condicional se verifica que el valor de las dos últimos coincide, y que estén en diferentes posiciones*/
    /*Ejemplo: ultima[1] representa el valor de la carta "perro", y ultima[0] representa la posición "carta-0"*/
    if (ultima[1] === penultima[1] && ultima[0] !== penultima[0] && ultima[2] !== penultima[2]) {
        setTimeout(() => {
            document.getElementById(ultima[2]).style.border = "3px solid rgba(0, 255, 0, 0.9)";
            document.getElementById(penultima[2]).style.border = "3px solid rgba(0, 255, 0, 0.9)";
            alert("¡Muy bien, has encontrado un par! El par que has encontrado es: "+ultima[1]);
            console.log("Par encontrado: "+cartas_volteadas[cartas_volteadas.length-1]);
            pares_encontrados.push(cartas_volteadas[cartas_volteadas.length-1]);
        }, 500);
        console.log(pares_encontrados.length);

        /*Esta condicional verifica que el jugador haya ganado la partida, este número sería el número de cartas (16 o 36) entre 2 y menos 1*/
        if (pares_encontrados.length===(numero_cartas/2)-1) {
            clearInterval(contador);
            setTimeout(() => {
                let nueva_ventana = window.open("./partida_ganada.html");
                nueva_ventana.onload = function () {
                    nueva_ventana.document.getElementById("tiempo").textContent=`Has durado ${segundos} segundos en finalizar la partida y has hecho ${clics} movimientos. \n¿Quieres mejorar tu tiempo? ¡Vuelve a intentarlo!`;
                }
            }, 1000);
        }
    }
    else {
        console.log("Par no encontrado");
        voltearParNoEncontrado();
    }
}

/*Esta función "voltea" las cartas que no hayan sido un par encontrado*/
function voltearParNoEncontrado() {
    for (let i=1; i<=2; i++) {
        setTimeout(() => {
            objetos_cartas_volteadas[objetos_cartas_volteadas.length-i].classList.add("voltear-carta");
            cartas_objetos[indices_cartas_volteadas[indices_cartas_volteadas.length-i]].style.display = "block";
            objetos_cartas_volteadas[objetos_cartas_volteadas.length-i].style.display = "none";
            cartas_objetos[indices_cartas_volteadas[indices_cartas_volteadas.length-i]].classList.add("voltear-carta");
        }, 500);
    }
}

/*Esta función cuenta las cartas que se están "procesando", se usa después para ver si hay más de dos, si es así,
el juego no permite hacer clic en más cartas hasta que no se terminen de procesar (se convierten en false)*/
function vecesTrueCartasProcesando() {
    let contador=0;

    for (let i=0; i<cartas_procesando.length; i++) {
        if (cartas_procesando[i][1]===true) {
            contador++;
        }
    }

    return contador;
}

/*Esta función crea todas las cartas y crea los eventlisteners para las mismas*/
function mainJuego() {
    /*Este array representa todas las cartas y su estado (procesando o no), el booleano sirve para ejecutar este código solo una vez*/
    if (!anadir_cartas_procesando) {
        for (let i=0; i<numero_cartas; i++) {
            cartas_procesando.push(false);
        }
        anadir_cartas_procesando = true;
    }

    /*Este bucle es el encargado de crear las cartas con las imágenes de los valores (carta2)*/
    for (let i = 0; i < numero_cartas; i++) {
        let carta2 = crearCarta2(encontrarRutaImagenValor(array_cartas_valores[i][1]));
        juego.appendChild(carta2);
        carta2.id="carta2-"+i;
        juego.appendChild(cartas_objetos[i]);

        /*Este es el event listener que se añadirá para cada carta cuando se haga clic sobre ella*/
        cartas_objetos[i].addEventListener("click", function () {
            /*Este condicional verifica que se cumplen todas las condiciones para seguir con la lógica de cuando se hace clic sobre una carta*/
            if (!pares_encontrados.some((array) => array.includes(array_cartas_valores[i][1])) && vecesTrueCartasProcesando() < 2) {
                clics++;
                actualizarClics(clics);
                indices_cartas_volteadas.push(i);
                cartas_volteadas.push(array_cartas_valores[i]);
                objetos_cartas_volteadas.push(carta2);
                cartas_objetos[i].classList.add("voltear-carta");

                /*Se añaden al array de cartas que se están procesando*/
                cartas_procesando[i] = [i, true];

                cartas_objetos[i].style.display = "none";
                carta2.style.display = "block";
                carta2.classList.add("voltear-carta");

                /*Los clics miden todas las veces que se haya volteado una carta, si la cantidad es par y no es 0, es porque hay un par pendiente
                 de procesar, si es así, se deshabilitan los clics para verificar si son un par encontrado o no*/
                if (clics % 2 === 0 && clics !== 0) {
                    deshabilitarClics();
                    setTimeout(() => {
                        verificarCartasVolteadas();
                        /*Aquí se asigna a false todas las cartas que estaban siendo procesadas*/
                        for (let i=0; i<cartas_procesando.length; i++) {
                            cartas_procesando[i]=[i, false];
                        }
                    }, 500);
                }
            }
        });

        /*Estos event listeners añaden un estilo para cuando el usuario ponga el ratón por encima de ellas*/
        carta2.addEventListener("mouseenter", function () {
            carta2.style.boxShadow = "0 4px 15px rgba(3, 86, 252, 0.7)";
            carta2.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease";
        });

        carta2.addEventListener("mouseleave", function () {
            carta2.style.transform = "scale(1)";
            carta2.style.boxShadow = "2px 2px 3px rgba(0, 0, 0, 0.3)";
        });

        cartas_objetos[i].addEventListener("mouseenter", function () {
            cartas_objetos[i].style.boxShadow = "0 4px 15px rgba(3, 86, 252, 0.7)";
            cartas_objetos[i].style.transition = "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease";
        });

        cartas_objetos[i].addEventListener("mouseleave", function () {
            cartas_objetos[i].style.boxShadow = "2px 2px 3px rgba(0, 0, 0, 0.3)";
        });
    }
}

/*Esta función es la encargada de actualizar el contador de clics sobre las cartas*/
function actualizarClics(clics) {
    let contador_clics=document.getElementById("contador_clics");
    contador_clics.innerHTML = "<h3>🖱️ "+clics+" movimientos</h3>";
}

/*Esta función inserta el botón de reinicar*/
function insertarBotonReiniciar() {
    let boton_reiniciar=document.createElement("div");
    boton_reiniciar.classList.add("elemento_arriba");
    boton_reiniciar.id="boton_reiniciar";
    div_arriba.appendChild(boton_reiniciar);
    boton_reiniciar.innerHTML="<h3><a href='index.html'>Reiniciar juego</a></h3>";
}

/*Esta función inserta el contador de tiempo*/
function insertarContadorTiempo() {
    let contador_tiempo=document.createElement("div");
    contador_tiempo.classList.add("elemento_arriba");
    contador_tiempo.id="contador_tiempo";
    div_arriba.appendChild(contador_tiempo);

    contador= setInterval(function(){
        segundos++;
        let contador_tiempo=document.getElementById("contador_tiempo");
        contador_tiempo.innerHTML = "<h3>⌛ "+segundos+" segundos</h3>";
    }, 1000);
}

/*Esta función inserta el contador de todos los clics sobre las cartas*/
function insertarContadorClics() {
    let contador_clics = document.createElement("div");
    contador_clics.classList.add("elemento_arriba");
    contador_clics.id = "contador_clics";
    div_arriba.appendChild(contador_clics);
    actualizarClics(0);
}

/*Esta función inserta el div de arriba en el cual irán: el contador de tiempo y de clics y el botón para reiniciar el juego*/
function insertarDivArriba() {
    div_arriba.classList.add("div-arriba");
    juego.appendChild(div_arriba);
    insertarContadorClics();
    insertarContadorTiempo();
    insertarBotonReiniciar();
}

/*Esta función es la encargada de iniciar el juego llamando a todas las funciones necesarias para esto*/
function iniciarJuego() {
    anadirEstiloJuego();
    insertarDivArriba();
    crearCartas();
    array_cartas_valores=crearArrayCartasValores(cartas, valores, cartas2);
    mainJuego();
    for (let i=0; i<numero_cartas; i++) {
        console.log(array_cartas_valores[i]);
    }
}

/*Esta función quita los botones y el div que los contenía*/
function quitarBotones(boton36, boton16, contenedor_botones) {
    boton16.remove();
    boton36.remove();
    contenedor_botones.remove();
}

/*Esta función añade los botones necesarios para iniciar el juego*/
function anadirBotonesInicio() {
    let boton16=document.createElement("button");
    boton16.id="16_cartas";
    boton16.innerText="Tablero 4x4";
    boton16.classList.add("boton");

    let boton36=document.createElement("button");
    boton36.id="36_cartas";
    boton36.innerText="Tablero 6x6";
    boton36.classList.add("boton");

    let contenedor_botones=document.createElement("contenedor-boton");

    contenedor_botones.appendChild(boton16);
    contenedor_botones.appendChild(boton36);

    contenedor_botones.id="contenedor-boton";
    document.body.appendChild(contenedor_botones);

    /*Estos son los event listeners que hay para cada botón, en función de la elección del usuario, se generará un partido con
    el tamaño especificado por el botón*/
    boton16.addEventListener("click", () => {
        numero_cartas=16;
        quitarBotones(boton36, boton16, contenedor_botones);
        iniciarJuego();
    });

    boton36.addEventListener("click", () => {
        numero_cartas=36;
        quitarBotones(boton36, boton16, contenedor_botones);
        iniciarJuego();
    });
}

anadirBotonesInicio();
