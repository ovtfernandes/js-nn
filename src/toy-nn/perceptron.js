// activation function
function sign(n) {
    return n >= 0 ? 1 : -1;
}

function Perceptron (n) {
    const weights = [];
    const learningRate = 0.01;

    for (let i=0; i<n; i++) {
        weights[i] = Math.random()*2 - 1;
    }

    function guess(inputs) {
        const sum = weights.reduce(
            (curSum, weight, index) => curSum + (weight * inputs[index])
        , 0);

        const output = sign(sum);

        return output;
    }

    function train(inputs, target) {
        const output = guess(inputs);
        const error = target - output;

        // tune all the weights
        inputs.forEach((input, i) => {
            weights[i] += error * input * learningRate;
        });
    }

    function guessY(x) {
        const [w0, w1, w2] = weights;
        return -(w2/w1) - (w0/w1) * x;
    }

    return {
        guess,
        train,
        guessY,
    };
};