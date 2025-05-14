export type UsuarioResposta = {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    tipo: 'Paciente' | 'Medico';
    pacienteId?: number | null;
    medicoId?: number | null;
  };
};