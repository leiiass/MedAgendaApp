import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => router.push('/nova-consulta')}
        style={styles.addButton}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <Ionicons name="home-outline" size={28} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="pulse-outline" size={28} />
        </TouchableOpacity>

        <View style={{ width: 60 }} />

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/usuario')}>
          <Ionicons name="person-outline" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    top: -22,
    backgroundColor: '#9b59b6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
});
