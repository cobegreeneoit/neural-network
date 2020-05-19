import { PackNumbers } from "./pack-numbers";
import { PluginData } from "data-science-lab-core";


describe('Pack Numbers Test', () => {
    let pack: PackNumbers;

    beforeEach(() => {
        pack = new PackNumbers();
    });

    it('options should return true for no more', () => {
        expect(pack.getOptions().noMore()).toBeTruthy();
    });


    it('inputs should return one inputs', () => {
        expect(pack.getInputs().inputs().length).toBe(1);
    });

    it('submitting a single feature should return pack', () => {
        pack.getInputs().submit({
            'features': {
                features: ['f1'],
                examples: [[1], [2], [3]]
            }
        });
        const transform = pack.transform() as PluginData;
        expect(transform).toEqual(
            {
                features: ['Pack f1'],
                examples: [[[1]], [[2]], [[3]]]
            }
        );
    });

    it('submitting a multiple features should return pack', () => {
        pack.getInputs().submit({
            'features': {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
            }
        });
        expect(pack.transform()).toEqual({
            features: ['Pack f1'],
            examples: [[[1, 2, 3]], [[2, 3, 4]], [[3, 4, 5]]]
        });
    });

});