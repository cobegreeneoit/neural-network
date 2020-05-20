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
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var ArrayScale = /** @class */ (function (_super) {
    __extends(ArrayScale, _super);
    function ArrayScale() {
        var _this = _super.call(this) || this;
        _this.inputs = new ArrayScalePluginInputs(_this);
        _this.options = new ArrayScalePluginOptions(_this);
        _this.scale = 0;
        return _this;
    }
    ArrayScale.prototype.getInputs = function () {
        return this.inputs;
    };
    ArrayScale.prototype.getOptions = function () {
        return this.options;
    };
    ArrayScale.prototype.transform = function () {
        var _this = this;
        if (this.inputData) {
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (value) { return value.map(function (inner) { return inner.map(function (v) { return v * _this.scale; }); }); })
            };
        }
        throw new Error("Array Scale was unable to get plugin data as input");
    };
    ArrayScale.prototype.setScale = function (scale) {
        this.scale = scale;
    };
    ArrayScale.prototype.submit = function (inputData) {
        this.inputData = inputData;
    };
    return ArrayScale;
}(data_science_lab_core_1.TransformPlugin));
exports.ArrayScale = ArrayScale;
var ArrayScalePluginOptions = /** @class */ (function (_super) {
    __extends(ArrayScalePluginOptions, _super);
    function ArrayScalePluginOptions(scaler) {
        var _this = _super.call(this) || this;
        _this.scaler = scaler;
        _this.state = 1;
        return _this;
    }
    ArrayScalePluginOptions.prototype.submit = function (inputs) {
        this.scaler.setScale(inputs['scale']);
        this.state = 2;
    };
    ArrayScalePluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.NumberOption({
                id: 'scale',
                label: 'A number to scale each number in array by.',
            })
        ];
    };
    ArrayScalePluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return ArrayScalePluginOptions;
}(data_science_lab_core_1.PluginOptions));
var ArrayScalePluginInputs = /** @class */ (function (_super) {
    __extends(ArrayScalePluginInputs, _super);
    function ArrayScalePluginInputs(scaler) {
        var _this = _super.call(this) || this;
        _this.scaler = scaler;
        return _this;
    }
    ArrayScalePluginInputs.prototype.submit = function (inputs) {
        this.scaler.submit(inputs['feature']);
    };
    ArrayScalePluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'feature',
                label: 'Feature Array to Scale',
                min: 1,
                max: 1,
                type: 'number[]'
            }
        ];
    };
    return ArrayScalePluginInputs;
}(data_science_lab_core_1.PluginInputs));
