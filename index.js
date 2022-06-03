const imagem = document.querySelector("#bananaman");

const delayInMilliseconds = 50;
const velocidade = 0.05;
const tamanho = 100;
const tamanho2 = 50;

let BananasCount = 0;

let SrcImage = "./bananaman.png";

let MouseX = 0, MouseY = 0;
let LastX = 0, LastY = 0;

let pontos = 0;

imagem.style.width = tamanho + 'px';
imagem.style.height = tamanho + 'px';

updateScreen();
SpawnBanana();

function SpawnBanana () {
    if (BananasCount == 0) {
        div = document.getElementsByTagName("body")[0];

        const boundies = div.getBoundingClientRect();

        let H = boundies.height - tamanho2;
        let W = boundies.width - tamanho2;
        let RamdonX = Math.floor((Math.random() * W));
        let RamdonY = Math.floor((Math.random() * H));
        
        console.log(H);
        console.log(W);
        console.log("------");
        console.log(RamdonX);
        console.log(RamdonY);
        console.log("------");

        let img = document.createElement('img');
        img.src = "./banana.png";
        img.classList.add('fruta');
        img.style.width = tamanho2 + 'px';
        img.style.height = tamanho2 + 'px';
        
        img.style.left = RamdonX.toString() + 'px';
        img.style.top = RamdonY.toString() + 'px';

        img.onclick = () => {
            pontos += 1;
            img.outerHTML = '';
            BananasCount--;
            updateScreen();
            SpawnBanana();
        }
        
        div.appendChild(img);
        BananasCount++;
    }
}

function updateScreen() {
    document.getElementById('ScoreShow').innerText = 'Pontos: ' + pontos;
    let result = 1 - (velocidade * 15);
    if (pontos < 15) {
        result = 1 - (velocidade * pontos);
    }
    imagem.style.transition = "all " + result + "s linear";
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

    if (LastX - MouseX > 0) {
        SrcImage = "./bananaman2.png";
    } else if (LastX - MouseX < 0) {
        SrcImage = "./bananaman.png";
    }

    imagem.src = SrcImage;

    LastX = MouseX;
    LastY = MouseY;
});