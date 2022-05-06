import './SuggestedSearchBar.css';
import React, { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';

class Toggler {
  #setShow: (show: boolean) => any;

  constructor(show: boolean, callback: (show: boolean) => any) {
    this.#setShow = callback;
    this.#setShow(show);
  }
}

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

  function handleHide() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
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
        <IonButton
          onClick={() => {
            handleShow();
          }}
        >
          Show
        </IonButton>
        <IonButton
          onClick={() => {
            handleHide();
          }}
        >
          Hide
        </IonButton>
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
