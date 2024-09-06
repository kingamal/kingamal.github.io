# Scheduler App

## Opis

Scheduler App to aplikacja kalendarza oparta na React, która pozwala na zarządzanie wydarzeniami i spotkaniami. Aplikacja integruje się z Firebase Firestore, aby umożliwić dodawanie, edytowanie i usuwanie wydarzeń w czasie rzeczywistym. Wykorzystuje bibliotekę [DevExpress Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler/) do zarządzania widokami kalendarza i planowania.

## Funkcjonalności

- Wyświetlanie wydarzeń w różnych widokach (miesiąc, tydzień, dzień)
- Dodawanie, edytowanie i usuwanie wydarzeń
- Integracja z Firebase Firestore dla przechowywania danych

## Technologie

- [React](https://reactjs.org/) - Biblioteka do budowania interfejsów użytkownika
- [DevExpress Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler/) - Biblioteka do zarządzania kalendarzem
- [Firebase](https://firebase.google.com/) - Backend jako usługa, w tym Firestore dla przechowywania danych
- [Material-UI](https://mui.com/) - Komponenty UI

## Instalacja

1. **Sklonuj repozytorium**

    ```bash
    git clone https://github.com/kingamal/scheduler.git
    cd my-scheduler-app
    ```

2. **Zainstaluj zależności**

    ```bash
    npm install
    ```

3. **Skonfiguruj Firebase**

    - Utwórz plik `.env` w katalogu głównym projektu.
    - Wklej poniższe zmienne środowiskowe do pliku `.env`, zastępując wartości swoimi danymi z Firebase:

    ```env
    REACT_APP_API_KEY=your-api-key
    REACT_APP_AUTH_DOMAIN=your-auth-domain
    REACT_APP_PROJECT_ID=your-project-id
    REACT_APP_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_APP_ID=your-app-id
    ```

4. **Uruchom aplikację**

    ```bash
    npm start
    ```

    Aplikacja powinna być dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Użycie

Po uruchomieniu aplikacji możesz:

- Przeglądać wydarzenia w widokach miesiąca, tygodnia i dnia.
- Dodawać nowe wydarzenia za pomocą formularza.
- Edytować istniejące wydarzenia.
- Usuwać wydarzenia.
