import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function Schedule() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jadwal Pengkajian</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
        <View>
            <Text style={styles.formTitle}>Daftar Jadwal Pengkajian Pasien</Text>
        </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Senin</Text>
            <View style={styles.scheduleDetail}>
              <Text style={styles.scheduleTime}>08:00 - 10:00</Text> 
              <Text style={styles.scheduleClass}>Pengkajian Awal</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Selasa</Text>
            <View style={styles.scheduleDetail}>
              <Text style={styles.scheduleTime}>10:00 - 12:00</Text>
              <Text style={styles.scheduleClass}>Tanda Vital</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Rabu</Text>
            <View style={styles.scheduleDetail}>
              <Text style={styles.scheduleTime}>13:00 - 15:00</Text>
              <Text style={styles.scheduleClass}>Evaluasi Pengobatan</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Kamis</Text>
            <View style={styles.scheduleDetail}>
              <Text style={styles.scheduleTime}>08:00 - 10:00</Text>
              <Text style={styles.scheduleClass}>Pemeriksaan Fisik</Text>
            </View>
          </View>

          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Jumat</Text>
            <View style={styles.scheduleDetail}>
              <Text style={styles.scheduleTime}>10:00 - 12:00</Text>
              <Text style={styles.scheduleClass}>Evaluasi Perawatan</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0967f5',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  formTitle: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 20,
    alignSelf: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
  },
  formSection: {
    padding: 20,
  },
  scheduleItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  scheduleDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  scheduleDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleTime: {
    fontSize: 16,
    color: '#666666',
  },
  scheduleClass: {
    fontSize: 16,
    color: '#0967f5',
    fontWeight: 'bold',
  },
});