"use script";

const { createApp } = Vue;

const vueConfig = {
  data() {
    let searchText = "";
    let userText = "";
    let currentContact = 0;
    const mainUser = {
      name: "John Doe",
      avatar: "./img/avatar_io.jpg",
    };
    const contacts = [
      {
        name: "Michele",
        avatar: "./img/avatar_1.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Ricordati di stendere i panni",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            message: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "./img/avatar_2.jpg",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "./img/avatar_3.jpg",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            message: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro B.",
        avatar: "./img/avatar_4.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro L.",
        avatar: "./img/avatar_5.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ricordati di chiamare la nonna",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Va bene, stasera la sento",
            status: "received",
          },
        ],
      },
      {
        name: "Claudia",
        avatar: "./img/avatar_6.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao Claudia, hai novità?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Non ancora",
            status: "received",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "Nessuna nuova, buona nuova",
            status: "sent",
          },
        ],
      },
      {
        name: "Federico",
        avatar: "./img/avatar_7.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Fai gli auguri a Martina che è il suo compleanno!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Grazie per avermelo ricordato, le scrivo subito!",
            status: "received",
          },
        ],
      },
      {
        name: "Davide",
        avatar: "./img/avatar_8.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao, andiamo a mangiare la pizza stasera?",
            status: "received",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "OK!!",
            status: "received",
          },
        ],
      },
    ];

    return {
      searchText,
      userText,
      currentContact,
      mainUser,
      contacts,
    };
  },
  methods: {
    checkStatus(status) {
      return status;
    },
    changeContact(index) {
      this.currentContact = index;
    },
    selectedContact(index) {
      if (this.currentContact === index) return "selected";
    },
    contactAnswer() {
      const message = this.contacts[this.currentContact].messages;

      this.contacts[this.currentContact].messages.push({
        date: message[message.length - 1].date,
        message: "ok!",
        status: "received",
      });
    },
    newMessage() {
      const message = this.contacts[this.currentContact].messages;
      if (this.userText.trim() === "") {
        return;
      } else {
        this.contacts[this.currentContact].messages.push({
          date: message[message.length - 1].date,
          message: this.userText,
          status: "sent",
        });
        this.userText = "";
      }
      setTimeout(this.contactAnswer, 1000);
    },
    searchContact() {
      if (this.searchText !== "") {
        return this.contacts
          .filter((element) =>
            element.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
          .map((element) => {
            return {
              name: element.name,
              avatar: element.avatar,
              messages: element.messages,
            };
          });
      } else {
        return this.contacts;
      }
    },
    findIndex() {
      if (this.searchText !== "") {
        this.currentContact = this.searchContact().indexOf((element) =>
          element.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
      return this.currentContact;
    },
    deleteMessage(contactIndex, messageIndex) {
      this.contacts[contactIndex].messages.splice(messageIndex, 1);
    },
    lastIndex(array) {
      return array.length - 1;
    },
  },
};

const myApp = createApp(vueConfig);
myApp.mount("#app");
