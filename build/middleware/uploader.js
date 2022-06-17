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
exports.uploader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagespath = path_1.default.resolve(__dirname, '../../imageset/images');
    const resizedpath = path_1.default.resolve(__dirname, '../../imageset/resized');
    const fullimagepath = path_1.default.resolve(imagespath, `${req.query.filename}.jpg`);
    const fullresizedpath = req.query.width && req.query.height
        ? path_1.default.resolve(resizedpath, `${req.query.filename}-${req.query.width}x${req.query.height}.jpg`)
        : path_1.default.resolve(imagespath, `${req.query.filename}.jpg`);
    fs_1.default.readFile(fullresizedpath, function (err, data) {
        if (err) {
            console.log(err);
        } // Fail if the file can't be read.
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data); // Send the file data to the browser.
    });
});
exports.uploader = uploader;
