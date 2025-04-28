
import api from './api';
import { Especialidade } from '../types/entities';

const especialidadeService = {
  getAll: async (): Promise<Especialidade[]> => {
    const response = await api.get<Especialidade[]>('/especialidades');
    return response.data;
  },
  
  getById: async (id: number): Promise<Especialidade> => {
    const response = await api.get<Especialidade>(`/especialidades/${id}`);
    return response.data;
  },
  
  create: async (especialidade: Omit<Especialidade, 'id'>): Promise<Especialidade> => {
    const response = await api.post<Especialidade>('/especialidades', especialidade);
    return response.data;
  },
  
  update: async (id: number, especialidade: Omit<Especialidade, 'id'>): Promise<Especialidade> => {
    const response = await api.put<Especialidade>(`/especialidades/${id}`, especialidade);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/especialidades/${id}`);
  },
};

export default especialidadeService;
