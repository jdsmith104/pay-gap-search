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
import SearchModel from './models/SearchModel';
import { ImportedData, SearchItem } from './models/SearchModelTypes';

const SuggestedSearchBar = function SuggestedSearchBar() {
  const CardText: string = 'No company selected';
  let show: boolean = false;
  function setShow(newShow: boolean) {
    show = newShow;
  }

  // Todo: This doesn't need to be state
  const [model, setModel] = useState<SearchModel>(new SearchModel({ data: [] }));

  const emptySearchResults: Array<SearchItem> = [
    {
      name: '',
      details: [],
    },
    {
      name: '',
      details: [],
    },
    {
      name: '',
      details: [],
    },
  ];

  // Todo: This doesn't need to be state
  const [searchResults, setSearchResults] = useState<Array<SearchItem>>(emptySearchResults);

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
      const ItemsToList: Array<SearchItem> = model.find(InputText);
      if (ItemsToList.length > 0) {
        setSearchResults(ItemsToList);
      } else {
        setSearchResults(emptySearchResults);
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

  function showDetail(data: SearchItem) {
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
          {searchResults[0].name !== '' && (
            <IonRow
              class="ion-justify-content-center"
              onClick={() => {
                showDetail(searchResults[0]);
              }}
            >
              <IonItem>
                <IonLabel>{searchResults[0].name}</IonLabel>
              </IonItem>
            </IonRow>
          )}
          {searchResults[1].name !== '' && (
            <IonRow
              class="ion-justify-content-center"
              onClick={() => {
                showDetail(searchResults[1]);
              }}
            >
              <IonItem>
                <IonLabel>{searchResults[1].name}</IonLabel>
              </IonItem>
            </IonRow>
          )}
          {searchResults[2].name !== '' && (
            <IonRow
              class="ion-justify-content-center"
              onClick={() => {
                showDetail(searchResults[2]);
              }}
            >
              <IonItem>
                <IonLabel>{searchResults[2].name}</IonLabel>
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
