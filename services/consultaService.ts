import { Consulta } from '@/modelos/Consulta';
import { ConsultaCriacao } from '@/modelos/ConsultaCriacao';
import api from './api';

export const consultaService = {
  async obterTodas(token: string): Promise<Consulta[]> {
    const response = await api.get('/consulta', {
      Authorization: `Bearer ${token}`,
    });
    return response;
  },

  async obterPorId(id: number, token: string): Promise<Consulta> {
    const response = await api.get(`/consulta/${id}`, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  },

  async criar(consulta: ConsultaCriacao, token: string): Promise<void> {
    await api.post('/consulta', consulta, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  },

  async obterPorPacienteId(pacienteId: number, token: string): Promise<Consulta[]> {
    return await api.get(`/consulta/por-paciente/${pacienteId}`, {
      Authorization: `Bearer ${token}`,
    });
  },

  async obterPorMedicoId(medicoId: number, token: string): Promise<Consulta[]> {
    return await api.get(`/consulta/por-medico/${medicoId}`, {
      Authorization: `Bearer ${token}`,
    });
  }


  //   async editar(id: number, consulta: Consulta, token: string): Promise<void> {
  //     const consultaFormatada = {
  //       ...consulta,
  //       dataHora: dayjs(consulta.dataHora).format('YYYY-MM-DDTHH:mm:ss')
  //     };

  //     await api.put(`/consulta/${id}`, consultaFormatada, {
  //       Authorization: `Bearer ${token}`,
  //     });
  //   },

  //   async remover(id: number, token: string): Promise<void> {
  //     await api.delete(`/consulta/${id}`, {
  //       Authorization: `Bearer ${token}`,
  //     });
  //   },
};
