let video;
let canvas;
let context;
let redMusic;
let blueMusic;
let yellowMusic;
let greenMusic;

const dotRadius = 10;
const dotColor = "red";
const dotLineWidth = 2;
const dotX = 320;
const dotY = 240;


// this function is for preload the music file
function preload() {
    redMusic = loadSound("Red.mp3");
    blueMusic = loadSound("blue.mp3");
    yellowMusic = loadSound("yellow.mp3");
    greenMusic = loadSound("green.mp3");
    }

function setup() {
    video = createCapture(VIDEO);
    video.size(640, 480);
    canvas = createCanvas(640, 480);
    context = canvas.elt.getContext('2d');
    video.hide();
}

function draw() {
    image(video, 0, 0);

    // Draw the circle dot at the specified coordinates
    context.beginPath();
    context.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
    context.strokeStyle = dotColor;
    context.lineWidth = dotLineWidth;
    context.fillStyle = "transparent";
    context.stroke();

    let pixelData = context.getImageData(dotX, dotY, 1, 1).data;
    let r = pixelData[0];
    let g = pixelData[1];
    let b = pixelData[2];

    let hsv = RGBtoHSV(r, g, b);
    let hue = hsv.h;
    let hue_value = Math.ceil(hue);
    let color = "Undefined";
    if (hue < 5 ) {
        color = "RED";
        if (!redMusic.isPlaying()) {
                redMusic.play();
        }
        } 
        else if( hue < 22){
            color =" RED"
        }
        else if (hue < 33) {
            color = "YELLOW";
        } 
        else if (hue < 85) {
            color = "YELLOW";
            if (!yellowMusic.isPlaying()) {
                yellowMusic.play();
            }
        }
        else if (hue < 140) {
            color = "GREEN";
            if (!greenMusic.isPlaying()) {
                greenMusic.play();
            }
        } 
        else if (hue < 160) {
            color = "BLUE";
            if (!blueMusic.isPlaying()) {
                    blueMusic.play();
            }
        } 
        else{
            color = "Unknown";
        }

    document.getElementById('color').textContent = "Detected Color: " + color;
    document.getElementById('hue_value').textContent = "hue value: " + hue_value;

}

function RGBtoHSV(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, v;

    if (max === min) {
        h = 0;
    }
    else if (max === r) {
        h = (60 * ((g - b) / (max - min)) + 360) % 360;
    } 
    else if (max === g) {
        h = (60 * ((b - r) / (max - min)) + 120) % 360;
    } 
    else if (max === b) {
        h = (60 * ((r - g) / (max - min)) + 240) % 360;
    }

    if (max === 0) {
        s = 0;
    } 
    else {
        s = 1 - min / max;
    }

    v = max;

    return { h, s, v };
}

// Initialize OpenCV.js when it's ready
function onOpenCvReady() {
    preload();
    setup();
    setInterval(draw, 100);
}