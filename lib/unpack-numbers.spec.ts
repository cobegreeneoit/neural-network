import { UnpackNumbers } from './unpack-numbers';
import { PluginData } from "data-science-lab-core";


describe('Unpack Numbers Test', () => {
    let pack: UnpackNumbers;
 
    beforeEach(() => {
        pack = new UnpackNumbers();
    });

    it('options should return true for no more', () => {
        expect(pack.getOptions().noMore()).toBeTruthy();
    });


    it('inputs should return one inputs', () => {
        expect(pack.getInputs().inputs().length).toBe(1);
    });

    it('submitting a single feature should return unpack', () => {
        pack.getInputs().submit({
            'features':
            {
                features: ['Pack f1'],
                examples: [[[1]], [[2]], [[3]]]
            }

        });
        const transform = pack.transform() as PluginData;
        expect(transform).toEqual(
            {
                features: [],
                examples: [[1], [2], [3]]
            });
    });

    it('submitting a multiple features should return unpack', () => {
        pack.getInputs().submit({
            'features':
            {
                features: ['Pack f1'],
                examples: [[[1, 2, 3]], [[2, 3, 4]], [[3, 4, 5]]]
            }
        });
        expect(pack.transform()).toEqual({
            features: [],
            examples: [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
        });
    });

});