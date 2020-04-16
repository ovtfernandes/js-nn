let training_data = [
    {
        inputs: [0, 1],
        targets: [1]
    },
    {
        inputs: [1, 0],
        targets: [1]
    },
    {
        inputs: [0, 0],
        targets: [0]
    },
    {
        inputs: [1, 1],
        targets: [0]
    },
];

let nn;

function setup() {
    createCanvas(400,400);
    nn = new NeuralNetwork(2, 2, 1);
    
    // for (let i=0; i<50000; i++) {
    //     const data = random(training_data);
    //     nn.train(data.inputs, data.targets);
    // }

    // console.log(nn.predict([1, 0]));
    // console.log(nn.predict([0, 1]));
    // console.log(nn.predict([0, 0]));
    // console.log(nn.predict([1, 1]));
}

function draw() {
    background(0);

    for (let i=0; i<1000; i++) {
        const data = random(training_data);
        nn.train(data.inputs, data.targets);
    }

    const res = 10;
    const cols = width / res;
    const rows = height / res;

    for (let i=0; i<cols; i++) {
        for (let j=0; j<rows; j++) {
            const x1 = i / cols;
            const x2 = j / rows;
            const inputs = [x1, x2];
            const y = nn.predict(inputs);

            noStroke();
            fill(y * 255);
            rect(i*res, j*res, res, res);
        }
    }
}