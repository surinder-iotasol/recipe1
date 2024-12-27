import React, { useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { demoData } from "./demo-data";
// api.js
import axios from 'axios';
import { APP_ID, BASE_URL } from "./api";
import Icon from "react-native-vector-icons/Ionicons";
import FoodCard from "./component/food-card";


// Reusable function to make GET requests



const filters = ["All", "Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];

const RecipeAppHome = () => {
    const [selectedFilter, setSelectedFilter] = React.useState("All");
    const [search, setSearch] = React.useState("");
    const [recipes, setRecipes] = React.useState(demoData.hits);
    const fetchData = async (search: string, mealType?: String) => {
        const meal = mealType === "All" || !mealType ? "" : `&mealType=${mealType}`;
        const searchType = search ? `&q=${search}` : "&q=all";
        console.log(`${BASE_URL}recipes/v2?type=public${searchType}${APP_ID}${meal}`,'url')
        try {
            const response = await axios.get(`${BASE_URL}recipes/v2?type=public${searchType}${APP_ID}${meal}`);
            setRecipes(response.data.hits);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };
    useEffect(() => {
        fetchData('burger');
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello Surinder,</Text>
                <Text style={styles.subGreeting}>What do you want to cook?</Text>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search recipes"
                        value={search}
                        onChangeText={(e) => setSearch(e)}
                    />
                    <TouchableOpacity onPress={() => fetchData(search)}>
                        <Text>🔍</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.filterRow}>
            <ScrollView 
        horizontal={true} // Enables horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hides the scroll indicator (optional)
        contentContainerStyle={{ paddingHorizontal: 16 }} // Adjusts inner spacing (optional)
>
                {filters.map((filter, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
                    >
                        <Text
                            onPress={() => {
                                setSelectedFilter(filter)
                                fetchData(search, filter)
                            }}
                            style={[
                                styles.filterText,
                                selectedFilter === filter && styles.activeFilterText,
                            ]}
                        >
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>

            {/* Recipe List */}
            <View style={styles.recipeSection}>
                <Text style={styles.sectionTitle}>Recipes For You</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={recipes}
                numColumns={2}
                keyExtractor={(item) => item.recipe.images.SMALL.url}
                contentContainerStyle={styles.recipeList}
                renderItem={({ item }) => (
                 <FoodCard item ={item} />
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    greeting: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    subGreeting: {
        fontSize: 16,
        color: "#666",
        marginVertical: 8,
    },
    searchBar: {
        marginTop: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    filterRow: {
        flexDirection: "row",
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
    },
    filterButton: {
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: "#f5f5f5",
    },
    activeFilter: {
        backgroundColor: "#4CAF50",
    },
    filterText: {
        fontSize: 14,
        color: "#666",
    },
    activeFilterText: {
        color: "#fff",
    },
    recipeSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    seeAll: {
        fontSize: 14,
        color: "#4CAF50",
    },
    recipeList: {
        paddingHorizontal: 16,
    },
    recipeImage: {
        width: "100%",
        height: 120,
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
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 16,
        borderTopWidth: 1,
        borderColor: "#f0f0f0",
    },
    navIcon: {
        fontSize: 16,
        color: "#666",
    },
});

export default RecipeAppHome;
