import { ChangeEvent, FC, useEffect, useReducer, useRef } from 'react';

import { validate } from '../../../utils/validators';

import './Input.css';

import { InputAction, InputProps, InputState } from '../../../types/types';

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    onInput(id!, value, isValid);
  }, [id, isValid, onInput, value]);

  useEffect(() => {
    const options = {
      fields: ['name'],
      types: ['address'],
    };

    if (inputRef.current && props.id === 'address') {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
    }
  }, [props.id]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
      value: '',
      validators: [],
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        ref={props.id === 'address' ? inputRef : null}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder || ''}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
