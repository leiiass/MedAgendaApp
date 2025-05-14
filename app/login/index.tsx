import { authService } from '@/services/authService';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    const sucesso = await authService.login(email, senha);
    try {
      const resposta = await authService.login(email, senha);
      const { token, user } = resposta;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('usuarioLogado', JSON.stringify(user));

      if (user.tipo === 'Paciente') {
        if (!user.pacienteId) {
          router.push('/meu-perfil-paciente');
        } else {
          router.push('/dashboard');
        }
      } else if (user.tipo === 'Medico') {
        if (!user.medicoId) {
          router.push('/meu-perfil-medico');
        } else {
          router.push('/dashboard-medico');
        }
      } else {
        Alert.alert('Erro', 'Tipo de usuário inválido.');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesome5 name="calendar-plus" size={60} color="#9b59b6" style={{ marginBottom: 12 }} />
      <Text style={styles.title}>Med Agenda</Text>

      <Text style={styles.subtitle}>Entre com suas credenciais para acessar sua conta</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={senha}
        onChangeText={setSenha} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Não tem uma conta?
        <Text style={styles.link} onPress={() => router.push('/register')}> Registre-se</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    color: '#4f4f4f',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#9b59b6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 16,
  },
  link: {
    color: '#9b59b6',
    fontWeight: '500',
  },
});
