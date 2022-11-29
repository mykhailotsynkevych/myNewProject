import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Image } from "react-native";

const COURSES = [
  {
    id: "45k6-j54k-4jth",
    title: "HTML",
  },
  {
    id: "4116-jfk5-43rh",
    title: "JavaScript",
  },
  {
    id: "4d16-5tt5-4j55",
    title: "React",
  },
  {
    id: "LG16-ant5-0J25",
    title: "React Native",
  },
];

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState(COURSES);
// console.log("route.params", route.params);
  return (
    <SafeAreaView style={s.container}>
      <ScrollView>
                {courses.map((course) => (
          <Text key={course.id}>{course.title}</Text>
        ))}
        {/* {publication.map(() => (
                    <View >
          <Image source={{ uri: publication.photo }} />
            <Text>{publication.name}</Text>
            <Text>{publication.location}</Text>
          </View>

        ))} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;