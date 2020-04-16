// https://www.youtube.com/watch?v=XJ7HLz9VYz0&list=PLRqwX-V7Uu6aCibgK1PTWWu9by6XFdCfh

let neuron;
const points = [];

let p1, p2;

let trainingIndex = 0;

function setup() {
    createCanvas(600, 600);

    neuron = Perceptron(3);

    for (let i=0; i<100; i++) {
        points[i] = Point();
    }

    p1 = Point(-1, f(-1));
    p2 = Point(1, f(1));
}

function draw() {
    background(255);
    stroke(0);

    line(p1.pixelX, p1.pixelY, p2.pixelX, p2.pixelY);

    const p3 = Point(-1, neuron.guessY(-1));
    const p4 = Point(1, neuron.guessY(1));

    line(p3.pixelX, p3.pixelY, p4.pixelX, p4.pixelY);

    //line(0,height, width, 0);
    points.map(p => p.show());

    points.forEach(p => {
        const { x, y, bias, label } = p;
        const guess = neuron.guess([x, y, bias]);
        (guess === label) ? fill(0,255,0) : fill(255,0,0);
        noStroke();
        ellipse(p.pixelX, p.pixelY, 8, 8);
    });

    // const trainingPoint = points[trainingIndex];
    // const { x, y, bias, label } = trainingPoint;
    // neuron.train([x, y, bias], label);
    // trainingIndex = (trainingIndex + 1) % points.length;
}

// function mousePressed() {
//     points.forEach(p => {
//         const { x, y, bias, label } = p;
//         neuron.train([x, y, bias], label);
//     });
// }