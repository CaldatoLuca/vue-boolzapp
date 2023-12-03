# Vue Boolzapp

Creazione di una web app ispirata a WhatsApp Web.

### Indice

-[ Creazione della struttura base - milestone 1](#milestone-1)

-[ Visualizzazione messaggi - milestone 2](#milestone-2)

-[ Aggiunta di un messaggio e risposta - milestone 3](#milestone-3)

-[ Ricerca utenti - milestone 4](#milestone-4)

-[ Cancella messaggio e visualizzazione ora/ultimo messaggio - milestone 5](#milestone-5)

-[ Considerazioni finali](#considerazioni-finali)

- [ Bonus ](#bonus)

## Milestone 1

### Consegna

- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse

- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

### Soluzione

Come da consegna ho ricreato la struttura base della web app e ho strutturato il codice in modo da facilitare l' inserimento di dati/eventi con Vue js.

Infatti ho incorporato la parte della chat (l' icona del contatto e la zona di visualizzazione messaggi) in un unico div, in modo da modificare il div padre e non i singoli elementi.

Inoltre ho deciso di non implementare Bootstrap perchè, dopo aver osservato il progetto, ho notato che molti dei componenti presenti e lo stile (colori/margini/padding...) non necessitavano di un framework così corposo per essere creati.

## Milestone 2

### Consegna

- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione

- Click sul contatto mostra la conversazione del contatto cliccato

### Soluzione

```html
<!-- lista contatti -->
<div class="contacts">
  <ul>
    <li v-for="contact in contacts">
      <!-- informazioni contatto -->
      <div class="main-user flex p-20" @click="changeContact(contact)">
        <!-- immagine profilo -->
        <div class="img-container">
          <img :src="contact.avatar" :alt="`Immagine di ${mainUser.name}`" />
        </div>
        <!-- nome -->
        <h4>{{ contact.name }}</h4>
      </div>
    </li>
  </ul>
</div>
```

```html
<!-- ?chat -->
<div v-if="currentContact" class="if-else-chat">
  <div class="contact-chat flex flex-column">
    <!-- ?header colonna di destra -->
    <div class="header-right flex space-between align-center p-15">
      <!-- informazioni utente proprietario -->
      <div class="main-user flex align-center">
        <div class="img-container">
          <img
            :src="currentContact.avatar"
            :alt="`Immagine di ${mainUser.name}`"
          />
        </div>
        <h3>{{ currentContact.name }}</h3>
      </div>

      <!-- icone -->
      <ul class="icons">
        <li><i class="fa-solid fa-magnifying-glass"></i></li>
        <li><i class="fa-solid fa-paperclip"></i></li>
        <li><i class="fa-solid fa-ellipsis-vertical"></i></li>
      </ul>
    </div>
    <!-- ?header colonna di destra/ -->

    <!-- ?messaggi -->
    <ul class="chat flex flex-column align-center">
      <li
        v-for="(message, index) in currentContact.messages"
        class="message flex"
        :class="checkStatus(message.status)"
      >
        <!-- messaggio -->
        <div class="text flex space-between align-center">
          <!-- testo del messaggio -->
          <div>{{message.message}}</div>
        </div>
      </li>
    </ul>
    <!-- ?messaggi/ -->
  </div>
</div>
<!-- ?chat/ -->
```

```js
  currentContact: null,

    checkStatus(status) {
      return status;
    },
    changeContact(contact) {
      this.currentContact = contact;
    },
```

Per la visualizzazione dei messaggi ho utilizzato un `v-for` come da consegna, ciclando sull' array fornito.

Per la visualizzazione della chat ho inizializzato la funzione `changeContact()` che assegna a currentContact il contatto su cui clicco. Per assegnare lo style ho implementato la funzione `checkStatus()` che semplicemente fa un return del valore dello status del messaggio (chiamando le classi css come i valori della chiave `status`: 'received' e 'sent')

Nella sezione dedicata alla chat (dell' html) visualizzo le proprietà del currentContat (controllando all' inizio col `v-if` se currenContact abbia un valore)

## Milestone 3

### Consegna

- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde

- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

### Soluzione

```html
<!-- ?area di compilazione del messaggio -->
<div class="right-search flex align-center around">
  <i class="fa-regular fa-face-smile"></i>
  <!-- barra di ricerca -->
  <input
    v-model="userText"
    @keyup.enter="newMessage"
    type="text"
    placeholder="Scrivi un messaggio"
  />
  <i class="fa-solid fa-microphone"></i>
</div>
<!-- ?area di compilazione del messaggio/ -->
```

```js
  userText: "",

      contactAnswer() {
      this.currentContact.messages.push({
        message: "Ok!",
        status: "received",
        date: new Date().toLocaleString(),
      });
    },
    newMessage() {
      if (this.userText.trim() !== "") {
        this.currentContact.messages.push({
          message: this.userText,
          status: "sent",
          date: new Date().toLocaleString(),
        });

        setTimeout(this.contactAnswer, 1000);

        this.userText = "";
      }
    },
```

Inserisco nell' input un v-model che utilizzerò per inviare il messaggio, assegno anche un evento al click del pulsante enter (`newMessage`).

La funzione `newMessage()` pusha all' interno dell' array dei messaggi (del currentContact) un nuovo oggetto messaggio che ha come testo il v-model(userText), come status 'sent' e come data quella corrente del computer. Richiama la funzione `contactAnswer` dopo 1 sec e svuota la barra di input. Tutto questo avviene solo se il testo digitato non è composto da soli spazi.

La funzione `contactAnswer()` ha la stessa funzionalità di `newMessage` ma cambiano le proprietà dell' oggetto: status 'received', message 'ok' e data corrente.

## Milestone 4

### Consegna

- Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

### Soluzione

```html
<!-- barra di ricerca -->
<div class="left-search p-10 flex">
  <i class="fa-solid fa-magnifying-glass flex-center"></i>
  <input
    v-model="searchText"
    type="text"
    placeholder="Cerca o inizia una nuova chat"
  />
</div>

<li v-for="contact in searchContacts()"></li>
```

```js
    searchContacts() {
      return this.contacts.filter((contact) => {
        return contact.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase().trim());
      });
    },
```

Per la ricerca dei contatti uso un v-model sulla barra di ricerca.

Implemento la funzione ` searchContacts()` che darà come risultato l' array filtrato (un array composta dagli elementi di contacts che includono nel loro nome la stringa scritta dall' utente - senza considerare gli spazi e le maiuscole)

Successivamente cambio nell' html l' array su cui fare il ciclo dei contatti, da contacts a searchContacts()

## Milestone 5

### Consegna

- Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

- Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

### Soluzione

```html
<div class="message-delete" @click="deleteMessage(index)">Delete message</div>
```

```js
    deleteMessage(index) {
      if (index === 0 && this.currentContact.messages.length === 1) {
        this.currentContact.visible = false;
      } else {
        this.currentContact.messages.splice(index, 1);
      }
    },
```

Per cancellare i messaggi ho creato una funzione (collegata poi con `@click` a un elemento html) che elimina il messaggio su cui si preme (passo quindi il suo indice alla funzione in modo da applicare solo su di lui il metodo `splice`)

Per la visualizzazione dell' ultimo messaggio e dell' ora ho semplicemnete creato degli elementi html che prendessero da currentContact il valore desiderato (per avere sempre l' ultimo messaggio ho impostato una funzione che ritorna come indice la lunchezza dell' array - 1)

## Considerazioni finali

Durante la fase di debug della funzione `deleteMessage()` ho riscontrato un errore, simile a quello spigato successivamente, durante la cancellazione del messaggio in posizione 0.

Ho quindi utilizzato la stessa strategia adottata per la visulizzazione della schermata della chat, impostando un `v-if` (legato alla chiave visible -con valore base true- dei contatti) alla chat stessa.

Dentro la fuznione `deleteMessage()` ho creato una condizione che imposta il valore di visible a false (quando l' indice è zero e l' array ha lunghezza 1).Così facendo al click sull' ultimo messaggio rimasto la chat non viene visualizzata perchè vuota.

Tutto questo però non cancella effettivamente il messaggio che quindi apparirà dopo aver scritto un nuovo messaggio, ho quindi aggiunto alla funzione `newMessage()` la funzionalità di cancellazione del messaggio stesso e della visualizzazione della chat (riassegnando a visible il valore true)

```html
<!-- messaggio -->
<div v-if="visibility()" class="text flex space-between align-center">
  <!-- testo del messaggio -->
  <div>{{message.message}}</div>
  <!-- data del messaggio -->
  <span class="time">{{ message.date }}</span>
  <!-- freccia con opzioni messaggio -info-cancella -->
  <i class="fa-solid fa-chevron-down"></i>
  <div class="message-option">
    <div class="message-info">Message info</div>
    <div class="message-delete" @click="deleteMessage(index)">
      Delete message
    </div>
  </div>
</div>
```

```js
    newMessage() {
      this.currentContact.visible = true;
      if (this.currentContact.messages.length === 1) {
        this.currentContact.messages.splice(0, 1);
      }
      ......
      ....
      ..
        },
    deleteMessage(index) {
      if (index === 0 && this.currentContact.messages.length === 1) {
        this.currentContact.visible = false;
      } else {
        this.currentContact.messages.splice(index, 1);
      }
    },
    visibility() {
      return this.currentContact.visible;
    },
```

### Errori riscontarti durante lo svilppo:

Ho cambiato la logica del programma per sistemare un errore che avveniva durante la ricerca del contatto.

`TypeError: Cannot read properties of undefined (reading 'avatar')`

currentContact andava a prendere l' indice del contatto al click su di esso e, di conseguenza, funzionava solo se la ricerca risultava corretta.
Tuttavia, nel momento in cui la ricerca risultava essere errata (inserendo una lettera non presente nei contatti, come la q), il codice si rompeva.
Ho provato a dare ai singoli contatti un indice 'forzato' tramite la chiave originalIndex (richiamavo quindi un indice statico) e ,inizialmente, ha funzionato ma questo ha poi aperto un problema con le funzionalità di invio messaggio e cancellazione messaggio.

`TypeError: Cannot read properties of undefined (reading 'message')`

Su consiglio del tutor ho concentrato la mia attenzione sulla visibilità delle informazioni, implementando quindi un v-if all' inizio della lista dei contatti in modo da poter avviare la ricerca solo a determinate condizioni (che currentContact abbia un valore). Ho anche cambiato la funzionalità di currentContact, facendoli assumere il valore del contatto selezionato (con tutte le sue proprietà) e non dell' indice. In questo modo ho potuto richiamare le singole chiavi senza incontare errori (es. 'currentContact.message').

## Bonus

### Funzionalità

- Evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi

- Cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono. Inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano

- Predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc

- Visualizzare nella lista dei contatti l'ultimo messaggio inviato/ricevuto da ciascun contatto

- Inserire l'orario corretto nei messaggi

### Grafica

- Visualizzare un messaggio di benvenuto che invita l'utente a selezionare un contatto dalla lista per visualizzare i suoi messaggi, anziché attivare di default la prima conversazione

- Aggiungere una splash page visibile per 1s all'apertura dell'app
