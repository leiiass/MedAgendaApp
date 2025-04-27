"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Endpoints mockados
router.get("/", (req, res) => {
    res.json([
        { id: 1, nome: "Hemograma", descricao: "Exame de sangue completo" },
        { id: 2, nome: "Eletrocardiograma", descricao: "Exame do coração" },
        { id: 3, nome: "Raio-X", descricao: "Exame de imagem" },
    ]);
});
exports.default = router;
