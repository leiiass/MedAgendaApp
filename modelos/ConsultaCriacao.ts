import { Especialidade } from "./Especialidade";

export type ConsultaCriacao = {
  pacienteId: number;
  medicoId: number;
  especialidade: Especialidade;
  dataHora: string;
  status: 'Agendada' | 'Cancelada' | 'Realizada';
};
