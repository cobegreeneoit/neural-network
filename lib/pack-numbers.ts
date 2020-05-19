import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginData, PluginDataInput } from "data-science-lab-core";


export class PackNumbers extends TransformPlugin {
    inputs: PackNumbersPluginInputs;
    options: PackNumbersPluginOptions;
    inputData?: PluginData;

    constructor() {
        super();

        this.inputs = new PackNumbersPluginInputs(this);
        this.options = new PackNumbersPluginOptions(this);
    }

    getInputs() {
        return this.inputs;
    }

    getOptions() {
        return this.options;
    }

    transform(): PluginData | PluginData[] {
        if (this.inputData) {
            return {
                features: [`Pack ${this.inputData.features[0]}`],
                examples: this.inputData.examples.map((value) => [value])
            }
        }
        throw new Error(`Pack Numbers was unable to get plugin data as input.`);
    }

    submit(inputData: PluginData) {
        this.inputData = inputData;
    }

}

class PackNumbersPluginOptions extends PluginOptions {
    constructor(public pack: PackNumbers) {
        super();
    }

    noMore() {
        return true;
    }

    options(): Option[] {
        throw new Error('Pack Numbers Plugin Option doesn\'t have any options.');
    }

    submit() {
        throw new Error('Pack Numbers Plugin Option doesn\'t have any options.');
    }
}

class PackNumbersPluginInputs extends PluginInputs {
    constructor(public pack: PackNumbers) {
        super()
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.pack.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Features to pack',
                min: 1,
                type: 'number'
            }
        ];
    }

}

