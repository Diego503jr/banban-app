import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DataEntryScreen = ({ onAddProduct }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !category.trim() || !price.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los datos del producto.");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price).toFixed(2),
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    }

    Alert.alert("Éxito", "Producto registrado correctamente en el inventario.");
    
    // Limpiar formulario
    setName('');
    setCategory('');
    setPrice('');
  };

  return (
    <SafeAreaView style={styles.contenedorPrincipal} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* Encabezado */}
        <View style={styles.bannerPromo}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitulo}>Pastelería Dulce Arcoíris</Text>
            <Text style={styles.promoSubtitulo}>Ingreso de productos.</Text>
          </View>
          <MaterialCommunityIcons name="cake-variant" size={44} color="#FFFFFF" />
        </View>

      {/* Formulario */}
        <View style={styles.formularioContenedor}>
          <Text style={styles.labelInput}>Nombre del producto</Text>
          <View style={styles.contenedorInput}>
            <Ionicons name="pricetag-outline" size={18} color="#5C7570" />
            <TextInput
              style={styles.input}
              placeholder="ej. Pastel Red Velvet"
              placeholderTextColor="#8A9E9A"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.labelInput}>Categoría</Text>
          <View style={styles.contenedorInput}>
            <Ionicons name="grid-outline" size={18} color="#5C7570" />
            <TextInput
              style={styles.input}
              placeholder="ej. Pasteles, Galletas, Cupcakes"
              placeholderTextColor="#8A9E9A"
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <Text style={styles.labelInput}>Precio de venta ($)</Text>
          <View style={styles.contenedorInput}>
            <Ionicons name="cash-outline" size={18} color="#5C7570" />
            <TextInput
              style={styles.input}
              placeholder="ej. 15.50"
              placeholderTextColor="#8A9E9A"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <TouchableOpacity
            style={styles.botonGuardar}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.textoBotonGuardar}>Guardar Producto</Text>
          </TouchableOpacity>
        </View>

      {/* Acceso rápido al inventario */}
        <TouchableOpacity 
          style={styles.bannerNavegacion}
          onPress={() => navigation.navigate('List')}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitulo}>Ver Inventario Completo</Text>
            <Text style={styles.bannerSubtitulo}>Consulta, edita o elimina los productos guardados</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#164E44" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.barraInferior}>
        <TouchableOpacity style={styles.itemNav} onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons name="home-outline" size={24} color="#269A88" />
          <Text style={styles.textoNav}>Menú</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} onPress={() => navigation.navigate("DataEntry")}>
          <MaterialCommunityIcons name="clipboard-edit-outline" size={24} color="#269A88" />
          <Text style={[styles.textoNav, { color: "#269A88" }]}>Ingreso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemNav} onPress={() => navigation.navigate("Profile")}>
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
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#F7FBF9",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
  formularioContenedor: {
    marginBottom: 20,
  },
  labelInput: {
    fontSize: 13,
    fontWeight: "600",
    color: "#164E44",
    marginBottom: 6,
  },
  contenedorInput: {
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
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#164E44",
  },
  botonGuardar: {
    flexDirection: "row",
    backgroundColor: "#269A88",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    elevation: 2,
    gap: 8,
    padding: 2,
  },
  textoBotonGuardar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    padding: 4,
  },
  bannerNavegacion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2F4F0",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D2E8E3",
  },
  bannerTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#164E44",
  },
  bannerSubtitulo: {
    fontSize: 12,
    color: "#5C7570",
    marginTop: 2,
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

export default DataEntryScreen;