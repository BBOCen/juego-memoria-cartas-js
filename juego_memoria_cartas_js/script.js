"use strict";

/*Parte 1: Tu tarea es generar una cuadrícula de cartas en el contenedor <div> que está presente en el HTML.
• En el body del HTML debe aparecer un div con una id=”juego”. Y todo el desarrollo del juego se generará desde el
script.
• En el js generaremos una cuadrícula de cartas (por ejemplo, 4x4 o 5x5) de forma dinámica usando JavaScript.
• Cada carta debe tener un diseño inicial uniforme, un color uniforme con la palabra carta, o incluso la trasera de una
carta de juego.
• Se trata de un juego de parejas por lo que no podremos identificarlas con un id (puesto que los id deben de ser únicos
en cada html). De forma oculta cada carta deberá tener la información de una imagen y un atributo (name por ejemplo)
ambos elementos pertenecerán a dos cartas.
• Usa arrays para representar las cartas y sus valores.
• Mezcla los valores aleatoriamente antes de asignarlos a las cartas para que cada partida sea diferente.
Resultado:
• Como resultado de este paso deberemos tener una cuadrícula generada en js con un numero par de cartas que
visiblemente tengan la misma apariencia pero que ocultamente tengan valores diferentes.
• Crea una apariencia bonita en en el html para invitar al usuario a participar.*/

/*En este juego hay 14 cartas, con 7 pares de elementos, cada par individual tendrá el mismo valor*/

alert("Vamos a comenzar con a jugar el juego de memoria, dale a aceptar para seguir");

let segundos=0;

let contador;

window.onload = function(){
    contador= setInterval(function(){
        segundos++;
        let contador_tiempo=document.getElementsByClassName("contador_tiempo")[0];
        contador_tiempo.innerHTML = "<h3>⌛ "+segundos+" segundos</h3>";
    }, 1000);
}

/*Funciones*/

/*Función para crear cartas*/

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

/*Función para crear el valor aleatorio de cada valor*/

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


let juego=document.getElementById("juego");
let cartas=[];
let cartas_objetos=[];
let cartas2=[];
let valores=["coche", "coche", "gato", "gato", "elefante", "elefante", "rosa", "rosa", "perro", "perro", "camion", "camion", "moneda", "moneda"];

for (let i=0; i<14; i++) {
    let carta = crearCarta();
    carta.id="carta-"+i;
    cartas[i]="carta-"+i;
    cartas2[i]="carta2-"+i;
    cartas_objetos[i]=carta;
}

let array_cartas_valores=crearArrayCartasValores(cartas, valores, cartas2);

juego.style.display="flex";
juego.style.flexWrap = "wrap";
juego.style.justifyContent = "center";
juego.style.alignItems = "center";
juego.style.width = "100%";
juego.style.height = "100%";
juego.style.gap = "10px";

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

        /*Esta condicional verifica que el jugador haya ganado la partida, si la longitud es 6, es porque todas
        las cartas han sido volteadas y acertadas*/
        if (pares_encontrados.length===6) {
            clearInterval(contador);
            setTimeout(() => {
                let nueva_ventana = window.open("./partida_ganada.html");
                nueva_ventana.onload = function () {
                    nueva_ventana.document.getElementById("tiempo").textContent=`Has durado ${segundos} segundos en finalizar la partida. \n¿Quieres mejorar tu tiempo? ¡Vuelve a intentarlo!`;
                }
            }, 1000);
        }
    }
    else {
        console.log("Par no encontrado");
        voltearParNoEncontrado();
    }
}

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

function vecesTrueCartasProcesando() {
    let contador=0;

    for (let i=0; i<cartas_procesando.length; i++) {
        if (cartas_procesando[i][1]===true) {
            contador++;
        }
    }

    return contador;
}

document.body.style.backgroundColor = "rgb(245, 245, 245)";

let cartas_volteadas = [];
let objetos_cartas_volteadas= [];
let clics=0;
let indices_cartas_volteadas = [];
let pares_encontrados = [];
let cartas_procesando = [];
let anadir_cartas_procesando = false;

/*Este array representa todas las cartas y su estado (procesando o no), el booleano sirve para ejecutar este código solo una vez*/
if (!anadir_cartas_procesando) {
    for (let i=0; i<14; i++) {
        cartas_procesando.push(false);
    }
    anadir_cartas_procesando = true;
}

for (let i = 0; i < 14; i++) {
    let carta2 = crearCarta2(encontrarRutaImagenValor(array_cartas_valores[i][1]));
    juego.appendChild(carta2);
    carta2.id="carta2-"+i;
    juego.appendChild(cartas_objetos[i]);

    carta2.addEventListener("mouseenter", function () {
        carta2.style.transform = "scale(1.05)";
        carta2.style.transition = "transform 0.3s ease";
    });

    carta2.addEventListener("mouseleave", function () {
        carta2.style.transform = "scale(1)";
    });

    cartas_objetos[i].addEventListener("click", function () {
        if (!pares_encontrados.some((array) => array.includes(array_cartas_valores[i][1])) && vecesTrueCartasProcesando() < 2) {
            clics++;
            indices_cartas_volteadas.push(i);
            cartas_volteadas.push(array_cartas_valores[i]);
            objetos_cartas_volteadas.push(carta2);
            cartas_objetos[i].classList.add("voltear-carta");

            cartas_procesando[i] = [i, true];

            cartas_objetos[i].style.display = "none";
            carta2.style.display = "block";
            carta2.classList.add("voltear-carta");
            if (clics % 2 === 0 && clics !== 0) {
                deshabilitarClics();
                setTimeout(() => {
                    verificarCartasVolteadas();
                    for (let i=0; i<cartas_procesando.length; i++) {
                        cartas_procesando[i]=[i, false];
                    }
                }, 500);
            }
        }
    });

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

let contador_tiempo=document.createElement("div");
contador_tiempo.classList.add("contador_tiempo");
juego.appendChild(contador_tiempo);

for (let i=0; i<14; i++) {
    console.log(array_cartas_valores[i]);
}
