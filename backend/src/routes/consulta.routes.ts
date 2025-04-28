import { Router } from "express";
import {
  createConsulta,
  deleteConsulta,
  getAllConsultas,
  getConsultaById,
  getConsultasByMedico,
  getConsultasByPaciente,
  getConsultasByStatus,
  updateConsulta,
  updateConsultaStatus,
} from "../controllers/consulta.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllConsultas);
router.get("/:id", getConsultaById);
router.post("/", createConsulta);
router.put("/:id", updateConsulta);
router.patch("/:id/status", updateConsultaStatus);
router.delete("/:id", deleteConsulta);
router.get("/status/:status", getConsultasByStatus);
router.get("/paciente/:pacienteId", getConsultasByPaciente);
router.get("/medico/:medicoId", getConsultasByMedico);

export default router;
