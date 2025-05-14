import { Especialidade } from '../modelos/Especialidade';
import api from './api';

export const especialidadeService = {
  async obterTodas(): Promise<Especialidade[]> {
    return await api.get('/especialidade');
  },

  async obterPorId(id: number): Promise<Especialidade> {
    return await api.get(`/especialidade/${id}`);
  },

  async criar(especialidade: Especialidade): Promise<void> {
    await api.post('/especialidade', especialidade);
  },

  async editar(id: number, especialidade: Especialidade): Promise<void> {
    await api.put(`/especialidade/${id}`, especialidade);
  },

  async remover(id: number): Promise<void> {
    await api.delete(`/especialidade/${id}`);
  }
};
