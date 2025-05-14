import Footer from '@/components/Footer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function UsuarioScreen() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState('');


  useEffect(() => {
    const carregarUsuario = async () => {
      const user = await AsyncStorage.getItem('usuarioLogado');
      if (user) {
        const usuario = JSON.parse(user);
        setNomeUsuario(usuario.nome);
        setTipoUsuario(usuario.tipo);
      }
    };
    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fechar} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.fecharTexto}>meu perfil</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={styles.perfil}>
          <Image
            source={
              tipoUsuario === 'Medico'
                ? require('../../assets/images/avatar-medico.jpg')
                : require('../../assets/images/avatar.jpg')
            }
            style={styles.avatar}
          />
          <Text style={styles.nome}>{nomeUsuario}</Text>
        </View>

        <View style={styles.menu}>
          <MenuItem icon="notifications-outline" label="contatos e notificações" />
          <MenuItem
            icon="person-outline"
            label="meu perfil"
            onPress={() =>
              router.push(
                tipoUsuario === 'Medico' ? '/meu-perfil-medico' : '/meu-perfil-paciente'
              )
            }
          />
          <MenuItem icon="exit-outline" label="logout" onPress={handleLogout} />
        </View>
      </View>

      <Footer />
    </View>
  );
}

function MenuItem({ icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#333" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a18cd1',
    padding: 16,
    paddingHorizontal: 24,
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
  perfil: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menu: {
    backgroundColor: '#e6edff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});
