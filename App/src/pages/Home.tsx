import React from 'react';
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonText,
} from '@ionic/react';
import './Home.css';
import SuggestedSearchBar from '../components/SuggestedSearchBar';
// eslint-disable-next-line max-len
const PageText: string = 'Welcome to this application. Start typing in the text box below to check out the pay gap at different companies';

const Home = function Home() {
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
              <IonText>
                <p>{PageText}</p>
              </IonText>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <SuggestedSearchBar />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
