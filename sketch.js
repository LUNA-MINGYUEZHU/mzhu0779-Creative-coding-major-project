class BlackLine {
  constructor(x, y, w, h, adjustW) {
    // Constructor to initialize position, width, height, and width adjustment
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.adjustW = adjustW;
  }

  draw(hue) {
    push(); // Save the current drawing state
    translate(this.x, this.y); // Translate to the specified position
    rotate(-28); // Rotate by a specified angle
    noStroke(); // Remove rectangle stroke
    fill(hue, 100, 100); // Fill with the current hue
    rect(0, 0, this.w + this.adjustW, this.h); // Draw the rectangle
    pop(); // Restore the previous drawing state
  }
}

class DrawFunction {
  constructor(x, y, rotation, lines, config) {
    // Constructor to initialize position, rotation angle, number of lines, and config function
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.lines = lines;
    this.config = config;
  }

  draw(hue) {
    push(); // Save the current drawing state
    translate(this.x, this.y); // Translate to the specified position
    rotate(this.rotation); // Rotate by a specified angle
    for (let i = 0; i < this.lines; i++) {
      this.config(i, hue); // Use the config function to draw each line
    }
    pop(); // Restore the previous drawing state
  }
}

let referenceWidth = 1280; // Reference width for scaling
let referenceHeight = 720; // Reference height for scaling
let x;
let y;
let size = 40;
let scl = 3;//magnification

function setup() {
  createCanvas(windowWidth, windowHeight); // Create canvas with window width and height
  colorMode(HSB, 360, 100, 100); // Use HSB color mode
  angleMode(DEGREES); // Use degrees for angles
}

function draw() {
  colorMode(RGB); // Switch to RGB color mode
  background(247, 241, 223); // Set the background color

  let scaleFactor = min(width / referenceWidth, height / referenceHeight); // Calculate the scaling factor
  translate(width / 2, height / 2); // Translate to the center of the canvas
  scale(scaleFactor); // Scale by the calculated factor
  translate(-referenceWidth / 2, -referenceHeight / 2); // Translate to the top-left corner of the reference dimensions

  colorMode(HSB, 360, 100, 100); // Switch to HSB color mode
  let hue = (frameCount % 360); // Dynamically change the hue for gradient animation

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
  ]; // Create multiple BlackLine objects

  let drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue) => {
      noFill(); // No fill
      stroke(hue, 100, 100); // Stroke with the current hue
      let y = i * 6;
      let x1 = 0 + i * 4.5;
      let x2 = 480 - i * 3.7;
      line(x1, y, x2, y); // Draw line
    }),
    new DrawFunction(843, 154, -28, 57, (i, hue) => {
      if (i >= 20 && i < 33) {
        noStroke(); // No stroke
      } else {
        noFill(); // No fill
        stroke(hue, 100, 100); // Stroke with the current hue
      }
      let y = i * 6;
      let x1 = 0 - i * 4;
      let x2 = 69 + i * 3.3;
      line(x1, y, x2, y); // Draw line
      if (i == 7 || i == 13) {
        noStroke(); // No stroke
        fill(hue, 100, 100); // Fill with the current hue
        if (i == 7) {
          rect(x1, y, 80, 10); // Draw rectangle
          rect(x2, y, 260, 10); // Draw rectangle
        } else if (i == 13) {
          rect(x1, y, 124, 8); // Draw rectangle
          rect(x2, y, 260, 10); // Draw rectangle
        }
      } else if (i == 17) {
        noStroke(); // No stroke
        fill(hue, 100, 100); // Fill with the current hue
        rect(x1, y, 154, 6); // Draw rectangle
      }
    }),
    new DrawFunction(153, 530, -28, 54, (i, hue) => {
      noFill(); // No fill
      stroke(hue, 100, 100); // Stroke with the current hue
      let y = i * 6;
      let x1 = 0 + i * 4;
      let x2 = x1 + 50;
      line(x1, y, x2, y); // Draw line
    }),
    new DrawFunction(238, 712, -28, 20, (i, hue) => {
      if (i >= 10 && i < 14) {
        noStroke(); // No stroke
      } else {
        noFill(); // No fill
        stroke(hue, 100, 100); // Stroke with the current hue
      }
      let y = i * 6;
      let x1 = 0 + i * 5;
      let x2 = x1 + 1280;
      line(x1, y, x2, y); // Draw line
    }),
    new DrawFunction(144, 609, -28, 2, (i, hue) => {
      noFill(); // No fill
      stroke(hue, 100, 100); // Stroke with the current hue
      let y = i * 24;
      let x1 = 0 + i * 16;
      let x2 = x1 + 1200;
      line(x1, y, x2, y); // Draw line
    }),
    new DrawFunction(94, 651, -28, 9, (i, hue) => {
      noFill(); // No fill
      stroke(hue, 100, 100); // Stroke with the current hue
      let y = i * 6;
      let x1 = 0 + i * 5;
      let x2 = 440 - i * 3;
      line(x1, y, x2, y); // Draw line
    }),
    new DrawFunction(812, 423, -28, 1, (i, hue) => {
      noStroke(); // No stroke
      fill(hue, 100, 100); // Fill with the current hue
      rect(0, 0, 311, 5); // Draw rectangle
    })
  ]; // Create multiple DrawFunction objects


  blackLines.forEach(line => line.draw(hue)); // Draw each BlackLine object
  drawFunctions.forEach(drawFunc => drawFunc.draw(hue)); // Draw each DrawFunction object

  //Add a magnifying glass that follows the mouse
  x = mouseX;
  y = mouseY;
  //Magnifying glass displays contents
  copy(x, y, size, size, x, y, size*scl, size*scl);
  noFill();
  stroke(255, 255, 255);
  strokeWeight(3);
  //Magnifying glass frame
  rect(x, y, size*scl, size*scl);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas
}
