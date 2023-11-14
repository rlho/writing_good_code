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

const sliderFactory = (positionX) => {
  const slider = createSlider(1, 26, 100);
  slider.position(positionX, 450);
  slider.style("transform", "rotate(90deg)");
  slider.style("width", "50px");
  return slider;
};

const OscillatorFactory = (freq, amp, slider) => {
  const osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(freq);
  osc.start();
  osc.amp(amp);

  reverb1 = new p5.Reverb();
  osc.disconnect();
  reverb1.process(osc, 5);
  reverb1.amp(0.001 * slider.value());
  return osc;
};

function setup() {
  createCanvas(400, 400); // make the canvas
  background("#160F0DEA");
  // check to see if serial is available:

  slider1 = sliderFactory(0);
  slider2 = sliderFactory(100);
  slider3 = sliderFactory(200);
  slider4 = sliderFactory(300);
  slider5 = sliderFactory(400);

  colW = width / numCols;
  rowH = height / numRows;

  for (let col = 0; col < numCols; col++) {
    grid[col] = [];
    for (let row = 0; row < numRows; row++) {
      grid[col][row] = false;
    }
  }

  osc1 = OscillatorFactory(70, 0, slider1);
  osc2 = OscillatorFactory(300, 10, slider2);
  osc3 = OscillatorFactory(250, 0, slider3);
  osc4 = OscillatorFactory(300, 0, slider4);
  osc5 = OscillatorFactory(30, 0, slider5);
}

////////////
// DRAW  ///
////////////
function draw() {
  background("#160F0DEA"); // black background

  for (let col = 0; col < numCols; col++) {
    let x = col * colW;
    for (let row = 0; row < numRows; row++) {
      let y = row * rowH;
      if (!grid[col][row]) {
        noFill();
        stroke(255, 5);
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = "rgb(255,255,255)";

        ellipse(colW / 2 + x, colW / 2 + y, colW, rowH);
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

  bulb(slider1, 2);
  betweenbulb(slider1, slider2, 2, 7);
  //betweenbulb1();
  bulb2();
  betweenbulb(slider2, slider3, 7, 12);
  //betweenbulb2();
  bulb3();
  betweenbulb(slider3, slider4, 12, 17);
  //betweenbulb3();
  bulb4();
  betweenbulb(slider4, slider5, 17, 22);
  //betweenbulb4();
  bulb5();

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

function bulb(slider, number) {
  ellipse(
    400 / 25 / 2 + (400 / 25) * number,
    (400 / 26) * slider.value() + 400 / 26 / 2,
    colW,
    rowH
  );
}
function bulb1() {
  bulb(slider1, 2);
}

function bulb2() {
  bulb(slider2, 7);
}

function bulb3() {
  bulb(slider3, 12);
}

function bulb4() {
  bulb(slider4, 17);
}

function bulb5() {
  bulb(slider5, 22);
}

function betweenbulb(slider2, slider3, slider2Value, slider3Value) {
  if (
    slider3.value() > slider2.value() &&
    abs(slider3.value() - slider2.value()) > 3
  ) {
    if ((slider3.value() - slider2.value()) % 2 == 0) {
      for (let a = 0; a < abs(slider3.value() - slider2.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
          (slider2.value() + 2) * rowH + rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
          (slider3.value() - 2) * rowH - rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=5
      }
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
        (slider2.value() + 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
        (slider3.value() - 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
      ); //col%5=6
    }

    if ((slider3.value() - slider2.value()) % 2 == 1) {
      for (let a = 0; a < abs(slider3.value() - slider2.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
          (slider2.value() + 2) * rowH + rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
          (slider3.value() - 2) * rowH - rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=5
      }

      // ellipse(400/25/2+400/25*7-1*colW,(slider2.value()+1)*rowH+400/26/2,colW,rowH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
        (slider2.value() + 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
        (slider3.value() - 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
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
          400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
          (slider2.value() - 2) * rowH - rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
          (slider3.value() + 2) * rowH + rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*7-1*colW,(slider2.value()-1)*rowH+400/26/2,colW,rowH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
        (slider2.value() - 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
        (slider3.value() + 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
      ); //col%5=6
    }

    if (abs(slider3.value() - slider2.value()) % 2 == 1) {
      //if-3
      for (let a = 0; a < abs(slider2.value() - slider3.value() - 2) / 2; a++) {
        ellipse(
          400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
          (slider2.value() - 2) * rowH - rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=4
        ellipse(
          400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
          (slider3.value() + 2) * rowH + rowH * a + 400 / 26 / 2,
          colW,
          rowH
        ); //col%5=5
      }
      // ellipse(400/25/2+400/25*7-1*colW,(slider2.value()-1)*rowH+400/26/2,colW,rowH);//col%5=1
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
        (slider2.value() - 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
      ); //col%5=3
      ellipse(
        400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
        (slider3.value() + 1) * rowH + 400 / 26 / 2,
        colW,
        rowH
      ); //col%5=6
    }
  }

  if (slider2.value() == slider3.value()) {
    // ellipse(400/25/2+400/25*7-1*colW,(slider2.value())*rowH+400/26/2,colW,rowH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
      slider2.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
      slider2.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
      slider3.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
      slider3.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=6
  }

  if (slider3.value() - slider2.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
      (slider2.value() + 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
      slider3.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*colW,(slider2.value()+1)*rowH+400/26/2,colW,rowH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
      slider2.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
      (slider3.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=6
  }
  if (slider3.value() - slider2.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
      (slider2.value() + 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
      slider3.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*colW,(slider2.value())*rowH+400/26/2,colW,rowH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
      slider2.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
      (slider3.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=6
  }
  if (slider3.value() - slider2.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
      (slider2.value() + 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
      (slider3.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*colW,(slider2.value()+1)*rowH+400/26/2,colW,rowH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
      (slider2.value() + 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
      (slider3.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=6
  }

  if (slider2.value() - slider3.value() == 1) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
      (slider2.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
      slider3.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*colW,(slider2.value()+1)*rowH+400/26/2,colW,rowH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
      slider2.value() * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
      (slider3.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=6
  }
  if (slider2.value() - slider3.value() == 2) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
      (slider2.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
      (slider3.value() + 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=5
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value - 1 * colW,
      (slider2.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
      (slider2.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
      (slider3.value() + 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=6
  }
  if (slider2.value() - slider3.value() == 3) {
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 2 * colW,
      (slider2.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=4
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 2 * colW,
      (slider3.value() + 2) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=5
    // ellipse(400/25/2+400/25*7-1*colW,(slider2.value()-1)*rowH+400/26/2,colW,rowH);//col%5=1
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider2Value + 1 * colW,
      (slider2.value() - 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=3
    ellipse(
      400 / 25 / 2 + (400 / 25) * slider3Value - 1 * colW,
      (slider3.value() + 1) * rowH + 400 / 26 / 2,
      colW,
      rowH
    ); //col%5=6
  }
}
