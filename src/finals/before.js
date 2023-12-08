let osc;

let ratios = [
  1, 1.059458922, 1.126608212, 1.189201379, 1.251786902, 1.341915559,
  1.414009597, 1.502144282, 1.587395748, 1683.571205, 1.781795387, 1.88774816,
  2.002859043,
];

// console.log(ratios[1]);
// Base frequency
let BASE = 300;

let numCols = 25;
let numRows = 26;
let colW;
let rowH;
let slider1;
let slider2;
let slider3;
let slider4;
let slider5;

let ball1Y;
let ball2Y;
let ball3Y;
let ball4Y;
let ball5Y;

let betweenB = [];
let bulbs = [];

//ball variable //JSON
// let ball1 = {x: 400/25/2+400/25*2, y: 400/26*13+400/26/2 };
// let ball2 = {x: 400/25/2+400/25*7, y:  400/26*13+400/26/2  };
// let ball3 = {x: 400/25/2+400/25*12, y:  400/26*13+400/26/2  };
// let ball4 = {x: 400/25/2+400/25*17, y:  400/26*13+400/26/2  };
// let ball5 = {x: 400/25/2+400/25*22, y:  400/26*13+400/26/2  };

//variable for background to change
let bg = 0;

let grid = [];

function setup() {
  createCanvas(400, 400); // make the canvas
  background("#160F0DEA");
  // check to see if serial is available:

  slider1 = createSlider(1, 26, 100);
  slider1.position(0, 450);
  slider1.style("transform", "rotate(90deg)");
  slider1.style("width", "50px");

  slider2 = createSlider(1, 26, 100);
  slider2.position(100, 450);
  slider2.style("transform", "rotate(90deg)");
  slider2.style("width", "50px");

  slider3 = createSlider(1, 26, 100);
  slider3.position(200, 450);
  slider3.style("transform", "rotate(90deg)");
  slider3.style("width", "50px");

  slider4 = createSlider(1, 26, 100);
  slider4.position(300, 450);
  slider4.style("transform", "rotate(90deg)");
  slider4.style("width", "50px");

  slider5 = createSlider(1, 26, 100);
  slider5.position(400, 450);
  slider5.style("transform", "rotate(90deg)");
  slider5.style("width", "50px");

  CW = colW = width / numCols;
  RH = rowH = height / numRows;

  for (let col = 0; col < numCols; col++) {
    grid[col] = [];
    for (let row = 0; row < numRows; row++) {
      grid[col][row] = false;
    }
  }

  osc1 = new p5.Oscillator();

  osc1.setType("sine");
  osc1.freq(70);
  osc1.start();
  osc1.amp(0);

  osc2 = new p5.Oscillator();

  osc2.setType("sine");
  osc2.freq(300);
  osc2.start();
  osc2.amp(10);

  osc3 = new p5.Oscillator();

  osc3.setType("sine");
  osc3.freq(250);
  osc3.start();
  osc3.amp(0);

  osc4 = new p5.Oscillator();

  osc4.setType("sine");
  osc4.freq(300);
  osc4.start();
  osc4.amp(0);

  osc5 = new p5.Oscillator();

  osc5.setType("sine");
  osc5.freq(30);
  osc5.start();
  osc5.amp(0);

  reverb1 = new p5.Reverb();
  osc1.disconnect();
  reverb1.process(osc1, 5);
  reverb1.amp(0.001 * slider1.value());

  reverb2 = new p5.Reverb();
  osc2.disconnect();
  reverb2.process(osc2, 2);
  reverb2.amp(0.001 * slider2.value());

  reverb3 = new p5.Reverb();
  osc3.disconnect();
  reverb3.process(osc3, 2);
  reverb3.amp(0.001 * slider3.value());

  reverb4 = new p5.Reverb();
  osc4.disconnect();
  reverb4.process(osc4, 2);
  reverb4.amp(0.001 * slider4.value());

  reverb5 = new p5.Reverb();
  osc5.disconnect();
  reverb5.process(osc5, 2);
  reverb5.amp(0.005 * slider5.value());
}

////////////
// DRAW  ///
////////////
function draw() {
  background("#160F0DEA"); // black background

  for (let col = 0; col < numCols; col++) {
    let x = col * CW;
    for (let row = 0; row < numRows; row++) {
      let y = row * RH;
      if (!grid[col][row]) {
        noFill();
        stroke(255, 5);
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = "rgb(255,255,255)";

        ellipse(CW / 2 + x, CW / 2 + y, CW, RH);
      }
    }
  }

  fill("#rgba(242,212,47,0.85)0.78)");

  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "rgba(255,255,255,0.76)";

  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = "rgba(255,255,14,0.66)";

  bulb1(slider1, CW, RH);
  betweenbulb1();
  bulb2();
  betweenbulb2();
  bulb3();
  betweenbulb3();
  bulb4();
  betweenbulb4();
  bulb5();

  const ball1Y = slider1.value();
  const ball2Y = slider2.value();
  const ball3Y = slider3.value();
  const ball4Y = slider4.value();
  const ball5Y = slider5.value();

  bulbsound();
}

function bulbsound() {
  let f1 = BASE * ratios[slider1.value() / 0.2];
  osc1.freq(f1);
  osc1.amp(0.1);

  let f2 = BASE * ratios[slider2.value() / 2];
  osc2.freq(f2);
  osc2.amp(0.1);

  let f3 = BASE * ratios[slider3.value() / 3];
  osc3.freq(f3);
  osc3.amp(0.1);

  let f4 = BASE * ratios[slider4.value() / 4];
  osc4.freq(f4);
  osc4.amp(0.3);

  let f5 = BASE * ratios[slider5.value() / 0.1];
  osc5.freq(f5);
  osc5.amp(0.05);
}
//y postion divided by ratio from 1-2 by diatonic scales(I included sharp and flat so there are 12 notes+1 mediaum Do and starting from the axis row number 13, up would be Do to medium Do in positive, and down would be Do to medium Do in negative))

function bulb1(slider, cw, rh) {
  // fill("rgb(253,253,242)",80);
  ellipse(
    400 / 25 / 2 + (400 / 25) * 2,
    (400 / 26) * slider.value() + 400 / 26 / 2,
    cw,
    rh
  );

  // ellipse(CW/2+col*CW, ball.y,CW,RH);//col=2 MainBulb
  // Pick a random note from the diatonic scale
}

function bulb2() {
  ellipse(
    400 / 25 / 2 + (400 / 25) * 7,
    (400 / 26) * slider2.value() + 400 / 26 / 2,
    CW,
    RH
  );
  // ellipse(CW/2+col*CW, ball.y,CW,RH);//col=2 MainBulb
  // let f = BASE * ratios[ball2.y/2]
  // // console.log(ratios[ball2.y])
  // osc2.freq(f);
  // osc2.amp();
}

function bulb3() {
  ellipse(
    400 / 25 / 2 + (400 / 25) * 12,
    (400 / 26) * slider3.value() + 400 / 26 / 2,
    CW,
    RH
  );
  // ellipse(CW/2+col*CW, ball.y,CW,RH);//col%5=2 MainBulb
  //consolelog(ratios[ball3.y])
}

function bulb4() {
  ellipse(
    400 / 25 / 2 + (400 / 25) * 17,
    (400 / 26) * slider4.value() + 400 / 26 / 2,
    CW,
    RH
  );

  // ellipse(CW/2+col*CW, ball.y,CW,RH);//col%5=2 MainBulb
}

function bulb5() {
  ellipse(
    400 / 25 / 2 + (400 / 25) * 22,
    (400 / 26) * slider5.value() + 400 / 26 / 2,
    CW,
    RH
  );
  // ellipse(CW/2+col*CW, ball.y,CW,RH);//col%5=2 MainBulb
}

function betweenbulb1() {
  if (
    slider2.value() > slider1.value() &&
    abs(slider2.value() - slider1.value()) > 3
  ) {
    if ((slider2.value() - slider1.value()) % 2 == 0) {
      for (let a = 0; a < abs(slider2.value() - slider1.value() - 2) / 2; a++) {
        // ellipse(ball1.x-2*CW,(ball1+2)*RH+RH*a+400/26/2,CW,RH);//col%5=0
        ellipse(
          400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
          (slider1.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4

        // console.log(slider1.value());

        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
          (slider2.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
        (slider1.value() + 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=0/first

      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
        (slider1.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
        (slider1.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
        (slider2.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }

    if ((slider2.value() - slider1.value()) % 2 == 1) {
      for (let a = 0; a < abs(slider2.value() - slider1.value() - 2) / 2; a++) {
        // ellipse(ball1.x-2*CW,(ball1+2)*RH+RH*a+400/26/2,CW,RH);//col%5=0
        ellipse(
          400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
          (slider1.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
          (slider2.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
        (slider1.value() + 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=0/first

      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
        (slider1.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
        (slider1.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
        (slider2.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }
  }

  if (
    slider2.value() < slider1.value() &&
    abs(slider1.value() - slider2.value()) > 3
  ) {
    if (abs(slider2.value() - slider1.value()) % 2 == 0) {
      //if-1
      for (let a = 0; a < abs(slider1.value() - slider2.value() - 2) / 2; a++) {
        // ellipse(ball1.x-2*CW,(ball1-2)*RH-RH*a+400/26/2,CW,RH);//col%5=0
        ellipse(
          400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
          (slider1.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
          (slider2.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
        (slider1.value() - 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=0/first

      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
        (slider1.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
        (slider1.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
        (slider2.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }

    if (abs(slider2.value() - slider1.value()) % 2 == 1) {
      //if-3
      for (let a = 0; a < abs(slider1.value() - slider2.value() - 2) / 2; a++) {
        // ellipse(ball1.x-2*CW,(ball1-2)*RH-RH*a+400/26/2,CW,RH);//col%5=0
        ellipse(
          400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
          (slider1.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
          (slider2.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
        (slider1.value() - 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=0/first

      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
        (slider1.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
        (slider1.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
        (slider2.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }
  }

  if (slider1.value() == slider2.value()) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=0
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }

  if (slider2.value() - slider1.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=0
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider2.value() - slider1.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=0
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider2.value() - slider1.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
      (slider1.value() + 2) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=0
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }

  if (slider1.value() - slider2.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=0
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
      (slider1.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
      (slider1.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
      slider1.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider1.value() - slider2.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
      (slider1.value() - 2) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=0
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
      (slider1.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
      (slider2.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
      (slider1.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
      (slider1.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      (slider2.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider1.value() - slider2.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 2 * CW,
      (slider1.value() - 2) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=0
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 2 * CW,
      (slider1.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 2 * CW,
      (slider2.value() + 2) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 - 1 * CW,
      (slider1.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 2 + 1 * CW,
      (slider1.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      (slider2.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
}
function betweenbulb2() {
  if (
    slider3.value() > slider2.value() &&
    abs(slider3.value() - slider2.value()) > 3
  ) {
    if ((slider3.value() - slider2.value()) % 2 == 0) {
      for (let a = 0; a < abs(slider3.value() - slider2.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
          (slider2.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
          (slider3.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()+1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
        (slider2.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
        (slider3.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }

    if ((slider3.value() - slider2.value()) % 2 == 1) {
      for (let a = 0; a < abs(slider3.value() - slider2.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
          (slider2.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
          (slider3.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }

      // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()+1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
        (slider2.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
        (slider3.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }
  }

  if (
    slider3.value() < slider2.value() &&
    abs(slider2.value() - slider3.value()) > 3
  ) {
    if (abs(slider3.value() - slider2.value()) % 2 == 0) {
      //if-1
      for (let a = 0; a < abs(slider2.value() - slider3.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
          (slider2.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
          (slider3.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()-1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
        (slider2.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
        (slider3.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }

    if (abs(slider3.value() - slider2.value()) % 2 == 1) {
      //if-3
      for (let a = 0; a < abs(slider2.value() - slider3.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
          (slider2.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
          (slider3.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()-1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
        (slider2.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
        (slider3.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }
  }

  if (slider2.value() == slider3.value()) {
    // ellipse(400/25/2+400/25*7-1*CW,(slider2.value())*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }

  if (slider3.value() - slider2.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
      (slider2.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider3.value() - slider2.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
      (slider2.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*CW,(slider2.value())*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider3.value() - slider2.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
      (slider2.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
      (slider2.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }

  if (slider2.value() - slider3.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
      slider2.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider2.value() - slider3.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
      (slider3.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 - 1 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
      (slider3.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider2.value() - slider3.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 2 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 2 * CW,
      (slider3.value() + 2) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*CW,(slider2.value()-1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 7 + 1 * CW,
      (slider2.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 - 1 * CW,
      (slider3.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
}
function betweenbulb3() {
  if (
    slider4.value() > slider3.value() &&
    abs(slider4.value() - slider3.value()) > 3
  ) {
    if ((slider4.value() - slider3.value()) % 2 == 0) {
      for (let a = 0; a < abs(slider4.value() - slider3.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
          (slider3.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
          (slider4.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()+1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
        (slider3.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
        (slider4.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }

    if ((slider4.value() - slider3.value()) % 2 == 1) {
      for (let a = 0; a < abs(slider4.value() - slider3.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
          (slider3.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
          (slider4.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }

      // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()+1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
        (slider3.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
        (slider4.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }
  }

  if (
    slider4.value() < slider3.value() &&
    abs(slider3.value() - slider4.value()) > 3
  ) {
    if (abs(slider4.value() - slider3.value()) % 2 == 0) {
      //if-1
      for (let a = 0; a < abs(slider3.value() - slider4.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
          (slider3.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
          (slider4.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()-1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
        (slider3.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
        (slider4.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }

    if (abs(slider4.value() - slider3.value()) % 2 == 1) {
      //if-3
      for (let a = 0; a < abs(slider3.value() - slider4.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
          (slider3.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
          (slider4.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()-1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
        (slider3.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
        (slider4.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
    }
  }

  if (slider3.value() == slider4.value()) {
    // ellipse(400/25/2+400/25*12-1*CW,(slider3.value())*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }

  if (slider4.value() - slider3.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
      (slider3.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider4.value() - slider3.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
      (slider3.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*12-1*CW,(slider3.value())*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider4.value() - slider3.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
      (slider3.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
      (slider3.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }

  if (slider3.value() - slider4.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
      slider3.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider3.value() - slider4.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()-1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
  if (slider3.value() - slider4.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 2 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 2 * CW,
      (slider4.value() + 2) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*12-1*CW,(slider3.value()-1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 12 + 1 * CW,
      (slider3.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
}
function betweenbulb4() {
  if (
    slider5.value() > slider4.value() &&
    abs(slider5.value() - slider4.value()) > 3
  ) {
    if ((slider5.value() - slider4.value()) % 2 == 0) {
      for (let a = 0; a < abs(slider5.value() - slider4.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
          (slider4.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
          (slider5.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()+1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
        (slider4.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
        (slider5.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
        (slider5.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=7
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
        (slider5.value() - 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=8
    }

    if ((slider5.value() - slider4.value()) % 2 == 1) {
      for (let a = 0; a < abs(slider5.value() - slider4.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
          (slider4.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
          (slider5.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }

      // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()+1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
        (slider4.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
        (slider5.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6

      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
        (slider5.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=7
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
        (slider5.value() - 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=8
    }
  }

  if (
    slider5.value() < slider4.value() &&
    abs(slider4.value() - slider5.value()) > 3
  ) {
    if (abs(slider5.value() - slider4.value()) % 2 == 0) {
      //if-1
      for (let a = 0; a < abs(slider4.value() - slider5.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
          (slider4.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
          (slider5.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()-1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
        (slider4.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
        (slider5.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
        (slider5.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=7
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
        (slider5.value() + 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=8
    }

    if (abs(slider5.value() - slider4.value()) % 2 == 1) {
      //if-3
      for (let a = 0; a < abs(slider4.value() - slider5.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
          (slider4.value() - 2) * RH - RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
          (slider5.value() + 2) * RH + RH * a + 400 / 26 / 2,
          CW,
          RH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()-1)*RH+400/26/2,CW,RH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
        (slider4.value() - 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
        (slider5.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=6
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
        (slider5.value() + 1) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=7
      ellipse(
        400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
        (slider5.value() + 2) * RH + 400 / 26 / 2,
        CW,
        RH
      ); //col%5=8
    }
  }

  if (slider4.value() == slider5.value()) {
    // ellipse(400/25/2+400/25*17-1*CW,(slider4.value())*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=7
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=8
  }

  if (slider5.value() - slider4.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
      (slider5.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=7
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=8
  }
  if (slider5.value() - slider4.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*17-1*CW,(slider4.value())*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
      (slider5.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=7
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=8
  }
  if (slider5.value() - slider4.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
      (slider5.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()+1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
      (slider5.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=7
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=8
  }

  if (slider4.value() - slider5.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 - 1 * CW,
      (slider4.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
      (slider5.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=7
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=8
  }
  if (slider4.value() - slider5.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()-1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 1 * CW,
      slider5.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=7
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 + 2 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=8
  }
  if (slider4.value() - slider5.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 2 * CW,
      (slider4.value() - 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 2 * CW,
      (slider5.value() + 2) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=5
    // ellipse(400/25/2+400/25*17-1*CW,(slider4.value()-1)*RH+400/26/2,CW,RH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * 17 + 1 * CW,
      slider4.value() * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * 22 - 1 * CW,
      (slider5.value() + 1) * RH + 400 / 26 / 2,
      CW,
      RH
    ); //col%5=6
  }
}

/////////////////////////////////////////////
// UTILITY FUNCTIONS TO MAKE CONNECTIONS  ///
/////////////////////////////////////////////

// if there's no port selected,
// make a port select button appear:

// function ballMoving(){

// ball1=ellipse(400/25/2+400/25*2,400/26*random(1,26)*2+400/26/2,CW,RH)

// ball2=ellipse(400/25/2+400/25*7,400/26*random(1,26)*2+400/26/2,CW,RH)

// ball3=ellipse(400/25/2+400/25*12,400/26*random(1,26)*2+400/26/2,CW,RH)

// ball4=ellipse(400/25/2+400/25*19,400/26*random(1,26)*2+400/26/2,CW,RH)

// ball5=ellipse(400/25/2+400/25*24,400/26*random(1,26)*2+400/26/2,CW,RH)

// }
