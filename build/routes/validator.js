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
const fs_1 = __importDefault(require("fs"));
const thumbread = (props) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.readFile(props.target, function (err, data) {
        if (err) {
            props.res.send(err);
        } // Fail if the file can't be read.
        props.res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        return props.res.end(data); // Send the file data to the browser.
    });
});
exports.default = thumbread;
