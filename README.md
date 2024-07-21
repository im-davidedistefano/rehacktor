# Rehacktor Davide Di Stefano - progetto finale

## Descrizione
Sviluppo di un'app dedita alla catalogazione di videogiochi, filtrabili per genere e tramite un campo di ricerca (o entrambi in contemporanea). Gli utenti, una volta registrati, potranno inviare messaggi in tempo reale ad altri gamers, salvare i loro videogiochi preferiti e aggiornare il proprio profilo.
L'intera UI è stata sviluppata da zero (design reference: [ABLETON](https://www.ableton.com/en/))

## API
* [RAWG API](https://rawg.io/apidocs) - client REST API
* [supabase](https://supabase.com/) - backend API/BaaS

## Soluzione di Styling o Libreria di Componenti
* [Bootstrap 5](https://getbootstrap.com/)

## Pagine
* Homepage - Pagina iniziale con gioco del mese in evidenza e giochi con migliore valutazione.
* All Games -  Pagina di tutti i giochi e filtri
* Category - Pagina categoria con tutti i giochi filtrati per categoria
* Single Game - Pagina con i dettagli di un singolo gioco, con possibilità di aggiungere ai preferiti e live chat
* Login - Pagina di login utente
* Register - Pagina di registrazione utente
* Profile - Pagina con i dettagli dell'utente e giochi preferiti (con la possibilità di visualizzarli e cancellari)
* Settings - Pagina impostazioni utente, dove quest'ultimo può aggiornare i propri dati

## API + Interazione Utente
* Utente non autenticato
    * Consulta archivio videogiochi
    * Ricerca videogiochi
    * Filtro videogiochi
    * Registrazione con email valida in piattaforma
* Utente autenticato
    * Login con email valida in piattaforma
    * Visita dettaglio singolo videogioco
    * Creazione di wishlist videogiochi
    * Realtime chat con altri utenti autenticati connessi

## Context API
* Token di Sessione per utente autenticato
* Dettaglio profilo utente autenticato

## Zustand global state management
* Wishlist

## Distribuzione
* [Rehacktor]()