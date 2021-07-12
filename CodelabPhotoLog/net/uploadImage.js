import ImagePicker from "react-native-image-picker";
import axios from "axios";

const options = {
  title: "Load Photo",
  customButtons: [
    { name: "button_id_1", title: "CustomButton 1" },
  ],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const config = {
  headers: {
    Authorization: "Client-ID a13f17697adf290",
  },
};

async function uploadImage() {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
        // reject({message: "User cancelled image picker"});
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
        reject({message: response.error});
      } else {
        const params = new FormData();
        params.append("image", response.data);
        axios.post("https://api.imgur.com/3/image", params, config)
          .then((response) => {
            resolve(response.data.data.link);
          })
          .catch(error => {
            reject({message: error.response.data.data.error});
          });
      }
    });
  });
}

export default uploadImage;


