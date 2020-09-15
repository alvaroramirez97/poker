
var variablesg={cartas:[], njugadores:8, palos:{P:"Picas",
                                                T:"Tréboles",
                                                C:"Corazones",
                                                D:"Diamantes"},
                mibd:{}, conn:'', miObjetoJS:{}};
var index_baraja= variablesg.njugadores*2;

var doc = doc || document;
/* - CLASE CARTA - */
function clasecarta(valor, palo, descPalo, imganverso, imgreverso){
    this.valor= valor;
    this.palo= palo;
    this.descPalo= descPalo;
    this.imganverso= imganverso;
    this.imgreverso= imgreverso;
}

window.onload = iniciar;

function iniciar(){
    $("#jugar").click(jugar);
    $("#guardar").click(guardar);
    $("#cargar").click(cargar);

    crearBaraja();
}


/* ----- METODOS ----- */


function repartirMesa(){    //-----------------------> PREPARAR BARAJA EN MESA

    for(x=(index_baraja); x< variablesg.cartas.length; x++){
        var carta = doc.createElement("div");
        carta.setAttribute("style","background-image: url(img/cartas/"+variablesg.cartas[x].imgreverso+");");
        carta.setAttribute("class", "carta_mesa");
        carta.setAttribute("id","carta"+x);
        carta.setAttribute("index",x);
        
        $("#mesa").append(carta); //Agregamos cada carta al div 
    }
    console.log("LA BARAJA COMPLETA:");
    console.log(variablesg.cartas);
    
    for(i=1; i<=3; i++){
        $("#carta"+index_baraja).attr("style","background-image: url(img/cartas/"+variablesg.cartas[index_baraja].imganverso+");")
        $("#carta"+index_baraja).attr("class","carta_mesa carta_movida"+i);
        index_baraja=index_baraja+1;
    }
    

}
//------------------------------------------------


//-----------------------> BARAJEO + REPARTIR JUGADORES 
function jugar(){ 
    variablesg.njugadores = prompt("CUANTOS JUGADORES?");
    index_baraja= (variablesg.njugadores*2);
    
    vaciarJuego();
    crearBaraja();
    barajarCartas();
    crearBD();
    asignarFichas();
    repartirMesa();
    repartirJuego();
}
//-------------------------------------------------


//----------------------->  REPARTIR JUGADORES 
function repartirJuego(){
    repartirJ1();
    var n1=2    //Inicio de rango
    var n2=4    //Fin de rango
    for(x=2; x<=variablesg.njugadores; x++){
        var cartasjugador = variablesg.cartas.slice(n1,n2);    //Cortamos la baraja en el rango indicado
        var n1=n1+2;
        var n2=n2+2;    //Aumentamos el rango


        for(i=0; i<cartasjugador.length; i++){
            //CREAMOS UNA IMAGEN POR CARTA
            var car = doc.createElement("img");;
            car.setAttribute("src","img/cartas/" +  cartasjugador[i].imgreverso);
            car.setAttribute("class", "carta"); 
            car.setAttribute("id",cartasjugador[i].palo+cartasjugador[i].valor);

            //EVENTO PARA MOSTRAR EL NOMBRE DE LA CARTA
            car.addEventListener("click",nombreCarta);

            $("#jugador"+x).append(car);
        }
    }
}
//-------------------------------------------------


//----------------------->  REPARTIR JUGADOR 1
function repartirJ1(){
    //MOSTRAMOS LAS DEL JUGADOR 1
    var cartasjugador1 = variablesg.cartas.slice(0,2); 
    for(i=0; i<cartasjugador1.length; i++){
        //CREAMOS UNA IMAGEN POR CARTA
        var car1 = doc.createElement("img");;
        car1.setAttribute("src","img/cartas/" +  cartasjugador1[i].imganverso); //SOLO CAMBIAMOS REVERSO POR ANVERSO
        car1.setAttribute("class", "carta"); 
        car1.setAttribute("id",cartasjugador1[i].palo+cartasjugador1[i].valor);

        
        car1.addEventListener("click",nombreCarta);
        $("#jugador1").append(car1);
    }
}
//------------------------------------------------

















/* --- REPARTIR CARTAS A UN JUGADOR --- */
function repartirJugador(){
    var mano=new Array(4);
    for(var k=0; k<=3; k++){
        mano[k]= new Array(14);
        mano[k].fill(0);
    }
    //Mapeo de cartas vacio
    console.log(mano);

    //Repartimos a jugador
    var cartasjugador = cartas.slice(0,7);
    console.log("CARTAS DEL JUGADOR:");
    console.log(cartasjugador);

    //Mostramos las cartas de jugador y pasamos tambien esas cartas al mapeo
    for(x=0; x<=6; x++){
        var palo = cartasjugador[x].substring(0,1);
        var num = cartasjugador[x].substring(1,cartasjugador[x].indexOf("."));
        console.log("Palo-> "+ mispalos[palo][1] +" Numero-> "+num)
        mano[mispalos[palo][1]][num]=1;
    }

    console.log(mano);

}

/*
    function verArray(){
        var mano=new Array(4);
        for(var k=0; k<=3; k++){
            mano[k]= new Array(14);
            mano[k].fill(0);
        }


    }*/





