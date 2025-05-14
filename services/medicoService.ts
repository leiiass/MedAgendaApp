import { Medico } from '@/modelos/Medico';
import api from './api';

export const medicoService = {
  async completarCadastro(medico: Medico, token: string): Promise<void> {
    await api.post('/medico/completar-cadastro', medico, {
      Authorization: `Bearer ${token}`,
    });
  },

  async obterPorId(id: number, token: string): Promise<Medico> {
    return await api.get(`/medico/${id}`, {
      Authorization: `Bearer ${token}`,
    });
  },

  async obterTodos(token: string): Promise<Medico[]> {
    return await api.get('/medico', {
      Authorization: `Bearer ${token}`,
    });
  },
};
