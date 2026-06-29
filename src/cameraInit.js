export function cameraInit(mapWidth, mapHeight) {
    onUpdate(() => {
        const zoom = getCamScale().x;

        // Вычисляем реальный размер видимой области с учетом зума
        const viewWidth = width() / zoom;
        const viewHeight = height() / zoom;

        const minX = viewWidth / 2;
        const maxX = mapWidth - viewWidth / 2;
        const minY = viewHeight / 2;
        const maxY = mapHeight - viewHeight / 2;

        const player = get('player')[0]

        const clampedX = clamp(player.pos.x, minX, maxX);
        const clampedY = clamp(player.pos.y, minY, maxY);

        setCamPos(clampedX, clampedY);
    })

    setCamScale(2)
}