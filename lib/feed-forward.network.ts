import { AlgorithmPlugin, PluginOptions, PluginInputs, Option, NumberOption, CheckboxOption, PluginDataInput, PluginData, CommandOption, TextOption, Matrix, RecorderService } from 'data-science-lab-core';

interface FeedForwardNetworkData {
    learningRate: number;
    layers: number[];
    regularization: boolean;
    lambda: number;
    labels: number[];
    input: number[][];
    output: number[];
    m: number;
    n: number;
    batchSize: number;
    thetas: Matrix.Matrix[];
};

export class FeedForwardNetwork extends AlgorithmPlugin {
    options: FeedForwardNetworkPluginOptions;
    inputs: FeedForwardNetworkPluginInputs;
    data: FeedForwardNetworkData;
    recorder?: RecorderService;

    constructor() {
        super();
        this.options = new FeedForwardNetworkPluginOptions(this);
        this.inputs = new FeedForwardNetworkPluginInputs(this);
        this.data = { learningRate: 0.1, regularization: false, lambda: 0.5, batchSize: 32 } as FeedForwardNetworkData;
    }

    finishTraining() {
        return false;
    }

    setRecorderService(recorder: RecorderService) {
        this.recorder = recorder;
    }

    initialize() {
        const initial_elipsion = 0.01;
        const func = () => Math.random() * 2.0 * initial_elipsion - initial_elipsion;
        this.data.thetas = this.data.layers.map((value, index) => {
            if (index === 0) {
                return Matrix.construct(value, this.data.n + 1, () => func());
            }
            return Matrix.construct(value, this.data.layers[index - 1] + 1, () => func());
        });
        this.data.thetas.push(Matrix.construct(this.data.labels.length, this.data.layers[this.data.layers.length - 1] + 1, func));
        // console.log('thetas', ...this.data.thetas);
    }

    sigmoid(m: Matrix.Matrix): Matrix.Matrix {
        return Matrix.map(Matrix.multiply(m, -1.0), (value) => {
            return 1.0 / (1.0 + Math.exp(value));
        });
    }

    sigmoidGradient(m: Matrix.Matrix): Matrix.Matrix {
        return Matrix.columnMultiply(this.sigmoid(m), this.subtract(1.0, this.sigmoid(m)));
    }

    log(m: Matrix.Matrix): Matrix.Matrix {
        return Matrix.map(m, (value) => {
            return Math.log(value);
        });
    }

    subtract(lhs: number, m: Matrix.Matrix) {
        return Matrix.map(m, (value) => {
            return lhs - value;
        });
    }

    async export(minimum: boolean): Promise<string> {
        if (minimum) {
            return JSON.stringify({
                thetas: this.data.thetas,
                labels: this.data.labels,
                m: this.data.m,
                n: this.data.n,
                layers: this.data.layers,
            })
        } else {
            return JSON.stringify(this.data);
        }
    }

    async import(json: string, _: boolean): Promise<FeedForwardNetwork> {
        const data = JSON.parse(json) as FeedForwardNetworkData;
        this.data = data;
        return this;
    }

    getInputs() {
        return this.inputs;
    }

    getOptions() {
        return this.options;
    }

    test(argument: {
        [id: string]: any[];
    }): { [id: string]: any[] } {
        const argumentInput = argument['input'] as number[][];
        let a = Matrix.transpose(Matrix.make([[1, ...argumentInput[0]]]));
        let z = Matrix.multiply(this.data.thetas[0], a);
        for (let i = 1; i <= this.data.layers.length; ++i) {
            a = Matrix.make([[1]].concat(this.sigmoid(z).data)); 
            z = Matrix.multiply(this.data.thetas[i], a);
            // console.log(a);
        }
        
        a = this.sigmoid(z);
        // console.log(a);
        let maxIndex = 0;
        for (let i = 1; i < a.rows; ++i) {
            if (a.data[i][0] > a.data[maxIndex][0]) {
                maxIndex = i;
            }
        }

        return {
            'output': [this.data.labels[maxIndex]]
        }
    }

    async step() {
        let cost = 0;
        let deltas = this.data.thetas.map((value) => Matrix.zeros(value.rows, value.columns));
        //deltas = [T0, T1, T2, T3];
        for (let bi = 0; bi < this.data.batchSize; ++bi) {
            let mi = Math.floor(Math.random() * this.data.m);
            // console.log('example', mi, this.data.input[mi]);
            let zs: Matrix.Matrix[] = [];
            let as: Matrix.Matrix[] = [];

            let a = Matrix.transpose(Matrix.make([[1, ...this.data.input[mi]]])); // a1: 4x1
            
            let z = Matrix.multiply(this.data.thetas[0], a); // z2: 5x1
            zs.push(z); // zs = [z2]
            as.push(a); // as = [a1]
            for (let i = 1; i <= this.data.layers.length; ++i) {
                // i = 1, T1
                a = Matrix.make([[1]].concat(this.sigmoid(z).data)); // a2: 6x1
                z = Matrix.multiply(this.data.thetas[i], a); // z3: 8x1

                zs.push(z); // zs = [z2, z3]
                as.push(a); // as = [a1, a2]

                // i = 2, T2
                // a = Matrix.make(this.sigmoid(z).data.map((value) => [1, ...value])); // a3: 9x1
                // z = Matrix.multiply(this.data.thetas[i], a); // z4: 6x1
                // zs.push(z); // zs = [z2, z3, z4]
                // as.push(a); // as = [a1, a2, a3]

                // i = 3, T3
                // a = Matrix.make(this.sigmoid(z).data.map((value) => [1, ...value])); // a4: 7x1
                // z = Matrix.multiply(this.data.thetas[i], a); // z5: 10x1
                // zs.push(z); // zs = [z2, z3, z4, z5]
                // as.push(a); // as = [a1, a2, a3, a4]
            }
            let aLast = this.sigmoid(z); // a5: 10x1
            as.push(aLast); // as = [a1, a2, a3, a4, a5]
            // console.log('as', ...as);
            // console.log('zs', ...zs);
            let yi = Matrix.construct(this.data.labels.length, 1, (row) => {
                return this.data.output[mi] === this.data.labels[row] ? 1 : 0;
            });
            // console.log('yi', yi);

            const costLhs = Matrix.columnMultiply(Matrix.multiply(yi, -1), this.log(aLast));
            const costRhs = Matrix.columnMultiply(this.subtract(1.0, yi), this.log(this.subtract(1.0, aLast)));

            cost += Matrix.sum(Matrix.subtract(costLhs, costRhs)) / (bi + 1.0);

            // deltas = [T0, T1, T2, T3]
            // zs = [z2, z3, z4, z5]
            // as = [a1, a2, a3, a4, a5]

            let deltaTravel = Matrix.subtract(aLast, yi); // d5 = a5 - yi = 10x1
            deltas[deltas.length - 1] = Matrix.add(deltas[deltas.length - 1], // D3 or T3  
                Matrix.multiply(Matrix.multiply(deltaTravel, Matrix.transpose(as[deltas.length - 1])), 1.0 / (bi + 1))); 
                    // 10x7 + (10x1 * (a4)') = 10x7 + (10x1 * (7x1)') = 10x7 + 10x7 

            for (let i = deltas.length - 2; i >= 0; --i) {
                // i = 2, T2
                // console.log('delta', i, deltaTravel);
                const lhs = Matrix.multiply(Matrix.transpose(this.data.thetas[i + 1]), deltaTravel); // (10x7)' * (10x1) = 7x10 * 10x1 = 7x1
                // console.log('lhs', lhs);
                const rhs = Matrix.make([[0]].concat(this.sigmoidGradient(zs[i]).data)); // [0; z4] = [0;6x1] = 7x1
                // console.log('rhs', rhs, zs[i]);
                deltaTravel = Matrix.make(Matrix.columnMultiply(lhs, rhs).data.slice(1)); // filter(7x1 .* 7x1) = 6x1
                // console.log('deltaTravel', deltaTravel);

                deltas[i] = Matrix.add(deltas[i], Matrix.multiply(Matrix.multiply(deltaTravel, Matrix.transpose(as[i])), 1.0 / (bi + 1))); // (6x9) + (6x1) * (a3') = 6x9 + (6x1) * (9x1)' = 6x9

                // i = 1, T1
                // const lhs = Matrix.multiply(Matrix.transpose(this.data.thetas[i + 1]), deltaTravel); // (6x9)' * (6x1) = 9x6 * 6x1 = 9x1
                // const rhs = Matrix.make([[0]].concat(...this.sigmoidGradient(zs[i]).data)); // [0; z3] = [0;8x1] = 9x1
                // deltaTravel = Matrix.make(Matrix.columnMultiply(lhs, rhs).data.filter((_, index) => index !== 0)); // filter(9x1 .* 9x1) = 8x1

                // deltas[i] = Matrix.add(deltas[i], Matrix.multiply(deltaTravel, Matrix.transpose(as[i]))); // (8x6) + (8x1) * (a2') = 8x6 + (8x1) * (6x1)' = 8x6


                // i = 0, T0
                // const lhs = Matrix.multiply(Matrix.transpose(this.data.thetas[i + 1]), deltaTravel); // (8x6)' * (8x1) = 6x8 * 8x1 = 6x1
                // const rhs = Matrix.make([[0]].concat(...this.sigmoidGradient(zs[i]).data)); // [0; z2] = [0;5x1] = 6x1
                // deltaTravel = Matrix.make(Matrix.columnMultiply(lhs, rhs).data.filter((_, index) => index !== 0)); // filter(6x1 .* 6x1) = 5x1

                // deltas[i] = Matrix.add(deltas[i], Matrix.multiply(deltaTravel, Matrix.transpose(as[i]))); // (5x4) + (5x1) * (a1') = 5x4 + (5x1) * (4x1)' = 5x4
            }
            // console.log('deltas', ...deltas);
        }


        if (this.data.regularization) {
            const thetaRegs = this.data.thetas.map((value) => {
                const temp = Matrix.make(value.data.map((value) => value.slice(1)));
                return Matrix.sum(Matrix.hadamard(
                    temp,
                    temp));
            });
            const thetaReg = thetaRegs.reduce((curr, acc) => curr + acc);
            cost += (this.data.lambda / (2.0 * this.data.batchSize)) * thetaReg;

            for (let i = 0; i < this.data.thetas.length; ++i) {
                const gradient = Matrix.map(this.data.thetas[i], (value, row, column) => {
                    if (column === 0) {
                        return deltas[i].data[row][column];
                    } else {
                        return deltas[i].data[row][column] + (this.data.lambda / this.data.batchSize) * value;
                    }
                });
                this.data.thetas[i] = Matrix.subtract(this.data.thetas[i], Matrix.multiply(gradient, this.data.learningRate));
                // console.log('theta update', i, this.data.thetas[i]);
            }
        } else {
            for (let i = 0; i < this.data.thetas.length; ++i) {
                // const gradient = Matrix.multiply(deltas[i], 1.0 / this.data.m); 
                this.data.thetas[i] = Matrix.subtract(this.data.thetas[i], Matrix.multiply(deltas[i], this.data.learningRate));
                // console.log('theta update', i, this.data.thetas[i]);
            }
        }

        // console.log('cost', cost);
        this.recorder?.record([
            {
                label: `Cost`,
                value: cost,
                description: `The average difference between expected and actual output`
            }]
        );
    }

    getTestingInputs(): { input: PluginDataInput[], output?: PluginDataInput[] } {
        return {
            input: [
                {
                    id: 'input',
                    label: 'Testing Input Features',
                    min: 1,
                    max: 1,
                    type: 'number[]'
                }
            ],
            output: [
                {
                    id: 'output',
                    label: 'Testing Output Feature',
                    min: 1,
                    max: 1,
                    type: 'number'
                }
            ]
        }
    }

    setLearningRate(rate: number) {
        this.data.learningRate = rate;
    }

    setBatchSize(size: number) {
        this.data.batchSize = size;
    }

    setRegularization(regularization: boolean) {
        this.data.regularization = regularization;
    }

    setLayers(layers: number[]) {
        this.data.layers = layers;
    }

    setLambda(lambda: number) {
        this.data.lambda = lambda;
    }

    setLabels(labels: number[]) {
        const list = Array.from(new Set(labels));
        list.sort((a, b) => a - b);
        this.data.labels = list;
    }

    autoDetect(): number[] {
        const list = Array.from(new Set(this.data.output));
        list.sort((a, b) => a - b);
        return list;
    }

    setInput(pluginData: number[][]) {
        this.data.input = pluginData;
        this.data.n = this.data.input[0].length;
        this.data.m = this.data.input.length;
    }

    setOutput(pluginData: number[]) {
        this.data.output = pluginData;
    }
}

class FeedForwardNetworkPluginOptions extends PluginOptions {

    state: number;
    layers: number;
    regularization: boolean;
    labels: number[];

    constructor(public network: FeedForwardNetwork) {
        super();

        this.state = 1;
        this.layers = 1;
        this.regularization = false;
        this.labels = [];
    }

    noMore() {
        return this.state === 6;
    }

    submit(inputs: { [id: string]: any; }): void {
        switch (this.state) {
            case 1:
                this.network.setLearningRate(inputs['learningRate']);
                this.network.setBatchSize(Math.floor(inputs['batchSize']));
                this.layers = Math.floor(inputs['layers']);
                this.regularization = (inputs['regularization'] as boolean);
                this.state = 2;
                break;
            case 2:
                const layers: number[] = Array(this.layers).fill(1);
                Array(this.layers).fill(undefined).map((_, index) => {
                    layers[index] = (inputs[`layer${index}`] as number);
                });
                this.network.setLayers(layers);

                if (this.regularization) {
                    this.state = 3;
                } else {
                    this.state = 4;
                }
                this.labels = this.network.autoDetect();
                break;
            case 3:
                this.network.setRegularization(this.regularization);
                this.network.setLambda(inputs['lambda']);
                this.state = 4;
                this.labels = this.network.autoDetect();
                break;
            case 5:
                this.network.setLabels(JSON.parse(`[${inputs['labels']}]`));
                this.state = 6;
                break;
            default:
                throw new Error(`Feed-Forward Network Plugin Options is invalid state.`);
        }
    }

    async executeCommand(id: string): Promise<void> {
        if (id === 'yes') {
            this.network.setLabels(this.labels);
            this.state = 6;
        } else if (id === 'no') {
            this.state = 5;
        } else {
            throw new Error(`Feed Forward Network got invalid command: ${id}`);
        }
    }


    options(): Option[] {
        switch (this.state) {
            case 1:
                return [
                    new NumberOption({
                        id: 'layers',
                        label: 'Number of hidden layers',
                        min: 1,
                        step: 1,
                    }),
                    new NumberOption({
                        id: 'learningRate',
                        label: 'Learning rate (a number too high the algorithm may diverage, too low and the algorithm will take a long time to train)',
                        min: 0,
                        max: 1,
                        step: 0.001
                    }),
                    new CheckboxOption({
                        id: 'regularization',
                        label: 'Use regularization?'
                    }),
                    new NumberOption({
                        id: 'batchSize',
                        label: 'Batch Size (number of examples to use per an iteration)',
                        min: 1,
                        step: 1,
                    })
                ];
            case 2:
                return Array(this.layers).fill(undefined).map((_, index) =>
                    new NumberOption({
                        id: `layer${index}`,
                        label: `Enter the size for hidden layer ${index + 1}`,
                        min: 1,
                        step: 1,
                    }),
                );
            case 3:
                return [
                    new NumberOption({
                        id: 'lambda',
                        label: 'Choose a lambda for regularization (too high causes underfitting, too low causes overfitting)',
                        min: 0,
                        step: 0.1
                    })
                ];
            case 4:
                return [
                    new CommandOption({
                        id: 'yes',
                        command: 'Yes',
                        label: `Are these labels ${this.labels} correct?`,
                    }),
                    new CommandOption({
                        id: 'no',
                        command: 'No',
                        label: 'Incorrect. Will go to manual input when click',
                    }),
                ]
            case 5:
                return [
                    new TextOption({
                        id: 'labels',
                        label: 'Input Label List. (example input: 1,2,3,4)',
                        min: 1,
                        pattern: '^([ ]*[0-9]+[ ]*)(,[ ]*[0-9]+[ ]*)+$'
                    })
                ]
            default:
                throw new Error('Feed-Forward Network Plugin Options is in invalid state');
        }
    }
}

class FeedForwardNetworkPluginInputs extends PluginInputs {
    constructor(public network: FeedForwardNetwork) {
        super();
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'input',
                label: 'Input Features',
                min: 1,
                max: 1,
                type: 'number[]',
            },
            {
                id: 'output',
                label: 'Output Feature',
                type: 'number',
                min: 1,
                max: 1
            }
        ];
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['input'] === undefined) {
            throw new Error(`Feed-Forward Neural Network's submit expecting plugin data with key input`);
        } else {
            this.network.setInput(inputs['input'].examples.map((value) => value[0] as number[]));
        }
        if (inputs['output'] === undefined) {
            throw new Error(`Feed-Forward Neural Network's submit expecting plugin data with key output`);
        } else {
            this.network.setOutput(inputs['output'].examples.map((value) => value[0] as number));
        }
    }
}