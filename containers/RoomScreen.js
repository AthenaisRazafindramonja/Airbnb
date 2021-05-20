import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";

const RoomScreen = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomId = route.params.id;
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${roomId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#F8585B" />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <View>
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={styles.bgImg}
            ></ImageBackground>
          </View>
        );
      }}
    />
  );
};
export default RoomScreen;

const styles = StyleSheet.create({
  bgImg: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
});
