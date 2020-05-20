import { Option, TransformPlugin, PluginInputs, PluginOptions, PluginData, PluginDataInput } from "data-science-lab-core";
export declare class ArrayScale extends TransformPlugin {
    inputs: ArrayScalePluginInputs;
    options: ArrayScalePluginOptions;
    inputData?: PluginData;
    scale: number;
    constructor();
    getInputs(): ArrayScalePluginInputs;
    getOptions(): ArrayScalePluginOptions;
    transform(): PluginData;
    setScale(scale: number): void;
    submit(inputData: PluginData): void;
}
declare class ArrayScalePluginOptions extends PluginOptions {
    scaler: ArrayScale;
    state: number;
    constructor(scaler: ArrayScale);
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
declare class ArrayScalePluginInputs extends PluginInputs {
    scaler: ArrayScale;
    constructor(scaler: ArrayScale);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
export {};
