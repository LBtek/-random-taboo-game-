var body = document.querySelector('body');
var btnStart = document.querySelector('#start');
var btnStop = document.querySelector('#stop');
var btnContinue = document.querySelector('#continue');
var points = document.querySelector('#score');
var n1 = document.querySelector('#n1');
var n2 = document.querySelector('#n2');
var input = document.querySelector('#fieldResult');
var countdown = document.querySelector('#count');
var totalTemp = document.querySelector('#totalTemp');

var pontos = 0;
var intervalo = '';
var tempT = 0;
var cronometro = '';
var loop = '';

points.innerHTML = 'Placar: ' + pontos;

var tabuada = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10]];

btnStart.onclick = function () {
    gerarNrs();
    intervalo = setInterval(gerarNrs, 5000);
    tempT = 1000;
    cronometro = setInterval(time, 1000);
    btnStart.style.display = 'none';
    btnStop.style.display = 'block';
};

btnStop.onclick = function () {
    clearInterval(cronometro);
    clearInterval(intervalo);
    clearInterval(loop);
    input.setAttribute("disabled", "disabled");
    btnStop.style.display = 'none';
    btnContinue.style.display = 'block';
};

btnContinue.onclick = function () {
    cronometro = setInterval(time, 1000);
    gerarNrs();
    intervalo = setInterval(gerarNrs, 5000);
    input.removeAttribute("disabled");
    input.focus();
    btnContinue.style.display = 'none';
    btnStop.style.display = 'block';
}

function gerarNrs() {
    input.value = "";
    input.focus();
    clearInterval(loop);
    countdown.innerHTML = "5";
    var mile = 4000;
    loop = setInterval(function () {
        var dt = new Date(mile);
        var sec = dt.getSeconds();
        if (sec < 1) {
            clearInterval(loop);
        }
        mile = mile !== 0 ? mile - 1000 : mile;
        countdown.innerHTML = sec;
    }, 1000);

    if (tabuada.length == 0) {
        n1.innerHTML = "";
        n2.innerHTML = "";
        setTimeout(function () {
            alert('Parabéns! Você zerou o jogo. \nSeu tempo foi de: ' + totalTemp.innerHTML);
            window.location.reload();
        }, 200);
    } else {
        aleatorio = Math.floor(Math.random() * tabuada.length);
        n1.innerHTML = tabuada[aleatorio][0];
        n2.innerHTML = tabuada[aleatorio][1];
    }
}

function time() {
    var tmp = new Date(0, 0, 0, 0, 0, 0, tempT);
    var secs = tmp.getSeconds();
    var mins = tmp.getMinutes();
    var hrs = tmp.getHours();
    secs = secs < 10 ? "0" + secs : secs;
    mins = mins < 10 ? "0" + mins : mins;
    hrs = hrs < 10 ? "0" + hrs : hrs;
    totalTemp.innerHTML = hrs + ":" + mins + ":" + secs;
    tempT += 1000;
}

function refresh() {
    clearInterval(intervalo);
    pontos++;
    body.style.backgroundColor = '#00dd00';
    setTimeout(function () {
        body.style.backgroundColor = '#add8e6';
    }, 300);
    points.innerHTML = 'Placar: ' + pontos;
    tabuada.splice(aleatorio, 1);
    gerarNrs();
    intervalo = setInterval(gerarNrs, 5000);
}

function check() {
    var resultado = parseInt(n1.innerHTML) * parseInt(n2.innerHTML);

    if (input.value == resultado) {
        refresh();
    } else {
        body.style.backgroundColor = 'red';
        setTimeout(function () {
            body.style.backgroundColor = '#add8e6';
        }, 300);
        clearInterval(intervalo);
        gerarNrs();
        intervalo = setInterval(gerarNrs, 5000);
    }
}

input.addEventListener("keyup", listening);

function listening(event) {
    var resultado = parseInt(n1.innerHTML) * parseInt(n2.innerHTML);
    if (input.value == resultado) {
        refresh();
    }
    if (event.keyCode == 13) {
        check();
    }
}