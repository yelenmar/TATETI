/*tablero de juego*/
var mapa = [0, 0, 0, 0, 0, 0, 0, 0, 0];
/* jugador 1*/
var jugador = 1;
/* n jugadores q participan */
var njugadores = 0;
/* esta var almacena la elec del jugador cuando apreta en el tablero*/
var eleccion = 0;
/* esta var es para la estrategia de compu vs humano*/
var esquinas = [0, 2, 6, 8];

/* esta funcion reinicia el juego*/
function resetear() {
  /*eleccion 1player o 2 players / x o */
  document.getElementById("opcion1").removeAttribute("hidden", "hidden");
  document.getElementById("opcion2").setAttribute("hidden", "hidden");
  document.getElementById("pregunta").setAttribute("hidden", "hidden");
  document.getElementById("mensaje").setAttribute("hidden", "hidden");
  document.getElementById("mensaje").textContent = "Haz tu primer movimiento";
  jugador = 1;
  /* de nuevo 0 pq no hay mov en el tablero*/
  njugadores = 0;
  eleccion = 0;
  /* de nuevo pq esta vacio el tablero*/
  mapa = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  dibujar();
  /*el tablero es invisible hasta que se elija jugadores y x o*/
  document.getElementById("tablero").setAttribute("hidden", "hidden");
}

/* numero de jugadores q se elije*/
function jugadores(num) {
  njugadores = num;
  /* si es 1 juega con la compu*/
  if (num == 1) {
    /*elije x o */
    document.getElementById("opcion2").removeAttribute("hidden", "hidden");
  } else jugando(1); /* si es 2 inicial el juevo el jugador 1 */
  document.getElementById("opcion1").setAttribute("hidden", "hidden");
}

function jugando(turno) {
  eleccion = turno;
  /* remove element para hacer visible el tablero*/
  document.getElementById("tablero").removeAttribute("hidden", "hidden");
  /* x o */
  document.getElementById("opcion2").setAttribute("hidden", "hidden");
    /* estos son los msj de turno y ganador */
  document.getElementById("mensaje").removeAttribute("hidden", "hidden");
  /* ejecuta la logica del juego */
  jugar();
}


/* verifica si hay un ganador o si es empate */
function final() {
  /* n d casillas vacias que quedan si es que quedan*/
  var espacios = 0;
  /* recorre el array mapa para obtener los valores de las casillas*/
  /* i es el contador de 0 a 8 */
  for (var i = 0; i < mapa.length; i++) {
    /* verif si esta vacia la casilla si es 0 */
    if (mapa[i] == 0) espacios++;
  }
   
  /* este recorre el mismo array pero solo las filas */
  for (var a = 0; a < 8; a += 3) {
    /* verif si lo que esta en la casilla es igual o no */
    if (mapa[a] == mapa[a + 1] && mapa[a + 1] == mapa[a + 2] && mapa[a] > 0)
      return mapa[a];
  }

  /* recorre solo las columnas del tablero */
  for (var b = 0; b < 3; b++) {
    /* verif si son iguales las casillas lo que indica el ganador*/
    if (mapa[b] == mapa[b + 3] && mapa[b + 3] == mapa[b + 6] && mapa[b] > 0)
      return mapa[b];
  }

  /* diagonal completa 0=4=8 */
  if (mapa[0] == mapa[4] && mapa[4] == mapa[8] && mapa[0] > 0) return mapa[0];
    /* diagonal completa 2=4=6 */
  if (mapa[2] == mapa[4] && mapa[4] == mapa[6] && mapa[2] > 0) return mapa[2];
  /*verif si todas las casillas estan vacias */
  if (espacios == 9) return 9;
  /*verif si todas las casillas estan completas, nadie gano, devuelve 0 osea es empate */
  if (espacios == 0) return 0;
}

/*escribe el tablero*/
function dibujar() {
    /* recorre el array mapa */
  for (var i = 0; i < 9; i++) {
    /*verif si esta vacia osea 0*/
    if (mapa[i] == 0) {
      document.getElementById("celda" + i).textContent = "";
    } else if (mapa[i] == 1) { /*si no esta vacia */
      document.getElementById("celda" + i).textContent = "X";
      document.getElementById("celda" + i).style.color = "black";
    } else {
      document.getElementById("celda" + i).textContent = "O";
      document.getElementById("celda" + i).style.color = "pink";
    }
  }
}

/* recibe el num de casilla marcada ya sea por la computadora o por el jugador*/
function fcelda(celda) {
    /*vs compu*/
  if (njugadores == 1) {
    if (eleccion == jugador)
      document.getElementById("mensaje").textContent = "Juego yo";
    else document.getElementById("mensaje").textContent = "Juegas tú";
  } else {
    if (jugador == 1)
      document.getElementById("mensaje").textContent = "Turno del jugador 2";
    else document.getElementById("mensaje").textContent = "Turno del jugador 1";
  }

  /*marca la casilla elegida*/
  if (mapa[celda] != 0) {
    /*si no es 0 la casilla esta ocupada*/
    document.getElementById("mensaje").textContent =
      "Esa celda ya está ocupada";
  } else if (jugador == 1) { /*si la casilla esta een 1*/
    mapa[celda] = 1;
    jugador = 2; /*o*/
  } else {
    mapa[celda] = 2;
    jugador = 1; /*x*/
  }
  dibujar(); /* escribe en el tablero*/


  /* verif si hay ganador o empate*/
  switch (final()) {
    case 0:
      document.getElementById("mensaje").textContent =
        "Empate, no hay movimientos";
      pregunta();
      break;
    /*juegador 1 win*/
    case 1:
      console.log(njugadores, eleccion);
      if (njugadores == 1) {
        if (eleccion == 1)
          document.getElementById("mensaje").textContent = "Has ganado!!!";
        else document.getElementById("mensaje").textContent = "Ordenador gana";
      } else document.getElementById("mensaje").textContent = "Gana Jugador 1";
      pregunta();
      break;
    case 2:
      //console.log(njugadores, eleccion);
      if (njugadores == 1) {
        if (eleccion == 2)
          document.getElementById("mensaje").textContent = "Has ganado!!!";
        else document.getElementById("mensaje").textContent = "Ordenador gana";
      } else document.getElementById("mensaje").textContent = "Gana Jugador 2";
      pregunta();
      break;
    default:
      if (njugadores == 1 && jugador != eleccion) {
        jugar();
      }
    }
}

function jugar() {
  if (eleccion == 2) {
    // cdo empieza la compu. usu x compu o
    if (jugador != eleccion) {
      if (final() == 9) {
        fcelda(8);
      } else {
        /*para verificar si se cumple la función jugadaganadora con el argumento uno, lo que significa
         que hay una casilla vacía que le permitiría a la computadora ganar el juego si la marca con una X.*/
        if (!jugadaganadora(1)) {
          if (!jugadaganadora(2)) {
            /*verificar diferentes casos posibles según el estado del arreglo mapa*/
            if (
              esigual(mapa, [0, 2, 0, 0, 0, 0, 0, 0, 1]) ||
              esigual(mapa, [0, 0, 0, 2, 0, 0, 0, 0, 1]) ||
              esigual(mapa, [0, 0, 0, 0, 0, 2, 0, 0, 1])
            )
              fcelda(6);
            else if (esigual(mapa, [0, 0, 0, 0, 0, 0, 0, 2, 1])) fcelda(2);
            else if (
              esigual(mapa, [2, 0, 0, 0, 0, 0, 0, 0, 1]) ||
              esigual(mapa, [0, 0, 2, 0, 0, 0, 0, 0, 1])
            )
              fcelda(6);
            else if (esigual(mapa, [0, 0, 0, 0, 0, 0, 2, 0, 1])) fcelda(2);
            else if (mapa[4] == 0) {
              if (mapa[8] == 1 && (mapa[6] == 1 || mapa[2] == 1)) fcelda(4);
            } else if (esigual(mapa, [0, 0, 0, 0, 2, 0, 0, 0, 1])) fcelda(0);
            else if (esigual(mapa, [1, 0, 2, 0, 2, 0, 0, 0, 1])) fcelda(6);
            else if (esigual(mapa, [1, 0, 0, 0, 2, 0, 2, 0, 1])) fcelda(2);
            else {
                /* hace que la computadora marque la primera casilla vacía que encuentre con una X. 
                Esta línea se ejecuta solo si ninguna de las condiciones if anteriores se cumple.*/
              fcelda(mapa.indexOf(0));
            }
          }
        }
      }
    }
  } else if (jugador == 2) {
    if (!jugadaganadora(2)) {
      if (!jugadaganadora(1)) {
        if (mapa[4] == 0) fcelda(4);
        else if (esigual(mapa, [0, 0, 0, 0, 1, 0, 0, 0, 0])) fcelda(8);
        else if (
          (mapa[0] == 1 || mapa[2] == 1 || mapa[6] == 1 || mapa[8] == 1) &&
          mapa[1] == 0
        )
          fcelda(1);
        else if (
          (mapa[0] == 1 || mapa[2] == 1 || mapa[6] == 1 || mapa[8] == 1) &&
          mapa[3] == 0
        )
          fcelda(3);
        else if (
          esigual(mapa, [0, 1, 0, 0, 2, 0, 0, 1, 0]) ||
          esigual(mapa, [0, 0, 0, 1, 2, 1, 0, 0, 0])
        )
          fcelda(2);
        else {
          fcelda(mapa.indexOf(0));
        }
      }
    }
  }
}


/* veridica si hay un ganador recibiendo el jugador 1 y 2*/
function jugadaganadora(num) {
  /* booleano inic en falso indica si el juego termino o no*/
  var finalizado = false;
  /*almacena  fila columna o diagonal del tablero*/
  var trio = [0, 0, 0];

  /*recorre solo las filas*/
  for (var a = 0; a < 8; a += 3) {
    trio[0] = mapa[a];
    trio[1] = mapa[a + 1];
    trio[2] = mapa[a + 2];
    /*devuelve el primer element*/
    var primera = trio.indexOf(num);
    /*devuelve el ult element*/
    var ultima = trio.lastIndexOf(num);
    var cero = trio.indexOf(0);
    if (primera != ultima && cero != -1) {
      fcelda(a + cero);
      return true;
    }
  }

  /*recorre solo las columnas*/
  for (var b = 0; b < 3; b++) {
    trio[0] = mapa[b];
    trio[1] = mapa[b + 3];
    trio[2] = mapa[b + 6];
    var primeraa = trio.indexOf(num);
    var ultimaa = trio.lastIndexOf(num);
    var ceroa = trio.indexOf(0);
    if (primeraa != ultimaa && ceroa != -1) {
      fcelda(b + ceroa * 3);
      return true;
    }
  }

  trio[0] = mapa[0];
  trio[1] = mapa[4];
  trio[2] = mapa[8];
  var cerof = trio.indexOf(0);

  if (trio.indexOf(num) != trio.lastIndexOf(num) && cerof != -1) {
    fcelda(cerof * 4);
    return true;
  }

  trio[0] = mapa[2];
  trio[1] = mapa[4];
  trio[2] = mapa[6];
  cerof = trio.indexOf(0);

  if (trio.indexOf(num) != trio.lastIndexOf(num) && cerof != -1) {
    fcelda(2 * cerof + 2);
    return true;
  }
}

function esigual(a1, a2) {
  var igual = true;
  for (var i = 0; i < a1.length; i++) {
    if (a1[i] != a2[i]) igual = false;
  }
  return igual;
}

/*boton volver a jugar*/
function pregunta() {
  document.getElementById("final").innerHTML =
    '<button id="pregunta" type="button" onclick="resetear()" class="btn">Volver a jugar</button>';
}
