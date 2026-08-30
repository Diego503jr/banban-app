import React, { useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const productos = [
    { id: "1", nombre: "Brazo Gitano de fresa", precio: "$16.95", icono: "cake" },
    { id: "2", nombre: "Cheesecake de fresa", precio: "$4.50", icono: "cupcake" },
    { id: "3", nombre: "Café Latte de vainilla", precio: "$4.00", icono: "coffee" },
    { id: "4", nombre: "Galletas de chocolate", precio: "$2.50", icono: "cookie" },
  ];

  return (
    <SafeAreaView style={styles.contenedorPrincipal} edges={['bottom', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContenido}>
        
        {/* ENCABEZADO */}
        <View style={styles.encabezado}>
          <Text style={styles.saludo}>¡Bienvenido de vuelta!</Text>
          <Text style={styles.nombreUsuario}>{user.username}</Text>
        </View>

        {/* BARRA DE BÚSQUEDA */}
        <View style={styles.contenedorBusqueda}>
          <MaterialCommunityIcons name="magnify" size={22} color="#269A88" />
          <TextInput
            style={styles.inputBusqueda}
            placeholder="Buscar postres, pasteles..."
            placeholderTextColor="#80A8A0"
          />
        </View>

        {/* BANNER PROMOCIONAL */}
        <View style={styles.bannerPromo}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitulo}>Pastelería Dulce Arcoíris</Text>
            <Text style={styles.promoSubtitulo}>Explora nuestro catálogo de productos.</Text>
          </View>
          <MaterialCommunityIcons name="cake-variant" size={44} color="#FFFFFF" />
        </View>

        {/* ENCABEZADO CATÁLOGO */}
        <View style={styles.filaEspaciada}>
          <Text style={styles.seccionTitulo}>Productos Disponibles</Text>
          <TouchableOpacity>
            <Text style={styles.verTodoTexto}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.filaEspaciada}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.tarjetaProducto}>
              <View style={styles.contenedorIconoProducto}>
                <MaterialCommunityIcons name={item.icono} size={40} color="#269A88" />
              </View>
              <Text style={styles.nombreProducto} numberOfLines={2}>
                {item.nombre}
              </Text>
              <Text style={styles.precioProducto}>{item.precio}</Text>

              <TouchableOpacity style={styles.botonAgregar}>
                <MaterialCommunityIcons name="plus" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      {/* BOTONES INFERIORES */}
      <View style={styles.barraInferior}>
        <TouchableOpacity style={styles.itemNav}>
          <MaterialCommunityIcons name="home" size={24} color="#269A88" />
          <Text style={[styles.textoNav, { color: "#269A88" }]}>Menú</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} onPress={() => navigation.navigate("DataEntry")}>
          <MaterialCommunityIcons name="clipboard-edit-outline" size={24} color="#269A88" />
          <Text style={styles.textoNav}>Ingreso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name="account-outline" size={24} color="#269A88" />
          <Text style={styles.textoNav}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} onPress={() => navigation.navigate("Login")}>
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
    paddingTop: 8,
    paddingBottom: 20,
  },
  encabezado: {
    marginBottom: 16,
  },
  saludo: {
    fontSize: 13,
    color: "#5C7570",
    fontWeight: "500",
  },
  nombreUsuario: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#164E44",
  },
  contenedorBusqueda: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D2E8E3",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  inputBusqueda: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#164E44",
  },
  bannerPromo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#269A88",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },
  promoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  promoSubtitulo: {
    fontSize: 12,
    color: "#E2F4F0",
  },
  filaEspaciada: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  seccionTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#164E44",
  },
  verTodoTexto: {
    fontSize: 13,
    color: "#269A88",
    fontWeight: "700",
  },
  tarjetaProducto: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5F2EE",
    elevation: 2,
    position: "relative",
  },
  contenedorIconoProducto: {
    height: 75,
    backgroundColor: "#EFF8F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  nombreProducto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2C3E3A",
    marginBottom: 6,
  },
  precioProducto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#269A88",
  },
  botonAgregar: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#269A88",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
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