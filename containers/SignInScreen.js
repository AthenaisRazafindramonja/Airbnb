import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("You are connected");
      } else if (error.response.status === 401) {
        setError("Email and/or password is wrong");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError("Unauthorized");
    }
  };
}

const navigation = useNavigation();
return (
  <KeyboardAwareScrollView>
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      />
      <Text style={styles.title}>Sign in</Text>
    </View>
    <View style={styles.signIn}>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.btn}
        title="Sign in"
        onPress={async () => {
          const userToken = "secret-token";
          setToken(userToken);
        }}
      >
        <Text style={styles.btnText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnRegister}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.txtRegister}>No account? Register</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAwareScrollView>
);

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },

  logo: {
    width: 150,
    height: 100,
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
    marginBottom: 50,
  },

  signIn: {
    padding: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#F8585B",
    marginBottom: 40,
  },

  btn: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F8585B",
    borderRadius: 50,
    padding: 15,
    marginTop: 150,
  },

  btnText: {
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "grey",
  },

  btnRegister: {
    alignItems: "center",
  },

  txtRegister: {
    marginTop: 20,
    color: "grey",
  },
});
