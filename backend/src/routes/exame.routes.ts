import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

// Endpoints mockados
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      pacienteId: 1,
      medicoId: 1,
      tipo: "Hemograma",
      dataHora: "2024-01-20T10:00:00Z",
      status: "Agendado",
      resultado: null,
    },
    {
      id: 2,
      pacienteId: 2,
      medicoId: 1,
      tipo: "Eletrocardiograma",
      dataHora: "2024-01-21T14:30:00Z",
      status: "Agendado",
      resultado: null,
    },
    {
      id: 3,
      pacienteId: 3,
      medicoId: 2,
      tipo: "Raio-X",
      dataHora: "2024-01-22T09:15:00Z",
      status: "Agendado",
      resultado: null,
    },
  ]);
});

export default router;
