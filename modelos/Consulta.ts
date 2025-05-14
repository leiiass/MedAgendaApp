import { Especialidade } from "./Especialidade";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export type Consulta = {
  id?: number;
  pacienteId: number;
  paciente: Paciente,
  medicoId: number;
  medico: Medico,
  especialidade: Especialidade;
  dataHora: string; 
  status: 'Agendada' | 'Cancelada' | 'Realizada';
};