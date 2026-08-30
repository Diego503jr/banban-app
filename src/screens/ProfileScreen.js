import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user, setUser } = useContext(UserContext);

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={styles.contenedorPrincipal}
      edges={["bottom", "left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContenido}
      >
        <View style={styles.tarjetaPerfil}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={60} color="#269A88" />
          </View>
          <Text style={styles.nombreUsuario}>{user.username}</Text>
          <Text style={styles.rolUsuario}>Cliente Frecuente</Text>
        </View>

        {/* DETALLES DE LA CUENTA */}
        <Text style={styles.seccionTitulo}>Información Personal</Text>

        <View style={styles.contenedorDetalles}>
          <View style={styles.filaDetalle}>
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color="#269A88"
            />
            <View style={styles.textoDetalleContenedor}>
              <Text style={styles.labelDetalle}>Usuario</Text>
              <Text style={styles.valorDetalle}>{user.username}</Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.filaDetalle}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#269A88"
            />
            <View style={styles.textoDetalleContenedor}>
              <Text style={styles.labelDetalle}>Correo Electrónico</Text>
              <Text
                style={styles.valorDetalle}
              >{`${user.username.toLowerCase()}@gmail.com`}</Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.filaDetalle}>
            <MaterialCommunityIcons
              name="phone-outline"
              size={22}
              color="#269A88"
            />
            <View style={styles.textoDetalleContenedor}>
              <Text style={styles.labelDetalle}>Teléfono</Text>
              <Text style={styles.valorDetalle}>+503 7123-4567</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botonSalirPrincipal}
          onPress={() => navigation.navigate("Login")}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#FFFFFF" />
          <Text style={styles.textoBotonSalir}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* BOTONES INFERIORES */}
      <View style={styles.barraInferior}>
        <TouchableOpacity
          style={styles.itemNav}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialCommunityIcons
            name="home-outline"
            size={24}
            color="#269A88"
          />
          <Text style={styles.textoNav}>Menú</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          onPress={() => navigation.navigate("DataEntry")}
        >
          <MaterialCommunityIcons
            name="clipboard-edit-outline"
            size={24}
            color="#269A88"
          />
          <Text style={styles.textoNav}>Ingreso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialCommunityIcons name="account" size={24} color="#269A88" />
          <Text style={styles.textoNav}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNav}
          onPress={() => navigation.navigate("Login")}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#D32F2F" />
          <Text style={[styles.textoNav, { color: "#D32F2F" }]}>Salir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#F7FBF9",
  },
  scrollContenido: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  tarjetaPerfil: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5F2EE",
    elevation: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EFF8F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#D2E8E3",
  },
  nombreUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#164E44",
  },
  rolUsuario: {
    fontSize: 13,
    color: "#269A88",
    fontWeight: "600",
    marginTop: 2,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#164E44",
    marginBottom: 10,
    marginLeft: 4,
  },
  contenedorDetalles: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5F2EE",
    marginBottom: 25,
    elevation: 2,
  },
  filaDetalle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  textoDetalleContenedor: {
    marginLeft: 14,
    flex: 1,
  },
  labelDetalle: {
    fontSize: 12,
    color: "#5C7570",
  },
  valorDetalle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C3E3A",
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: "#EFF8F5",
  },
  botonSalirPrincipal: {
    flexDirection: "row",
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  textoBotonSalir: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },
  barraInferior: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5F2EE",
    alignItems: "center",
  },
  itemNav: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textoNav: {
    fontSize: 11,
    marginTop: 2,
    color: "#5C7570",
    fontWeight: "600",
  },
});
