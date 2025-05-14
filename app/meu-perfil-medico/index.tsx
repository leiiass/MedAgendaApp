import { Especialidade } from '@/modelos/Especialidade';
import { Medico } from '@/modelos/Medico';
import { especialidadeService } from '@/services/especialidadeService';
import { medicoService } from '@/services/medicoService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function MeuPerfilMedicoScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [crm, setcrm] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especialidadeTexto, setEspecialidadeTexto] = useState('');
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

        if (user.medicoId) {
          const medico = await medicoService.obterPorId(user.medicoId, token);
          setNome(medico.nome);
          setEmail(medico.email);
          setTelefone(medico.telefone);
          setcrm(medico.crm);
          setEspecialidadeTexto(medico.especialidade?.nome || '');
        }
      }
    };

    carregarDados();
  }, []);

  const validarCampos = () => {
    const invalidos = [];

    if (!nome) invalidos.push('nome');
    if (!email) invalidos.push('email');
    if (!crm) invalidos.push('crm');
    if (!especialidadeTexto) invalidos.push('especialidade');
    if (!telefone) invalidos.push('telefone');
    if (!senha) invalidos.push('senha');

    setCamposInvalidos(invalidos);
    return invalidos.length === 0;
  };

  const aoSalvarEspecialidade = async (): Promise<Especialidade | null> => {
    const nome = especialidadeTexto.trim();

    if (!nome) return null;

    try {
      const especialidades = await especialidadeService.obterTodas();
      let especialidade = especialidades.find(e => e.nome.toLowerCase() === nome.toLowerCase());

      if (!especialidade) {
        await especialidadeService.criar({ nome });

        const atualizadas = await especialidadeService.obterTodas();
        especialidade = atualizadas.find(e => e.nome.toLowerCase() === nome.toLowerCase());
      }

      return especialidade || null;
    } catch (error: any) {
      Alert.alert('Erro ao salvar especialidade', error.message || 'Erro desconhecido');
      return null;
    }
  };

  const aoClicarEmSalvar = async () => {
    if (!validarCampos()) return;
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const especialidade = await aoSalvarEspecialidade();
      debugger
      if (!especialidade) return;

      const medico: Medico = {
        nome,
        email,
        telefone,
        crm,
        especialidade
      };
      await medicoService.completarCadastro(medico, token);
      Alert.alert('Sucesso', 'Cadastro concluído com sucesso!');
      router.push('/dashboard-medico');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao salvar médico');
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
          source={require('../../assets/images/avatar-medico.jpg')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.avatarEdit}>
          <Ionicons name="sync" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Input label="nome completo" icon="person-outline" value={nome} onChangeText={setNome} />
        <Input label="crm" icon="file-tray" value={crm} onChangeText={setcrm} />
        <Input label="especialidade" icon="medical" value={especialidadeTexto} onChangeText={setEspecialidadeTexto} />
        <Input label="e-mail" icon="mail-outline" value={email} onChangeText={setEmail} />
        <Input label="telefone" icon="call-outline" value={telefone} onChangeText={setTelefone} />
        <Input label="senha" icon="lock-closed-outline" value={senha} onChangeText={setSenha} secureTextEntry />

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

function Input({ label, icon, ...props }: any) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
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
