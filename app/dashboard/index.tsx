import Footer from '@/components/Footer';
import { Consulta } from '@/modelos/Consulta';
import { consultaService } from '@/services/consultaService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
dayjs.locale('pt-br');

export default function DashboardScreen() {
  const router = useRouter();
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  const hoje = dayjs();
  const inicioSemana = hoje.startOf('week').add(1, 'day');
  const diasDaSemana = Array.from({ length: 7 }).map((_, i) =>
    inicioSemana.add(i, 'day')
  );

  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    const buscarConsultas = async () => {
      const token = await AsyncStorage.getItem('token');
      const userSalvo = await AsyncStorage.getItem('usuarioLogado');

      if (userSalvo && token) {
        const user = JSON.parse(userSalvo);
        setNomeUsuario(user.nome);

        if (user.pacienteId) {
          const consultas = await consultaService.obterPorPacienteId(user.pacienteId, token);
          setConsultas(consultas);
        }
      }
    };

    buscarConsultas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nome}>Olá, {nomeUsuario}</Text>

        <View style={styles.calendarioBox}>
          <View style={styles.calendarioTopo}>
            <Text style={styles.data}>{hoje.format('D MMMM YYYY')}</Text>
            <TouchableOpacity onPress={() => router.push('/nova-consulta')}>
              <Ionicons name="calendar-outline" size={24} color="#4f4f4f" />
            </TouchableOpacity>
          </View>

          <Text style={styles.mes}>{hoje.format('MMMM').toUpperCase()}</Text>

          <View style={styles.semana}>
            {diasDaSemana.map((dia, index) => {
              const isToday = dia.isSame(hoje, 'day');
              return (
                <View key={index} style={styles.diaContainer}>
                  <Text style={styles.diaTexto}>{dia.format('ddd').toUpperCase()}</Text>
                  <TouchableOpacity onPress={() => router.push('/nova-consulta')} style={[styles.numeroWrapper, isToday && styles.hojeCircle]}>
                    <Text style={[styles.numero, isToday && styles.numeroHoje]}>
                      {dia.format('D')}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <ScrollView style={styles.consultasContainer}>
        {consultas.map((c, i) => (
          <View key={i} style={styles.consulta}>
            <View style={styles.consultaLinha}>
              <Text style={styles.medico}>{c.medico?.nome}</Text>
              <Text style={styles.horario}>{dayjs(c.dataHora).format('HH:mm')}</Text>
            </View>
            <View style={styles.consultaLinha}>
              <Text>{c.especialidade?.nome}</Text>
              <Text style={styles.dataConsulta}>{dayjs(c.dataHora).format('DD/MM/YYYY')}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#a18cd1', padding: 16 },
  header: { marginBottom: 20 },
  nome: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },

  calendarioBox: {
    backgroundColor: '#dce7ff',
    padding: 16,
    borderRadius: 20,
  },
  consultaLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  medico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  horario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  especialidade: {
    fontSize: 14,
    color: '#555',
  },

  dataConsulta: {
    fontSize: 14,
    color: '#555',
  },
  calendarioTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  data: { fontSize: 14, color: '#555' },
  mes: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  semana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  diaContainer: {
    alignItems: 'center',
    flex: 1,
  },
  diaTexto: {
    fontSize: 12,
    color: '#4f4f4f',
    marginBottom: 6,
  },
  numeroWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hojeCircle: {
    backgroundColor: '#7b61ff',
  },
  numero: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4f4f4f',
  },
  numeroHoje: {
    color: '#fff',
  },
  consultasContainer: { marginTop: 12 },
  consulta: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
});
