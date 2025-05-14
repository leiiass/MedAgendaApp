import { Usuario } from '@/modelos/Usuario';
import { UsuarioResposta } from '@/modelos/UsuarioResposta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export const authService = {
  async login(email: string, senha: string): Promise<UsuarioResposta> {
    const resposta = await api.post('/autenticacao/login', { email, password: senha });

    await AsyncStorage.setItem('token', resposta.token);
    await AsyncStorage.setItem('usuarioLogado', JSON.stringify(resposta.user));

    return resposta;
  },

  async register(usuario: Usuario): Promise<UsuarioResposta> {
    return await api.post('/autenticacao/register', usuario);
  },

  async logout(): Promise<{ mensagem: string }> {
    return await api.post('/autenticacao/logout', {});
  },

  async me(token: string): Promise<{ id: string; nome: string; email: string }> {
    return await api.get('/autenticacao/me', {
      Authorization: `Bearer ${token}`,
    });
  }
};
