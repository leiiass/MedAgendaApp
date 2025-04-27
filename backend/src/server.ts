import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import consultaRoutes from "./routes/consulta.routes";
import especialidadeRoutes from "./routes/especialidade.routes";
import exameRoutes from "./routes/exame.routes";
import medicoRoutes from "./routes/medico.routes";
import pacienteRoutes from "./routes/paciente.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/consultas", consultaRoutes);
app.use("/especialidades", especialidadeRoutes);
app.use("/exames", exameRoutes);
app.use("/medicos", medicoRoutes);
app.use("/pacientes", pacienteRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
