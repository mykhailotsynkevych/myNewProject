import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.photoView}>
          {photo && <Image source={{ uri: photo }} style={styles.photo} />}

          <TouchableOpacity
            style={styles.takePhotoButton}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                // console.log(uri)
                setPhoto(uri);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, margin: 10 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    margin: 10,
  },

  toggleCamera: {
    // alignSelf: "flex-end",
    // marginRight: 20,
  },

  takePhotoButton: {
    // marginRight: 35,
    alignItems: "center",
    // marginBottom: 15,
  },

  photo: {
    width: 70,
    height: 70,
    borderRadius: 10,
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
});

export default CreatePostsScreen;
