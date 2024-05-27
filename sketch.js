class BlackLine {
  constructor(x, y, w, h, adjustW) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.adjustW = adjustW;
  }

  draw(hue) {
    push();
    translate(this.x, this.y);
    rotate(-28);
    noStroke();
    fill(hue, 100, 100);
    rect(0, 0, this.w + this.adjustW, this.h);
    pop();
  }
}

class DrawFunction {
  constructor(x, y, rotation, lines, config) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.lines = lines;
    this.config = config;
  }

  draw(hue) {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    for (let i = 0; i < this.lines; i++) {
      this.config(i, hue);
    }
    pop();
  }
}

class Magnifier {
  constructor(size, zoom) {
    this.size = size;
    this.zoom = zoom;
  }

  draw() {
    let magnifierX = constrain(mouseX, this.size / 2, width - this.size / 2);
    let magnifierY = constrain(mouseY, this.size / 2, height - this.size / 2);

    // Draw magnified content
    image(get(magnifierX - this.size / (2 * this.zoom), magnifierY - this.size / (2 * this.zoom), this.size / this.zoom, this.size / this.zoom),
      magnifierX - this.size / 2, magnifierY - this.size / 2, this.size, this.size);

    // Draw magnifier border
    noFill();
    stroke(255, 255, 255);
    strokeWeight(3);
    rect(magnifierX, magnifierY, this.size, this.size);
  }
}

let referenceWidth = 1280;
let referenceHeight = 720;
let magnifier;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  magnifier = new Magnifier(100, 2); // Magnifier with size 100 and zoom level 2
}

function draw() {
  colorMode(RGB);
  background(247, 241, 223);

  let scaleFactor = min(width / referenceWidth, height / referenceHeight);
  translate(width / 2, height / 2);
  scale(scaleFactor);
  translate(-referenceWidth / 2, -referenceHeight / 2);

  colorMode(HSB, 360, 100, 100);
  let hue = (frameCount % 360);

  let blackLines = [
    new BlackLine(280, 731, 190, 4, 4),
    new BlackLine(338, 755, 960, 4, 4),
    new BlackLine(112, 659, 210, 6, 6),
    new BlackLine(128, 666, 210, 6, 6),
    new BlackLine(140, 672, 210, 6, 6),
    new BlackLine(308, 525, 505, 10, -12),
    new BlackLine(336, 540, 505, 10, -12),
    new BlackLine(436, 595, 45, 8, -12),
    new BlackLine(460, 610, 17, 8, -12)
  ];

  let drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 6;
      let x1 = 0 + i * 4.5;
      let x2 = 480 - i * 3.7;
      line(x1, y, x2, y);
    }),
    new DrawFunction(843, 154, -28, 57, (i, hue) => {
      if (i >= 20 && i < 33) {
        noStroke();
      } else {
        noFill();
        stroke(hue, 100, 100);
      }
      let y = i * 6;
      let x1 = 0 - i * 4;
      let x2 = 69 + i * 3.3;
      line(x1, y, x2, y);
      if (i == 7 || i == 13) {
        noStroke();
        fill(hue, 100, 100);
        if (i == 7) {
          rect(x1, y, 80, 10);
          rect(x2, y, 260, 10);
        } else if (i == 13) {
          rect(x1, y, 124, 8);
          rect(x2, y, 260, 10);
        }
      } else if (i == 17) {
        noStroke();
        fill(hue, 100, 100);
        rect(x1, y, 154, 6);
      }
    }),
    new DrawFunction(153, 530, -28, 54, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 6;
      let x1 = 0 + i * 4;
      let x2 = x1 + 50;
      line(x1, y, x2, y);
    }),
    new DrawFunction(238, 712, -28, 20, (i, hue) => {
      if (i >= 10 && i < 14) {
        noStroke();
      } else {
        noFill();
        stroke(hue, 100, 100);
      }
      let y = i * 6;
      let x1 = 0 + i * 5;
      let x2 = x1 + 1280;
      line(x1, y, x2, y);
    }),
    new DrawFunction(144, 609, -28, 2, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 24;
      let x1 = 0 + i * 16;
      let x2 = x1 + 1200;
      line(x1, y, x2, y);
    }),
    new DrawFunction(94, 651, -28, 9, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 6;
      let x1 = 0 + i * 5;
      let x2 = 440 - i * 3;
      line(x1, y, x2, y);
    }),
    new DrawFunction(812, 423, -28, 1, (i, hue) => {
      noStroke();
      fill(hue, 100, 100);
      rect(0, 0, 311, 5);
    })
  ];

  blackLines.forEach(line => line.draw(hue));
  drawFunctions.forEach(drawFunc => drawFunc.draw(hue));
  magnifier.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
