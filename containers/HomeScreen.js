import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

import axios from "axios";

import { Foundation } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const displayStars = (value) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        tab.push(<Foundation name="star" size={24} color="#FFCA54" key={i} />);
      } else {
        tab.push(
          <Foundation name="star" size={24} color="lightgrey" key={i} />
        );
      }
    }
    return tab;
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="#F8585B" />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate("Room");
            }}
          >
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={styles.bgImg}
            >
              <View style={styles.price}>
                <Text style={styles.priceText}>{item.price} €</Text>
              </View>
            </ImageBackground>

            <View style={styles.block}>
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.rating}>
                  {displayStars(item.ratingValue)}
                  <Text style={styles.reviews}>{item.reviews} reviews</Text>
                </View>
              </View>
              <Image
                source={{ uri: item.user.account.photo.url }}
                style={styles.profilePic}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    padding: 20,
    backgroundColor: "white",
  },

  bgImg: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  price: {
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    minWidth: 100,
  },

  priceText: {
    color: "white",
    fontSize: 20,
  },

  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  info: {
    width: "70%",
    fontSize: 20,
  },

  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },

  title: {
    fontSize: 20,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
  },

  reviews: {
    marginLeft: 5,
    color: "lightgrey",
  },
});
