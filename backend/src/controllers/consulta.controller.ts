import { Request, Response } from "express";

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

export const getAllConsultas = async (req: Request, res: Response) => {
  const { status, medicoId, pacienteId, dataInicio, dataFim } = req.query;

  let filteredConsultas = [...consultas];

  if (status) {
    filteredConsultas = filteredConsultas.filter((c) => c.status === status);
  }

  if (medicoId) {
    filteredConsultas = filteredConsultas.filter(
      (c) => c.medicoId === Number(medicoId)
    );
  }

  if (pacienteId) {
    filteredConsultas = filteredConsultas.filter(
      (c) => c.pacienteId === Number(pacienteId)
    );
  }

  if (dataInicio) {
    filteredConsultas = filteredConsultas.filter(
      (c) => new Date(c.data) >= new Date(dataInicio as string)
    );
  }

  if (dataFim) {
    filteredConsultas = filteredConsultas.filter(
      (c) => new Date(c.data) <= new Date(dataFim as string)
    );
  }

  res.json(filteredConsultas);
};

export const getConsultaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const consulta = consultas.find((c) => c.id === Number(id));

  if (!consulta) {
    return res.status(404).json({ message: "Consulta não encontrada" });
  }

  res.json(consulta);
};

export const createConsulta = async (req: Request, res: Response) => {
  const newConsulta = {
    id: consultas.length + 1,
    ...req.body,
    status: "agendada",
  };

  consultas.push(newConsulta);
  res.status(201).json(newConsulta);
};

export const updateConsulta = async (req: Request, res: Response) => {
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

export const updateConsultaStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const consultaIndex = consultas.findIndex((c) => c.id === Number(id));

  if (consultaIndex === -1) {
    return res.status(404).json({ message: "Consulta não encontrada" });
  }

  consultas[consultaIndex].status = status;
  res.json(consultas[consultaIndex]);
};

export const deleteConsulta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const consultaIndex = consultas.findIndex((c) => c.id === Number(id));

  if (consultaIndex === -1) {
    return res.status(404).json({ message: "Consulta não encontrada" });
  }

  consultas.splice(consultaIndex, 1);
  res.status(204).send();
};

export const getConsultasByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;
  const filteredConsultas = consultas.filter((c) => c.status === status);
  res.json(filteredConsultas);
};

export const getConsultasByPaciente = async (req: Request, res: Response) => {
  const { pacienteId } = req.params;
  const filteredConsultas = consultas.filter(
    (c) => c.pacienteId === Number(pacienteId)
  );
  res.json(filteredConsultas);
};

export const getConsultasByMedico = async (req: Request, res: Response) => {
  const { medicoId } = req.params;
  const filteredConsultas = consultas.filter(
    (c) => c.medicoId === Number(medicoId)
  );
  res.json(filteredConsultas);
};
