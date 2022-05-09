import './SuggestedSearchBar.css';
import React, { useEffect, useState } from 'react';
import { IonInput, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { ImportedData, SearchModel } from './models/SearchModel';

const SuggestedSearchBar = function SuggestedSearchBar() {
  const [show, setShow] = useState(false);
  const [model, setModel] = useState(new SearchModel({ data: [] }));

  useEffect(() => {
    fetch(
      'data/json_data.json',
      // eslint-disable-next-line max-len
      {
        credentials: 'include',
      },
    )
      .then((response) => response.json())
      .then((data) => {
        const objData = JSON.parse(data);
        return objData;
      })
      .then((objectData: ImportedData) => {
        setModel(new SearchModel(objectData));
      })
      .catch((err) => console.log(err));
  }, []);

  function getDropdownItems(event: any) {
    const InputText: string = event.detail.value;

    if (model) {
      const ItemsToList = model.find(InputText);

      console.log(ItemsToList[0]);
      if (InputText !== '') {
        if (show === false) {
          setShow(true);
        }
      } else if (show === true) {
        setShow(false);
      }
    }
  }

  return (
    <div className="container">
      <IonList>
        <IonListHeader lines="inset">
          <IonInput
            id="text-input"
            inputMode="search"
            onIonChange={(e) => {
              getDropdownItems(e);
            }}
          />
        </IonListHeader>
        {show && (
          <div>
            <IonItem>
              <IonLabel>Input</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Toggle</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Radio</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Checkbox</IonLabel>
            </IonItem>
          </div>
        )}
      </IonList>
    </div>
  );
};

export default SuggestedSearchBar;
