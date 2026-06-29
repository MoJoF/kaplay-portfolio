import kaplay from 'kaplay';
import { cameraInit } from './cameraInit'

kaplay({
  width: window.innerWidth,
  height: window.innerHeight,
  background: '#121212',
  canvas: document.getElementById('kaplay-canvas'),
  pixelDensity: 1,
  texFilter: 'nearest',
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
loadSprite('bed', '/textures/bed.png')


scene("game", () => {
  add([
    rect(width(), height()),
    color(18, 18, 18),
    pos(0, 0),
    "bg"
  ])

  let currentObj = ""
  let isMoving = true

  const startCoords = vec2(150, 128);
  const size = { width: 64, height: 64 };

  const mapLayout = [
    "eeeeeeeeeeeeeeee",
    ">vvvvvvvvvvvvvve",
    ">11111111111111<",
    ">111111111111112",
    ">111111111111112",
    ">111111111111112",
    ">11111111111111<",
    "e^^^^^^^^^^^^^^e",
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
      "2": () => [
        sprite('room_floor'),
        area({ shape: new Rect(vec2(size.width * 0.5, 0), size.width * 0.5, size.height) }),
        "to_next_scene",
      ],
    }
  })

  const mapWidth = Math.max(...mapLayout.map(row => row.length)) * size.width;
  const mapHeight = mapLayout.length * size.height;

  const playerWidth = 48
  const playerHeight = 64
  const player = add([
    rect(playerWidth, playerHeight),
    color('#39a639'),
    pos(startCoords.x + playerWidth / 4 * 3 + size.width, startCoords.y),
    body(),
    z(10),
    area({ shape: new Rect(vec2(-(playerWidth * 0.125), playerHeight * 0.35), playerWidth + playerWidth * 0.25, playerHeight * 0.65) }),
    "player"
  ])

  add([
    sprite('bed'),
    area(),
    body({ isStatic: true }),
    pos(70, 90),
    scale(1.5),
    "bed"
  ])

  onKeyPress('z', () => {
    switch (currentObj) {
      case 'bed':
        debug.log('Bed...')
        break;

      default:
        break;
    }
  })

  onCollide("player", "bed", (player, zone) => currentObj = 'bed')
  onCollideEnd("player", "bed", (player, zone) => currentObj = "")

  onCollide("player", "to_next_scene", (player, zone) => debug.log('Collide...'))

  const speed = 5

  player.onKeyDown("left", () => {
    if (isMoving) player.move(-64 * speed, 0);
  })

  player.onKeyDown("right", () => {
    if (isMoving) player.move(64 * speed, 0);
  })

  player.onKeyDown("up", () => {
    if (isMoving) player.move(0, -64 * speed);
  })

  player.onKeyDown("down", () => {
    if (isMoving) player.move(0, 64 * speed);
  })

  cameraInit(mapWidth, mapHeight)
})

go("game");