document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        console.log("salta");

        if(nivel.muerto ==false)
        saltar();
        else{
            nivel.velocidad = 9;
            nube.velocidad = 1;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;

            
        }
    }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargarImagenes(){
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src = 'imagen/T-rex.png';
    imgNube.src = 'imagen/Nube.png';
    imgCactus.src = 'imagen/Cactus.png';    
    imgSuelo.src = 'imagen/Suelo.png';
}

var ancho = 700;
var alto = 300;
var canvas, ctx ;

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargarImagenes();
}

function borraCamvas(){
 canvas.width = ancho;
 canvas.heght = alto;
}
var suelo =200;
var trex ={y:  suelo , vy:0 ,gravedad:2 ,salto:28 , vymax:9 , saltando: false};
var nivel = {velocidad:9, marcador: 0, muerto:false};
var cactus ={x: ancho +100 ,y: suelo-25,};
var nube = {x: 400, y:100,velocidad:1};
var suelog = {x:0, y:suelo+30};

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,413,549,100,trex.y,50,60);
}
//-------------------------CACTUS------------------------
function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,69,135,cactus.x,cactus.y ,38,75);
}




function logicaCactus(){
if(cactus.x < -100){
    cactus.x = ancho +100;
    nivel.marcador++;
} else{
    cactus.x -= nivel.velocidad;
}
}
//-------------------------SUELO----------------------------
function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,700,30,0,suelog.y ,900,30);
}

function logicaSuelo(){
    if(suelog.x > 120){
        suelog.x = 0;

    }
    else{
        suelog.x += nivel.velocidad;
    }
}


//-------------------------NUBE---------------------------
function dibujaNube(){
    ctx.drawImage(imgNube,0,0,533,289,nube.x,nube.y ,82,31);
}

function logicaNube(){
    if(nube.x < -100){
        nube.x = ancho +100;
    } else{
        nube.x -= nube.velocidad;
    }
    }






//Function SALTAR-------------------------------------------
function saltar(){
    trex.saltando =true;
    trex.vy = trex.salto;

}

function gravedad(){
    if(trex.saltando == true){
        if(trex.y - trex.vy -trex.gravedad > suelo){
         trex.saltando = false;
         trex.vy = 0;
         trex.y = suelo;
        }
        else{
        trex.vy -= trex.gravedad;
        trex.y -= trex.vy
    }
    }
}
//--------------COLISION-------------------------------



function colision(){
//cactus.x
//trex.y

if(cactus.x >= 100 && cactus.x <= 150){
    if(trex.y >= suelo-25){
        nivel.muerto =true;
        nivel.velocidad = 0;
        nube.velocidad= 0;
    }
}
}


function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#000000';
    ctx.fillText(`${nivel.marcador}`,620,50);

    if(nivel.muerto == true){
        ctx.font ="60px inpact";
        ctx.fillText(`GAME OVER`,150,150);  
    }
}


//Bucle principal------------------------------------

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){
    borraCamvas();    
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaSuelo()
    dibujaNube();
    dibujaRex();
    dibujaCactus();
    gravedad();
    puntuacion();
}