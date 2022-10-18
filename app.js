document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const width = 10;

  // the tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetronimo = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1]
  ];

  const tTetronimo = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetronimo = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetronimo = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theTetrominoes = [lTetromino, zTetronimo, tTetronimo, oTetronimo, iTetronimo];

  let currentPosition = 4;
  let currentRotation = 0;

  // select a random tetromino
  let random = Math.floor(Math.random() * theTetrominoes.length);
  console.log(random);
  let current = theTetrominoes[random][currentRotation];

  // draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
    })
  }

  // undraw the lTetromino
  function unDraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
    })
  }

  // move the Tetromino down each second
  timerId = setInterval(moveDown, 1000);

  // assign functions to keyCodes
  function control(e) {
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        rotate();
        break;
      case 39:
        moveRight();
        break;
      case 40:
        moveDown();
        break;
    }
  }
  document.addEventListener('keydown', control);

  // move down function
  function moveDown() {
    unDraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));

      //start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();

    }
  }

  // move the tetromino left, unless at the edge or there is a blockage
  function moveLeft() {
    unDraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }

  // move the tetromino right, unless at the edge or there is a blockage
  function moveRight() {
    unDraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === 9);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

  // rotate the tetromino
  function rotate() {
    unDraw();
    currentRotation = (currentRotation + 1) % 4;
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentRotation -= 1;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }





















})