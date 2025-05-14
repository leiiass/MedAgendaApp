import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

// Endpoints mockados
router.get("/", (req, res) => {
  res.json([
    { id: 1, nome: "Clínico Geral" },
    { id: 2, nome: "Cardiologia" },
    { id: 3, nome: "Dermatologia" },
  ]);
});

export default router;
