"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFound404 = void 0;
const pageNotFound404 = (req, res) => {
    res.status(404);
    res.send('pageNotFound');
};
exports.pageNotFound404 = pageNotFound404;
