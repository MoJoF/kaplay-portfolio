import kaplay from 'kaplay';

kaplay({
  width: window.innerWidth,
  height: window.innerHeight,
  background: '#121212',
  canvas: document.getElementById('kaplay-canvas'),
  pixelDensity: 2,
  texFilter: 'linear',
  global: true,
  debug: true,
  debugKey: 'r',
  crisp: true,
});

scene("game", () => {
  add([
    rect(width(), height()),
    color(18, 18, 18),
    pos(0, 0),
    "bg"
  ])

  const startCoords = vec2(200, 300);
  const size = { width: 64, height: 64 };
  const grid = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        add([
          rect(size.width, size.height),
          color('#953865'),
          pos(vec2(startCoords.x + x * size.width, startCoords.y + y * size.height)),
          outline(1, new Color(255, 255, 255)),
        ])
      }
    })
  })

  const person = add([
    rect(16, 32),
    color('#00FF00'),
    pos(startCoords.x + 32, startCoords.y + 32),
    body(),
    "person"
  ])

  person.onKeyPress("left", () => {
    person.move(-16, 0);
  })

  person.onKeyPress("right", () => {
    person.move(16, 0);
  })

  person.onKeyPress("up", () => {
    person.move(0, -16);
  })

  person.onKeyPress("down", () => {
    person.move(0, 16);
  })  
})

go("game");