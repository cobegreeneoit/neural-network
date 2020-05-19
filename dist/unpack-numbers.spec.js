"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unpack_numbers_1 = require("./unpack-numbers");
describe('Unpack Numbers Test', function () {
    var pack;
    beforeEach(function () {
        pack = new unpack_numbers_1.UnpackNumbers();
    });
    it('options should return true for no more', function () {
        expect(pack.getOptions().noMore()).toBeTruthy();
    });
    it('inputs should return one inputs', function () {
        expect(pack.getInputs().inputs().length).toBe(1);
    });
    it('submitting a single feature should return unpack', function () {
        pack.getInputs().submit({
            'features': {
                features: ['Pack f1'],
                examples: [[[1]], [[2]], [[3]]]
            }
        });
        var transform = pack.transform();
        expect(transform).toEqual({
            features: [],
            examples: [[1], [2], [3]]
        });
    });
    it('submitting a multiple features should return unpack', function () {
        pack.getInputs().submit({
            'features': {
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
