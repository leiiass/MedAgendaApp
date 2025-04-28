
import api from './api';
import { Consulta, ConsultaStatus } from '../types/entities';

interface ConsultaFilterParams {
  status?: ConsultaStatus;
  medicoId?: number;
  pacienteId?: number;
  dataInicio?: string;
  dataFim?: string;
}

const consultaService = {
  getAll: async (params?: ConsultaFilterParams): Promise<Consulta[]> => {
    const response = await api.get<Consulta[]>('/consultas', { params });
    return response.data;
  },
  
  getById: async (id: number): Promise<Consulta> => {
    const response = await api.get<Consulta>(`/consultas/${id}`);
    return response.data;
  },
  
  create: async (consulta: Omit<Consulta, 'id'>): Promise<Consulta> => {
    const response = await api.post<Consulta>('/consultas', consulta);
    return response.data;
  },
  
  update: async (id: number, consulta: Partial<Omit<Consulta, 'id'>>): Promise<Consulta> => {
    const response = await api.put<Consulta>(`/consultas/${id}`, consulta);
    return response.data;
  },
  
  updateStatus: async (id: number, status: ConsultaStatus): Promise<Consulta> => {
    const response = await api.patch<Consulta>(`/consultas/${id}/status`, { status });
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/consultas/${id}`);
  },
  
  getByStatus: async (status: ConsultaStatus): Promise<Consulta[]> => {
    const response = await api.get<Consulta[]>('/consultas', { params: { status } });
    return response.data;
  },
  
  getByPaciente: async (pacienteId: number): Promise<Consulta[]> => {
    const response = await api.get<Consulta[]>('/consultas', { params: { pacienteId } });
    return response.data;
  },
  
  getByMedico: async (medicoId: number): Promise<Consulta[]> => {
    const response = await api.get<Consulta[]>('/consultas', { params: { medicoId } });
    return response.data;
  },
};

export default consultaService;
