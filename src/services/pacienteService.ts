
import api from './api';
import { Paciente } from '../types/entities';

const pacienteService = {
  getAll: async (): Promise<Paciente[]> => {
    const response = await api.get<Paciente[]>('/pacientes');
    return response.data;
  },
  
  getById: async (id: number): Promise<Paciente> => {
    const response = await api.get<Paciente>(`/pacientes/${id}`);
    return response.data;
  },
  
  create: async (paciente: Omit<Paciente, 'id'>): Promise<Paciente> => {
    const response = await api.post<Paciente>('/pacientes', paciente);
    return response.data;
  },
  
  update: async (id: number, paciente: Omit<Paciente, 'id'>): Promise<Paciente> => {
    const response = await api.put<Paciente>(`/pacientes/${id}`, paciente);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/pacientes/${id}`);
  },
};

export default pacienteService;
