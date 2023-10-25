var mijnArray = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];

//let playerLives = 3; 

class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {

 if (rij == 5 || kolom == 0) {
   fill ("orange");
 } else 
 {noFill();
      }
      
        
rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
     pop();
  }
}


class Bom {
  constructor() {
    this.x = floor(random(9,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,11,raster.aantalRijen))*raster.celGrootte;
    this.snelheid = 4;
    this.yRichting = 2;
  }
 
  beweeg() {
    this.y += this.snelheid * this.yRichting;

  
    if (this.y >= canvas.height - raster.celGrootte || this.y <= 0) {
      this.yRichting *= -1;
    }

    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
  }

  toon() {
    image(bomPlaatje,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}
//class Levens {
 // constructor() {
  //  this.x = 100;
   // this.y = 100;
 // }
//toon() {
  //image(levenPlaatje,this.x,this.y,raster.celGrootte,raster.celGrootte);
//}

//}

class Appel {
  constructor() {
    this.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
  }
  
  toon() {
    image(appel,this.x,this.y,raster.celGrootte,raster.celGrootte);

  }
}

class Jos {
  constructor() {
    this.x = 0;
    this.y = random (mijnArray); 
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.aanDeBeurt = true;
    this.staOpBom = false;
  }
  
  beweeg() {
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }
    
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
    
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  
  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }
    else {
      return false;
    }
  }

  
  staatOp (bommenLijst) {

    return this.staOpBom;
  }  

  RaaktAppel(appel) {
    if (this.x == appel.x && this.y == appel.y) {
      return true;
    }
    else {
      return false;
    }
  }
  
  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}  

class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  } 
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  bomPlaatje = loadImage("images/sprites/bom_100px.png");
  appel = loadImage ("images/sprites/appel_1.png");
    }

var bommen = [];

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  
  raster = new Raster(12,18);
  
  raster.berekenCelGrootte();
  appel1 = new Appel();
  bom1 = new Bom();
  bom2 = new Bom();
  bom3 = new Bom();
  bom4 = new Bom();
  bom5 = new Bom();
  bommen.push(bom1, bom2, bom3, bom4, bom5);
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }
  
  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");
  
  //bom1 = new Vijand();
  //bom1.stapGrootte = 10;
  //bom1.sprite = loadImage("images/sprites/bom_100px.png");

}

function draw() {
  background(brug);
  raster.teken();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  eve.toon();
  alice.toon();
  bob.toon();

  for (var bom of bommen) {
    bom.beweeg();
    bom.toon();
  }
  appel1.toon();
  
if(eve.RaaktAppel(appel1)) {
    appel1.x = -50;
  }

  
if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.wordtGeraakt(bom1)|| eve.wordtGeraakt(bom2)|| eve.wordtGeraakt(bom3) || eve.wordtGeraakt(bom4)|| eve.wordtGeraakt(bom5)) {
    background('red');
    fill('white');
    text("Hahahahaha noob!",30,300);
    noLoop();
  }
  
  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!",30,300);
    noLoop();
  }
  
}
