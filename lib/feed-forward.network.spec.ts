import { FeedForwardNetwork } from './feed-forward.network';
import { AlgorithmPlugin } from 'data-science-lab-core';


describe('Feed Forward Network Tests', () => {
    let network: FeedForwardNetwork;

    const testingInput = {
        'input': {
            features: ['picture'],
            examples: [
                [[0, 1, 1, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 1, 0, 0,
                    1, 1, 1, 1, 1]],
                [[1, 1, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    1, 1, 1, 1, 0]],
                [[0, 0, 1, 1, 0,
                    0, 0, 0, 1, 0,
                    0, 0, 0, 1, 0,
                    0, 0, 0, 1, 0,
                    1, 1, 1, 1, 1]],
                [[1, 1, 1, 1, 1,
                    0, 0, 0, 1, 0,
                    0, 0, 1, 0, 0,
                    0, 1, 0, 0, 0,
                    1, 1, 1, 1, 1]],
                [[1, 1, 1, 1, 1,
                    0, 0, 1, 1, 0,
                    0, 0, 1, 0, 0,
                    0, 1, 1, 0, 0,
                    1, 1, 1, 1, 1]],

                [[1, 1, 1, 1, 1,
                    0, 0, 0, 1, 1,
                    0, 0, 1, 1, 0,
                    0, 1, 0, 0, 0,
                    1, 1, 1, 1, 1]],
                [[1, 1, 1, 1, 1,
                    0, 0, 0, 0, 1,
                    0, 0, 1, 1, 1,
                    0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1]],
                [[1, 1, 1, 1, 1,
                    0, 0, 0, 0, 1,
                    0, 0, 1, 1, 1,
                    0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1]],
                [[1, 1, 1, 1, 1,
                    0, 0, 0, 0, 1,
                    0, 0, 1, 1, 1,
                    0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1]]
            ]
        },
        'output': {
            features: ['label'],
            examples: [
                [1],
                [1],
                [1],
                [2],
                [2],
                [2],
                [3],
                [3],
                [3],
            ]
        }
    }

    beforeEach(() => {
        network = new FeedForwardNetwork();
    });

    it('inputs should return 2', () => {
        expect(network.getInputs().inputs().length).toBe(2);
    });

    
    it('submit should throw throw for no input', () => {
        expect(() => {
            network.getInputs().submit({
                'output': {
                    features: ['label'],
                    examples: [[1]]
                }
            });
        }).toThrowError();
    });


    it('submit should throw throw for no output', () => {
        expect(() => {
            network.getInputs().submit({
                'output': {
                    features: ['label'],
                    examples: [[1]]
                }
            });
        }).toThrowError();
    });

    it('my demo', async () => {
        network.getInputs().submit({
            'input': {
                features: ['f1'],
                examples: [[[1, 0]], [[0, 1]]]
            },
            'output': {
                features: ['output'],
                examples: [[1], [2]]
            }
        });
        network.getOptions().submit({
            'learningRate': 0.1,
            'layers': 1,
            'regularization': false,
            'batchSize': 3
        });
        network.getOptions().submit({
            'layer0': 2,
        });
        await network.getOptions().executeCommand('yes');
        expect(network.getOptions().noMore()).toBeTruthy();
        await network.initialize();
        await network.step();
    });

    describe('after inputs', () => {
        
        beforeEach(() => {
            network.getInputs().submit(JSON.parse(JSON.stringify(testingInput)));
        });

        it('options should return false for no more', () => {
            expect(network.getOptions().noMore()).toBeFalsy();
        });

        it('options should return three options at state 1', () => {
            expect(network.getOptions().options().length).toBe(4);
        });

        it('option should move to state 2 with noMore is false with 2 options for 2 layers', () => {
            network.getOptions().submit({
                'learningRate': 0.1,
                'layers': 2,
                'regularization': true,
                'batchSize': 3
            });
            expect(network.getOptions().noMore()).toBeFalsy();
            expect(network.getOptions().options().length).toBe(2);
        });
        
        it('option should move to state 2 with noMore is false with 3 options for 3 layers', () => {
            network.getOptions().submit({
                'learningRate': 0.1,
                'layers': 3,
                'regularization': true,
                'batchSize': 3
            });
            expect(network.getOptions().noMore()).toBeFalsy();
            expect(network.getOptions().options().length).toBe(3);
        });

        it('options with 2 layers and regularization', async () => {
            network.getOptions().submit({
                'learningRate': 0.1,
                'layers': 2,
                'regularization': true,
                'batchSize': 3
            });
            network.getOptions().submit({
                'layer0': 10,
                'layer1': 15
            });
            network.getOptions().submit({
                'lambda': 0.5
            });
            await network.getOptions().executeCommand('yes');
            expect(network.getOptions().noMore()).toBeTruthy();
            expect(network.data.labels).toEqual([1, 2, 3]);
            expect(network.data.learningRate).toEqual(0.1);
            expect(network.data.layers).toEqual([10, 15]);
            expect(network.data.regularization).toBeTruthy();
            expect(network.data.lambda).toEqual(0.5);
            expect(network.data.batchSize).toEqual(3);
        });
        
        it('options with 2 layers and without regularization', async () => {
            network.getOptions().submit({
                'learningRate': 0.1,
                'layers': 2,
                'regularization': false,
                'batchSize': 3,
            });
            network.getOptions().submit({
                'layer0': 10,
                'layer1': 15
            });
            await network.getOptions().executeCommand('yes');
            expect(network.getOptions().noMore()).toBeTruthy();
            expect(network.data.labels).toEqual([1, 2, 3]);
            expect(network.data.learningRate).toEqual(0.1);
            expect(network.data.batchSize).toEqual(3);
            expect(network.data.layers).toEqual([10, 15]);
            expect(network.data.regularization).toBeFalsy();
        });

        it('options with 2 layers and without regularizations and custom input', async () => {
            network.getOptions().submit({
                'learningRate': 0.1,
                'layers': 2,
                'regularization': false,
                'batchSize': 3
            });
            network.getOptions().submit({
                'layer0': 10,
                'layer1': 15
            });
            await network.getOptions().executeCommand('no');
            network.getOptions().submit({
                'labels': '0,1,2,3'
            })
            expect(network.getOptions().noMore()).toBeTruthy();
            expect(network.data.labels).toEqual([0, 1, 2, 3]);
            expect(network.data.learningRate).toEqual(0.1);
            expect(network.data.batchSize).toEqual(3);
            expect(network.data.layers).toEqual([10, 15]);
            expect(network.data.regularization).toBeFalsy();
        });

        
        describe('after options without regularization', () => {
            beforeEach(async (done) => {
                network.getOptions().submit({
                    'learningRate': 0.1,
                    'layers': 1,
                    'regularization': false,
                    'batchSize': 2,
                });
                network.getOptions().submit({
                    'layer0': 5,
                    'layer1': 10,
                });
                await network.getOptions().executeCommand('yes');
                network.initialize();
                done();
            });

            xit('expect finish training to be false', () => {
                expect(network.getOptions().noMore()).toBeTruthy();
                expect(network.finishTraining()).toBeFalsy();
            })

            xit('get testing input should return one for each', () => {
                const testing = network.getTestingInputs();
                expect(testing.input.length).toBe(1);
                expect(testing.output).toBeDefined();
                if (testing.output) {
                    expect(testing.output.length).toBe(1);
                }
            });

            xit('set recorded one step should call recorder', async () => {
                const recorder = jasmine.createSpyObj('RecorderService', ['record']);
                network.setRecorderService(recorder);
                await network.step();
                expect(recorder.record).toHaveBeenCalledTimes(1);
            });

            it('training few steps should be able to predict the training set', async () => {
                for (let i = 0; i < 1000; ++i) {
                    await network.step();
                }
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = network.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });

            xit('export and import without minimial should be able to train', async () => {
                const json = await network.export(false);
                let newNetwork = await (new FeedForwardNetwork()).import(json, false);
                for (let i = 0; i < 1000; ++i) {
                    await newNetwork.step();
                }
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = newNetwork.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });
            
            xit('train most export and import without minimial should be able to train rest', async () => {
                for (let i = 0; i < 900; ++i) {
                    await network.step();
                }
                const json = await network.export(false);
                let newNetwork = await (new FeedForwardNetwork()).import(json, false);
                for (let i = 0; i < 100; ++i) {
                    await newNetwork.step();
                }
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = newNetwork.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });
    
            xit('testing after export minimal should still work', async () => {
                for (let i = 0; i < 100; ++i) {
                    await network.step();
                } 
                const json = await network.export(true);
                let newNetwork = await (new FeedForwardNetwork()).import(json, true);
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = newNetwork.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });

        });

        describe('after options with regularization', () => {
            beforeEach(async (done) => {
                network.getOptions().submit({
                    'learningRate': 0.1,
                    'layers': 2,
                    'regularization': true,
                    'batchSize': 2
                });
                network.getOptions().submit({
                    'layer0': 20,
                    'layer1': 20
                });
                network.getOptions().submit({
                    'lambda': 0.1
                });
                await network.getOptions().executeCommand('yes');
                network.initialize();
                done();
            });

            it('expect finish training to be false', () => {
                expect(network.finishTraining()).toBeFalsy();
            })

            it('get testing input should return one for each', () => {
                const testing = network.getTestingInputs();
                expect(testing.input.length).toBe(1);
                expect(testing.output).toBeDefined();
                if (testing.output) {
                    expect(testing.output.length).toBe(1);
                }
            });

            it('set recorded one step should call recorder', async () => {
                const recorder = jasmine.createSpyObj('RecorderService', ['record']);
                network.setRecorderService(recorder);
                await network.step();
                expect(recorder.record).toHaveBeenCalledTimes(1);
            });

            xit('training few steps should be able to predict the training set', async () => {
                for (let i = 0; i < 100; ++i) {
                    await network.step();
                }
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = network.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });

            xit('export and import without minimial should be able to train', async () => {
                const json = await network.export(false);
                let newNetwork = await (new FeedForwardNetwork()).import(json, false);
                for (let i = 0; i < 100; ++i) {
                    await newNetwork.step();
                }
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = newNetwork.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });
            
            xit('train most export and import without minimial should be able to train rest', async () => {
                for (let i = 0; i < 100; ++i) {
                    await network.step();
                }
                const json = await network.export(false);
                let newNetwork = await (new FeedForwardNetwork()).import(json, false);
                for (let i = 0; i < 100; ++i) {
                    await newNetwork.step();
                }
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = newNetwork.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });
    
            xit('testing after export minimal should still work', async () => {
                for (let i = 0; i < 110; ++i) {
                    await network.step();
                } 
                const json = await network.export(true);
                let newNetwork = await (new FeedForwardNetwork()).import(json, true);
                for (let i = 0; i < testingInput.output.examples.length; ++i) {
                    const actual = newNetwork.test(
                        { 'input': testingInput.input.examples[i] }
                    );
                    expect(actual.output).toEqual(testingInput.output.examples[i]);
                }
            });



        });

    });



});