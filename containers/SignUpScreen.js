import React from "react";
import { Button, Text, TextInput, View, Image, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign up</Text>
      </View>
      <View style={styles.SignUp}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput
          style={styles.inputBox}
          placeholder="Describe yourself in a few words..."
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={true}
        />
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#F8585B",
    marginBottom: 40,
  },

  inputBox: {
    height: 100,
    width: "100%",
    borderColor: "#F8585B",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    textAlignVertical: "top",
  },
});
