
export interface Especialidade {
  id: number;
  nome: string;
}

export interface Medico {
  id: number;
  nome: string;
  crm: string;
  email: string;
  telefone: string;
  especialidadeId: number;
  especialidade?: Especialidade;
}

export interface Paciente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string; // ISO date string format
}

export type ConsultaStatus = 'Agendada' | 'Cancelada' | 'Realizada' | 'Pendente';

export interface Consulta {
  id: number;
  pacienteId: number;
  paciente?: Paciente;
  medicoId: number;
  medico?: Medico;
  dataHora: string; // ISO date-time string
  status: ConsultaStatus;
}

export type ExameStatus = 'Agendado' | 'Cancelado' | 'Realizado' | 'Pendente';

export interface Exame {
  id: number;
  pacienteId: number;
  paciente?: Paciente;
  medicoId: number;
  medico?: Medico;
  tipo: string;
  dataHora: string; // ISO date-time string
  status: ExameStatus;
  resultado?: string;
}

export interface User {
  id: number;
  email: string;
  nome: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
