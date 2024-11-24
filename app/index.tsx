import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { login } from '../services/authManager'; // Import login function

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim()) {
      setErrorMessage('Username tidak boleh kosong.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Password tidak boleh kosong.');
      return;
    }

    const loginFailed = "Username atau password salah. silahkan ulangi.";
    const response = await login(username, password);

    if (response.success) {
      setErrorMessage('');  // Clear any previous error messages
      router.push("/dashboard");
    } else {
      setErrorMessage(loginFailed || '');  // Set error message to display
    }
  };

  // Test case
  const handleLoginBypass = () => {
    router.push("/dashboard");
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hemodialisis App</Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/startscreen_2.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Silahkan login terlebih dahulu.</Text>          
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ffffff80"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="#ffffff80"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#ffffff" 
              />
            </TouchableOpacity>
          </View>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}  // Use handleLogin function
          >
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerText}>Buat Akun?</Text>
          </TouchableOpacity>
          {/* Bypass feature */}
          {/*<TouchableOpacity onPress={() => router.push("/dashboard")}>
            <Text style={styles.registerText}>Bypass Login</Text>
          </TouchableOpacity>*/} 
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 30,
    color: "#333333",
    textAlign: "center",
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
    alignSelf: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#0967f5",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 30,
  },
  formTitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    color: '#ffffff',
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    marginBottom: 15,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: "#0967f5",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },
  errorText: {
    color: '#f76f6f',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
});