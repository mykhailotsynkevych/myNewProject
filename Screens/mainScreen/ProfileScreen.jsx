import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = ({ route, navigation }) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/bg-image.jpg")}
      >
                <View style={styles.profil}>
          <View style={styles.avatarContainer}>
          {/* <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={s.avatar}
            /> */}
            <AntDesign name="closecircleo" size={28} color="black" style={styles.avatarPlusIcon}/>
            </View>
          <Text style={styles.title}>Natali Romanova</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  profil: {
        borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
    avatarContainer: {
        width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 32,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
      avatarPlusIcon: {
    marginBottom: 12,
        marginRight: -14,
    backgroundColor: "#fff",
  },
    title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
  },
});

export default ProfileScreen;
