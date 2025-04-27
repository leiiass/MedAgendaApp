
import api from './api';
import { Medico } from '../types/entities';

const medicoService = {
  getAll: async (): Promise<Medico[]> => {
    const response = await api.get<Medico[]>('/medicos');
    return response.data;
  },
  
  getById: async (id: number): Promise<Medico> => {
    const response = await api.get<Medico>(`/medicos/${id}`);
    return response.data;
  },
  
  getByEspecialidade: async (especialidadeId: number): Promise<Medico[]> => {
    const response = await api.get<Medico[]>(`/medicos/especialidade/${especialidadeId}`);
    return response.data;
  },
  
  create: async (medico: Omit<Medico, 'id'>): Promise<Medico> => {
    const response = await api.post<Medico>('/medicos', medico);
    return response.data;
  },
  
  update: async (id: number, medico: Omit<Medico, 'id'>): Promise<Medico> => {
    const response = await api.put<Medico>(`/medicos/${id}`, medico);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/medicos/${id}`);
  },
};

export default medicoService;
