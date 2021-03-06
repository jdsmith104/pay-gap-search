import React, { useState } from 'react';
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonText,
  IonFooter,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import './Home.css';
import SuggestedSearchBar from '../components/SuggestedSearchBar';
// eslint-disable-next-line max-len
const PageText: string =
  'Welcome to this application. Start typing in the text box below to and click the result to view their pay gap.';

const Home = function Home() {
  const [detailedInformation, setDetailedInformation] =
    useState<string>('Nothing selected');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pay Gap Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pay Gap Search</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonText className="page-elements">
                <p>{PageText}</p>
              </IonText>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <SuggestedSearchBar onResultSelected={setDetailedInformation} />
            </IonRow>

            <IonRow class="ion-justify-content-center">
              <IonCard className="detailed-output-container page-elements">
                <IonCardContent id="text-output">
                  {detailedInformation}
                </IonCardContent>
              </IonCard>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonText>
            <p>
              Source:{' '}
              <a href="https://gender-pay-gap.service.gov.uk/viewing/download">
                www.gender-pay-gap.service.gov.uk
              </a>
            </p>
          </IonText>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
