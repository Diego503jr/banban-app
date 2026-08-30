import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ListScreen = ({ products = [], onDeleteProduct, onEditProduct }) => {
  const [busqueda, setBusqueda] = useState('');

  // Estados para controlar el Modal y los datos en edición
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');

  // Filtrar productos según el término ingresado
  const productosFiltrados = products.filter(
    (item) =>
      item.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.category.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Abrir modal y precargar la información del producto
  const abrirModalEdicion = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditCategory(item.category);
    setEditPrice(item.price.toString());
    setModalVisible(true);
  };

  // Guardar los cambios editados
  const handleGuardarEdicion = () => {
    if (!editName.trim() || !editCategory.trim() || !editPrice.trim()) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    const updatedProduct = {
      id: editId,
      name: editName.trim(),
      category: editCategory.trim(),
      price: parseFloat(editPrice).toFixed(2),
    };

    if (onEditProduct) {
      onEditProduct(updatedProduct);
    }

    setModalVisible(false);
    Alert.alert("Éxito", "Producto actualizado correctamente.");
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      "Eliminar producto",
      `¿Deseas eliminar "${name}" del catálogo?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: () => onDeleteProduct && onDeleteProduct(id)
        },
      ]
    );
  };

  return (
    <View style={styles.contenedorPrincipal}>
      {/* Encabezado */}
      <View style={styles.bannerPromo}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitulo}>Pastelería Dulce Arcoíris</Text>
            <Text style={styles.promoSubtitulo}>Catálogo de productos.</Text>
          </View>
          <MaterialCommunityIcons name="cake-variant" size={44} color="#FFFFFF" />
        </View>

      {/* Barra de búsqueda */}
      <View style={styles.contenedorBusqueda}>
        <Ionicons name="search-outline" size={20} color="#5C7570" />
        <TextInput
          style={styles.inputBusqueda}
          placeholder="Buscar por nombre o categoría..."
          placeholderTextColor="#8A9E9A"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda.length > 0 && (
          <TouchableOpacity onPress={() => setBusqueda('')}>
            <Ionicons name="close-circle" size={18} color="#5C7570" />
          </TouchableOpacity>
        )}
      </View>

      {/* Contador de registros */}
      <View style={styles.filaEspaciada}>
        <Text style={styles.seccionTitulo}>Inventario Actual</Text>
        <Text style={styles.verTodoTexto}>
          {productosFiltrados.length} {productosFiltrados.length === 1 ? 'ítem' : 'ítems'}
        </Text>
      </View>

      {/* Lista de productos */}
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.contenedorVacio}>
            <Ionicons name="basket-outline" size={48} color="#D2E8E3" />
            <Text style={styles.textoVacio}>No hay productos registrados</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.tarjetaProducto}>
            <View style={styles.contenedorIcono}>
              <Ionicons name="cafe-outline" size={24} color="#269A88" />
            </View>

            <View style={styles.infoProducto}>
              <Text style={styles.nombreProducto}>{item.name}</Text>
              <Text style={styles.categoriaProducto}>{item.category}</Text>
              <Text style={styles.precioProducto}>${item.price}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.botonEditar}
                onPress={() => abrirModalEdicion(item)}
              >
                <Ionicons name="pencil-outline" size={16} color="#164E44" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonEliminar}
                onPress={() => handleDelete(item.id, item.name)}
              >
                <Ionicons name="trash-outline" size={16} color="#A5212E" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de Edición */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlayModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>Editar Producto</Text>

            <Text style={styles.labelInput}>Nombre del producto</Text>
            <View style={styles.contenedorInput}>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
              />
            </View>

            <Text style={styles.labelInput}>Categoría</Text>
            <View style={styles.contenedorInput}>
              <TextInput
                style={styles.input}
                value={editCategory}
                onChangeText={setEditCategory}
              />
            </View>

            <Text style={styles.labelInput}>Precio ($)</Text>
            <View style={styles.contenedorInput}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={editPrice}
                onChangeText={setEditPrice}
              />
            </View>

            <View style={styles.accionesModal}>
              <TouchableOpacity
                style={styles.botonCancelarModal}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botonGuardarModal}
                onPress={handleGuardarEdicion}
              >
                <Text style={styles.textoBotonGuardar}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#F7FBF9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  encabezado: {
    marginBottom: 16,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5F2EE",
    elevation: 2,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  contenedorIcono: {
    width: 44,
    height: 44,
    backgroundColor: "#EFF8F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoProducto: {
    flex: 1,
  },
  nombreProducto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E3A",
  },
  categoriaProducto: {
    fontSize: 12,
    color: "#5C7570",
    marginVertical: 2,
  },
  precioProducto: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#269A88",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  botonEditar: {
    backgroundColor: "#E2F4F0",
    padding: 8,
    borderRadius: 8,
  },
  botonEliminar: {
    backgroundColor: "#FDE8E8",
    padding: 8,
    borderRadius: 8,
  },
  contenedorVacio: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  textoVacio: {
    marginTop: 8,
    fontSize: 14,
    color: "#5C7570",
  },
  /* Estilos del Modal */
  overlayModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  contenidoModal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#164E44",
    marginBottom: 16,
    textAlign: "center",
  },
  labelInput: {
    fontSize: 12,
    fontWeight: "600",
    color: "#164E44",
    marginBottom: 4,
  },
  contenedorInput: {
    backgroundColor: "#F7FBF9",
    borderWidth: 1,
    borderColor: "#D2E8E3",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    color: "#164E44",
  },
  accionesModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 12,
  },
  botonCancelarModal: {
    flex: 1,
    backgroundColor: "#E5F2EE",
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotonCancelar: {
    color: "#5C7570",
    fontWeight: "bold",
  },
  botonGuardarModal: {
    flex: 1,
    backgroundColor: "#269A88",
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotonGuardar: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ListScreen;