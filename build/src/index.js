"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.get('/hello', (req, res) => {
    res.send('hello worldaaa');
});
app.listen(port, () => console.log(`Application running on http://localhost:${port}`));
//# sourceMappingURL=index.js.map