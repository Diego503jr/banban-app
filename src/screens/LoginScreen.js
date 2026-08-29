import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setUser({ username });
    navigation.navigate("Home");
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Text
          style={{
            marginBottom: 20,
            justifyContent: "flex-end",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Olvidaste tu contraseña?
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <View style={styles.containerSignUp}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            No tienes cuenta?
          </Text>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>Registrate</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
          }}
        >
          O inicia sesion con
        </Text>

        <View style={styles.containerRedes}>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="logo-google" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="logo-instagram" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="logo-facebook" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#333",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },

  input: { flex: 1, height: 48, marginLeft: 8, fontSize: 16 },

  button: {
    backgroundColor: "#2A9D8F",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  containerSignUp: {
    flexDirection: "row",
    paddingTop: 25,
    justifyContent: "center",
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#2A9D8F",
  },

  containerRedes: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 20,
  },

  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
});
