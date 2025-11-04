const imagens = [
  { id: "1", data: 1906, uso: false },
  { id: "2", data: 1932, uso: false },
  { id: "3", data: 1949, uso: false },
  { id: "4", data: 2010, uso: false },
  { id: "5", data: 1973, uso: false },
  { id: "6", data: 1915, uso: false },
  { id: "7", data: 1927, uso: false },
  { id: "8", data: 1933, uso: false },
  { id: "9", data: 1901, uso: false },
  { id: "10", data: 1959, uso: false },
  { id: "11", data: 1964, uso: false },
  { id: "12", data: 1993, uso: false },
  { id: "13", data: 1960, uso: false },
  { id: "14", data: 1936, uso: false },
  { id: "15", data: 1937, uso: false },
  { id: "16", data: 2020, uso: false }
];

let pontuacaoTotal = 0;
let imgAtual;
let rodadaAtual = 1;

//Declaração de variáveis
const rodada = document.getElementById("rodada");
const img = document.getElementById("img");
const imgData = document.getElementById("img-data");
const pontuacao = document.getElementById("pontuacao");
//const randBtn = document.getElementById("sorteio");
//const resetBtn = document.getElementById("reset");
const submitBtn = document.getElementById("game-submit");
const pontuacaoFinal = document.getElementById("pontuacao-final");

//Listeners
//randBtn.addEventListener("click", novaRodada);
//resetBtn.addEventListener("click", resetUso);



//Range slider
var slider = document.getElementById("slider");
var output = document.getElementById("valor");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}


//Definição das funções:
function novaRodada(){
  resetRodada();
  exibirRodada();

  imgAtual = sortearImg();

  exibirImg(imgAtual);
}

function exibirRodada() {
  rodada.innerHTML = `<p>Rodada ${rodadaAtual}/5</p>`;
}

function validarData() {
  const anoReal = imgAtual.data;
  const anoEscolhido = parseInt(slider.value);
  const diferenca = Math.abs(anoEscolhido - anoReal);

  let pontuacaoFinal = Math.max(0, 1000 - (diferenca * 35));

  pontuacaoTotal += pontuacaoFinal;

  return pontuacaoFinal;
}


function resetUso() {
  for (let i=0; i < imagens.length; i++){
    imagens[i].uso = false;
  }
}

function resetRodada() {
  imgData.innerHTML = ``;
  pontuacao.innerHTML = ``;

  submitBtn.removeEventListener("click", novaRodada);
  submitBtn.addEventListener("click", exibirResultado);
  submitBtn.textContent = "Confirmar";
  slider.value = 1962;
}

function sortearImg() {
  const todasUsadas = imagens.every(img => img.uso === true);

  if (todasUsadas) {
    img.innerHTML = "<p>Todas as imagens já foram sorteadas!</p>";
    return;
  }

  let sorteio;
  do { 
    sorteio = Math.floor(Math.random() * imagens.length);
  } while (imagens[sorteio].uso === true);

  imagens[sorteio].uso = true;
  return imagens[sorteio];
}

function exibirImg(imgSorteada) {
  const imgNome = "img/" + imgSorteada.id + ".jpg";

  img.innerHTML = `<img src=${imgNome}>`;
}

function exibirResultado() {
  const pontuacaoFinal = validarData(imgAtual); 

  imgData.innerHTML = `<p>A imagem foi tirada em ${imgAtual.data}.</p>`;
  pontuacao.innerHTML = `<p>Sua pontuação final é: ${pontuacaoFinal}.</p>`;

  submitBtn.removeEventListener("click", exibirResultado);
  submitBtn.textContent = "Próximo";

  if (rodadaAtual < 5) {
    rodadaAtual++;
    submitBtn.addEventListener("click", novaRodada);
  } else {
    submitBtn.onclick = () => {
      localStorage.setItem("pontuacaoTotal", pontuacaoTotal);
      window.location.href = "jogoResultados.html";
    };
  }
}

