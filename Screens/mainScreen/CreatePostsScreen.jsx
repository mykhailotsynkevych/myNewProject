import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { Ionicons, AntDesign, Feather, EvilIcons } from "@expo/vector-icons";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { getUserId } from "../../redux/auth/authSelectors";

const initialState = {
  photo: null,
  name: "",
  location: "",
  coordinate: null,
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const userId = useSelector(getUserId);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setstate((prevState) => ({ ...prevState, coordinate: coords }));
      console.log("Hi");
    })();
  }, []);

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  const btnPublicate = async () => {
    try {
      const photoUrl = await uploadPhotoToServer();
      await addDoc(collection(db, "posts"), {
        photo: photoUrl,
        name: state.name,
        location: state.location,
        coordinate: state.coordinate,
        userId,
        likes: [],
        comments: 0,
      });
      navigation.navigate("DefaultScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(state.photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImages/${uniquePostId}`);

    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(
      ref(storage, `postImages/${uniquePostId}`)
    );

    return photoUrl;
  };

  return (
    <View style={styles.container}>
      {!cameraOn && (
        <View>
          <View style={styles.fotoContainer}>
            {state.photo && (
              <Image source={{ uri: state.photo }} style={styles.photo} />
            )}
          </View>

          <View style={styles.iconConatiner}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setCameraOn(true);
              }}
            >
              <Feather name="camera" size={32} color="#ACB3BF" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <TextInput
              value={state.name}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, name: value }))
              }
              placeholder="Название..."
              style={styles.input}
            />
            <EvilIcons
              style={styles.iconLocation}
              name="location"
              size={35}
              color="#BDBDBD"
            />
            <TextInput
              value={state.location}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, location: value }))
              }
              placeholder="Местность..."
              style={styles.inputLocation}
            />

            {state.photo === null ||
            state.location === "" ||
            state.location === "" ? (
              <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                <Text style={styles.btnTitle}>Опубликовать</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.activeButton}
                onPress={btnPublicate}
              >
                <Text style={styles.activeBtnTitle}>Опубликовать</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteIcon}
              onPress={() => {
                setstate(initialState);
                setCameraOn(true);
              }}
            >
              <AntDesign name="delete" size={28} color="#ACB3BF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {cameraOn && (
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.photoView}>
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  setstate((prevState) => ({ ...prevState, photo: uri }));
                  setCameraOn(false);
                  await MediaLibrary.createAssetAsync(uri);
                }
              }}
            >
              <View style={styles.takePhotoOut}>
                <View style={styles.takePhotoInner}></View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleCamera}
              onPress={toggleCameraType}
            >
              <Ionicons
                name="ios-camera-reverse-outline"
                size={35}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  camera: { flex: 1, margin: 10, borderRadius: 10 },
  fotoContainer: {
    height: "50%",
    margin: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    border: 5,
    borderColor: "black",
  },
  iconConatiner: {
    alignItems: "center",
  },

  photoView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 15,
  },

  takePhotoButton: {
    marginRight: 115,
  },

  photo: {
    flex: 1,
    resizeMode: "contain",
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 50,
  },
  form: {
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 30,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    height: 50,
    paddingLeft: 3,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    color: "#BDBDBD",
  },
  inputLocation: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    height: 50,
    paddingLeft: 35,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    color: "#BDBDBD",
  },
  iconLocation: {
    marginBottom: -40,
    marginLeft: -5,
  },
  button: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#BDBDBD",
    fontSize: 18,
  },
  activeBtnTitle: {
    color: "#fff",
    fontSize: 18,
  },
  deleteIcon: {
    marginTop: 55,
    alignSelf: "center",
  },
});

export default CreatePostsScreen;
