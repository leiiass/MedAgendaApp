import { ConsultaCriacao } from '@/modelos/ConsultaCriacao';
import { Especialidade } from '@/modelos/Especialidade';
import { Medico } from '@/modelos/Medico';
import { consultaService } from '@/services/consultaService';
import { especialidadeService } from '@/services/especialidadeService';
import { medicoService } from '@/services/medicoService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
dayjs.extend(customParseFormat);

export default function NovaConsultaScreen() {
  const router = useRouter();

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

  const [medico, setMedico] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [horaConsulta, setHoraConsulta] = useState(new Date());

  const [dataTexto, setDataTexto] = useState('');
  const [horaTexto, setHoraTexto] = useState('');

  const [dataConsulta, setDataConsulta] = useState(new Date());

  useEffect(() => {
    const carregarDados = async () => {
      setDataTexto(dataConsulta.toLocaleDateString('pt-BR'));
      setHoraTexto(horaConsulta.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const listaMedicos = await medicoService.obterTodos(token);
        const listaEspecialidades = await especialidadeService.obterTodas();
        setMedicos(listaMedicos);
        setEspecialidades(listaEspecialidades);
      }
    };
    carregarDados();
  }, []);

  const aoClicarEmSalvar = async () => {
    try {
      const dados = await AsyncStorage.getItem('usuarioLogado');
      const token = await AsyncStorage.getItem('token');

      if (!dados || !token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      if (!medico || !especialidade || !dataTexto || !horaTexto) {
        Alert.alert('Erro', 'Preencha todos os campos.');
        return;
      }

      const user = JSON.parse(dados);

      if (!user.pacienteId) {
        Alert.alert('Erro', 'Usuário não completou o cadastro de paciente.');
        return;
      }

      if (!dataTexto || !horaTexto) {
        Alert.alert('Erro', 'Preencha a data e hora corretamente.');
        return;
      }

      const dataHora = dayjs(`${dataTexto} ${horaTexto}`, 'DD/MM/YYYY HH:mm');

      if (!dataHora.isValid()) {
        Alert.alert('Erro', 'Data ou hora inválida.');
        return;
      }

      const novaConsulta: ConsultaCriacao = {
        pacienteId: user.pacienteId,
        medicoId: Number(medico),
        especialidade: { nome: especialidade },
        dataHora: dataHora.format('YYYY-MM-DDTHH:mm:ss'),
        status: 'Agendada',
      };

      await consultaService.criar(novaConsulta, token);
      const rota = user.tipo === 'Medico' ? '/dashboard-medico' : '/dashboard';
      router.replace(rota); 

    } catch (error: any) {
      console.error('Erro ao salvar consulta:', error);
      Alert.alert('Erro', error?.response?.data?.title || error.message || 'Erro ao agendar consulta.');
    }

  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.fechar} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.fecharTexto}>voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Nova Consulta</Text>

      <Text style={styles.label}>Médico</Text>
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={medico}
          onValueChange={(itemValue) => setMedico(itemValue)}
          style={styles.picker}
          dropdownIconColor="#000"
        >
          <Picker.Item label="Selecione..." value="" />
          {medicos.map((m) => (
            <Picker.Item key={m.id} label={m.nome} value={m.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Especialidade</Text>
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={especialidade}
          onValueChange={(itemValue) => setEspecialidade(itemValue)}
          style={styles.picker}
          dropdownIconColor="#000"
        >
          <Picker.Item label="Selecione..." value="" />
          {especialidades.map((e) => (
            <Picker.Item key={e.id} label={e.nome} value={e.nome} />
          ))}
        </Picker>

      </View>

      <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
      <TextInput
        style={styles.input}
        placeholder="dd/mm/aaaa"
        value={dataTexto}
        onChangeText={setDataTexto}
      />

      <Text style={styles.label}>Hora (HH:MM)</Text>
      <TextInput
        style={styles.input}
        placeholder="hh:mm"
        value={horaTexto}
        onChangeText={setHoraTexto}
      />

      <TouchableOpacity style={styles.button} onPress={() => aoClicarEmSalvar()}>
        <Text style={styles.buttonText}>Salvar Consulta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.cancelarWrapper}>
        <Text style={styles.cancelar}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#a18cd1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    marginBottom: 8,
    color: '#333',
  },
  container: {
    width: '100%',
    maxWidth: 500,
    padding: 16,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: '#a18cd1',
  },
  fechar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  fecharTexto: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 16,
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    marginBottom: 8,
    borderColor: '#fff'
  },
  picker: {
    width: '100%',
    height: 40,
    borderRadius: 50,
    borderColor: '#fff'
  },
  button: {
    backgroundColor: '#9b59b6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelar: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  cancelarWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  inputData: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
});
