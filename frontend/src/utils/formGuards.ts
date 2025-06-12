import { FormState, UserFormState, PlaceFormState } from "../types/types";

export const isUserFormState = (form: FormState): form is UserFormState => {
    return form.type === 'user';
}

export const isPlaceFormState = (form: FormState): form is PlaceFormState => {
    return form.type === 'place';
}