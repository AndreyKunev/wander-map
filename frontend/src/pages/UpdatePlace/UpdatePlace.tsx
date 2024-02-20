import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import Input from '../../components/FormElements/Input/Input';
import Button from '../../components/FormElements/Button/Button';
import Card from '../../components/Card/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';

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
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: {
            value: place!.title,
            isValid: true,
          },
          description: {
            value: place!.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, place]);

  const placeUpdateSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!place) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find wander point!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Description should be at least 5 characters."
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update
      </Button>
    </form>
  );
};

export default UpdatePlace;
