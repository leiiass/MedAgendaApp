"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConsultasByMedico = exports.getConsultasByPaciente = exports.getConsultasByStatus = exports.deleteConsulta = exports.updateConsultaStatus = exports.updateConsulta = exports.createConsulta = exports.getConsultaById = exports.getAllConsultas = void 0;
// Dados mockados para simulação
const consultas = [
    {
        id: 1,
        pacienteId: 1,
        medicoId: 1,
        data: "2024-03-20T10:00:00",
        status: "agendada",
        tipo: "consulta",
        observacoes: "Primeira consulta",
    },
];
const getAllConsultas = async (req, res) => {
    const { status, medicoId, pacienteId, dataInicio, dataFim } = req.query;
    let filteredConsultas = [...consultas];
    if (status) {
        filteredConsultas = filteredConsultas.filter((c) => c.status === status);
    }
    if (medicoId) {
        filteredConsultas = filteredConsultas.filter((c) => c.medicoId === Number(medicoId));
    }
    if (pacienteId) {
        filteredConsultas = filteredConsultas.filter((c) => c.pacienteId === Number(pacienteId));
    }
    if (dataInicio) {
        filteredConsultas = filteredConsultas.filter((c) => new Date(c.data) >= new Date(dataInicio));
    }
    if (dataFim) {
        filteredConsultas = filteredConsultas.filter((c) => new Date(c.data) <= new Date(dataFim));
    }
    res.json(filteredConsultas);
};
exports.getAllConsultas = getAllConsultas;
const getConsultaById = async (req, res) => {
    const { id } = req.params;
    const consulta = consultas.find((c) => c.id === Number(id));
    if (!consulta) {
        return res.status(404).json({ message: "Consulta não encontrada" });
    }
    res.json(consulta);
};
exports.getConsultaById = getConsultaById;
const createConsulta = async (req, res) => {
    const newConsulta = {
        id: consultas.length + 1,
        ...req.body,
        status: "agendada",
    };
    consultas.push(newConsulta);
    res.status(201).json(newConsulta);
};
exports.createConsulta = createConsulta;
const updateConsulta = async (req, res) => {
    const { id } = req.params;
    const consultaIndex = consultas.findIndex((c) => c.id === Number(id));
    if (consultaIndex === -1) {
        return res.status(404).json({ message: "Consulta não encontrada" });
    }
    const updatedConsulta = {
        ...consultas[consultaIndex],
        ...req.body,
        id: Number(id),
    };
    consultas[consultaIndex] = updatedConsulta;
    res.json(updatedConsulta);
};
exports.updateConsulta = updateConsulta;
const updateConsultaStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const consultaIndex = consultas.findIndex((c) => c.id === Number(id));
    if (consultaIndex === -1) {
        return res.status(404).json({ message: "Consulta não encontrada" });
    }
    consultas[consultaIndex].status = status;
    res.json(consultas[consultaIndex]);
};
exports.updateConsultaStatus = updateConsultaStatus;
const deleteConsulta = async (req, res) => {
    const { id } = req.params;
    const consultaIndex = consultas.findIndex((c) => c.id === Number(id));
    if (consultaIndex === -1) {
        return res.status(404).json({ message: "Consulta não encontrada" });
    }
    consultas.splice(consultaIndex, 1);
    res.status(204).send();
};
exports.deleteConsulta = deleteConsulta;
const getConsultasByStatus = async (req, res) => {
    const { status } = req.params;
    const filteredConsultas = consultas.filter((c) => c.status === status);
    res.json(filteredConsultas);
};
exports.getConsultasByStatus = getConsultasByStatus;
const getConsultasByPaciente = async (req, res) => {
    const { pacienteId } = req.params;
    const filteredConsultas = consultas.filter((c) => c.pacienteId === Number(pacienteId));
    res.json(filteredConsultas);
};
exports.getConsultasByPaciente = getConsultasByPaciente;
const getConsultasByMedico = async (req, res) => {
    const { medicoId } = req.params;
    const filteredConsultas = consultas.filter((c) => c.medicoId === Number(medicoId));
    res.json(filteredConsultas);
};
exports.getConsultasByMedico = getConsultasByMedico;
