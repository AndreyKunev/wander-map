import { FC } from 'react';

import Card from '../Card/Card';
import PlaceItem from './PlaceItem/PlaceItem';

import { UserPlaceArray } from '../../types/types';

import './PlaceList.css';

const PlaceList: FC<{ placeArr: UserPlaceArray }> = ({ placeArr }) => {

  if (placeArr.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Wander Points found.</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {placeArr.map((place) => (
        <PlaceItem
          key={place.id}
          place={place}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
