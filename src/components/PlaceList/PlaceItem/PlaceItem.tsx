import { FC, useState, useContext } from 'react';

import Card from '../../Card/Card';
import Button from '../../FormElements/Button/Button';
import Modal from '../../Modal/Modal';
import Map from '../../Map/Map';
import { AuthContext } from '../../../context/auth-context';

import './PlaceItem.css';

import { UserPlace } from '../../../types/types';

const PlaceItem: FC<{ place: UserPlace }> = ({ place }) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleMapHandler = () => setShowMap(!showMap);

  const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('Deleting...');
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={place.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={place.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={toggleConfirmModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={toggleConfirmModal}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>Deleting a wander point is irreversible.</p>
      </Modal>
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
            <Button inverse onClick={toggleMapHandler}>
              View on Map
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${place.id}`}>Edit</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={toggleConfirmModal}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
