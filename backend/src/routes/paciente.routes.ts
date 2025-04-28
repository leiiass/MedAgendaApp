import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

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

export default router;
