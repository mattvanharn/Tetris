document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  let preview = Array.from(document.querySelectorAll('.preview div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const width = 10;
  const previewWidth = 4;
  let previewIndex = 0;
  let nextRandom = 0;

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

  // the preview tetrominoes
  const previewLTetromino =
    [1, previewWidth + 1, previewWidth * 2 + 1, 2]

  const previewZTetronimo =
    [previewWidth + 1, previewWidth + 2, previewWidth * 2, previewWidth * 2 + 1]

  const previewTTetronimo =
    [1, previewWidth, previewWidth + 1, previewWidth + 2]

  const previewOTetronimo =
    [0, 1, previewWidth, previewWidth + 1]

  const previewITetronimo =
    [1, previewWidth + 1, previewWidth * 2 + 1, previewWidth * 3 + 1]

  const theTetrominoes = [lTetromino, zTetronimo, tTetronimo, oTetronimo, iTetronimo];
  const thePreviewTetronimoes = [previewLTetromino, previewZTetronimo, previewTTetronimo, previewOTetronimo, previewITetronimo];

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

  // undraw the Tetromino
  function unDraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
    })
  }

  // draw the preview
  function drawPreview() {
    preview.forEach(square => {
      square.classList.remove('tetromino');
    });
    thePreviewTetronimoes[nextRandom].forEach(index => {
      preview[previewIndex + index].classList.add('tetromino');
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

      // start a new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      drawPreview();
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
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

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
    while (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentRotation -= 1;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }























})