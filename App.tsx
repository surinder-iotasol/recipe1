// First install these dependencies:
// npm install @react-navigation/native @react-navigation/bottom-tabs react-native-safe-area-context react-native-screens

// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RecipeAppHome from './src/home';
import ProfileScreen from './src/profile-page';
import RecipeDetailScreen from './src/recipe-detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import SignupScreen from './src/screens/SignupScreen';

const SearchScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Search Screen</Text>
  </View>
);

const BookmarkScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Bookmarks Screen</Text>
  </View>
);

const useFirebaseAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      setTimeout(() => setLoading(false), 100);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {

  const { loading, user } = useFirebaseAuth();
  console.log(loading, user)

  return (
    <NavigationContainer>
      {user ? <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={RecipeDetailScreen} />

      </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />

        </Stack.Navigator>}
    </NavigationContainer>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Search':
            iconName = focused ? 'search' : 'search-outline';
            break;
          case 'Bookmarks':
            iconName = focused ? 'bookmark' : 'bookmark-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4CAF50',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f4f4f4',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    })}
  >
    <Tab.Screen name="Home" component={RecipeAppHome} options={{ title: 'Home' }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
    <Tab.Screen name="Bookmarks" component={BookmarkScreen} options={{ title: 'Bookmarks' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});

export default App;