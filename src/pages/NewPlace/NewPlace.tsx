import Input from '../../components/FormElements/Input/Input';

import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input type='text' label='Title' element='input' />
    </form>
  );
};

export default NewPlace;
