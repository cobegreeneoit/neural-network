"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var feed_forward_network_1 = require("./feed-forward.network");
describe('Feed Forward Network Tests', function () {
    var network;
    var testingInput = {
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
    };
    beforeEach(function () {
        network = new feed_forward_network_1.FeedForwardNetwork();
    });
    it('inputs should return 2', function () {
        expect(network.getInputs().inputs().length).toBe(2);
    });
    it('submit should throw throw for no input', function () {
        expect(function () {
            network.getInputs().submit({
                'output': {
                    features: ['label'],
                    examples: [[1]]
                }
            });
        }).toThrowError();
    });
    it('submit should throw throw for no output', function () {
        expect(function () {
            network.getInputs().submit({
                'output': {
                    features: ['label'],
                    examples: [[1]]
                }
            });
        }).toThrowError();
    });
    it('my demo', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                    return [4 /*yield*/, network.getOptions().executeCommand('yes')];
                case 1:
                    _a.sent();
                    expect(network.getOptions().noMore()).toBeTruthy();
                    return [4 /*yield*/, network.initialize()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, network.step()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('after inputs', function () {
        beforeEach(function () {
            network.getInputs().submit(JSON.parse(JSON.stringify(testingInput)));
        });
        it('options should return false for no more', function () {
            expect(network.getOptions().noMore()).toBeFalsy();
        });
        it('options should return three options at state 1', function () {
            expect(network.getOptions().options().length).toBe(4);
        });
        it('option should move to state 2 with noMore is false with 2 options for 2 layers', function () {
            network.getOptions().submit({
                'learningRate': 0.1,
                'layers': 2,
                'regularization': true,
                'batchSize': 3
            });
            expect(network.getOptions().noMore()).toBeFalsy();
            expect(network.getOptions().options().length).toBe(2);
        });
        it('option should move to state 2 with noMore is false with 3 options for 3 layers', function () {
            network.getOptions().submit({
                'learningRate': 0.1,
                'layers': 3,
                'regularization': true,
                'batchSize': 3
            });
            expect(network.getOptions().noMore()).toBeFalsy();
            expect(network.getOptions().options().length).toBe(3);
        });
        it('options with 2 layers and regularization', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, network.getOptions().executeCommand('yes')];
                    case 1:
                        _a.sent();
                        expect(network.getOptions().noMore()).toBeTruthy();
                        expect(network.data.labels).toEqual([1, 2, 3]);
                        expect(network.data.learningRate).toEqual(0.1);
                        expect(network.data.layers).toEqual([10, 15]);
                        expect(network.data.regularization).toBeTruthy();
                        expect(network.data.lambda).toEqual(0.5);
                        expect(network.data.batchSize).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('options with 2 layers and without regularization', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, network.getOptions().executeCommand('yes')];
                    case 1:
                        _a.sent();
                        expect(network.getOptions().noMore()).toBeTruthy();
                        expect(network.data.labels).toEqual([1, 2, 3]);
                        expect(network.data.learningRate).toEqual(0.1);
                        expect(network.data.batchSize).toEqual(3);
                        expect(network.data.layers).toEqual([10, 15]);
                        expect(network.data.regularization).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('options with 2 layers and without regularizations and custom input', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, network.getOptions().executeCommand('no')];
                    case 1:
                        _a.sent();
                        network.getOptions().submit({
                            'labels': '0,1,2,3'
                        });
                        expect(network.getOptions().noMore()).toBeTruthy();
                        expect(network.data.labels).toEqual([0, 1, 2, 3]);
                        expect(network.data.learningRate).toEqual(0.1);
                        expect(network.data.batchSize).toEqual(3);
                        expect(network.data.layers).toEqual([10, 15]);
                        expect(network.data.regularization).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('after options without regularization', function () {
            beforeEach(function (done) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
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
                            return [4 /*yield*/, network.getOptions().executeCommand('yes')];
                        case 1:
                            _a.sent();
                            network.initialize();
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('expect finish training to be false', function () {
                expect(network.getOptions().noMore()).toBeTruthy();
                expect(network.finishTraining()).toBeFalsy();
            });
            xit('get testing input should return one for each', function () {
                var testing = network.getTestingInputs();
                expect(testing.input.length).toBe(1);
                expect(testing.output).toBeDefined();
                if (testing.output) {
                    expect(testing.output.length).toBe(1);
                }
            });
            xit('set recorded one step should call recorder', function () { return __awaiter(void 0, void 0, void 0, function () {
                var recorder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recorder = jasmine.createSpyObj('RecorderService', ['record']);
                            network.setRecorderService(recorder);
                            return [4 /*yield*/, network.step()];
                        case 1:
                            _a.sent();
                            expect(recorder.record).toHaveBeenCalledTimes(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('training few steps should be able to predict the training set', function () { return __awaiter(void 0, void 0, void 0, function () {
                var i, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 1000)) return [3 /*break*/, 4];
                            return [4 /*yield*/, network.step()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            ++i;
                            return [3 /*break*/, 1];
                        case 4:
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = network.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('export and import without minimial should be able to train', function () { return __awaiter(void 0, void 0, void 0, function () {
                var json, newNetwork, i, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network.export(false)];
                        case 1:
                            json = _a.sent();
                            return [4 /*yield*/, (new feed_forward_network_1.FeedForwardNetwork()).import(json, false)];
                        case 2:
                            newNetwork = _a.sent();
                            i = 0;
                            _a.label = 3;
                        case 3:
                            if (!(i < 1000)) return [3 /*break*/, 6];
                            return [4 /*yield*/, newNetwork.step()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            ++i;
                            return [3 /*break*/, 3];
                        case 6:
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = newNetwork.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('train most export and import without minimial should be able to train rest', function () { return __awaiter(void 0, void 0, void 0, function () {
                var i, json, newNetwork, i, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 900)) return [3 /*break*/, 4];
                            return [4 /*yield*/, network.step()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            ++i;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, network.export(false)];
                        case 5:
                            json = _a.sent();
                            return [4 /*yield*/, (new feed_forward_network_1.FeedForwardNetwork()).import(json, false)];
                        case 6:
                            newNetwork = _a.sent();
                            i = 0;
                            _a.label = 7;
                        case 7:
                            if (!(i < 100)) return [3 /*break*/, 10];
                            return [4 /*yield*/, newNetwork.step()];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            ++i;
                            return [3 /*break*/, 7];
                        case 10:
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = newNetwork.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('testing after export minimal should still work', function () { return __awaiter(void 0, void 0, void 0, function () {
                var i, json, newNetwork, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 100)) return [3 /*break*/, 4];
                            return [4 /*yield*/, network.step()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            ++i;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, network.export(true)];
                        case 5:
                            json = _a.sent();
                            return [4 /*yield*/, (new feed_forward_network_1.FeedForwardNetwork()).import(json, true)];
                        case 6:
                            newNetwork = _a.sent();
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = newNetwork.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('after options with regularization', function () {
            beforeEach(function (done) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
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
                            return [4 /*yield*/, network.getOptions().executeCommand('yes')];
                        case 1:
                            _a.sent();
                            network.initialize();
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('expect finish training to be false', function () {
                expect(network.finishTraining()).toBeFalsy();
            });
            it('get testing input should return one for each', function () {
                var testing = network.getTestingInputs();
                expect(testing.input.length).toBe(1);
                expect(testing.output).toBeDefined();
                if (testing.output) {
                    expect(testing.output.length).toBe(1);
                }
            });
            it('set recorded one step should call recorder', function () { return __awaiter(void 0, void 0, void 0, function () {
                var recorder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            recorder = jasmine.createSpyObj('RecorderService', ['record']);
                            network.setRecorderService(recorder);
                            return [4 /*yield*/, network.step()];
                        case 1:
                            _a.sent();
                            expect(recorder.record).toHaveBeenCalledTimes(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('training few steps should be able to predict the training set', function () { return __awaiter(void 0, void 0, void 0, function () {
                var i, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 100)) return [3 /*break*/, 4];
                            return [4 /*yield*/, network.step()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            ++i;
                            return [3 /*break*/, 1];
                        case 4:
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = network.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('export and import without minimial should be able to train', function () { return __awaiter(void 0, void 0, void 0, function () {
                var json, newNetwork, i, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network.export(false)];
                        case 1:
                            json = _a.sent();
                            return [4 /*yield*/, (new feed_forward_network_1.FeedForwardNetwork()).import(json, false)];
                        case 2:
                            newNetwork = _a.sent();
                            i = 0;
                            _a.label = 3;
                        case 3:
                            if (!(i < 100)) return [3 /*break*/, 6];
                            return [4 /*yield*/, newNetwork.step()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            ++i;
                            return [3 /*break*/, 3];
                        case 6:
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = newNetwork.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('train most export and import without minimial should be able to train rest', function () { return __awaiter(void 0, void 0, void 0, function () {
                var i, json, newNetwork, i, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 100)) return [3 /*break*/, 4];
                            return [4 /*yield*/, network.step()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            ++i;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, network.export(false)];
                        case 5:
                            json = _a.sent();
                            return [4 /*yield*/, (new feed_forward_network_1.FeedForwardNetwork()).import(json, false)];
                        case 6:
                            newNetwork = _a.sent();
                            i = 0;
                            _a.label = 7;
                        case 7:
                            if (!(i < 100)) return [3 /*break*/, 10];
                            return [4 /*yield*/, newNetwork.step()];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            ++i;
                            return [3 /*break*/, 7];
                        case 10:
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = newNetwork.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            xit('testing after export minimal should still work', function () { return __awaiter(void 0, void 0, void 0, function () {
                var i, json, newNetwork, i, actual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 110)) return [3 /*break*/, 4];
                            return [4 /*yield*/, network.step()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            ++i;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, network.export(true)];
                        case 5:
                            json = _a.sent();
                            return [4 /*yield*/, (new feed_forward_network_1.FeedForwardNetwork()).import(json, true)];
                        case 6:
                            newNetwork = _a.sent();
                            for (i = 0; i < testingInput.output.examples.length; ++i) {
                                actual = newNetwork.test({ 'input': testingInput.input.examples[i] });
                                expect(actual.output).toEqual(testingInput.output.examples[i]);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
