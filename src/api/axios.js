import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs"
});
