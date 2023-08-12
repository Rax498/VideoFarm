import axios from 'axios';

export const BASE_URL='https://youtube-v31.p.rapidapi.com';

const options = {
  
  params: {
    query: 'cat',
    geo: 'US',
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key':process.env.REACT_APP_API_KEY,
    // 'X-RapidAPI-Key': '96d1e74da9msha7a0b097b9d3864p104ef0jsn198815d00887',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
}

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};


export default fetchFromAPI;