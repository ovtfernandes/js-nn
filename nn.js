function sigmoid(x) {
    return 1/(1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x*(1-x);
}

class NeuralNetwork {
    constructor (input_nodes, hidden_nodes, output_nodes, learning_rate) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.bias_ih = new Matrix(hidden_nodes, 1);
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(output_nodes, 1);
        this.bias_ho.randomize();

        this.weights_ih = new Matrix(hidden_nodes, input_nodes);
        this.weights_ih.randomize();

        this.weights_ho = new Matrix(output_nodes, hidden_nodes);
        this.weights_ho.randomize();

        this.learning_rate = learning_rate || 0.1;
    }

    train(input_array, target_array) {
        // FEEDFORWARD
        let [inputs, hidden, outputs] = this.feedForward(input_array);


        // BACKPROPAGATION
        let targets = Matrix.arrayToMatrix(target_array);

        // calculate output errors
        let output_errors = Matrix.subtract(targets, outputs);

        // calculate output gradient
        let output_gradient = Matrix.map(outputs, dsigmoid);
        output_gradient = Matrix.hadamard(output_gradient, output_errors);
        output_gradient = Matrix.scalar_multiply(output_gradient, this.learning_rate);

        // calculate output deltas
        let hidden_t = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(output_gradient, hidden_t);

        // adjust the weights by deltas
        this.weights_ho = Matrix.add(this.weights_ho, weights_ho_deltas);
        // adjust the bias by its deltas (which is just the gradient)
        this.bias_ho = Matrix.add(this.bias_ho, output_gradient);
        

        // calculate hidden errors
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);

        // calculate hidden gradient
        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient = Matrix.hadamard(hidden_gradient, hidden_errors);
        hidden_gradient = Matrix.scalar_multiply(hidden_gradient, this.learning_rate);

        // calculate hidden deltas
        let inputs_t = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_t);

        // adjust the weights by deltas
        this.weights_ih = Matrix.add(this.weights_ih, weights_ih_deltas);
        // adjust the bias by its deltas (which is just the gradient)
        this.bias_ih = Matrix.add(this.bias_ih, hidden_gradient);
    }

    feedForward(input_array) {
        // input -> hidden
        let inputs = Matrix.arrayToMatrix(input_array);

        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden = Matrix.map(hidden, sigmoid);
        
        // hidden -> output
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs = Matrix.add(outputs, this.bias_ho);
        outputs = Matrix.map(outputs, sigmoid);
        
        return [inputs, hidden, outputs];
    }

    predict(input_array) {
        const [inputs, hidden, outputs] = this.feedForward(input_array);

        return Matrix.matrixToArray(outputs);
    }
}