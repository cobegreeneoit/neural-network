import { TransformPlugin, PluginInputs, PluginOptions, Option, PluginData, PluginDataInput } from "data-science-lab-core";


export class UnpackNumbers extends TransformPlugin {
    inputs: UnpackNumbersPluginInputs;
    options: UnpackNumbersPluginOptions;
    inputData?: PluginData;

    constructor() {
        super();

        this.inputs = new UnpackNumbersPluginInputs(this);
        this.options = new UnpackNumbersPluginOptions(this);
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
                features: [],
                examples: this.inputData.examples.map((value: number[][]) => [...value[0]])
            }
        }
        throw new Error(`Unpack Numbers was unable to get plugin data as input.`);
    }

    submit(inputData: PluginData) {
        this.inputData = inputData;
    }

}

class UnpackNumbersPluginOptions extends PluginOptions {
    constructor(public pack: UnpackNumbers) {
        super();
    }

    noMore() {
        return true;
    }

    options(): Option[] {
        throw new Error('Unpack Numbers Plugin Option doesn\'t have any options.');
    }

    submit() {
        throw new Error('Unpack Numbers Plugin Option doesn\'t have any options.');
    }
}

class UnpackNumbersPluginInputs extends PluginInputs {
    constructor(public pack: UnpackNumbers) {
        super()
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.pack.submit(inputs['features']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'features',
                label: 'Feature to unpack',
                min: 1,
                max: 1,
                type: 'number[]'
            }
        ];
    }

}

