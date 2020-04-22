let model;
let targetLabel = 'C';

let state = 'collection';

let env, wave;

const notes = {
    C: 261.6256,
    D: 293.6648,
    E: 329.6276,
    F: 349.2282,
    G: 391.9954,
    A: 440.0000,
    B: 493.8833,
};

let dataInput, modelInput;

function setup() {
    createCanvas(400, 400);
    background(200);

    dataInput = createInput('', 'file');
    dataInput.input(loadData);

    modelInput = createInput('', 'file');
    modelInput.attribute('multiple', 'true');
    modelInput.input(loadTrainedModel);

    env = new p5.Envelope();
    env.setADSR(0.05, 0.1, 0.5, 1);
    env.setRange(1.2, 0);

    wave = new p5.Oscillator();

    wave.setType('sine');
    wave.start();
    wave.freq(440);
    wave.amp(env);

    const options = {
        inputs: [ 'x', 'y' ],
        outputs: [ 'frequency' ],
        task: 'regression',
        debug: 'true',
    };

    model = ml5.neuralNetwork(options);
}

function keyPressed() {
    if (key.toLowerCase() === 't') {
        train();
    }
    else if (key.toLowerCase() === 's') {
        model.saveData('mouse-freqs');
    }
    else if (key.toLowerCase() === 'm') {
        model.save();
    }
    else if (key.toLowerCase() === 'p') {
        mousePressed();
    }
    else {
        targetLabel = key.toUpperCase();
    }
}

function mousePressed() {
    const input = {
        x: mouseX,
        y: mouseY,
    };

    if (state === 'collection') {
        const targetFrequency = notes[targetLabel];
        const target = {
            frequency: targetFrequency,
        };
        model.addData(input, target);

        drawCircle(null, null, targetLabel);

        wave.freq(targetFrequency);
        env.play();
    }
    else if (state === 'prediction') {
        model.predict(input, gotResults);
    }
}

function drawCircle(pos, color, label) {
    const [x, y] = pos || [mouseX, mouseY];
    stroke(0);
    if (!color) {
        noFill();
    }
    else {
        fill(color);
    }
    ellipse(x, y, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(label, x, y);
}

function whileTraining(epoch, loss) {
    console.log(epoch);
}

function finishedTraining() {
    console.log('finished training');
    state = 'prediction';
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return ;
    }

    drawCircle(null, [0, 0, 255, 100], floor(results[0].value));

    wave.freq(results[0].value);
    env.play();
}

function loadData(event) {
    model.loadData(event.target.files, dataLoaded);
}

function dataLoaded() {
    model.data.data.raw.forEach(({ xs: input, ys: target }) => {
        drawCircle([input.x, input.y], null, target.label);
    });

    train();
}

function train() {
    state = 'training';
    console.log('starting training');
    model.normalizeData();
    const options = {
        epochs: 50,
    };
    model.train(options, whileTraining, finishedTraining);
}

function loadTrainedModel(event) {
    model.load(event.target.files, modelLoaded);
}

function modelLoaded() {
    console.log('model loaded');
    state = 'prediction';
}