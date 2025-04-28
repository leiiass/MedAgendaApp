"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Endpoints mockados
router.get("/", (req, res) => {
    res.json([
        {
            id: 1,
            nome: "Ana Souza",
            cpf: "123.456.789-00",
            dataNascimento: "1990-01-01",
        },
        {
            id: 2,
            nome: "Carlos Lima",
            cpf: "987.654.321-00",
            dataNascimento: "1985-05-15",
        },
        {
            id: 3,
            nome: "Mariana Costa",
            cpf: "456.789.123-00",
            dataNascimento: "1995-10-20",
        },
    ]);
});
exports.default = router;
