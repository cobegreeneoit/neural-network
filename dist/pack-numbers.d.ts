import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginData, PluginDataInput } from "data-science-lab-core";
export declare class PackNumbers extends TransformPlugin {
    inputs: PackNumbersPluginInputs;
    options: PackNumbersPluginOptions;
    inputData?: PluginData;
    constructor();
    getInputs(): PackNumbersPluginInputs;
    getOptions(): PackNumbersPluginOptions;
    transform(): PluginData | PluginData[];
    submit(inputData: PluginData): void;
}
declare class PackNumbersPluginOptions extends PluginOptions {
    pack: PackNumbers;
    constructor(pack: PackNumbers);
    noMore(): boolean;
    options(): Option[];
    submit(): void;
}
declare class PackNumbersPluginInputs extends PluginInputs {
    pack: PackNumbers;
    constructor(pack: PackNumbers);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
export {};
