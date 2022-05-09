import './SuggestedSearchBar.css';
import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { ImportedData, SearchModel, SearchResult } from './models/SearchModel';

const CardText: string = 'No company selected';

const SuggestedSearchBar = function SuggestedSearchBar() {
  const [show, setShow] = useState<boolean>(false);
  const [model, setModel] = useState<SearchModel>(new SearchModel({ data: [] }));

  const [searchResult1, setSerachResult1] = useState<SearchResult>({
    name: '',
    details: [],
  });
  const [searchResult2, setSerachResult2] = useState<SearchResult>({
    name: '',
    details: [],
  });
  const [searchResult3, setSerachResult3] = useState<SearchResult>({
    name: '',
    details: [],
  });
  const [cardText, setCardText] = useState<string>(CardText);

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
      const ItemsToList: Array<SearchResult> = model.find(InputText);
      if (ItemsToList[0]) {
        setSerachResult1(ItemsToList[0]);
      } else {
        setSerachResult1({ name: '', details: [] });
      }
      if (ItemsToList[1]) {
        setSerachResult2(ItemsToList[1]);
      } else {
        setSerachResult2({ name: '', details: [] });
      }
      if (ItemsToList[2]) {
        setSerachResult3(ItemsToList[2]);
      } else {
        setSerachResult3({ name: '', details: [] });
      }
      if (InputText !== '') {
        if (show === false) {
          setShow(true);
        }
      } else if (show === true) {
        setShow(false);
      }
    }
  }

  function showDetail(data: SearchResult) {
    if (data.details.length >= 2) {
      const newCardText = `${data.name}\
      has ${data.details[0]}\
       employees and on average women earn\
        ${data.details[1]}% less per hour than men`;
      setCardText(newCardText);
    } else {
      setCardText(CardText);
    }
  }

  return (
    <div className="container">
      <IonGrid>
        <IonRow class="ion-justify-content-center">
          <IonInput
            id="text-input"
            inputMode="search"
            onIonChange={(e) => {
              getDropdownItems(e);
            }}
            autofocus
            placeholder="Type a company name here"
          />
        </IonRow>
        {show && (
          <div>
            <IonRow
              class="ion-justify-content-center"
              onClick={() => {
                showDetail(searchResult1);
              }}
            >
              <IonItem>
                <IonLabel>{searchResult1.name}</IonLabel>
              </IonItem>
            </IonRow>
            <IonRow
              class="ion-justify-content-center"
              onClick={() => {
                showDetail(searchResult2);
              }}
            >
              <IonItem>
                <IonLabel>{searchResult2.name}</IonLabel>
              </IonItem>
            </IonRow>
            <IonRow
              class="ion-justify-content-center"
              onClick={() => {
                showDetail(searchResult3);
              }}
            >
              <IonItem>
                <IonLabel>{searchResult3.name}</IonLabel>
              </IonItem>
            </IonRow>
          </div>
        )}
        <IonRow class="ion-justify-content-center">
          <IonCard>
            <IonCardContent>{cardText}</IonCardContent>
          </IonCard>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default SuggestedSearchBar;
