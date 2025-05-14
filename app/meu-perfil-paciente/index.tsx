import { Paciente } from '@/modelos/Paciente';
import { pacienteService } from '@/services/pacienteService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MeuPerfilPacienteScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [camposInvalidos, setCamposInvalidos] = useState<string[]>([]);

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await AsyncStorage.getItem('usuarioLogado');
      const token = await AsyncStorage.getItem('token');
  
      if (dados && token) {
        const user = JSON.parse(dados);
        setNome(user.nome || '');
        setEmail(user.email || '');
  
        if (user.pacienteId) {
          const paciente = await pacienteService.obterPorId(user.pacienteId, token);
          setNome(paciente.nome);
          setEmail(paciente.email);
          setTelefone(paciente.telefone);
          setNascimento(dayjs(paciente.dataNascimento).format('DD/MM/YYYY'));
        }
      }
    };
  
    carregarDados();
  }, []);
  
  const validarCampos = () => {
    const invalidos = [];

    if (!nome) invalidos.push('nome');
    if (!nascimento) invalidos.push('nascimento');
    if (!email) invalidos.push('email');
    if (!telefone) invalidos.push('telefone');
    if (!senha) invalidos.push('senha');

    setCamposInvalidos(invalidos);
    return invalidos.length === 0;
  };

  const aoClicarEmSalvar = async () => {
    if (!validarCampos()) return;

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const paciente: Paciente = {
      nome,
      email,
      telefone,
      dataNascimento: new Date(nascimento),
    };

    try {
      await pacienteService.completarCadastro(paciente, token);

      Alert.alert('Sucesso', 'Cadastro concluído com sucesso!');
      router.push('/dashboard');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao salvar paciente');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.voltarTexto}>voltar</Text>
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/avatar.jpg')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.avatarEdit}>
          <Ionicons name="sync" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Input label="nome completo" icon="person-outline" value={nome} onChangeText={setNome} invalid={camposInvalidos.includes('nome')} />
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>data de nascimento</Text>
          <View style={[styles.inputBox, camposInvalidos.includes('nascimento') && { borderColor: '#f87171', borderWidth: 1 }]}>
            <Ionicons name="calendar-outline" size={16} color="#aaa" />
            <TextInputMask
              type={'datetime'}
              options={{ format: 'DD/MM/YYYY' }}
              value={nascimento}
              onChangeText={setNascimento}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
          </View>
        </View>
        <Input label="e-mail" icon="mail-outline" value={email} onChangeText={setEmail} invalid={camposInvalidos.includes('email')} />
        <Input label="telefone" icon="call-outline" value={telefone} onChangeText={setTelefone} invalid={camposInvalidos.includes('telefone')} />
        <Input label="senha" icon="lock-closed-outline" value={senha} onChangeText={setSenha} secureTextEntry invalid={camposInvalidos.includes('senha')} />

        <TouchableOpacity style={styles.botaoSalvar} onPress={aoClicarEmSalvar}>
          <Text style={styles.textoSalvar}>salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar}>
          <Text style={styles.textoCancelar}>cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Input({ label, icon, invalid, ...props }: any) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputBox, invalid && { borderColor: '#f87171', borderWidth: 1 }]}>
        <Ionicons name={icon} size={16} color="#aaa" />
        <TextInput style={styles.input} placeholderTextColor="#aaa" {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#a18cd1',
    flexGrow: 1,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  voltarTexto: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 16,
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  form: {
    width: '100%',
    backgroundColor: '#eef2ff',
    padding: 20,
    borderRadius: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    textTransform: 'lowercase',
    fontSize: 12,
    color: '#444',
    marginBottom: 4,
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: '#333',
  },
  botaoSalvar: {
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  textoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoCancelar: {
    backgroundColor: '#f87171',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  textoCancelar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});