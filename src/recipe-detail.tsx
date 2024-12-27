// RecipeDetailScreen.js
import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
// import BackArrow from './svg/back-arrow';
import { demoData } from './demo-data';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type RecipeDetailScreenRouteProp = RouteProp<{ params: { item: { recipe: { calories: number, images: { SMALL: { url: string } }, ingredients: { foodId: string, image: string, text: string, weight: number }[], dietLabels: string, totalTime: number, mealType: string, label: string } } } }, 'params'>;

const RecipeDetailScreen = () => {
    const route = useRoute<RecipeDetailScreenRouteProp>();
    const navigation = useNavigation();

    const data = route.params.item.recipe
    const { calories, images, ingredients, dietLabels, totalTime, mealType, label } = data;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <BackArrow style={styles.backIcon} />
                </TouchableOpacity> */}
                <TouchableOpacity>
                    <Icon style={styles.bookmarkIcon}size={20} color={'white'} />
                    {/* <Image
            source={{uri: 'https://www.shutterstock.com/image-vector/bookmark-flat-icon-thin-line-260nw-1642602292.jpg'}}
            style={styles.bookmarkIcon}
          /> */}
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/* Main Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: images.SMALL.url }}
                        style={styles.mainImage}
                    />
                    <View style={styles.pagination}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Title Section */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{label}</Text>
                        <View style={styles.ratingContainer}>
                            <Image
                                source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/036/804/331/small_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg' }}
                                style={styles.starIcon}
                            />
                            <Text style={styles.rating}>4.5</Text>
                        </View>
                    </View>

                    <View style={styles.recipeInfo}>
                        <View style={styles.infoItem}>
                            <Image
                                source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/036/804/331/small_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg' }}
                                style={styles.infoIcon}
                            />
                            <Text style={styles.infoText}>{totalTime} mins</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Image
                                source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/036/804/331/small_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg' }}
                                style={styles.infoIcon}
                            />
                            <Text style={styles.infoText}>{mealType}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Image
                                source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/036/804/331/small_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg' }}
                                style={styles.infoIcon}
                            />
                            <Text style={styles.infoText}>{calories.toFixed(2)} cal</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginBottom: 10  }}>
                        <Text style={{ fontWeight: '700'}}>Carbs:</Text>
                        <Text style={{ marginLeft: 4 }}>{dietLabels}</Text>
                    </View>


                    {/* Description */}
                    {/* <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>
                            Chocolate is the best kind of dessert! These choco macarons are simply heaven! These little cookies filled with chocolate ganache.
                        </Text>
                    </View> */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {/* Ingredients */}
                        {ingredients.map((ingredient, index) => {
                            return (

                                <View style={styles.ingredientItem} key={ingredient.foodId+index} >
                                    <Image
                                        source={{ uri: ingredient.image || '' }}
                                        style={styles.ingredientIcon}
                                    />
                                    <Text style={styles.ingredientText}>{ingredient.text}</Text>
                                    <Text style={styles.ingredientAmount}>{ingredient.weight} weight</Text>
                                </View>

                            )
                        })}
                    </View>


                    {/* Watch Video Button */}
                    <TouchableOpacity style={styles.watchButton}>
                        <Text style={styles.watchButtonText}>Watch Videos</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
    },
    imageContainer: {
        height: 300,
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#000',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        width: 250,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    rating: {
        fontSize: 16,
        fontWeight: '500',
    },
    recipeInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    infoIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    ingredientText: {
        flex: 1,
        fontSize: 16,
    },
    ingredientAmount: {
        fontSize: 16,
        color: '#666',
    },
    watchButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    watchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default RecipeDetailScreen;