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
var PackNumbers = /** @class */ (function (_super) {
    __extends(PackNumbers, _super);
    function PackNumbers() {
        var _this = _super.call(this) || this;
        _this.inputs = new PackNumbersPluginInputs(_this);
        _this.options = new PackNumbersPluginOptions(_this);
        return _this;
    }
    PackNumbers.prototype.getInputs = function () {
        return this.inputs;
    };
    PackNumbers.prototype.getOptions = function () {
        return this.options;
    };
    PackNumbers.prototype.transform = function () {
        if (this.inputData) {
            return {
                features: ["Pack " + this.inputData.features[0]],
                examples: this.inputData.examples.map(function (value) { return [value]; })
            };
        }
        throw new Error("Pack Numbers was unable to get plugin data as input.");
    };
    PackNumbers.prototype.submit = function (inputData) {
        this.inputData = inputData;
    };
    return PackNumbers;
}(data_science_lab_core_1.TransformPlugin));
exports.PackNumbers = PackNumbers;
var PackNumbersPluginOptions = /** @class */ (function (_super) {
    __extends(PackNumbersPluginOptions, _super);
    function PackNumbersPluginOptions(pack) {
        var _this = _super.call(this) || this;
        _this.pack = pack;
        return _this;
    }
    PackNumbersPluginOptions.prototype.noMore = function () {
        return true;
    };
    PackNumbersPluginOptions.prototype.options = function () {
        throw new Error('Pack Numbers Plugin Option doesn\'t have any options.');
    };
    PackNumbersPluginOptions.prototype.submit = function () {
        throw new Error('Pack Numbers Plugin Option doesn\'t have any options.');
    };
    return PackNumbersPluginOptions;
}(data_science_lab_core_1.PluginOptions));
var PackNumbersPluginInputs = /** @class */ (function (_super) {
    __extends(PackNumbersPluginInputs, _super);
    function PackNumbersPluginInputs(pack) {
        var _this = _super.call(this) || this;
        _this.pack = pack;
        return _this;
    }
    PackNumbersPluginInputs.prototype.submit = function (inputs) {
        this.pack.submit(inputs['features']);
    };
    PackNumbersPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to pack',
                min: 1,
                type: 'number'
            }
        ];
    };
    return PackNumbersPluginInputs;
}(data_science_lab_core_1.PluginInputs));
