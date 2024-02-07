import { useParams } from "react-router-dom";

import Input from "../../components/FormElements/Input/Input";
import Button from "../../components/FormElements/Button/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";

import './UpdatePlace.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const { placeId } = useParams();

  const place = DUMMY_PLACES.find(p => p.id === placeId);

  if (!place) {
    return <div className="center">
      <h2>Could not find wander point!</h2>
    </div>
  }

  return (
    <form className="place-form">
      <Input 
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title."
      onInput={() => {}}
      value={place.title}
      valid={true}
      />
      <Input 
      id="description"
      element="textarea"
      label="Description"
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="Description should be at least 5 characters."
      onInput={() => {}}
      value={place.description}
      valid={true}
      />
      <Button type="submit" disabled={true}>
        Update
      </Button>
    </form>
  )
}

export default UpdatePlace;