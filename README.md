# Flappy Bird

Um clone do famoso jogo Flappy Bird desenvolvido em JavaScript puro, HTML e CSS.

## Sobre o Projeto

Este é um clone fiel do clássico jogo Flappy Bird, onde o jogador controla um pássaro que deve voar através de obstáculos (canos) sem colidir. O objetivo é conseguir a maior pontuação possível.

## 🎮 Jogar Online

Você pode jogar o jogo diretamente no seu navegador através do link:
**[https://alonsorafael.github.io/Flappy_Bird/flappy.html](https://alonsorafael.github.io/Flappy_Bird/flappy.html)**

## 🎮 Como Jogar

### Controles

- **Teclado**: Pressione qualquer tecla para fazer o pássaro voar
- **Mouse**: Clique e segure qualquer botão do mouse para fazer o pássaro voar
- Solte a tecla/botão para fazer o pássaro cair

### Objetivo

- Passe pelos canos sem colidir
- Cada cano ultrapassado = 1 ponto
- Tente bater seu recorde!

## Como Executar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/AlonsoRafael/Flappy_Bird.git
   cd Flappy_Bird
   ```

2. **Abra o jogo:**

   - Abra o arquivo `flappy.html` em qualquer navegador moderno
   - Ou use um servidor local (recomendado):

   ```bash
   # Com Python 3
   python -m http.server 8000

   # Com Node.js (http-server)
   npx http-server
   ```

3. **Divirta-se jogando!** 🎉

## Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização e animações
- **JavaScript (ES6)**: Lógica do jogo e interatividade
- **Canvas**: Não utilizado - jogo feito com DOM manipulation

## Estrutura do Projeto

```
Flappy_Bird/
├── flappy.html          # Arquivo principal HTML
├── flappy.js            # Lógica principal do jogo
├── css/
│   ├── flappy.css       # Estilos específicos do jogo
│   └── estilo.css       # Estilos gerais
├── fonts/
│   ├── Pixel.ttf        # Fonte pixelizada para o jogo
│   └── Oswald-Regular.ttf
├── imagens/
│   └── passaro.png      # Sprite do pássaro
└── README.md            # Este arquivo
```

## Funcionalidades

- Sistema de início e reinício do jogo
- Controle por teclado e mouse
- Sistema de pontuação
- Detecção de colisão
- Animações suaves
- Interface responsiva
- Telas de overlay (início/game over)
- Prevenção de seleção indesejada de elementos

## Características Técnicas

- **Orientação a Objetos**: Código organizado em classes/funções construtoras
- **DOM Manipulation**: Criação dinâmica de elementos
- **Event Handling**: Controle por teclado e mouse
- **CSS Animations**: Transições suaves e efeitos visuais
- **Responsive Design**: Interface adaptável
- **Collision Detection**: Sistema de detecção de colisão preciso

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👨‍💻 Autor

**Rafael Alonso** - [AlonsoRafael](https://github.com/AlonsoRafael)

## 🎮 Screenshots

_Tela de Início_

- Interface limpa com botão de play centralizado

_Gameplay_

- Pássaro navegando entre os canos
- Contador de pontuação no canto superior direito

_Game Over_

- Tela com pontuação final e opção de reiniciar

---

⭐ **Se você gostou do projeto, não esqueça de dar uma estrela!** ⭐

---

_Inspirado no clássico Flappy Bird de Dong Nguyen_
