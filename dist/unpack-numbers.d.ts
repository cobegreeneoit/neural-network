import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginData, PluginDataInput } from "data-science-lab-core";
export declare class UnpackNumbers extends TransformPlugin {
    inputs: UnpackNumbersPluginInputs;
    options: UnpackNumbersPluginOptions;
    inputData?: PluginData;
    constructor();
    getInputs(): UnpackNumbersPluginInputs;
    getOptions(): UnpackNumbersPluginOptions;
    transform(): PluginData | PluginData[];
    submit(inputData: PluginData): void;
}
declare class UnpackNumbersPluginOptions extends PluginOptions {
    pack: UnpackNumbers;
    constructor(pack: UnpackNumbers);
    noMore(): boolean;
    options(): Option[];
    submit(): void;
}
declare class UnpackNumbersPluginInputs extends PluginInputs {
    pack: UnpackNumbers;
    constructor(pack: UnpackNumbers);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
export {};
