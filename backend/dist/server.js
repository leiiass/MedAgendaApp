"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const consulta_routes_1 = __importDefault(require("./routes/consulta.routes"));
const especialidade_routes_1 = __importDefault(require("./routes/especialidade.routes"));
const exame_routes_1 = __importDefault(require("./routes/exame.routes"));
const medico_routes_1 = __importDefault(require("./routes/medico.routes"));
const paciente_routes_1 = __importDefault(require("./routes/paciente.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use("/auth", auth_routes_1.default);
app.use("/consultas", consulta_routes_1.default);
app.use("/especialidades", especialidade_routes_1.default);
app.use("/exames", exame_routes_1.default);
app.use("/medicos", medico_routes_1.default);
app.use("/pacientes", paciente_routes_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
