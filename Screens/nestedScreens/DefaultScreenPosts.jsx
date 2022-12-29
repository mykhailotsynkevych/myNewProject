import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

import { EvilIcons, Feather } from "@expo/vector-icons";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    onSnapshot(collection(db, "posts"), (doc) => {
      const postsArray = doc.docs.map((el) => ({ ...el.data(), id: el.id }));
      setPosts(postsArray);
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 15,
              marginHorizontal: 20,
            }}
          >
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.locationView}
                onPress={() => navigation.navigate("Comments", item)}
              >
                <Feather name="message-circle" size={28} color="#BDBDBD" />
                <Text style={styles.messeges}>{item.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.locationView}
                onPress={() => navigation.navigate("Map", item.coordinate)}
              >
                <EvilIcons name="location" size={35} color="#BDBDBD" />
                <Text style={styles.location}>{item.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  photo: {
    width: 380,
    height: 240,
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 5,
  },
  name: {
    alignSelf: "flex-start",
    fontFamily: "Roboto-Medium",
    fontSize: 22,
  },
  iconsContainer: {
    marginTop: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messeges: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontSize: 22,
    color: "#BDBDBD",
  },
  locationView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontFamily: "Roboto-Regular",
    fontSize: 22,
    textDecorationLine: "underline",
  },
});

export default DefaultPostsScreen;
