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

const SuggestedSearchBar = function SuggestedSearchBar() {
  const CardText: string = 'No company selected';
  // Todo: This doesn't need to be state
  let show: boolean = false;
  function setShow(newShow: boolean) {
    show = newShow;
  }

  // Todo: This doesn't need to be state
  const [model, setModel] = useState<SearchModel>(new SearchModel({ data: [] }));

  // Todo: This doesn't need to be state
  const [searchResult1, setSearchResult1] = useState<SearchResult>({
    name: '',
    details: [],
  });
  const [searchResult2, setSearchResult2] = useState<SearchResult>({
    name: '',
    details: [],
  });
  const [searchResult3, setSearchResult3] = useState<SearchResult>({
    name: '',
    details: [],
  });

  // Todo: This doesn't need to be state
  const [cardText, setCardText] = useState<string>(CardText);

  async function setModelData() {
    const res = await fetch(
      'data/json_data.json',
      // eslint-disable-next-line max-len
      {
        credentials: 'include',
      },
    );
    const objData: ImportedData = JSON.parse(await res.json());
    setModel(new SearchModel(objData));
  }

  useEffect(() => {
    setModelData();
  }, []);

  function getDropdownItems(event: any) {
    const InputText: string = event.detail.value;

    if (model) {
      const ItemsToList: Array<SearchResult> = model.find(InputText);
      if (ItemsToList[0]) {
        setSearchResult1(ItemsToList[0]);
      } else {
        setSearchResult1({ name: '', details: [] });
      }
      if (ItemsToList[1]) {
        setSearchResult2(ItemsToList[1]);
      } else {
        setSearchResult2({ name: '', details: [] });
      }
      if (ItemsToList[2]) {
        setSearchResult3(ItemsToList[2]);
      } else {
        setSearchResult3({ name: '', details: [] });
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
        <div>
          {searchResult1.name !== '' && (
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
          )}
          {searchResult2.name !== '' && (
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
          )}
          {searchResult3.name !== '' && (
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
          )}
        </div>
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
