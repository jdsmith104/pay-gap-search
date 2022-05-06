import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import SuggestedSearchBar from '../components/SuggestedSearchBar';

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
        <SuggestedSearchBar />
      </IonContent>
    </IonPage>
  );
};

export default Home;
