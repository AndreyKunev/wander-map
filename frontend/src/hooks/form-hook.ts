import { useReducer, useCallback } from 'react';

import {
  FormState,
  FormAction,
  FormReducerState,
  InputField,
} from '../types/types';

/**
 * Reducer function for managing form state.
 *
 * @param {FormReducerState} state The current state of the form.
 * @param {FormAction} action The action to be applied to the state.
 * @returns {FormReducerState} The new state after applying the action.
 */
const formReducer = (state: FormReducerState, action: FormAction) => {
  let formIsValid;

  switch (action.type) {
    case 'INPUT_CHANGE':
      formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId as keyof FormState]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid &&
            (state.inputs[inputId as keyof FormState] as InputField)!.isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

/**
 * Custom hook for managing form state.
 * @param initialInputs Initial form input values.
 * @param initialValidity Initial validity state of the form.
 * @returns A tuple containing the form state and input handler function.
 */
export const useForm = (
  initialInputs: FormState,
  initialValidity: boolean
): [
  FormReducerState,
  (id: string, value: string, isValid: boolean) => void,
  (inputData: FormState, formValidity: boolean) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: FormState, formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
