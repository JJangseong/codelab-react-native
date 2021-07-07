import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


async function fetch(url) {
  try {
    let result = await AsyncStorage.getItem(url);
    if (result !== null) {
      return JSON.parse(result)
    }
    const response = await axios.get(url)
    AsyncStorage.setItem(url, JSON.stringify(response.data))
    return response.data
  } catch (e) {
    alert(e.message)
  }
}

export default fetch
