import { AlgorithmPlugin, PluginOptions, PluginInputs, Option, PluginDataInput, PluginData, Matrix, RecorderService } from 'data-science-lab-core';
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
}
export declare class FeedForwardNetwork extends AlgorithmPlugin {
    options: FeedForwardNetworkPluginOptions;
    inputs: FeedForwardNetworkPluginInputs;
    data: FeedForwardNetworkData;
    recorder?: RecorderService;
    constructor();
    finishTraining(): boolean;
    setRecorderService(recorder: RecorderService): void;
    initialize(): void;
    sigmoid(m: Matrix.Matrix): Matrix.Matrix;
    sigmoidGradient(m: Matrix.Matrix): Matrix.Matrix;
    log(m: Matrix.Matrix): Matrix.Matrix;
    subtract(lhs: number, m: Matrix.Matrix): Matrix.Matrix;
    export(minimum: boolean): Promise<string>;
    import(json: string, _: boolean): Promise<FeedForwardNetwork>;
    getInputs(): FeedForwardNetworkPluginInputs;
    getOptions(): FeedForwardNetworkPluginOptions;
    test(argument: {
        [id: string]: any[];
    }): {
        [id: string]: any[];
    };
    step(): Promise<void>;
    getTestingInputs(): {
        input: PluginDataInput[];
        output?: PluginDataInput[];
    };
    setLearningRate(rate: number): void;
    setBatchSize(size: number): void;
    setRegularization(regularization: boolean): void;
    setLayers(layers: number[]): void;
    setLambda(lambda: number): void;
    setLabels(labels: number[]): void;
    autoDetect(): number[];
    setInput(pluginData: number[][]): void;
    setOutput(pluginData: number[]): void;
}
declare class FeedForwardNetworkPluginOptions extends PluginOptions {
    network: FeedForwardNetwork;
    state: number;
    layers: number;
    regularization: boolean;
    labels: number[];
    constructor(network: FeedForwardNetwork);
    noMore(): boolean;
    submit(inputs: {
        [id: string]: any;
    }): void;
    executeCommand(id: string): Promise<void>;
    options(): Option[];
}
declare class FeedForwardNetworkPluginInputs extends PluginInputs {
    network: FeedForwardNetwork;
    constructor(network: FeedForwardNetwork);
    inputs(): PluginDataInput[];
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
}
export {};
