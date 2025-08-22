function TelaOverlay(tipo, pontuacao = 0) {
    this.elemento = novoElemento("div", "tela-overlay");
    
    if (tipo === "iniciar") {
        this.elemento.innerHTML = `
            <div class="titulo-overlay">INICIAR</div>
            <div class="botao-play"></div>
        `;
    } else if (tipo === "reiniciar") {
        this.elemento.classList.add("reiniciar");
        this.elemento.innerHTML = `
            <div class="titulo-overlay">GAME OVER</div>
            <div class="pontuacao-final">Pontuação: ${pontuacao}</div>
            <div class="botao-play"></div>
        `;
    }

    this.mostrar = () => {
        this.elemento.style.display = "flex";
    };

    this.esconder = () => {
        this.elemento.style.display = "none";
    };

    this.onClick = callback => {
        const botao = this.elemento.querySelector(".botao-play");
        botao.onclick = callback;
    };
}

function novoElemento(tagName, className) {
  const elemento = document.createElement(tagName);
  elemento.className = className;
  return elemento;
}

function Barreira(reserva = false){
    this.elemento = novoElemento("div", "barreira");

    const borda = novoElemento("div", "borda");
    const corpo = novoElemento("div", "corpo");
    
    this.elemento.appendChild(reserva ? corpo : borda);
    this.elemento.appendChild(reserva ? borda : corpo);

    this.setAltura = altura => corpo.style.height = `${altura}px`;
}


function ParDeBarreiras(altura, abertura, x) {
    this.elemento = novoElemento("div", "par-de-barreiras");

    this.superior = new Barreira(true);
    this.inferior = new Barreira(false);

    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura);
        const alturaInferior = altura - abertura - alturaSuperior;
        this.superior.setAltura(alturaSuperior);
        this.inferior.setAltura(alturaInferior);
    };

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0]);
    this.setX = x => this.elemento.style.left = `${x}px`;
    this.getLargura = () => this.elemento.clientWidth;

    this.sortearAbertura();
    this.setX(x);
}


function Barreiras(altura, largura, abertura, espaco, notificarPonto) {

    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3),
    ];

    const deslocamento = 3;

    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento);
            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length);
                par.sortearAbertura();
            }

            const meio = largura / 2;
            const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio;
            if(cruzouOMeio) notificarPonto();
        });
    };

    this.resetar = () => {
        this.pares.forEach((par, i) => {
            par.setX(largura + espaco * i);
            par.sortearAbertura();
        });
    };

}

function Passaro(alturaJogo) {
    let voando = false;
    let jogoAtivo = false;

    this.elemento = novoElemento("img", "passaro");
    this.elemento.src = "imagens/passaro.png";

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0]);
    this.setY = y => this.elemento.style.bottom = `${y}px`;

    this.ativar = () => {
        jogoAtivo = true;
        window.onkeydown = e => {
            if (jogoAtivo) voando = true;
        };
        window.onkeyup = e => {
            if (jogoAtivo) voando = false;
        };
    };

    this.desativar = () => {
        jogoAtivo = false;
        voando = false;
        window.onkeydown = null;
        window.onkeyup = null;
    };

    this.animar = () => {
        if (!jogoAtivo) return;
        
        const novoY = this.getY() + (voando ? 8 : -5);
        const alturaMaxima = alturaJogo - this.elemento.clientHeight;

        if (novoY <= 0) {
            this.setY(0);
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima);
        } else {
            this.setY(novoY);
        }
    };

    this.resetar = () => {
        this.setY(alturaJogo / 2);
        voando = false;
    };

    this.setY(alturaJogo / 2);
}

function Progresso() {
    this.elemento = novoElemento("div", "progresso");
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos;
    };
    this.atualizarPontos(0);
}

function estaoSobrepostos(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect();
    const b = elementoB.getBoundingClientRect();

    const horizontal = a.left + a.width >= b.left 
    && b.left + b.width >= a.left;
    const vertical = a.top + a.height >= b.top 
    && b.top + b.height >= a.top;

    return horizontal && vertical;
}

function colidiu(passaro, barreiras) {
    let colidiu = false;

    barreiras.pares.forEach(ParDeBarreiras => {
        if(!colidiu) {
            const superior = ParDeBarreiras.superior.elemento;
            const inferior = ParDeBarreiras.inferior.elemento;
            colidiu = estaoSobrepostos(passaro.elemento, superior)
            || estaoSobrepostos(passaro.elemento, inferior);
        }
    });
    return colidiu;
}

function FlappyBird() {
    let pontos = 0;
    let temporizador = null;
    let telaReiniciarAtual = null;

    const areaDeJogo = document.querySelector("[wm-flappy]");
    const altura = areaDeJogo.clientHeight;
    const largura = areaDeJogo.clientWidth;

    const progresso = new Progresso(); 
    const barreiras = new Barreiras(altura, largura, 200, 400, () => {
        progresso.atualizarPontos(++pontos);
    });
    const passaro = new Passaro(altura);

    const telaIniciar = new TelaOverlay("iniciar");

    areaDeJogo.appendChild(progresso.elemento);
    areaDeJogo.appendChild(passaro.elemento);
    barreiras.pares.forEach(par => areaDeJogo.appendChild(par.elemento));
    areaDeJogo.appendChild(telaIniciar.elemento);

    const iniciarJogo = () => {
        telaIniciar.esconder();
        if (telaReiniciarAtual) {
            telaReiniciarAtual.esconder();
        }
        passaro.ativar();
        
        temporizador = setInterval(() => {
            barreiras.animar();
            passaro.animar();

            if (colidiu(passaro, barreiras)) {
                clearInterval(temporizador);
                passaro.desativar();
                
                if (telaReiniciarAtual) {
                    areaDeJogo.removeChild(telaReiniciarAtual.elemento);
                }
                
                telaReiniciarAtual = new TelaOverlay("reiniciar", pontos);
                areaDeJogo.appendChild(telaReiniciarAtual.elemento);
                telaReiniciarAtual.onClick(reiniciarJogo);
                telaReiniciarAtual.mostrar();
            }
            
        }, 20);
    };

    const reiniciarJogo = () => {
        pontos = 0;
        progresso.atualizarPontos(0);
        
        passaro.resetar();
        barreiras.resetar();
        
        iniciarJogo();
    };

    telaIniciar.onClick(iniciarJogo);

    telaIniciar.mostrar();
}

new FlappyBird();