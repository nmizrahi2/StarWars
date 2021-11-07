import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const VehiclesSummaryWrapper = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  margin-bottom: 2rem;
  border-top: 1px solid currentColor;
  border-left: 1px solid currentColor;
`;

const GridCell = styled.div`
  border-bottom: 1px solid currentColor;
  border-right: 1px solid currentColor;
  padding: 1rem 2rem;
  flex: 1;
  display: flex;
  align-items: center;
`;

const PlanetRow = styled.p``;

const VehiclesSummary = ({vehiclesData}) => {
  return (
    <VehiclesSummaryWrapper>
      {Object.values(vehiclesData).map(vehicle => (
        <Grid key={vehicle.name}>
          <GridCell>Vehicle name with the largest sum</GridCell>
          <GridCell>{vehicle.name}</GridCell>
          <GridCell>Related home planets and their respective population</GridCell>
          <GridCell>
            {vehicle.planets.map(({name, population}) => (
              <PlanetRow key={name}>{`${name}: ${population}`}</PlanetRow>
            ))}
          </GridCell>
          <GridCell>Related pilot names</GridCell>
          <GridCell>{vehicle.pilots.join(',')}</GridCell>
        </Grid>
      ))}
    </VehiclesSummaryWrapper>
  );
};

VehiclesSummary.propTypes = {
  vehiclesData: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      planets: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          population: PropTypes.string.isRequired
        })
      ),
      pilots: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default VehiclesSummary;
