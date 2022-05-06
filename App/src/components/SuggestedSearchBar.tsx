import './SuggestedSearchBar.css';
import React, { useState } from 'react';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';

const SuggestedSearchBar = function SuggestedSearchBar() {
  const [show, setShow] = useState(false);

  function getDropdownItems(event: any) {
    const InputText: string = event.detail.value;
    const ItemsToList: Array<string> = [InputText, InputText, InputText];
    console.log(ItemsToList[0]);
    if (InputText !== '') {
      if (show === false) {
        setShow(true);
      }
    } else if (show === true) {
      setShow(false);
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
