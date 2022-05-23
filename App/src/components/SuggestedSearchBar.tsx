import './SuggestedSearchBar.scss';
import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import SearchModel from './models/SearchModel';
import { ImportedData, SearchItem } from './models/SearchModelTypes';
import { emptySearchResult } from './models/Trie';

let searchModel: SearchModel;
const noCompanySelectedText: string = 'No company selected';

const SuggestedSearchBar = function SuggestedSearchBar() {
  const [searchResults, setSearchResults] = useState<Array<SearchItem>>([
    emptySearchResult,
    emptySearchResult,
    emptySearchResult,
  ]);

  const [detailedInformation, setDetailedInformation] = useState<string>(noCompanySelectedText);

  async function setModelData() {
    const res = await fetch(
      'data/json_data.json',
      // eslint-disable-next-line max-len
      {
        credentials: 'include',
      },
    );
    const objData: ImportedData = JSON.parse(await res.json());
    searchModel = new SearchModel(objData);
  }

  function updateSearchResults(event: any) {
    const InputText: string = event.detail.value;
    if (InputText.length === 0) {
      setDetailedInformation(noCompanySelectedText);
    }
    if (searchModel) {
      const ItemsToList: Array<SearchItem> = searchModel.find(InputText);
      setSearchResults(ItemsToList);
    }
  }

  function onResultClicked(data: SearchItem) {
    if (data.details.length >= 2) {
      const newCardText = `${data.name}\
      has ${data.details[0]}\
       employees and on average women earn\
        ${data.details[1]}% less per hour than men`;
      setDetailedInformation(newCardText);
    } else {
      setDetailedInformation(noCompanySelectedText);
    }
  }

  useEffect(() => {
    setModelData();
  }, []);

  const searchResultComponents: Array<any> = [];
  searchResults.forEach((searchResult) => {
    searchResultComponents.push(
      searchResult.name !== '' && (
        <IonRow
          class="ion-justify-content-center"
          onClick={() => {
            onResultClicked(searchResult);
          }}
        >
          <IonItem class="search-result">
            <IonLabel>{searchResult.name}</IonLabel>
          </IonItem>
        </IonRow>
      ),
    );
  });

  return (
    <div className="container">
      <IonGrid>
        <div className="search-area">
          <IonRow class="ion-justify-content-center">
            <IonItem class="search-result">
              <IonIcon icon={searchOutline} slot="start" />
              <IonInput
                id="text-input"
                inputMode="search"
                onIonChange={(e) => {
                  updateSearchResults(e);
                }}
                autofocus
                placeholder="Type a company name here"
              />
            </IonItem>
          </IonRow>
          <div>{searchResultComponents}</div>
        </div>
        <IonRow class="ion-justify-content-center">
          <IonCard>
            <IonCardContent id="text-output">{detailedInformation}</IonCardContent>
          </IonCard>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default SuggestedSearchBar;
