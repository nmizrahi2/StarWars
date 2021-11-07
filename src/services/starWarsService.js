import axios from 'axios';

const getPeopleList = () => {
  return axios.get('https://swapi.dev/api/people');
};

const getPlanetsList = () => {
  return axios.get('https://swapi.dev/api/planets');
};

const starWarsService = {getPeopleList, getPlanetsList};

export default starWarsService;
