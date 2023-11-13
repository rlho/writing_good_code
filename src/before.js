let faceapi;
let video;
let width = 1280;
let height = 980;
let ctx;
let cx, cy, rad;
let boushi, hige, mask;




// by default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}
let colors = ['🎃','😸','😎','🎅','🤪','☹️','☺️']

function setup() {
  let elm = createCanvas(width, height);

  // Retina対応
  if (window.devicePixelRatio > 1) {
    elm.canvas.width = width * window.devicePixelRatio;
    elm.canvas.height = height * window.devicePixelRatio;
    elm.canvas.style.width = width + 'px';
    elm.canvas.style.height = height + 'px';
  }
  ctx = elm.canvas.getContext('2d');

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element, and just show the canvas

  faceapi = ml5.faceApi(video, detection_options, modelReady);

}

function modelReady() {
  //console.log('ready!')
  //console.log(faceapi)
  faceapi.detect(gotResults)
}


function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }

  detections = result;

  background(255);
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  if (detections) {

    if (detections.length > 0) {
      drawBox(detections)
      drawLandmarks(detections)
      drawPic(detections)
    }
  }

  faceapi.detect(gotResults)
}
 //   if (document.getElementById('boushi').checked) {

function drawPic(detections) {

}


// 傾き計算
function getRadian(x1, y1, x2, y2) {
  let rad = Math.atan2(y2 - y1, x2 - x1);
  return rad - (Math.PI / 2);
}


// 画像を傾き調整して表示
function drawRotateImage(img, x, y, w, h) {
  ctx.save();

  ctx.setTransform(
    Math.cos(rad),
    Math.sin(rad),
    -Math.sin(rad),
    Math.cos(rad),
    cx - cx * Math.cos(rad) + cy * Math.sin(rad),
    cy - cx * Math.sin(rad) - cy * Math.cos(rad)
  );

  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
}


function drawBox(detections) {
  for (let i = 1; i < detections.length; i++) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x
    const y = alignedRect._box._y
    const boxWidth = alignedRect._box._width
    const boxHeight = alignedRect._box._height

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    textSize(boxWidth*1.2);
    //col = random(colors);
    if(i %8 == 0){
      text('😎',width - x - boxWidth, y + boxHeight*4/5);
    }
    if(i %8 == 1){
      text('🤪',width - x - boxWidth, y + boxHeight*4/5);
    }
    if(i %8 == 2){
      text('🎅',width - x - boxWidth, y + boxHeight*4/5);
    }
    if(i %8 == 3){
      text('😗',width - x - boxWidth, y + boxHeight*4/5);
    }
        if(i %8 == 4){
      text('🎃',width - x - boxWidth, y + boxHeight*4/5);
    }
        if(i %8 == 5){
      text('😴',width - x - boxWidth, y + boxHeight*4/5);
    }
        if(i %8 == 6){
      text('🐱',width - x - boxWidth, y + boxHeight*4/5);
    }
        if(i %8 == 7){
      text('🐶',width - x - boxWidth, y + boxHeight*4/5);
    }
    
    rect(width - x - boxWidth, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251)
  strokeWeight(2)

  for (let i = 0; i < 1; i++) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

        const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x
    const y = alignedRect._box._y
    const boxWidth = alignedRect._box._width
    //console.log(boxWidth)
    //drawPart(mouth, true);
    //drawPart(nose, false);
    //drawPart(leftEye, true);
    textSize(boxWidth/2.5);
    text('👁',width - leftEye[1].x - boxWidth/3.5, leftEye[1].y + boxWidth/10);
    text('👁',width - rightEye[1].x -  boxWidth/3.5, rightEye[1].y+ boxWidth/10);
    text('👃',width - nose[1].x - boxWidth/4, nose[1].y + boxWidth/4);
    if(i %3 == 0){
      text('👄',width - mouth[1]._x - boxWidth/3, mouth[1]._y + boxWidth/5);
    }
    if(i %3 == 1){
      text('👄',width - mouth[1]._x - 55, mouth[1]._y + 40);
    }
    if(i %3 == 2){
      text('👄',width - mouth[1]._x - 55, mouth[1]._y + 40);
    }
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);

    fill(0, 255, 0);
    //console.log(leftEye)
    noStroke();
    ellipse(width - nose[0]._x, nose[0]._y, 10, 10);
    ellipse(width - nose[3]._x, nose[3]._y, 10, 10);
    ellipse(width - nose[0]._x, nose[7]._y, 10, 10);
    ellipse(width - mouth[0]._x, mouth[0]._y, 10, 10);
    ellipse(width - mouth[3]._x, mouth[3]._y, 10, 10);

  }
}

function drawPart(feature, closed) {
  beginShape();
  for (let i = 0; i < feature.length; i++) {
    const x = feature[i]._x
    const y = feature[i]._y
    vertex(width - x, y)

  }

  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }
}
