import axios from "axios";
import React, { useState } from "react";
import { Button, Text, TextInput, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    // si tous les champs sont remplis
    if (email && username && password && confirmPassword && description) {
      // si les 2 mdp sont identiques
      if (password === confirmPassword) {
        try {
          // on passe à la requête
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              password: password,
              description: description,
            }
          );

          console.log(response.data);

          if (response.data.token) {
            alert("You are connected !");
          }
        } catch (error) {
          if (
            error.response.data.error ===
              "This email already has an account." ||
            error.response.data.error ===
              "This username already has an account."
          ) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("An error occured");
          }
        }
      } else {
        setErrorMessage("Passwords must be the same");
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign up</Text>
        </View>
        <View style={styles.SignUp}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />

          <TextInput
            style={styles.inputBox}
            placeholder="Describe yourself in a few words..."
            multiline={true}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
        </View>

        <View style={styles.btnSignup}>
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSignin}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.txtSignin}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },

  logo: {
    width: 150,
    height: 100,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
  },

  signUp: {
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#F8585B",
    height: 40,
    width: "70%",
    marginTop: 30,
    marginLeft: 50,
  },

  inputBox: {
    height: 80,
    width: "70%",
    borderColor: "#F8585B",
    borderWidth: 1,
    marginTop: 30,
    marginLeft: 50,
  },

  btn: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F8585B",
    borderRadius: 50,
    padding: 15,
    marginTop: 50,
  },
  btnText: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
  },

  btnSignin: {
    alignItems: "center",
  },
  txtSignin: {
    color: "grey",
    marginTop: 10,
  },
});
