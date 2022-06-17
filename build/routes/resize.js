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
exports.getfull = exports.resizedpath = exports.imagespath = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const processor_1 = __importDefault(require("./processor"));
const validator_1 = __importDefault(require("./validator"));
const router = (0, express_1.Router)();
let errorflag = '';
exports.imagespath = path_1.default.resolve(__dirname, '../../imageset/images');
exports.resizedpath = path_1.default.resolve(__dirname, '../../imageset/resized');
router.use((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Time: ', Date.now());
    const fullpaths = (0, exports.getfull)(req.query);
    const source = fullpaths.fullimagepath;
    const target = fullpaths.fullresizedpath;
    const width = parseInt(fullpaths.width);
    const height = parseInt(fullpaths.height);
    yield checker(req.query, req, res);
    if (fs_1.default.existsSync(fullpaths.fullresizedpath) && errorflag === '') {
        // res.send(fullpaths.fullresizedpath)
        return yield (0, validator_1.default)({ target, req, res });
    }
    else {
        if (errorflag === '') {
            yield (0, processor_1.default)({ source, target, width, height });
            res.send('request again to view file ');
        }
        else {
            console.log(errorflag);
        }
        //const fullpaths = getfull(req.query)
    }
    errorflag = '';
}));
function checker(props, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const fullpaths = (0, exports.getfull)(props);
        const width = fullpaths.w;
        const height = fullpaths.h;
        if (typeof props.filename === 'undefined' ||
            props.filename === '' ||
            width <= 0 ||
            height <= 0) {
            errorflag =
                'something is wrong with the parameters recheck the inputs and make sure your url looks like this : http://localhost:9090/resize?filename=fjord or this : http://localhost:9090/resize?filename=fjord&width=500&height=500 ';
            return res.send(errorflag);
        }
        else if (!fs_1.default.existsSync(fullpaths.fullimagepath)) {
            const files = [];
            fs_1.default.readdirSync(exports.imagespath).forEach(filename => {
                const name = path_1.default.parse(filename).name;
                const filepath = path_1.default.resolve(exports.imagespath, filename);
                const stat = fs_1.default.statSync(filepath);
                const isFile = stat.isFile();
                if (isFile)
                    files.push(name);
            });
            errorflag = `available files are : ' ${files} '  `;
            return res.send(errorflag);
        }
        else {
            return;
        }
    });
}
const getfull = (props) => {
    const width = props.width || props.w;
    const height = props.height || props.h;
    const w = parseInt(width);
    const h = parseInt(height);
    const fullimagepath = path_1.default.resolve(exports.imagespath, `${props.filename}.jpg`);
    const fullresizedpath = width && height
        ? path_1.default.resolve(exports.resizedpath, `${props.filename}-${width}x${height}.jpg`)
        : path_1.default.resolve(exports.imagespath, `${props.filename}.jpg`);
    const rare = { fullimagepath, fullresizedpath, width, height, w, h };
    return rare;
};
exports.getfull = getfull;
exports.default = router;
