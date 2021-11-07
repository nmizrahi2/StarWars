import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PlanetBar from './PlanetBar';

const VISIBLE_PLANETS = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'];
const PlanetsSummaryWrapper = styled.div`
  display: flex;
`;

const PlanetsSummary = ({planetsData}) => {
  const filteredPlanets = planetsData.filter(({name: planetName}) =>
    VISIBLE_PLANETS.includes(planetName)
  );

  const maxPopulation = filteredPlanets.reduce(
    (res, planet) => Math.max(res, planet.population),
    0
  );

  return (
    <PlanetsSummaryWrapper>
      {filteredPlanets.map(planet => (
        <PlanetBar key={planet.name} planet={planet} maxPopulation={maxPopulation} />
      ))}
    </PlanetsSummaryWrapper>
  );
};

PlanetsSummary.propTypes = {
  planetsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      population: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PlanetsSummary;
