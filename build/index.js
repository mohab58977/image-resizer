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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./routes/resize"));
const logger_1 = require("./middleware/logger");
const pageNotFound404_1 = require("./middleware/pageNotFound404");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 9090;
exports.app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readme = path_1.default.resolve(__dirname, '../README.md');
    res.sendFile(readme);
}));
//.../ logger middleware
exports.app.use(logger_1.morganMiddleware);
// Routing
exports.app.use('/resize', resize_1.default);
exports.app.use(pageNotFound404_1.pageNotFound404);
// routes will go here
exports.app.listen(port);
console.log('Server started at http://localhost:' + port);
