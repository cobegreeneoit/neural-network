import { Option, TransformPlugin, PluginInputs, PluginOptions, PluginData, NumberOption, PluginDataInput } from "data-science-lab-core";


export class ArrayScale extends TransformPlugin {
    inputs: ArrayScalePluginInputs;
    options: ArrayScalePluginOptions;
    inputData?: PluginData;
    scale: number;

    constructor() {
        super();
        this.inputs = new ArrayScalePluginInputs(this);
        this.options = new ArrayScalePluginOptions(this);

        this.scale = 0;
    }

    getInputs() {
        return this.inputs;
    }

    getOptions() {
        return this.options;
    }

    transform(): PluginData {
        if (this.inputData) {
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map((value: number[][]) => value.map((inner: number[]) => inner.map((v) => v * this.scale)))
            }
        }
        throw new Error(`Array Scale was unable to get plugin data as input`);
    }

    setScale(scale: number) {
        this.scale = scale;
    }

    
    submit(inputData: PluginData) {
        this.inputData = inputData;
    }
}

class ArrayScalePluginOptions extends PluginOptions {
    state: number;

    constructor(public scaler: ArrayScale) {
        super();
        this.state = 1;
    }

    submit(inputs: { [id: string]: any; }): void {
        this.scaler.setScale(inputs['scale'] as number);
        this.state = 2;
    }
    options(): Option[] {
        return [
            new NumberOption({
                id: 'scale',
                label: 'A number to scale each number in array by.',
            })
        ];    
    }
    
    noMore(): boolean {
        return this.state === 2;
    }
}

class ArrayScalePluginInputs extends PluginInputs {
    constructor(public scaler: ArrayScale) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.scaler.submit(inputs['feature']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'feature',
                label: 'Feature Array to Scale',
                min: 1,
                max: 1,
                type: 'number[]'
            }
        ];
    }    
}