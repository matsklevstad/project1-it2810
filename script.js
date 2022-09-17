const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const sunColor = "rgb(254,250,157)";
const skyColor = "rgb(66, 182, 233)";
const grassColor = "rgb(98, 191, 99)";
const grassChangeColor = "rgb(51, 102, 52)"; // The color which appears when hovering the grass
const cloudColor = "rgb(255, 255, 255)";
const houseColor = "rgb(255, 234, 181)";
const roofColor = "rgb(248, 145, 100)";

let hoverFigure = false;
const canvasWidth = 300;
const canvasHeight = 300;

// Canvas animatations = 60 frames per second
// Dx value: ((SVG total distance  / SVG dur) / 60)  =>> Dx-value
// Dx value = how much the x-position to the figure is moving per frame
// x value = the x position of the middle of the figure
let sunX = 0;
const sunRadius = 20;
const sunDx = 0.37777;

let cloud1X = 0;
const cloud1Radius = 25;
const cloud1Dx = 0.58333;

let cloud2X = 0;
const cloud2Radius = 30;
const cloud2Dx = 0.66667;

let cloud3X = 0;
const cloud3Radius = 35;
const cloud3Dx = 0.51389;

function drawStaticFigures() {
  //The sky
  ctx.fillStyle = skyColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //The roof
  ctx.beginPath();
  ctx.fillStyle = roofColor;
  ctx.moveTo(125, 160);
  ctx.lineTo(175, 160);
  ctx.lineTo(150, 120);
  ctx.fill();

  //The house
  ctx.fillStyle = houseColor;
  ctx.fillRect(125, 162, 50, 50);

  //The grass
  var grass = new Path2D();
  grass.arc(150, 300, 90, 0, Math.PI, true);

  // Logic to handle that the grass is not using the color from the house
  if (!hoverFigure) {
    ctx.fillStyle = grassColor;
  } else {
    ctx.fillStyle = grassChangeColor;
  }
  ctx.fill(grass);

  // Gives the grass an event listener. The color changes if the cursor is hovering the grass coordinates
  canvas.addEventListener("mousemove", function (event) {
    if (ctx.isPointInPath(grass, event.offsetX, event.offsetY)) {
      ctx.fillStyle = grassChangeColor;
      hoverFigure = true;
    } else {
      ctx.fillStyle = grassColor;
      hoverFigure = false;
    }
    ctx.fill(grass);
  });
}

// Function to handle animation of the sun and the clouds
function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Drawing the figures which is not moving
  drawStaticFigures();

  // The sun
  ctx.beginPath();
  ctx.arc(sunX - sunRadius, 30, sunRadius, 0, 2 * Math.PI);
  ctx.fillStyle = sunColor;
  ctx.fill();

  // Logic to handle when the sun is 100% not visible in the window. Sets the position to 0.
  // The sun x position is then adjusted to be (0 - (sun radius)).
  // This is making the sun entering the window in a smooth way
  if (sunX - 2 * sunRadius > canvasWidth) {
    sunX = 0;
  }
  // For each frame, handle that the sun must move sunDx to the right to match the SVG figure pace
  sunX += sunDx;

  // Cloud1
  // The logic here is the same as used for the sun
  ctx.beginPath();
  ctx.ellipse(
    cloud1X - cloud1Radius,
    50,
    cloud1Radius,
    20,
    Math.PI / 50,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = cloudColor;
  ctx.fill();

  if (cloud1X - 2 * cloud1Radius > canvasWidth) {
    cloud1X = 0;
  }

  cloud1X += cloud1Dx;

  // Cloud2
  // The logic here is the same as used for the sun
  ctx.beginPath();
  ctx.ellipse(
    cloud2X - cloud2Radius,
    40,
    cloud2Radius,
    20,
    Math.PI / 50,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = cloudColor;
  ctx.fill();

  if (cloud2X - 2 * cloud2Radius > canvasWidth) {
    cloud2X = 0;
  }

  cloud2X += cloud2Dx;

  // Cloud3
  // The logic here is the same as used for the sun
  ctx.beginPath();
  ctx.ellipse(
    cloud3X - cloud3Radius,
    50,
    cloud3Radius,
    20,
    Math.PI / 50,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = cloudColor;
  ctx.fill();

  if (cloud3X - 2 * cloud3Radius > canvasWidth) {
    cloud3X = 0;
  }

  cloud3X += cloud3Dx;
}

$(document).ready(function () {
  $("#svg > #grass").hover(
    // When hovering over the grass, change the color
    function () {
      $("#svg > #grass").css({ fill: grassChangeColor });
    },
    function () {
      // When the user is no longer hovering over the grass, change the color back
      $("#svg > #grass").css({ fill: grassColor });
    }
  );

  $(".btn").click(function () {
    $(this).toggleClass(".btn");
    if ($(this).hasClass(".btn")) {
      $(this).text("SKJUL DOKUMENTASJON"); // Change the text of the button when it is clicked
      $("#doc-text").show(1000);
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#doc-text").offset().top, // Scroll animation down to the text
        },
        800
      );
    } else {
      $(this).text("VIS DOKUMENTASJON");
      $("#doc-text").slideUp(500);
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#container").offset().top,
        },
        500
      );
    }
  });
});

animate();
