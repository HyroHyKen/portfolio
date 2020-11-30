// Global Var
let isGameActive = Boolean(false);;

// Background Movement :

// Fonction permettant le mouvement du background suivant la position de la souris.

$(document).ready(function() {
var movementStrength = 25;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
$("#left").mousemove(function(e){
          var pageX = e.pageX - ($(window).width() / 2);
          var pageY = e.pageY - ($(window).height() / 2);
          var newvalueX = width * pageX * -1 - 25;
          var newvalueY = height * pageY * -1 - 50;
          $('#left').css("background-position", newvalueX+"px     "+newvalueY+"px");
});
});


// Début du JS

// Flip Flop Permettant la permutation de class sur un OnClick()
function flipFlopClass() {
    let element1 = document.getElementById("helloworld");
    let element2 = document.getElementById("game");
    if (element1.className === 'hidden') {
        element1.className = 'shown';
        window.isGameActive = false;
        element2.className = 'canvas hidden';
    } else {
        element1.className = 'hidden';
        window.isGameActive = true;
        element2.className = 'canvas shownCanvas';
    }
}

// Caret Styling

$(function() {
    var cursor;
    window.setInterval(function() {
        console.log(window.isGameActive);
        if (window.isGameActive != true) {
            // $('input').focus();

            if ($('#cursor').css('visibility') === 'visible') {
                $('#cursor').css({
                    visibility: 'hidden'
                });
            } else {
                $('#cursor').css({
                    visibility: 'visible'
                });
            }
        }
    }, 500);

    $('input').keyup(function() {
        $('#cmd span').text($(this).val());
    });

    $('input').blur(function() {
        clearInterval(cursor);
        $('#cursor').css({
            visibility: 'visible'
        });
    });
});

// Autofocus

function autoFocus() {
    document.getElementById("cmdTyper").focus();
}

function createElement(type, text, subelement) {
    // crée un nouvel élément div
    var newDiv = document.createElement(type);
    // et lui donne un peu de contenu
    var newContent = document.createTextNode(text);
    // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);

    // ajoute le nouvel élément créé et son contenu dans le DOM
    var currentDiv = document.getElementById(subelement);
    document.body.insertBefore(newDiv, currentDiv);
}

// Submit Text

$('#line').submit(function() {
    const element = document.getElementById("cmdTyper");
    const content = element.innerHTML;
    console.log(content);
    switch (content) {
        case "help":
            window.createElement("p", "wow", "line");
            break;
        default:
            break;
    }
});

// Game Début

// Définition des images
// Img Pos : Down
let imgDown = new Image();
imgDown.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
imgDown.onload = function() {
    window.requestAnimationFrame(gameLoop);
};

// Img Pos : Top
let imgTop = new Image();
imgTop.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';

// Img Pos : Left
let imgLeft = new Image();
imgLeft.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';

// Img Pos : Right
let imgRight = new Image();
imgRight.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

const SCALE = 2;
const WIDTH = 16;
const HEIGHT = 18;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(imgDown,
        frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
        canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}

const CYCLE_LOOP = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let keyPresses = {};

window.addEventListener('keydown', keyDownListener);

function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);

function keyUpListener(event) {
    keyPresses[event.key] = false;
}

let MOVEMENT_SPEED = 1;
let MOVEMENT_DIRECTION = "up";
let positionX = 0;
let positionY = 0;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (keyPresses.w) {
        positionY -= MOVEMENT_SPEED;
        MOVEMENT_DIRECTION = "up";
    } else if (keyPresses.s) {
        positionY += MOVEMENT_SPEED;
        MOVEMENT_DIRECTION = "down";
    } else if (keyPresses.Shift) {
        MOVEMENT_SPEED = 2;
    } else {
        MOVEMENT_SPEED = 1;
    }
    if (keyPresses.a) {
        positionX -= MOVEMENT_SPEED;
        MOVEMENT_DIRECTION = "left";
    } else if (keyPresses.d) {
        positionX += MOVEMENT_SPEED;
        MOVEMENT_DIRECTION = "right";
    } else if (keyPresses.Shift) {
        MOVEMENT_SPEED = 2;
    } else {
        MOVEMENT_SPEED = 1;
    }

    drawFrame(0, 0, positionX, positionY);
    window.requestAnimationFrame(gameLoop);
  
}