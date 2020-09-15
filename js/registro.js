var mibd={};
var conn='';
miObjetoJS={};


window.onload = iniciar;
function iniciar(){
    document.getElementById("registrar").addEventListener("click",guardar); 
    
    crearBDu();
}


/* ----- METODOS ----- */


/* ------------------------------------------------------------ INDEXED DB ------------------------------------------------------------ */

function crearBDu() {
    mibd.indexedDB = window.indexedDB;
    mibd.IDBKeyRange = window.IDBKeyRange;
    mibd.IDBKeyTransaction = window.IDBKeyTransaction;

    conn = mibd.indexedDB.open("Datos");

    conn.onupgradeneeded = function() {
        this.result.createObjectStore("Usuarios", {keyPath:"idUsuario",autoIncrement:true});
    }
}


function guardar() {
    var email = document.getElementById("email").value;
    var nombre = document.getElementById("nombre").value;
    var passw = document.getElementById("pass").value;
    
    miObjetoJS = {"email":email,
                 "nombre":nombre,
                 "contra":passw};
    console.log(miObjetoJS);
    crearBDu();
    conn.onsuccess = function() {
        this.result.transaction("Usuarios", "readwrite").objectStore("Usuarios").put(miObjetoJS);
        alert("GUARDADO CON EXITO")
    }
}

/*
function cargar() {

    crearBD();
    variablesg.conn.onsuccess = function() {
        this.result.transaction("partidas", "readwrite").objectStore("partidas").get(1).onsuccess= function(){
            document.getElementById("principal").innerHTML=this.result.partida;

        };
    };

}*/





