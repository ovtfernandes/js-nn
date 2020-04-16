function f(x) {
    // y = ax + b
    return (0.89 * x) - 0.1;
}

function Point (x, y) {

    if (!x) x = Math.random() * 2 - 1;
    if (!y) y = Math.random() * 2 - 1;
    const bias = 1;
    const label = y > f(x) ? 1 : -1;
    const pixelX = map(x, -1, 1, 0, width);
    const pixelY = map(y, -1, 1, height, 0);

    function show() {
        stroke(0);
        fill(label === 1 ? 255 : 0);
        ellipse(pixelX, pixelY, 16, 16);
    }

    return {
        x,
        y,
        bias,
        label,
        pixelX,
        pixelY,
        show,
    };
}