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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const index_1 = require("./../index");
const resize_1 = require("../routes/resize");
const processor_1 = __importDefault(require("../routes/processor"));
/*const fullimagepath  = path.resolve(imagespath, `foo.jpg`)
    const fullresizedpath =
        
        path.resolve(resizedpath, `foo.jpg`)
      
*/
const request = (0, supertest_1.default)(index_1.app);
describe('Test responses from endpoints', () => {
    describe('endpoint: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /resize', () => {
        it('gets /resize?filename=fjord (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/resize?filename=fjord');
            expect(response.status).toBe(200);
        }));
        it('gets /resize?filename=fjord&width=500&height=500 (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/resize?filename=fjord&width=500&height=500');
            expect(response.status).toBe(200);
        }));
        it('gets /resize?filename=fjord&width=-500&height=500 (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/resize?filename=fjord&width=-500&height=500');
            expect(response.status).toBe(200);
        }));
        it('gets /resize (no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/resize');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /foo', () => {
        it('returns 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/foo');
            expect(response.status).toBe(404);
        }));
    });
});
const args = {
    filename: 'foo',
    width: '-100',
    height: '-100'
};
const fulladdress = (0, resize_1.getfull)(args);
describe('Test image processing via sharp', () => {
    it('raises an error )', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, processor_1.default)({
            source: fulladdress.fullimagepath,
            target: fulladdress.fullresizedpath,
            width: fulladdress.w,
            height: fulladdress.h
        });
        expect(error).not.toBeNull();
    }));
});
const args2 = {
    filename: 'foo',
    width: '100',
    height: '100',
};
const fulladdress2 = (0, resize_1.getfull)(args2);
it('raises an error ', () => __awaiter(void 0, void 0, void 0, function* () {
    const error = yield (0, processor_1.default)({
        source: fulladdress2.fullimagepath,
        target: fulladdress2.fullresizedpath,
        width: fulladdress2.w,
        height: fulladdress2.h,
    });
    expect(error).not.toBeNull();
}));
const args3 = {
    filename: 'fjord',
    width: '100',
    height: '100',
};
const fulladdress3 = (0, resize_1.getfull)(args3);
it(' creates a thumb and save it to disk', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, processor_1.default)({
        source: fulladdress3.fullimagepath,
        target: fulladdress3.fullresizedpath,
        width: fulladdress3.w,
        height: fulladdress3.h,
    });
    let errorFile = '';
    try {
        yield fs_1.promises.access(fulladdress3.fullresizedpath);
        errorFile = null;
    }
    catch (_a) {
        errorFile = 'File was not created';
    }
    expect(errorFile).toBeNull();
}));
// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path_1.default.resolve(resize_1.resizedpath, 'fjord-500x500.jpg');
    try {
        yield fs_1.promises.access(resizedImagePath);
        fs_1.promises.unlink(resizedImagePath);
        yield fs_1.promises.access(fulladdress3.fullresizedpath);
        fs_1.promises.unlink(fulladdress3.fullresizedpath);
    }
    catch (_b) {
        // intentionally left blank
    }
}));
