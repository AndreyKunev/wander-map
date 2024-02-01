import { FC } from 'react';

import Card from '../../Card/Card';
import Button from '../../FormElements/Button/Button';

import './PlaceItem.css';
import { UserPlace } from '../../../types/types';

const PlaceItem: FC<{ place: UserPlace }> = ({ place }) => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={place.imageUrl} alt={place.title} />
        </div>
        <div className="place-item__info">
          <h2>{place.title}</h2>
          <h3>{place.address}</h3>
          <p>{place.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse>View on Map</Button>
          <Button to={`/places/${place.id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
