"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var UnpackNumbers = /** @class */ (function (_super) {
    __extends(UnpackNumbers, _super);
    function UnpackNumbers() {
        var _this = _super.call(this) || this;
        _this.inputs = new UnpackNumbersPluginInputs(_this);
        _this.options = new UnpackNumbersPluginOptions(_this);
        return _this;
    }
    UnpackNumbers.prototype.getInputs = function () {
        return this.inputs;
    };
    UnpackNumbers.prototype.getOptions = function () {
        return this.options;
    };
    UnpackNumbers.prototype.transform = function () {
        if (this.inputData) {
            return {
                features: [],
                examples: this.inputData.examples.map(function (value) { return __spreadArrays(value[0]); })
            };
        }
        throw new Error("Unpack Numbers was unable to get plugin data as input.");
    };
    UnpackNumbers.prototype.submit = function (inputData) {
        this.inputData = inputData;
    };
    return UnpackNumbers;
}(data_science_lab_core_1.TransformPlugin));
exports.UnpackNumbers = UnpackNumbers;
var UnpackNumbersPluginOptions = /** @class */ (function (_super) {
    __extends(UnpackNumbersPluginOptions, _super);
    function UnpackNumbersPluginOptions(pack) {
        var _this = _super.call(this) || this;
        _this.pack = pack;
        return _this;
    }
    UnpackNumbersPluginOptions.prototype.noMore = function () {
        return true;
    };
    UnpackNumbersPluginOptions.prototype.options = function () {
        throw new Error('Unpack Numbers Plugin Option doesn\'t have any options.');
    };
    UnpackNumbersPluginOptions.prototype.submit = function () {
        throw new Error('Unpack Numbers Plugin Option doesn\'t have any options.');
    };
    return UnpackNumbersPluginOptions;
}(data_science_lab_core_1.PluginOptions));
var UnpackNumbersPluginInputs = /** @class */ (function (_super) {
    __extends(UnpackNumbersPluginInputs, _super);
    function UnpackNumbersPluginInputs(pack) {
        var _this = _super.call(this) || this;
        _this.pack = pack;
        return _this;
    }
    UnpackNumbersPluginInputs.prototype.submit = function (inputs) {
        this.pack.submit(inputs['features']);
    };
    UnpackNumbersPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Feature to unpack',
                min: 1,
                max: 1,
                type: 'number[]'
            }
        ];
    };
    return UnpackNumbersPluginInputs;
}(data_science_lab_core_1.PluginInputs));
