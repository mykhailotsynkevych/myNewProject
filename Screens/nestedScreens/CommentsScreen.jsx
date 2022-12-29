import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUserId, getUserPhoto } from "../../redux/auth/authSelectors";
import Comment from "../../components/Comment";

const CommentsScreen = ({ route, navigation }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState();

  const commentHandler = (text) => setComment(text);

  const userId = useSelector(getUserId);
  const userPhoto = useSelector(getUserPhoto);
  const postId = route.params.id;


  const addComment = async () => {
    const date = new Date();
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      date,
      userId,
      userPhoto,
    });

    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    await updateDoc(docRef, { comments: docData.comments + 1 });
  };

  const getAllComments = async () => {
    onSnapshot(collection(db, "posts", postId, "comments"), (querySnapshot) => {
      const commentsArray = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => a.date.seconds - b.date.seconds);
      setAllComments(commentsArray);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const { photo, id } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <FlatList
        data={allComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Comment item={item} />}
      />
      <View>
        <TextInput
          placeholder="Комментировать..."
          style={styles.inputComments}
          value={comment}
          onChangeText={commentHandler}
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.btnComments}>
          <AntDesign
            name="arrowup"
            size={32}
            color="#fff"
            style={styles.arrowup}
            onPress={addComment}
            opacity={0.6}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 15,
    marginBottom: 15,
  },
  inputComments: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    fontSize: 18,
  },
  btnComments: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#FF6C00",
    alignSelf: "flex-end",
    marginTop: -45,
    marginRight: 8,
  },
  arrowup: {
    alignSelf: "center",
    paddingTop: 4,
  },
});

export default CommentsScreen;
