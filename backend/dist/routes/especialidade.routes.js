"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Endpoints mockados
router.get("/", (req, res) => {
    res.json([
        { id: 1, nome: "Clínico Geral" },
        { id: 2, nome: "Cardiologia" },
        { id: 3, nome: "Dermatologia" },
    ]);
});
exports.default = router;
