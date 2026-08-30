import React, { useState } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DataEntryScreen from "./src/screens/DataEntryScreen";
import ListScreen from "./src/screens/ListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./src/context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
    // Estado de productos
  const [products, setProducts] = useState([]);

    // Agregar un producto
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

    // Eliminar un producto
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

    // Editar un producto existente
  const handleEditProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          
          {/* Formulario de registro */}
          <Stack.Screen name="DataEntry">
            {(props) => (
              <DataEntryScreen {...props} onAddProduct={handleAddProduct} />
            )}
          </Stack.Screen>

          {/* Lista de productos con edición y eliminación */}
          <Stack.Screen name="List">
            {(props) => (
              <ListScreen
                {...props}
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onEditProduct={handleEditProduct}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}