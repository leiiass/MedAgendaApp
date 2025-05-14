
import api from './api';
import { Exame, ExameStatus } from '../types/entities';

interface ExameFilterParams {
  status?: ExameStatus;
  medicoId?: number;
  pacienteId?: number;
  dataInicio?: string;
  dataFim?: string;
  tipo?: string;
}

const exameService = {
  getAll: async (params?: ExameFilterParams): Promise<Exame[]> => {
    const response = await api.get<Exame[]>('/exames', { params });
    return response.data;
  },
  
  getById: async (id: number): Promise<Exame> => {
    const response = await api.get<Exame>(`/exames/${id}`);
    return response.data;
  },
  
  create: async (exame: Omit<Exame, 'id'>): Promise<Exame> => {
    const response = await api.post<Exame>('/exames', exame);
    return response.data;
  },
  
  update: async (id: number, exame: Partial<Omit<Exame, 'id'>>): Promise<Exame> => {
    const response = await api.put<Exame>(`/exames/${id}`, exame);
    return response.data;
  },
  
  updateStatus: async (id: number, status: ExameStatus): Promise<Exame> => {
    const response = await api.patch<Exame>(`/exames/${id}/status`, { status });
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/exames/${id}`);
  },
  
  getByStatus: async (status: ExameStatus): Promise<Exame[]> => {
    const response = await api.get<Exame[]>('/exames', { params: { status } });
    return response.data;
  },
  
  getByPaciente: async (pacienteId: number): Promise<Exame[]> => {
    const response = await api.get<Exame[]>('/exames', { params: { pacienteId } });
    return response.data;
  },
  
  getByMedico: async (medicoId: number): Promise<Exame[]> => {
    const response = await api.get<Exame[]>('/exames', { params: { medicoId } });
    return response.data;
  },
  
  addResultado: async (id: number, resultado: string): Promise<Exame> => {
    const response = await api.patch<Exame>(`/exames/${id}/resultado`, { resultado });
    return response.data;
  },
};

export default exameService;
