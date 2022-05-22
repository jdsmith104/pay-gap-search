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
import { emptySearchResult } from './models/Trie';

const SuggestedSearchBar = function SuggestedSearchBar() {
  const CardText: string = 'No company selected';

  // Todo: This doesn't need to be state
  const [model, setModel] = useState<SearchModel>(new SearchModel({ data: [] }));

  const [searchResults, setSearchResults] = useState<Array<SearchItem>>([emptySearchResult, emptySearchResult, emptySearchResult]);

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
      setSearchResults(ItemsToList);
    }
  }

  function updateCardText(data: SearchItem) {
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

  const searchResultComponents: Array<any> = [];
  searchResults.forEach((searchResult) => {
    searchResultComponents.push(searchResult.name !== '' && (
      <IonRow
        class="ion-justify-content-center"
        onClick={() => {
          updateCardText(searchResult);
        }}
      >
        <IonItem>
          <IonLabel>{searchResult.name}</IonLabel>
        </IonItem>
      </IonRow>
    ));
  });

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
          {
            searchResultComponents
          }
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
