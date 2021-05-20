import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();

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
  return isLoading ? (
    <View>
      <Text>Is loading...</Text>
    </View>
  ) : (
    <View></View>
  );
};

export default HomeScreen;
