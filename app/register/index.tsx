import { authService } from '@/services/authService';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [userType, setUserType] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !password || !userType) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const tipoFormatado = userType === 'medico' ? 'Medico' : 'Paciente';

      await authService.register({
        nome,
        email,
        password,
        tipo: tipoFormatado,
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/login');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha seus dados para criar uma nova conta</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput style={styles.input} placeholder="João Silva" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>E-mail</Text>
      <TextInput style={styles.input} placeholder="seu@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="******" secureTextEntry value={password} onChangeText={setSenha} />

      <Text style={styles.label}>Tipo de Usuário</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userType}
          onValueChange={(itemValue) => setUserType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Paciente" value="paciente" />
          <Picker.Item label="Médico" value="medico" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Já tem uma conta?
        <Text style={styles.link} onPress={() => router.push('/login')}> Entrar</Text>
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
  pickerContainer: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    width: '100%',
    height: 50,
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