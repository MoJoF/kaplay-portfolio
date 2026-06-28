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

  const mapLayout = [
    "0000000000000000000000000000000",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0111111111111111111111111111110",
    "0000000000000000000000000000000",
  ]

  const level = addLevel(mapLayout, {
    tileWidth: size.width,
    tileHeight: size.height,
    tiles: {
      "0": () => [
        rect(size.width, size.height),
        color('#121212'),
        outline(1, new Color(255, 255, 255)),
        area(),
        body({ isStatic: true }),
      ],
      "1": () => [
        rect(size.width, size.height),
        color('#6f3652'),
      ]
    }
  })

  const mapWidth = Math.max(...mapLayout.map(row => row.length)) * size.width;
  const mapHeight = mapLayout.length * size.height;


  const personWidth = 96
  const personHeight = 128
  const person = add([
    rect(personWidth, personHeight),
    color('#39a639'),
    pos(startCoords.x + personWidth / 4 * 3 + size.width, startCoords.y),
    body(),
    area(),
    "person"
  ])

  const speed = 10

  person.onKeyDown("left", () => {
    person.move(-64 * speed, 0);
  })

  person.onKeyDown("right", () => {
    person.move(64 * speed, 0);
  })

  person.onKeyDown("up", () => {
    person.move(0, -64 * speed);
  })

  person.onKeyDown("down", () => {
    person.move(0, 64 * speed);
  })

  onUpdate(() => {
    const minX = width() / 2;
    const maxX = mapWidth - width() / 2;
    const minY = height() / 2;
    const maxY = mapHeight - height() / 2;

    const clampedX = clamp(person.pos.x, minX, maxX);
    const clampedY = clamp(person.pos.y, minY, maxY);

    setCamPos(clampedX, clampedY);
  })
})

go("game");