# Screen Development Instructions

Specific guidelines for creating and modifying screens in `src/screens/`.

## 🏗 Structure
Every screen should follow this general layout:
1.  **Imports:** React, Expo modules, Components, Styles.
2.  **Screen Component:** Main functional component.
3.  **Sub-components:** Small, local components used only in this screen.
4.  **Styles:** `const styles = StyleSheet.create({...})` at the bottom.

## 🗺 Navigation & Params
- Access navigation via the `navigation` prop.
- Access parameters via `route.params`.
- **Validation:** Always check if required params exist before rendering data.

## 📍 Location Handling
- Screens displaying artisan lists MUST implement proximity sorting.
- Use the `calculateDistance` utility from `src/data/artisanData.js`.
- Display distances in kilometers (km) rounded to 1 decimal place.

## 📱 UI Components
- **Buttons:** Use `TouchableOpacity` for interactive elements.
- **Lists:** Use `FlatList` for performance with large datasets.
- **Feedback:** Use `Alert.alert()` for critical confirmations (e.g., initiating a phone call).

## 🎨 Common Styles
- **Card:** `backgroundColor: '#FFF'`, `borderRadius: 12`, `padding: 15`, `marginVertical: 8`.
- **Container:** `flex: 1`, `backgroundColor: '#F5F5F5'`, `padding: 20`.
- **Title:** `fontSize: 22`, `fontWeight: 'bold'`, `color: '#333'`, `marginBottom: 10`.
