import React from 'react';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';

const MIN_SIZE = 8;
const MAX_SIZE = 35;

const barAnimation = height => keyframes`
    from {
        height: 0rem;
    }

    to {
        height: ${height}rem;
    }
`;

const PlanetBarWrapper = styled.div`
  text-align: center;
  height: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  &:not(:last-child) {
    margin-right: 5rem;
  }
`;

const BarName = styled.p``;
const BarValue = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Bar = styled.div`
  height: 0;
  width: 10rem;
  margin-bottom: 2rem;
  background-color: ${p => p.theme.color.primary};

  animation-name: ${p => barAnimation(p.barHeight)};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;

const PlanetBar = ({planet, maxPopulation}) => {
  const {name, population: populationStr} = planet;
  const population = Number(populationStr);
  const percentage = population / maxPopulation;
  const barHeight = MIN_SIZE + percentage * (MAX_SIZE - MIN_SIZE);

  return (
    <PlanetBarWrapper>
      <BarValue>{population.toLocaleString()}</BarValue>
      <Bar barHeight={barHeight} animDuration={`${(1 - percentage) * 2}`} />
      <BarName>{name}</BarName>
    </PlanetBarWrapper>
  );
};

PlanetBar.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired
  }).isRequired,
  maxPopulation: PropTypes.number.isRequired
};

PlanetBar.defaultProps = {};

export default PlanetBar;
