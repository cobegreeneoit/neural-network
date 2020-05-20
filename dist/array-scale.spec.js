"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_scale_1 = require("./array-scale");
describe('Array Scale Test', function () {
    var scaler;
    beforeEach(function () {
        scaler = new array_scale_1.ArrayScale();
    });
    it('get inputs should return 1', function () {
        expect(scaler.getInputs().inputs().length).toBe(1);
    });
    it('get options should return 1', function () {
        expect(scaler.getOptions().options().length).toBe(1);
        expect(scaler.getOptions().noMore()).toBeFalsy();
    });
    it('transform of array inputs', function () {
        scaler.getInputs().submit({
            'feature': {
                features: ['Array'],
                examples: [[[1, 2, 3]], [[2, 3, 4]], [[3, 4, 5]]]
            }
        });
        scaler.getOptions().submit({
            'scale': 0.1
        });
        expect(scaler.getOptions().noMore()).toBeTruthy();
        expect(scaler.transform()).toEqual({
            features: ['Array'],
            examples: [[[1 * 0.1, 2 * 0.1, 3 * 0.1]], [[2 * 0.1, 3 * 0.1, 4 * 0.1]], [[3 * 0.1, 4 * 0.1, 5 * 0.1]]]
        });
    });
});
