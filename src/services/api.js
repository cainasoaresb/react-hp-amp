import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wizard-world-api.herokuapp.com/',
});

export const getHouses = async () => {
  try {
    const response = await api.get('/Houses');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as casas:", error);
    return [];
  }
};

export const getHouseById = async (id) => {
  try {
    const response = await api.get(`/Houses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar a casa:", error);
    return null;
  }
};