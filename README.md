# Vue Boolzapp

Creazione di una web app ispirata a WhatsApp Web.

### Indice

-[ Creazione della struttura base - milestone 1](#milestone-1)

## Milestone 1

![Milestone 1](./readme_img/milestone1.jpeg)

### Consegna

- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse

- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

### Soluzione

Come da consegna ho ricreato la struttura base della web app e ho strutturato il codice in modo da facilitare l' inserimento di dati/eventi con Vue js.

Infatti ho incorporato la parte della chat (l' icona del contatto e la zona di visualizzazione messaggi) in un unico div, in modo da modificare il div padre e non i singoli elementi.

Inoltre ho deciso di non implementare Bootstrap perchè, dopo aver osservato il progetto, ho notato che molti dei componenti presenti e lo stile (colori/margini/padding...) non necessitavano di un framework così corposo per essere creati.

Erroe risolto:

Ho cambiato la logica del programma per sistemare un errore che avveniva durante la ricerca del contatto.

`TypeError: Cannot read properties of undefined (reading 'avatar')`

currentContact andava a prendere l' indice del contatto al click su di esso e, di conseguenza, funzionava solo se la ricerca risultava corretta.
Tuttavia, nel momento in cui la ricerca risultava essere errata (inserendo una lettera non presente nei contatti, come la q), il codice si rompeva.
Ho provato a dare ai singoli contatti un indice 'forzato' tramite la chiave originalIndex (richiamavo quindi un indice statico) e ,inizialmente, ha funzionato ma questo ha poi aperto un problema con le funzionalità di invio messaggio e cancellazione messaggio.

`TypeError: Cannot read properties of undefined (reading 'message')`

Su consiglio del tutor ho concentrato la mia attenzione sulla visibilità delle informazioni, implementando quindi un v-if all' inizio della lista dei contatti in modo da poter avviare la ricerca solo a determinate condizioni (currentContact abbia un valore). Ho anche cambiato la funzionalità di currentContact, ora non assume più il valore dell' indice ma diventa il contatto selezionato - con tutte le sue proprietà. In questo modo posso richiamare i singoli valori senza incontare errori ('currentContact.message').
