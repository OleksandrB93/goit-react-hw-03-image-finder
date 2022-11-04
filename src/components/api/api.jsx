// import axios from "axios";
import { API_KEY, BASE_URL } from "components/Constants/Constants";

function fetchImages(name) {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo`;

  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } 

    return Promise.reject(new Error(`Whoops, something went wrong: ${name}`));
  });
}

const api = { fetchImages };

export default api;
