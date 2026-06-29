import kaplay from 'kaplay';

kaplay({
  width: window.innerWidth,
  height: window.innerHeight,
  background: '#121212',
  canvas: document.getElementById('kaplay-canvas'),
  pixelDensity: 1,
  texFilter: 'linear',
  global: true,
  debug: true,
  debugKey: 'r',
  crisp: true,
});

loadSprite('room_floor', '/textures/floor.png')
loadSprite('room_wall', '/textures/wall.png')
loadSprite('room_wall_left', '/textures/wall-left.png')
loadSprite('room_wall_right', '/textures/wall-right.png')
loadSprite('room_wall_down', '/textures/wall-down.png')
loadSprite('room_wall_empty', '/textures/wall-empty.png')

scene("game", () => {
  add([
    rect(width(), height()),
    color(18, 18, 18),
    pos(0, 0),
    "bg"
  ])

  const startCoords = vec2(150, 128);
  const size = { width: 64, height: 64 };

  const mapLayout = [
    "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "evvvvvvvvvvvvvvvvvvvvvvvvvvvvve",
    ">11111111111111111111111111111<",
    ">111111111111111111111111111111",
    ">111111111111111111111111111111",
    ">111111111111111111111111111111",
    ">11111111111111111111111111111<",
    "e^^^^^^^^^^^^^^^^^^^^^^^^^^^^^e",
  ]

  const level = addLevel(mapLayout, {
    tileWidth: size.width,
    tileHeight: size.height,
    tiles: {
      "0": () => [
        sprite('room_wall'),
        area(),
        body({ isStatic: true }),
      ],
      "v": () => [
        sprite('room_wall'),
        area({ shape: new Rect(vec2(0, 0), size.width, size.height * 0.75) }),
        body({ isStatic: true }),
      ],
      ">": () => [
        sprite('room_wall_left'),
        area(),
        body({ isStatic: true }),
      ],
      "<": () => [
        sprite('room_wall_right'),
        area(),
        body({ isStatic: true }),
      ],
      "^": () => [
        sprite('room_wall_down'),
        area(),
        body({ isStatic: true }),
      ],
      "e": () => [
        sprite('room_wall_empty'),
        area(),
        body({ isStatic: true }),
      ],
      "1": () => [
        sprite('room_floor'),
      ],
    }
  })

  const mapWidth = Math.max(...mapLayout.map(row => row.length)) * size.width;
  const mapHeight = mapLayout.length * size.height;

  const personWidth = 48
  const personHeight = 64
  const person = add([
    rect(personWidth, personHeight),
    color('#39a639'),
    pos(startCoords.x + personWidth / 4 * 3 + size.width, startCoords.y),
    body(),
    area(),
    "person"
  ])

  const speed = 5

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
    const zoom = getCamScale().x;

    // Вычисляем реальный размер видимой области с учетом зума
    const viewWidth = width() / zoom;
    const viewHeight = height() / zoom;

    // Рассчитываем корректные границы для центра камеры
    const minX = viewWidth / 2;
    const maxX = mapWidth - viewWidth / 2;
    const minY = viewHeight / 2;
    const maxY = mapHeight - viewHeight / 2;

    // Ограничиваем координаты игрока по новым границам
    const clampedX = clamp(person.pos.x, minX, maxX);
    const clampedY = clamp(person.pos.y, minY, maxY);

    // Мгновенно перемещаем камеру без задержек
    setCamPos(clampedX, clampedY);
  })

  setCamScale(2)
})

go("game");