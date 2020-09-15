//-----------------------> CREAR BARAJA ORDENADA
function crearBaraja(){     
    variablesg.cartas = [];
    for(var e in variablesg.palos){
        for(j=1;j<=13;j++){
            objetocarta= new clasecarta(j, e, variablesg.palos[e], e+j+".png", "reverso.png");
            variablesg.cartas.push(objetocarta);     
        }
    } 
}
//------------------------------------------------

//----------------------->  BARAJAR CARTAS
function barajarCartas(){   
    variablesg.cartas.sort(() => 0.5 - Math.random());
    variablesg.cartas.sort(() => 0.5 - Math.random());
    variablesg.cartas.sort(() => 0.5 - Math.random());
    variablesg.cartas.sort(() => 0.5 - Math.random());
}
//------------------------------------------------

//-----------------------> VACIAR MESA Y JUGADORES
function vaciarJuego(){
    variablesg.cartas = [];
    doc.getElementById("mesa").innerHTML="";
    
    for(x=1; x<=8; x++){
        console.log(x);
        doc.getElementById("jugador"+x).innerHTML="";
    }
        
}
//------------------------------------------------

//-----------------------> ASIGNAR FICHAS A JUGADORES
function asignarFichas(){
    for(x=1; x<=variablesg.njugadores; x++){
        // FICHAS DE JUGADORES
        var fichas = doc.createElement("div");
        fichas.setAttribute("id","fichas"+x);
        fichas.setAttribute("class","fichas");
        doc.getElementById("jugador"+x).append(fichas);
        fichas.innerHTML="100 FICHAS &nbsp;";
    }
}
//------------------------------------------------




//-----------------------> MOSTRAR NOMBRE DE LA CARTA
function nombreCarta(){
    var num = this.id.substring(1,3); 
    var palo = this.id.substring(0,1);
    alert("Has pulsado en el " + num + " de " + variablesg.palos[palo]);
}
//------------------------------------------------







/* ------------------------------------------------------------ INDEXED DB ------------------------------------------------------------ */
function crearBD() {
    variablesg.mibd.indexedDB = window.indexedDB;
    variablesg.mibd.IDBKeyRange = window.IDBKeyRange;
    variablesg.mibd.IDBKeyTransaction = window.IDBKeyTransaction;

    variablesg.conn = variablesg.mibd.indexedDB.open("mispartida");

    variablesg.conn.onupgradeneeded = function() {
        this.result.createObjectStore("partidas", {keyPath:"idPartida",autoIncrement:true});
    }
}

function guardar() {
    var partidahtml = $("#principal").innerHTML;
    variablesg.miObjetoJS = {"partida":partidahtml};
    crearBD();
    variablesg.conn.onsuccess = function() {
        this.result.transaction("partidas", "readwrite").objectStore("partidas").put(variablesg.miObjetoJS);
    }
}

function cargar() {
    crearBD();
    variablesg.conn.onsuccess = function() {
        this.result.transaction("partidas", "readwrite").objectStore("partidas").get(1).onsuccess= function(){
            $("#principal").innerHTML=this.result.partida;

        };
    };
}



