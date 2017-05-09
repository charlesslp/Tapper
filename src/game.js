var sprites = {
  Beer: {sx: 512, sy: 99, w: 23, h: 32, frames: 1, width: 23, height:32},
  Glass: {sx: 512, sy: 131, w: 23, h: 32, frames: 1, width: 23, height:32},
  NPC:{ sx: 512, sy: 66, w: 33, h: 33, frames: 1, width: 33, height:33},
  ParedIzda: {sx: 0, sy: 0, w: 512, h: 480, frames: 1, width: Game.width, height:Game.height},
  Player: { sx: 512, sy: 0, w: 56, h: 66, frames: 1, width: 56, height: 66},
  TapperGameplay: {sx: 0, sy: 480, w: 512, h: 480, frames: 1, width: Game.width, height:Game.height}
}

var TIEMPO_MINIMO = 0;

var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_GLASS = 8,
    OBJECT_POWERUP = 16;

var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();


  //Game.setBoard(3,new TitleScreen("Tapper", "Press fire to start playing", playGame));
};


// Niveles

var level1 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,      4000,  500, 'NPC' ],
  [ 6000,   13000, 800, 'NPC' ],
  [ 10000,  16000, 400, 'NPC' ]
];



var playGame = function() {

  Game.desactivarBoard(3);
//Capa de fondo
  var board = new GameBoard();
  board.add(new Fondo());
  Game.setBoard(0, board);

//Capa 1 - Jugador, cervezas, clintes y deadzones
  board = new GameBoard();
  board.add(new Player());


  var delay;
  var numClientes;
  var tiempo_entre_clientes;
  //Spawner(y, delay, numClientes, tiempo_entre_clientes, tipo_cliente) siendo "y" el numero de barra donde se pondra el cleinte

  delay = (Math.random() * 5);
  numClientes = Math.floor(Math.random() * 5) + 1;
  tiempo_entre_clientes = (Math.random() * 5) + 3;
  board.add(new Spawner(1, delay, numClientes, tiempo_entre_clientes, 2));

  delay = (Math.random() * 5);
  numClientes = Math.floor(Math.random() * 5);
  tiempo_entre_clientes = (Math.random() * 5) + 3;
  board.add(new Spawner(2, delay, numClientes, tiempo_entre_clientes, 2));

  delay = (Math.random() * 5);
  numClientes = Math.floor(Math.random() * 5);
  tiempo_entre_clientes = (Math.random() * 5) + 3;
  board.add(new Spawner(3, delay, numClientes, tiempo_entre_clientes, 2));

  delay = (Math.random() * 5);
  numClientes = Math.floor(Math.random() * 5);
  tiempo_entre_clientes = (Math.random() * 5) + 3;
  board.add(new Spawner(4, delay, numClientes, tiempo_entre_clientes, 2));

  //DeadZones lado izquierdo
  board.add(new DeadZone(0,377*Game.height/480));
  board.add(new DeadZone(30*Game.width/512,281*Game.height/480));
  board.add(new DeadZone(60*Game.width/512,185*Game.height/480));
  board.add(new DeadZone(90*Game.width/512,90*Game.height/480));
  //DeadZones lado derecho
  board.add(new DeadZone(335*Game.width/512,90*Game.height/480));
  board.add(new DeadZone(367*Game.width/512,185*Game.height/480));
  board.add(new DeadZone(399*Game.width/512,281*Game.height/480));
  board.add(new DeadZone(431*Game.width/512,377*Game.height/480));

  Game.setBoard(1, board);

//Capa 2 - Pared
  var board = new GameBoard();
  board.add(new Pared());
  Game.setBoard(2, board);

};

var startGame = function() {

  sprites["Beer"].width = (23*Game.width/512);
  sprites["Beer"].height = (32*Game.height/480);

  sprites["Glass"].width = (23*Game.width/512);
  sprites["Glass"].height = (32*Game.height/480);

  sprites["NPC"].width = (33*Game.width/512);
  sprites["NPC"].height = (33*Game.height/480);

  sprites["Player"].width = (56*Game.width/512);
  sprites["Player"].height = (66*Game.height/480);

  var ua = navigator.userAgent.toLowerCase();

  Game.setBoard(3,new TitleScreen("Tapper", "Pulsa espacio para jugar de nuevo", playGame));
};

var winGame = function() {
  reiniciar();
  Game.setBoard(3,new TitleScreen("¡Has ganado!", "Pulsa espacio para jugar de nuevo", playGame));
  Game.desactivarBoard(1);
};

var loseGame = function() {
  reiniciar();
  Game.setBoard(3,new TitleScreen("¡Has perdido!", "Pulsa espacio para jugar de nuevo", playGame));
  Game.desactivarBoard(1);
};

var reiniciar = function(){
  GameManager.clientesTotales = 0;
  GameManager.numClientes = 0;
  GameManager.numJarrasVacias = 0;
}

//------------------------------------------------------------Fondo
var Fondo = function() {
  var canvas = document.getElementById('game');
  canvas.width = Game.width;
  canvas.height = Game.height;

  var ctx = canvas.getContext && canvas.getContext("2d");

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,'TapperGameplay',0,0,0, Game.width, Game.height);
  }
  this.step = function(){}

  // TapperGameplay
};

Fondo.prototype = new Sprite();

//------------------------------------------------------------Fondo
var Pared = function() {
  var canvas = document.getElementById('game');
  canvas.width = Game.width;
  canvas.height = Game.height;

  var ctx = canvas.getContext && canvas.getContext("2d");

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,'ParedIzda',0,0,0, Game.width, Game.height);
  }
  this.step = function(){}

  // TapperGameplay
};

Fondo.prototype = new Sprite();

//------------------------------------------------------------DeadZone

var DeadZone = function(x, y){

  this.x = x;
  this.y = y;
  this.w = (10*Game.width/512);
  this.h = (66*Game.height/480);


  this.draw = function(){
    /*
    var canvas = document.getElementById('game');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.fillRect(x, y, this.w, this.h);
      ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'
    }
    */
  }
  
};

DeadZone.prototype = new Sprite();

DeadZone.prototype.step = function(dt){

  var collision_client = this.board.collide(this,OBJECT_ENEMY);
  var collision_beer = this.board.collide(this,OBJECT_PLAYER_PROJECTILE);
  var collision_glass = this.board.collide(this,OBJECT_GLASS);

  if(collision_client) {
    this.board.remove(collision_client);
    GameManager.deadZone();
  }
  else if(collision_beer){
    this.board.remove(collision_beer);
    GameManager.deadZone();
  }
  else if(collision_glass){
    this.board.remove(collision_glass);
    GameManager.deadZone();
  }
};

//------------------------------------------------------------Cerveza (Inicialmente llena y al colisionar pasa a vacia)
var Beer = function(x,y) {
  this.setup('Beer',{ vx: -70 });
  this.x = x - this.w;
  this.y = y;
};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_PLAYER_PROJECTILE;

Beer.prototype.step = function(dt)  {
  this.x += this.vx * dt;
  if(this.type === OBJECT_PLAYER_PROJECTILE){ //Comportamiento cuando la cerveza esta llena
      var collision = this.board.collide(this,OBJECT_ENEMY);
      if(collision) {
        //Si colisiona con el cliente entonces la vaciamos y le hacemos dar la vuelta
        this.type = OBJECT_GLASS;
        this.board.remove(collision);
        this.setup('Glass',{ vx: 30});
        GameManager.servir();

      } else if(this.x < -this.w || this.x <= 0) {
          this.board.remove(this);
      }
  }
  else if (this.type === OBJECT_GLASS){ //Comportamiento cuando la cerveza esta vacia
      var collision = this.board.collide(this,OBJECT_PLAYER);
      if(collision) {
        //Si colisiona con el jugador estando vacia entonces desaparece (y aumentamos la puntuacion)
        this.board.remove(this);
        GameManager.recogerJarraVacia();
      }

  }
};

//------------------------------------------------------------Cliente
var Client = function(x,y) {
  this.setup('NPC',{ vx: 50 });
  this.x = x;
  this.y = y;
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_ENEMY;

Client.prototype.step = function(dt)  {
  this.x += this.vx * dt;
  if(this.x < -this.w || this.x > Game.width) {
       this.board.remove(this);
  }
};

//------------------------------------------------------------Player
var Player = function() {
  this.setup('Player', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = 325*Game.width/512;
  this.y = 90*Game.height/480;
  this.pos = 0;
  this.aux;

  this.step = function(dt) {

    TIEMPO_MINIMO += dt;

    if(Game.keys['up']) {
      if(this.aux){
        this.pos--;
        if(this.pos < 0)
          this.pos = 3;
        this.aux = false;
      }
    }
    else if(Game.keys['down']) {
      if(this.aux){
        this.pos++;
        if(this.pos > 3)
          this.pos = 0;
        this.aux = false;
      }
    }
    else{
      this.aux = true;
    }

    switch (this.pos) {
      case 0: this.x = 325*Game.width/512; this.y = 90*Game.height/480; break;
      case 1: this.x = 357*Game.width/512; this.y = 185*Game.height/480; break;
      case 2: this.x = 389*Game.width/512; this.y = 281*Game.height/480; break;
      case 3: this.x = 421*Game.width/512; this.y = 377*Game.height/480; break;
    }

    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new Beer(this.x, this.y));
    }
  };
};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

//------------------------------------------------------------Spawner - contiene la logica de crear clientes en una determinada barra del bar
var Spawner = function(y, delay, numClientes, tiempo_entre_clientes, tipo_cliente) {
  this.tiempo = 0;
  this.tiempoFrame = 0;
  this.primero = false;
  this.delay = delay;
  this.numClientes = numClientes;
  this.tiempo_entre_clientes = tiempo_entre_clientes;

  switch (y) {
    case 1: this.x = 10*Game.width/512; this.y = 377*Game.height/480; break;
    case 2: this.x = 40*Game.width/512; this.y = 281*Game.height/480; break;
    case 3: this.x = 70*Game.width/512; this.y = 185*Game.height/480; break;
    case 4: this.x = 100*Game.width/512; this.y = 90*Game.height/480; break;
  }
  this.tipo_cliente = new Client(this.x, this.y);

  GameManager.sumarClientes(numClientes);
};

Spawner.prototype.draw = function(){}
Spawner.prototype.step = function(dt){

    if(this.primero){
      this.tiempo = this.tiempo + dt;

      if(this.numClientes > 0 && this.tiempo >= this.tiempo_entre_clientes && TIEMPO_MINIMO >= 2){
        TIEMPO_MINIMO = 0;
        this.tiempo = 0;
        this.board.add(Object.create(this.tipo_cliente));
        this.numClientes--;
      }
    }
    else {
      if(this.tiempoFrame > this.delay && this.numClientes > 0 && TIEMPO_MINIMO >= 2){
        TIEMPO_MINIMO = 0;
        this.primero = true;
        this.tiempo = 0;
        this.board.add(Object.create(this.tipo_cliente));
        this.numClientes--;
      }
      else
        this.tiempoFrame = this.tiempoFrame + dt;
    }

};


//------------------------------------------------------------GameManager
var GameManager = new function() {

  this.clientesTotales = 0;
  this.numClientes = 0;
  this.numJarrasVacias = 0;

  this.sumarClientes = function(clientes){
    this.clientesTotales += clientes;
  }

  this.servir = function(){
    this.numClientes++;
    this.numJarrasVacias++;
  }

  this.recogerJarraVacia = function(){
    this.numJarrasVacias--;
    //console.log("clientes: " + this.numClientes + " clientesTotales: " + this.clientesTotales + " jarras: "+this.numJarrasVacias);
    if(this.numClientes === this.clientesTotales && this.numJarrasVacias === 0)
      winGame();
  }
  this.deadZone = function(){
    loseGame();
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.addEventListener("load", function() {
  Game.initialize("game", sprites, startGame);
});
