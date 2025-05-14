import { Paciente } from '@/modelos/Paciente';
import api from './api';

export const pacienteService = {
  async completarCadastro(paciente: Paciente, token: string): Promise<void> {
    await api.post('/paciente/completar-cadastro', paciente, {
      Authorization: `Bearer ${token}`,
    });
  },

  async obterPorId(id: number, token: string): Promise<Paciente> {
    debugger
    return await api.get(`/paciente/${id}`, {
      Authorization: `Bearer ${token}`,
    });
  },
};
