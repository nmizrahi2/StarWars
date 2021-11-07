import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import VehiclesSummary from './VehiclesSummary';
import PlanetsSummary from './PlanetsSummary';

import starWarsService from '../services/starWarsService';
import axios from 'axios';

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rem;
  position: relative;

  &:not(:last-child) {
    padding-right: 5rem;
    margin-right: 5rem;

    &::after {
      content: '';
      display: inline-block;
      height: 70%;
      border-right: 1px solid #ddd;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const SectionTitle = styled.p`
  font-size: 3rem;
  margin-bottom: 4rem;
  width: 100%;
`;

const processCollectionData = data => {
  return data.reduce((res, item) => {
    res[item.url] = item;
    return res;
  }, {});
};

const processPilotsData = (people, planets) => {
  const maxPopulation = 0;
  const maxPopulationPilots = people.reduce((res, person) => {
    const {homeworld, vehicles} = person;

    if (!vehicles.length || !planets[homeworld]) {
      return res;
    }

    let {population = 0} = planets[homeworld] || {};
    population = Number(population);
    if (population > maxPopulation) {
      return {[person.url]: person};
    }

    if (population === maxPopulation) {
      res[person.url] = person;
    }

    return res;
  }, {});

  return maxPopulationPilots;
};

const buildVehicleObject = (vehicleData, pilotList, planetList) => {
  const {name, pilots: vehiclePilots = []} = vehicleData;

  const planetsObj = {};
  const pilots = vehiclePilots
    .filter(pilotUrl => !!pilotList[pilotUrl])
    .map(pilotUrl => {
      const pilot = pilotList[pilotUrl];
      const {name: pilotName, homeworld} = pilot;
      const pilotPlanet = planetList[homeworld];
      if (pilotPlanet) {
        const {name: planetName, population} = pilotPlanet;
        planetsObj[homeworld] = {name: planetName, population};
      }
      return pilotName;
    });
  return {name, pilots, planets: Object.values(planetsObj)};
};

const processVehiclesData = async (pilotList, planetList) => {
  const pilotsVehicles = Object.values(pilotList).reduce((res, {vehicles}) => {
    vehicles.forEach(vehicle => {
      res[vehicle] = {};
    });
    return res;
  }, {});

  await Promise.all(
    Object.keys(pilotsVehicles).map(async vehicleUrl => {
      const {data: vehicleData} = await axios.get(vehicleUrl);

      pilotsVehicles[vehicleUrl] = buildVehicleObject(vehicleData, pilotList, planetList);
    })
  );
  return pilotsVehicles;
};

const Summary = () => {
  const [planetsData, setPlanetsData] = useState(undefined);
  const [vehiclesData, setVehiclesData] = useState(undefined);

  const fetchData = async () => {
    const [peopleRes, planetsRes] = await Promise.allSettled([
      starWarsService.getPeopleList(),
      starWarsService.getPlanetsList()
    ]);

    const {
      data: {results: planets}
    } = planetsRes.value;

    const {
      data: {results: people}
    } = peopleRes.value;

    const planetsObj = processCollectionData(planets);
    const maxPopulationPilots = processPilotsData(people, planetsObj);
    const vehicles = await processVehiclesData(maxPopulationPilots, planetsObj);

    setPlanetsData(planets);
    setVehiclesData(vehicles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SummaryWrapper>
      {vehiclesData && (
        <SummarySection>
          <SectionTitle>Vehicles</SectionTitle>
          <VehiclesSummary vehiclesData={vehiclesData} />
        </SummarySection>
      )}
      {planetsData && (
        <SummarySection>
          <SectionTitle>Planets</SectionTitle>
          {planetsData && <PlanetsSummary planetsData={planetsData} />}
        </SummarySection>
      )}
    </SummaryWrapper>
  );
};

export default Summary;
