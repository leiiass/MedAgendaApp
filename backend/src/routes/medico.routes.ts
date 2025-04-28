import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

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

export default router;
