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
            nome: "Dr. João Silva",
            especialidade: "Clínico Geral",
            crm: "12345",
        },
        {
            id: 2,
            nome: "Dra. Maria Santos",
            especialidade: "Cardiologia",
            crm: "67890",
        },
        {
            id: 3,
            nome: "Dr. Pedro Oliveira",
            especialidade: "Dermatologia",
            crm: "54321",
        },
    ]);
});
exports.default = router;
