const imagem = document.querySelector("#bananaman");

const delayInMilliseconds = 50;
const velocidade = 10;
const tamanho = 100;
const tamanho2 = 50;

let MouseX = 0, MouseY = 0;
let LastX = 0, LastY = 0;

var pontos = 0;

imagem.style.width = tamanho + 'px';
imagem.style.height = tamanho + 'px';

// Create food
setInterval(function() {
    div = document.querySelector("div");
    var bound = div.getBoundingClientRect();
    var RamdonX = Math.floor((Math.random() * bound.height));
    var RamdonY = Math.floor(Math.random() * bound.width);

    var img = document.createElement('img');
    img.src = "./banana.png";
    img.classList.add('fruta');
    img.style.width = tamanho2 + 'px';
    img.style.height = tamanho2 + 'px';
    
    img.style.left = RamdonX.toString() + 'px';
    img.style.top = RamdonY.toString() + 'px';

    img.onclick = () => {
        pontos += 1;
        img.outerHTML = '';
        updateScreen();
    }
    
    div.appendChild(img);
}, 5 * 1000);

function updateScreen() {
    document.getElementById('ScoreShow').innerText = 'Pontos: ' + pontos;
}

setTimeout(() => {
    startTimer();
}, 5000);

function startTimer() {
    setInterval(function() {
        const boundaries = imagem.getBoundingClientRect();
        if (
            (boundaries.x < MouseX && (boundaries.x + boundaries.width) > MouseX) &&
            (boundaries.y < MouseY && (boundaries.y + boundaries.height) > MouseY)
        ) {
            // document.getElementsByTagName('div')[0].style.background = 'red';
            pontos = 0;
            document.getElementById('ScoreShow').innerText = 'Pontos: ' + pontos;
        }
        
    }, delayInMilliseconds);
}

document.addEventListener('mousemove', (event) => {
    if (15 < MouseX - event.clientX || MouseX - event.clientX < -15) {
        imagem.style.left = event.clientX - (tamanho / 2) + 'px';
        MouseX = event.clientX;
    }

    if (15 < MouseY - event.clientY || MouseY - event.clientY < -15) {
        imagem.style.top = event.clientY - (tamanho / 2) + 'px';
        MouseY = event.clientY;
    }
});