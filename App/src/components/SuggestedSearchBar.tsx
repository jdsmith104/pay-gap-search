import './SuggestedSearchBar.css';
import React, { useEffect, useState } from 'react';
import { IonInput, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { ImportedData, SearchModel } from './models/SearchModel';

const SuggestedSearchBar = function SuggestedSearchBar() {
  const [show, setShow] = useState(false);
  const [model, setModel] = useState(new SearchModel({ data: [] }));

  const [searchResult1, setSerachResult1] = useState('');
  const [searchResult2, setSerachResult2] = useState('');
  const [searchResult3, setSerachResult3] = useState('');

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
      const ItemsToList: Array<string> = model.find(InputText);
      setSerachResult1(ItemsToList[0]);
      setSerachResult2(ItemsToList[1]);
      setSerachResult3(ItemsToList[2]);
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
              <IonLabel>{searchResult1}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>{searchResult2}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>{searchResult3}</IonLabel>
            </IonItem>
          </div>
        )}
      </IonList>
    </div>
  );
};

export default SuggestedSearchBar;
