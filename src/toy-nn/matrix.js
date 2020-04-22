class Matrix {
    constructor (rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];
        for (let i=0; i<rows; i++) {
            let arr = [];
            for (let j=0; j<cols; j++) {
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    static arrayToMatrix(arr) {
        let matrix = new Matrix(arr.length, 1);

        return matrix.map((elem, i, j) => arr[i]);
    }

    static matrixToArray(matrix) {
        let arr = [];
        matrix.map((elem, i, j) => arr.push(elem));

        return arr;
    }

    printTable() {
        console.table(this.data);
    }

    print() {
        this.data.map(arr => console.log(`[${arr.join(' ')}]`));
    }

    randomize() {
        this.map((elem, i, j) => Math.random()*2 - 1);
    }

    map(func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => func(num, i, j));
        });

        return this;
    }

    static map(A, func) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.data = A.data.map((arr, i) => {
            return arr.map((num, j) => func(num, i, j));
        });

        return matrix;
    }

    static transpose(A) {
        let matrix = new Matrix(A.cols, A.rows);

        return matrix.map((elem, i, j) => A.data[j][i]);
    }

    // Static operations Matrix x Scalar

    static scalar_multiply (A, scalar) {
        let matrix = new Matrix(A.rows, A.cols);
        
        return matrix.map((elem, i, j) => (A.data[i][j] * scalar));
    }


    // Static opeartions Matrix x Matrix

    static hadamard (A, B) {
        let matrix = new Matrix(A.rows, A.cols);
        
        return matrix.map((elem, i, j) => (A.data[i][j] * B.data[i][j]));
    }

    static add (A, B) {
        let matrix = new Matrix(A.rows, A.cols);
        
        return matrix.map((elem, i, j) => (A.data[i][j] + B.data[i][j]));
    }

    static subtract (A, B) {
        let matrix = new Matrix(A.rows, A.cols);
        
        return matrix.map((elem, i, j) => (A.data[i][j] - B.data[i][j]));
    }

    static multiply (A, B) {
        let matrix = new Matrix(A.rows, B.cols);

        return matrix.map((elem, i, j) => (
            B.data.reduce((sum, bRow, k) => {
                return sum + (A.data[i][k] * bRow[j]);
            }, 0)
        ));
    }
}