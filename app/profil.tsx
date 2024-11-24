import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { logout, getCurrentUser } from "../services/authManager";

export default function profile() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    // Fetch the current user's name on component mount
    const user = getCurrentUser();
    if (user) {
      setUserName(user.name); // Assuming `name` is the field in your `users` collection
      setEmail(user.email); // Assuming `name` is the field in your `users` collection
    } else {
      router.push('/');
    }
  }, []);


  const handleLogout = async () => {
    await logout(); // Call the logout function from authManager
    router.push('/'); // Redirect to the login page after logout
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity> */}
        <View style={{width: 24}} />
        <Text style={styles.headerTitle}>Profil Saya</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-circle" size={100} color="#0967f5" />
          </View>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/edit-profil')}>
            <View style={styles.menuItemContent}>
              <Ionicons name="person" size={24} color="#0967f5" />
              <Text style={styles.menuText}>Edit Profil</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="lock-closed" size={24} color="#0967f5" />
              <Text style={styles.menuText}>Ubah Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="notifications" size={24} color="#0967f5" />
              <Text style={styles.menuText}>Notifikasi</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="help-circle" size={24} color="#0967f5" />
              <Text style={styles.menuText}>Bantuan</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
            <View style={styles.menuItemContent}>
              <Ionicons name="log-out" size={24} color="#ff3b30" />
              <Text style={[styles.menuText, styles.logoutText]}>Keluar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0967f5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ff3b30',
  },
});