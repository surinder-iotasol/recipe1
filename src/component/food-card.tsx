import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const FoodCard = ({ item }: { item: any }) => {
    const [favorite, setFavorite] = React.useState(false);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
        style={styles.cardWrapper}
            onPress={() => {
                navigation.navigate('Details', {
                    item:item
                });
            }}
        >
            <View style={styles.recipeCard}>
                <Image
                    source={{ uri: item.recipe.images.SMALL.url }}
                    style={styles.recipeImage}
                />
                <View style={styles.recipeDetails}>
                    <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
                    <Text style={styles.recipeRating}>⭐ {'5'}</Text>
                </View>
                <TouchableOpacity
                    style={styles.heartIcon}
                    onPress={() => setFavorite(!favorite)}
                >
                    <Icon
                        name={favorite ? 'heart' : 'heart-outline'}
                        size={20}
                        color="red"
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
            flex: 1,
    },
    recipeCard: {
        flex: 1,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    recipeImage: {
        width: "100%",
        height: 120,
    },
    recipeDetails: {
        padding: 8,
    },
    recipeTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    recipeRating: {
        fontSize: 12,
        color: "#666",
    },
    heartIcon: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 4,
        elevation: 2,
    },
});

export default FoodCard;
