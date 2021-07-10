/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import type { Node } from "react";
import {
  ActivityIndicator,
  Button, Image,
  SafeAreaView,
  StatusBar, Text, View,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";


const options = {
  title: "이미지를 선택해주세요.",
  customButtons: [{ name: "fb", title: "페이스북 사진첩에서 서택하기" }],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const config = {
  headers: {
    Authorization: 'Client-ID a13f17697adf290'
  }
}

const App: () => Node = () => {
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button title="이미지 업로드" onPress={() => {
          setIsLoading(true)
          ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              setIsLoading(false)
              console.warn("User cancelled image picker");
            } else if (response.error) {
              setIsLoading(false)
              console.warn("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
              setIsLoading(false)
              console.warn("User tapped custom button: ", response.customButton);
            } else {
              // You can also display the image using data:
              // setUrl("data:" + response.type + ";base64," + response.data);

              const params = new FormData();
              params.append('image', response.data)
              axios.post('https://api.imgur.com/3/upload', params, config)
                .then((response) => {
                  console.log(response.data)
                })
                .catch(error => {
                  console.log(error)
                })
                .finally(() => {
                  setIsLoading(false)
                })
            }
          });
        }} />
        {isLoading ? (<ActivityIndicator />) : (
          <>
            {url && (
              <Image source={{ uri: url }} style={{ width: 340, height: 340 }} />
            )}
          </>
        )}

      </SafeAreaView>
    </>

  );
};

export default App;
