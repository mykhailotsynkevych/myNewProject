import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, FlatList } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import {
  getUserName,
  getUserPhoto,
  getUserId,
} from "../../redux/auth/authSelectors";

import {
  collection,
  query,
  where,
  onSnapshot,
  updateProfile,
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";

import Post from "../../components/Post";

const ProfileScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const userName = useSelector(getUserName);
  const userFoto = useSelector(getUserPhoto);
  const userId = useSelector(getUserId);
    // console.log(userId);
  const getOwnPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsArray);
    });
  };

  useEffect(() => {
    getOwnPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/bg-image.jpg")}
      >
        <View style={styles.profil}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: `${userFoto}` }} style={styles.img} />
            <View style={styles.viewIcon}>
              <AntDesign name="closecircleo" size={28} color="#E8E8E8" />
            </View>
          </View>
          <Text style={styles.title}>{userName}</Text>
          <FlatList
            data={posts}
            style={styles.posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Post item={item} navigation={navigation} />
            )}
          />
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
    // alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 32,
    marginTop: -60,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "center",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  viewIcon: {
    backgroundColor: "#fff",
    width: 28,
    height: 28,
    borderRadius: 28,
    marginTop: -40,
    marginRight: -14,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
    alignSelf: "center",
  },
  posts: {
    marginHorizontal: 8,
  }
});

export default ProfileScreen;
