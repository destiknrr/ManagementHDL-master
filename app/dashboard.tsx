import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/authManager";
import { getAllBasicSettings } from "../services/basicLoader";

interface Banner {
  id: string;
  banners: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [banners, setBanners] = useState<string[]>([]); // State untuk menyimpan data banner
  
  useEffect(() => {
    const loadUserName = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserName(user.name);
      }
    };
    loadUserName();
    const fetchBanners = async () => {
      const settings = await getAllBasicSettings();
      console.log('Fetched Settings:', settings); // Log settings for debugging

      // Ensure settings is an array and contains valid Banner items
      if (Array.isArray(settings) && settings.length > 0) {
        const bannerUrls = settings.map((bannerData) => 
          `https://dbrskaji.pockethost.io/api/files/${bannerData.collectionId}/${bannerData.id}/${bannerData.banners}`
        );

        setBanners(bannerUrls); // Save all banner URLs to the state
      } else {
        console.error('No settings found or settings is empty');
      }
    };
    fetchBanners();
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View>
          <TouchableOpacity style={styles.profileButton} onPress={() => setShowDropdown(!showDropdown)}>
            <Ionicons name="person-circle" size={32} color="#ffffff" />
          </TouchableOpacity>
          {showDropdown && (
            <View style={[styles.dropdown, { elevation: 5, zIndex: 2000 }]}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => router.push('/profil')}>
                <Ionicons name="person" size={20} color="#333333" />
                <Text style={styles.dropdownText}>Akun Saya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => router.push('/')}>
                <Ionicons name="settings" size={20} color="#333333" />
                <Text style={styles.dropdownText}>Setting</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView style={[styles.content, { zIndex: 1 }]}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Selamat Datang, {userName}!</Text>
          <Text style={styles.dateText}>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          
          {/* Banner Slider */}
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
            {banners.map((bannerUrl, index) => (
              <Image key={index} source={{ uri: bannerUrl }} style={styles.bannerImage} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/jadwal')}>
            <View style={styles.menuIcon}>
              <Ionicons name="medkit" size={24} color="#0967f5" />
            </View>
            <Text style={styles.menuText}>Dokter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/jadwal')}>
            <View style={styles.menuIcon}>
              <Ionicons name="medical" size={24} color="#0967f5" />
            </View>
            <Text style={styles.menuText}>Perawat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/jadwal')}>
            <View style={styles.menuIcon}>
              <Ionicons name="people" size={24} color="#0967f5" />
            </View>
            <Text style={styles.menuText}>Pasien</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/jadwal')}>
            <View style={styles.menuIcon}>
              <Ionicons name="bed" size={24} color="#0967f5" />
            </View>
            <Text style={styles.menuText}>Ruang</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/jadwal')}>
            <View style={styles.menuIcon}>
              <Ionicons name="clipboard" size={24} color="#0967f5" />
            </View>
            <Text style={styles.menuText}>Pengkajian</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/jadwal')}>
            <View style={styles.menuIcon}>
              <Ionicons name="help-circle" size={24} color="#0967f5" />
            </View>
            <Text style={styles.menuText}>Bantuan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuIcon}>
              <Ionicons name="log-out-outline" size={24} color="#0967f5" />
            </View>
            <Text style={styles.menuText}>Logout</Text>
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
    elevation: 4,
    zIndex: 2000,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileButton: {
    padding: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 5,
    width: 150,
    elevation: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dropdownText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333333',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  bannerContainer: {
    marginTop: 15,
    width: Dimensions.get('window').width,
    height: 200,
    elevation: 2,
    marginBottom: 0,
  },
  bannerImage: {
    width: Dimensions.get('window').width - 20,
    height: 190,
    borderRadius: 15,
    marginHorizontal: 10,
    resizeMode: 'cover',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '30%',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  menuIcon: {
    backgroundColor: '#e6efff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
});
