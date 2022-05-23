import './SuggestedSearchBar.scss';
import React, { useEffect, useState } from 'react';
import { IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import SearchModel from './models/SearchModel';
import { ImportedData, SearchItem } from './models/SearchModelTypes';
import { emptySearchResult } from './models/Trie';

let searchModel: SearchModel;
const noCompanySelectedText: string = 'No company selected';

const SuggestedSearchBar = function SuggestedSearchBar({
  onResultSelected,
}: {
  onResultSelected: (resultDetail: string) => void;
}) {
  const [searchResults, setSearchResults] = useState<Array<SearchItem>>([
    emptySearchResult,
    emptySearchResult,
    emptySearchResult,
  ]);

  async function setModelData() {
    const res = await fetch(
      'data/json_data.json',
      // eslint-disable-next-line max-len
      {
        credentials: 'include',
      },
    );
    const objData: ImportedData = JSON.parse(await res.json());
    searchModel = new SearchModel(objData, 2, 3);
  }

  function updateSearchResults(event: any) {
    const InputText: string = event.detail.value;
    if (InputText.length === 0) {
      onResultSelected(noCompanySelectedText);
    }
    if (searchModel) {
      const ItemsToList: Array<SearchItem> = searchModel.find(InputText);
      setSearchResults(ItemsToList);
    }
  }

  const onResultClicked = (data: SearchItem) => {
    if (data.details.length >= 2) {
      const newCardText = `${data.name}\
      has ${data.details[0]}\
       employees and on average women earn\
        ${data.details[1]}% less per hour than men`;
      onResultSelected(newCardText);
    } else {
      onResultSelected(noCompanySelectedText);
    }
  };

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
            <IonItem>
              <IonIcon icon={searchOutline} slot="start" />
              <IonInput
                id="text-input"
                inputMode="search"
                onIonChange={(e) => {
                  updateSearchResults(e);
                }}
                autofocus
                placeholder="Search"
                autoCapitalize="on"
              />
            </IonItem>
          </IonRow>
          <div>{searchResultComponents}</div>
        </div>
      </IonGrid>
    </div>
  );
};

export default SuggestedSearchBar;
