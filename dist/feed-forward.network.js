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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
;
var FeedForwardNetwork = /** @class */ (function (_super) {
    __extends(FeedForwardNetwork, _super);
    function FeedForwardNetwork() {
        var _this = _super.call(this) || this;
        _this.options = new FeedForwardNetworkPluginOptions(_this);
        _this.inputs = new FeedForwardNetworkPluginInputs(_this);
        _this.data = { learningRate: 0.1, regularization: false, lambda: 0.5, batchSize: 32 };
        return _this;
    }
    FeedForwardNetwork.prototype.finishTraining = function () {
        return false;
    };
    FeedForwardNetwork.prototype.setRecorderService = function (recorder) {
        this.recorder = recorder;
    };
    FeedForwardNetwork.prototype.initialize = function () {
        var _this = this;
        var initial_elipsion = 0.01;
        var func = function () { return Math.random() * 2.0 * initial_elipsion - initial_elipsion; };
        this.data.thetas = this.data.layers.map(function (value, index) {
            if (index === 0) {
                return data_science_lab_core_1.Matrix.construct(value, _this.data.n + 1, function () { return func(); });
            }
            return data_science_lab_core_1.Matrix.construct(value, _this.data.layers[index - 1] + 1, function () { return func(); });
        });
        this.data.thetas.push(data_science_lab_core_1.Matrix.construct(this.data.labels.length, this.data.layers[this.data.layers.length - 1] + 1, func));
        // console.log('thetas', ...this.data.thetas);
    };
    FeedForwardNetwork.prototype.sigmoid = function (m) {
        return data_science_lab_core_1.Matrix.map(data_science_lab_core_1.Matrix.multiply(m, -1.0), function (value) {
            return 1.0 / (1.0 + Math.exp(value));
        });
    };
    FeedForwardNetwork.prototype.sigmoidGradient = function (m) {
        return data_science_lab_core_1.Matrix.columnMultiply(this.sigmoid(m), this.subtract(1.0, this.sigmoid(m)));
    };
    FeedForwardNetwork.prototype.log = function (m) {
        return data_science_lab_core_1.Matrix.map(m, function (value) {
            return Math.log(value);
        });
    };
    FeedForwardNetwork.prototype.subtract = function (lhs, m) {
        return data_science_lab_core_1.Matrix.map(m, function (value) {
            return lhs - value;
        });
    };
    FeedForwardNetwork.prototype.export = function (minimum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (minimum) {
                    return [2 /*return*/, JSON.stringify({
                            thetas: this.data.thetas,
                            labels: this.data.labels,
                            m: this.data.m,
                            n: this.data.n,
                            layers: this.data.layers,
                        })];
                }
                else {
                    return [2 /*return*/, JSON.stringify(this.data)];
                }
                return [2 /*return*/];
            });
        });
    };
    FeedForwardNetwork.prototype.import = function (json, _) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = JSON.parse(json);
                this.data = data;
                return [2 /*return*/, this];
            });
        });
    };
    FeedForwardNetwork.prototype.getInputs = function () {
        return this.inputs;
    };
    FeedForwardNetwork.prototype.getOptions = function () {
        return this.options;
    };
    FeedForwardNetwork.prototype.test = function (argument) {
        var argumentInput = argument['input'];
        var a = data_science_lab_core_1.Matrix.transpose(data_science_lab_core_1.Matrix.make([__spreadArrays([1], argumentInput[0])]));
        var z = data_science_lab_core_1.Matrix.multiply(this.data.thetas[0], a);
        for (var i = 1; i <= this.data.layers.length; ++i) {
            a = data_science_lab_core_1.Matrix.make([[1]].concat(this.sigmoid(z).data));
            z = data_science_lab_core_1.Matrix.multiply(this.data.thetas[i], a);
            // console.log(a);
        }
        a = this.sigmoid(z);
        // console.log(a);
        var maxIndex = 0;
        for (var i = 1; i < a.rows; ++i) {
            if (a.data[i][0] > a.data[maxIndex][0]) {
                maxIndex = i;
            }
        }
        return {
            'output': [this.data.labels[maxIndex]]
        };
    };
    FeedForwardNetwork.prototype.step = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cost, deltas, _loop_1, this_1, bi, thetaRegs, thetaReg, _loop_2, this_2, i, i;
            var _this = this;
            return __generator(this, function (_b) {
                cost = 0;
                deltas = this.data.thetas.map(function (value) { return data_science_lab_core_1.Matrix.zeros(value.rows, value.columns); });
                _loop_1 = function (bi) {
                    var mi = Math.floor(Math.random() * this_1.data.m);
                    // console.log('example', mi, this.data.input[mi]);
                    var zs = [];
                    var as = [];
                    var a = data_science_lab_core_1.Matrix.transpose(data_science_lab_core_1.Matrix.make([__spreadArrays([1], this_1.data.input[mi])])); // a1: 4x1
                    var z = data_science_lab_core_1.Matrix.multiply(this_1.data.thetas[0], a); // z2: 5x1
                    zs.push(z); // zs = [z2]
                    as.push(a); // as = [a1]
                    for (var i = 1; i <= this_1.data.layers.length; ++i) {
                        // i = 1, T1
                        a = data_science_lab_core_1.Matrix.make([[1]].concat(this_1.sigmoid(z).data)); // a2: 6x1
                        z = data_science_lab_core_1.Matrix.multiply(this_1.data.thetas[i], a); // z3: 8x1
                        zs.push(z); // zs = [z2, z3]
                        as.push(a); // as = [a1, a2]
                        // i = 2, T2
                        // a = Matrix.make(this.sigmoid(z).data.map((value) => [1, ...value])); // a3: 9x1
                        // z = Matrix.multiply(this.data.thetas[i], a); // z4: 6x1
                        // zs.push(z); // zs = [z2, z3, z4]
                        // as.push(a); // as = [a1, a2, a3]
                        // i = 3, T3
                        // a = Matrix.make(this.sigmoid(z).data.map((value) => [1, ...value])); // a4: 7x1
                        // z = Matrix.multiply(this.data.thetas[i], a); // z5: 10x1
                        // zs.push(z); // zs = [z2, z3, z4, z5]
                        // as.push(a); // as = [a1, a2, a3, a4]
                    }
                    var aLast = this_1.sigmoid(z); // a5: 10x1
                    as.push(aLast); // as = [a1, a2, a3, a4, a5]
                    // console.log('as', ...as);
                    // console.log('zs', ...zs);
                    var yi = data_science_lab_core_1.Matrix.construct(this_1.data.labels.length, 1, function (row) {
                        return _this.data.output[mi] === _this.data.labels[row] ? 1 : 0;
                    });
                    // console.log('yi', yi);
                    var costLhs = data_science_lab_core_1.Matrix.columnMultiply(data_science_lab_core_1.Matrix.multiply(yi, -1), this_1.log(aLast));
                    var costRhs = data_science_lab_core_1.Matrix.columnMultiply(this_1.subtract(1.0, yi), this_1.log(this_1.subtract(1.0, aLast)));
                    cost += data_science_lab_core_1.Matrix.sum(data_science_lab_core_1.Matrix.subtract(costLhs, costRhs)) / (bi + 1.0);
                    // deltas = [T0, T1, T2, T3]
                    // zs = [z2, z3, z4, z5]
                    // as = [a1, a2, a3, a4, a5]
                    var deltaTravel = data_science_lab_core_1.Matrix.subtract(aLast, yi); // d5 = a5 - yi = 10x1
                    deltas[deltas.length - 1] = data_science_lab_core_1.Matrix.add(deltas[deltas.length - 1], // D3 or T3  
                    data_science_lab_core_1.Matrix.multiply(data_science_lab_core_1.Matrix.multiply(deltaTravel, data_science_lab_core_1.Matrix.transpose(as[deltas.length - 1])), 1.0 / (bi + 1)));
                    // 10x7 + (10x1 * (a4)') = 10x7 + (10x1 * (7x1)') = 10x7 + 10x7 
                    for (var i = deltas.length - 2; i >= 0; --i) {
                        // i = 2, T2
                        // console.log('delta', i, deltaTravel);
                        var lhs = data_science_lab_core_1.Matrix.multiply(data_science_lab_core_1.Matrix.transpose(this_1.data.thetas[i + 1]), deltaTravel); // (10x7)' * (10x1) = 7x10 * 10x1 = 7x1
                        // console.log('lhs', lhs);
                        var rhs = data_science_lab_core_1.Matrix.make([[0]].concat(this_1.sigmoidGradient(zs[i]).data)); // [0; z4] = [0;6x1] = 7x1
                        // console.log('rhs', rhs, zs[i]);
                        deltaTravel = data_science_lab_core_1.Matrix.make(data_science_lab_core_1.Matrix.columnMultiply(lhs, rhs).data.slice(1)); // filter(7x1 .* 7x1) = 6x1
                        // console.log('deltaTravel', deltaTravel);
                        deltas[i] = data_science_lab_core_1.Matrix.add(deltas[i], data_science_lab_core_1.Matrix.multiply(data_science_lab_core_1.Matrix.multiply(deltaTravel, data_science_lab_core_1.Matrix.transpose(as[i])), 1.0 / (bi + 1))); // (6x9) + (6x1) * (a3') = 6x9 + (6x1) * (9x1)' = 6x9
                        // i = 1, T1
                        // const lhs = Matrix.multiply(Matrix.transpose(this.data.thetas[i + 1]), deltaTravel); // (6x9)' * (6x1) = 9x6 * 6x1 = 9x1
                        // const rhs = Matrix.make([[0]].concat(...this.sigmoidGradient(zs[i]).data)); // [0; z3] = [0;8x1] = 9x1
                        // deltaTravel = Matrix.make(Matrix.columnMultiply(lhs, rhs).data.filter((_, index) => index !== 0)); // filter(9x1 .* 9x1) = 8x1
                        // deltas[i] = Matrix.add(deltas[i], Matrix.multiply(deltaTravel, Matrix.transpose(as[i]))); // (8x6) + (8x1) * (a2') = 8x6 + (8x1) * (6x1)' = 8x6
                        // i = 0, T0
                        // const lhs = Matrix.multiply(Matrix.transpose(this.data.thetas[i + 1]), deltaTravel); // (8x6)' * (8x1) = 6x8 * 8x1 = 6x1
                        // const rhs = Matrix.make([[0]].concat(...this.sigmoidGradient(zs[i]).data)); // [0; z2] = [0;5x1] = 6x1
                        // deltaTravel = Matrix.make(Matrix.columnMultiply(lhs, rhs).data.filter((_, index) => index !== 0)); // filter(6x1 .* 6x1) = 5x1
                        // deltas[i] = Matrix.add(deltas[i], Matrix.multiply(deltaTravel, Matrix.transpose(as[i]))); // (5x4) + (5x1) * (a1') = 5x4 + (5x1) * (4x1)' = 5x4
                    }
                };
                this_1 = this;
                //deltas = [T0, T1, T2, T3];
                for (bi = 0; bi < this.data.batchSize; ++bi) {
                    _loop_1(bi);
                }
                if (this.data.regularization) {
                    thetaRegs = this.data.thetas.map(function (value) {
                        var temp = data_science_lab_core_1.Matrix.make(value.data.map(function (value) { return value.slice(1); }));
                        return data_science_lab_core_1.Matrix.sum(data_science_lab_core_1.Matrix.hadamard(temp, temp));
                    });
                    thetaReg = thetaRegs.reduce(function (curr, acc) { return curr + acc; });
                    cost += (this.data.lambda / (2.0 * this.data.batchSize)) * thetaReg;
                    _loop_2 = function (i) {
                        var gradient = data_science_lab_core_1.Matrix.map(this_2.data.thetas[i], function (value, row, column) {
                            if (column === 0) {
                                return deltas[i].data[row][column];
                            }
                            else {
                                return deltas[i].data[row][column] + (_this.data.lambda / _this.data.batchSize) * value;
                            }
                        });
                        this_2.data.thetas[i] = data_science_lab_core_1.Matrix.subtract(this_2.data.thetas[i], data_science_lab_core_1.Matrix.multiply(gradient, this_2.data.learningRate));
                    };
                    this_2 = this;
                    for (i = 0; i < this.data.thetas.length; ++i) {
                        _loop_2(i);
                    }
                }
                else {
                    for (i = 0; i < this.data.thetas.length; ++i) {
                        // const gradient = Matrix.multiply(deltas[i], 1.0 / this.data.m); 
                        this.data.thetas[i] = data_science_lab_core_1.Matrix.subtract(this.data.thetas[i], data_science_lab_core_1.Matrix.multiply(deltas[i], this.data.learningRate));
                        // console.log('theta update', i, this.data.thetas[i]);
                    }
                }
                // console.log('cost', cost);
                (_a = this.recorder) === null || _a === void 0 ? void 0 : _a.record([
                    {
                        label: "Cost",
                        value: cost,
                        description: "The average difference between expected and actual output"
                    }
                ]);
                return [2 /*return*/];
            });
        });
    };
    FeedForwardNetwork.prototype.getTestingInputs = function () {
        return {
            input: [
                {
                    id: 'input',
                    label: 'Testing Input Features',
                    min: 1,
                    max: 1,
                    type: 'number[]'
                }
            ],
            output: [
                {
                    id: 'output',
                    label: 'Testing Output Feature',
                    min: 1,
                    max: 1,
                    type: 'number'
                }
            ]
        };
    };
    FeedForwardNetwork.prototype.setLearningRate = function (rate) {
        this.data.learningRate = rate;
    };
    FeedForwardNetwork.prototype.setBatchSize = function (size) {
        this.data.batchSize = size;
    };
    FeedForwardNetwork.prototype.setRegularization = function (regularization) {
        this.data.regularization = regularization;
    };
    FeedForwardNetwork.prototype.setLayers = function (layers) {
        this.data.layers = layers;
    };
    FeedForwardNetwork.prototype.setLambda = function (lambda) {
        this.data.lambda = lambda;
    };
    FeedForwardNetwork.prototype.setLabels = function (labels) {
        var list = Array.from(new Set(labels));
        list.sort(function (a, b) { return a - b; });
        this.data.labels = list;
    };
    FeedForwardNetwork.prototype.autoDetect = function () {
        var list = Array.from(new Set(this.data.output));
        list.sort(function (a, b) { return a - b; });
        return list;
    };
    FeedForwardNetwork.prototype.setInput = function (pluginData) {
        this.data.input = pluginData;
        this.data.n = this.data.input[0].length;
        this.data.m = this.data.input.length;
    };
    FeedForwardNetwork.prototype.setOutput = function (pluginData) {
        this.data.output = pluginData;
    };
    return FeedForwardNetwork;
}(data_science_lab_core_1.AlgorithmPlugin));
exports.FeedForwardNetwork = FeedForwardNetwork;
var FeedForwardNetworkPluginOptions = /** @class */ (function (_super) {
    __extends(FeedForwardNetworkPluginOptions, _super);
    function FeedForwardNetworkPluginOptions(network) {
        var _this = _super.call(this) || this;
        _this.network = network;
        _this.state = 1;
        _this.layers = 1;
        _this.regularization = false;
        _this.labels = [];
        return _this;
    }
    FeedForwardNetworkPluginOptions.prototype.noMore = function () {
        return this.state === 6;
    };
    FeedForwardNetworkPluginOptions.prototype.submit = function (inputs) {
        switch (this.state) {
            case 1:
                this.network.setLearningRate(inputs['learningRate']);
                this.network.setBatchSize(Math.floor(inputs['batchSize']));
                this.layers = Math.floor(inputs['layers']);
                this.regularization = inputs['regularization'];
                this.state = 2;
                break;
            case 2:
                var layers_1 = Array(this.layers).fill(1);
                Array(this.layers).fill(undefined).map(function (_, index) {
                    layers_1[index] = inputs["layer" + index];
                });
                this.network.setLayers(layers_1);
                if (this.regularization) {
                    this.state = 3;
                }
                else {
                    this.state = 4;
                }
                this.labels = this.network.autoDetect();
                break;
            case 3:
                this.network.setRegularization(this.regularization);
                this.network.setLambda(inputs['lambda']);
                this.state = 4;
                this.labels = this.network.autoDetect();
                break;
            case 5:
                this.network.setLabels(JSON.parse("[" + inputs['labels'] + "]"));
                this.state = 6;
                break;
            default:
                throw new Error("Feed-Forward Network Plugin Options is invalid state.");
        }
    };
    FeedForwardNetworkPluginOptions.prototype.executeCommand = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (id === 'yes') {
                    this.network.setLabels(this.labels);
                    this.state = 6;
                }
                else if (id === 'no') {
                    this.state = 5;
                }
                else {
                    throw new Error("Feed Forward Network got invalid command: " + id);
                }
                return [2 /*return*/];
            });
        });
    };
    FeedForwardNetworkPluginOptions.prototype.options = function () {
        switch (this.state) {
            case 1:
                return [
                    new data_science_lab_core_1.NumberOption({
                        id: 'layers',
                        label: 'Number of hidden layers',
                        min: 1,
                        step: 1,
                    }),
                    new data_science_lab_core_1.NumberOption({
                        id: 'learningRate',
                        label: 'Learning rate (a number too high the algorithm may diverage, too low and the algorithm will take a long time to train)',
                        min: 0,
                        max: 1,
                        step: 0.001
                    }),
                    new data_science_lab_core_1.CheckboxOption({
                        id: 'regularization',
                        label: 'Use regularization?'
                    }),
                    new data_science_lab_core_1.NumberOption({
                        id: 'batchSize',
                        label: 'Batch Size (number of examples to use per an iteration)',
                        min: 1,
                        step: 1,
                    })
                ];
            case 2:
                return Array(this.layers).fill(undefined).map(function (_, index) {
                    return new data_science_lab_core_1.NumberOption({
                        id: "layer" + index,
                        label: "Enter the size for hidden layer " + (index + 1),
                        min: 1,
                        step: 1,
                    });
                });
            case 3:
                return [
                    new data_science_lab_core_1.NumberOption({
                        id: 'lambda',
                        label: 'Choose a lambda for regularization (too high causes underfitting, too low causes overfitting)',
                        min: 0,
                        step: 0.1
                    })
                ];
            case 4:
                return [
                    new data_science_lab_core_1.CommandOption({
                        id: 'yes',
                        command: 'Yes',
                        label: "Are these labels " + this.labels + " correct?",
                    }),
                    new data_science_lab_core_1.CommandOption({
                        id: 'no',
                        command: 'No',
                        label: 'Incorrect. Will go to manual input when click',
                    }),
                ];
            case 5:
                return [
                    new data_science_lab_core_1.TextOption({
                        id: 'labels',
                        label: 'Input Label List. (example input: 1,2,3,4)',
                        min: 1,
                        pattern: '^([ ]*[0-9]+[ ]*)(,[ ]*[0-9]+[ ]*)+$'
                    })
                ];
            default:
                throw new Error('Feed-Forward Network Plugin Options is in invalid state');
        }
    };
    return FeedForwardNetworkPluginOptions;
}(data_science_lab_core_1.PluginOptions));
var FeedForwardNetworkPluginInputs = /** @class */ (function (_super) {
    __extends(FeedForwardNetworkPluginInputs, _super);
    function FeedForwardNetworkPluginInputs(network) {
        var _this = _super.call(this) || this;
        _this.network = network;
        return _this;
    }
    FeedForwardNetworkPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'input',
                label: 'Input Features',
                min: 1,
                max: 1,
                type: 'number[]',
            },
            {
                id: 'output',
                label: 'Output Feature',
                type: 'number',
                min: 1,
                max: 1
            }
        ];
    };
    FeedForwardNetworkPluginInputs.prototype.submit = function (inputs) {
        if (inputs['input'] === undefined) {
            throw new Error("Feed-Forward Neural Network's submit expecting plugin data with key input");
        }
        else {
            this.network.setInput(inputs['input'].examples.map(function (value) { return value[0]; }));
        }
        if (inputs['output'] === undefined) {
            throw new Error("Feed-Forward Neural Network's submit expecting plugin data with key output");
        }
        else {
            this.network.setOutput(inputs['output'].examples.map(function (value) { return value[0]; }));
        }
    };
    return FeedForwardNetworkPluginInputs;
}(data_science_lab_core_1.PluginInputs));
