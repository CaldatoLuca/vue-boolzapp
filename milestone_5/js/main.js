"use script";

const { createApp } = Vue;

const vueConfig = {
  data() {
    var DateTime = luxon.DateTime;
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
            date: "10/01/2020 15.30.55",
            time: DateTime.fromISO("15:30:55").toFormat("hh:mm a"),

            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            time: DateTime.fromISO("15:50:00").toFormat("hh:mm a"),
            message: "Ricordati di stendere i panni",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            time: DateTime.fromISO("16:15:22").toFormat("hh:mm a"),
            message: "Tutto fatto!",
            status: "received",
          },
        ],
        originalIndex: 0,
      },
      {
        name: "Fabio",
        avatar: "./img/avatar_2.jpg",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            time: DateTime.fromISO("16:30:00").toFormat("hh:mm a"),
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            time: DateTime.fromISO("16:30:55").toFormat("hh:mm a"),
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            time: DateTime.fromISO("16:35").toFormat("hh:mm a"),
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
        originalIndex: 1,
      },
      {
        name: "Samuele",
        avatar: "./img/avatar_3.jpg",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            time: DateTime.fromISO("10:10:40").toFormat("hh:mm a"),
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            time: DateTime.fromISO("10:20:10").toFormat("hh:mm a"),
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            time: DateTime.fromISO("16:15:22").toFormat("hh:mm a"),
            message: "Ah scusa!",
            status: "received",
          },
        ],
        originalIndex: 2,
      },
      {
        name: "Alessandro B.",
        avatar: "./img/avatar_4.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            time: DateTime.fromISO("15:30:55").toFormat("hh:mm a"),
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            time: DateTime.fromISO("15:50:00").toFormat("hh:mm a"),
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
        originalIndex: 3,
      },
      {
        name: "Alessandro L.",
        avatar: "./img/avatar_5.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            time: DateTime.fromISO("15:30:55").toFormat("hh:mm a"),
            message: "Ricordati di chiamare la nonna",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            time: DateTime.fromISO("15:50:00").toFormat("hh:mm a"),
            message: "Va bene, stasera la sento",
            status: "received",
          },
        ],
        originalIndex: 4,
      },
      {
        name: "Claudia",
        avatar: "./img/avatar_6.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            time: DateTime.fromISO("15:30:55").toFormat("hh:mm a"),
            message: "Ciao Claudia, hai novità?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            time: DateTime.fromISO("15:50:00").toFormat("hh:mm a"),

            message: "Non ancora",
            status: "received",
          },
          {
            date: "10/01/2020 15:51:00",
            time: DateTime.fromISO("15:51:00").toFormat("hh:mm a"),
            message: "Nessuna nuova, buona nuova",
            status: "sent",
          },
        ],
        originalIndex: 5,
      },
      {
        name: "Federico",
        avatar: "./img/avatar_7.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            time: DateTime.fromISO("15:30:55").toFormat("hh:mm a"),
            message: "Fai gli auguri a Martina che è il suo compleanno!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            time: DateTime.fromISO("15:50:00").toFormat("hh:mm a"),
            message: "Grazie per avermelo ricordato, le scrivo subito!",
            status: "received",
          },
        ],
        originalIndex: 6,
      },
      {
        name: "Davide",
        avatar: "./img/avatar_8.jpg",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            time: DateTime.fromISO("15:30:55").toFormat("hh:mm a"),
            message: "Ciao, andiamo a mangiare la pizza stasera?",
            status: "received",
          },
          {
            date: "10/01/2020 15:50:00",
            time: DateTime.fromISO("15:50:00").toFormat("hh:mm a"),
            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:51:00",
            time: DateTime.fromISO("15:51:00").toFormat("hh:mm a"),
            message: "OK!!",
            status: "received",
          },
        ],
        originalIndex: 7,
      },
    ];

    return {
      userText,
      currentContact,
      mainUser,
      contacts,
      searchText: "",
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
      message.push({
        time: message[message.length - 1].time,
        message: "ok!",
        status: "received",
      });
    },
    newMessage() {
      const message = this.contacts[this.currentContact].messages;
      if (this.userText.trim() === "") {
        return;
      } else {
        message.push({
          time: message[message.length - 1].time,
          message: this.userText,
          status: "sent",
        });
        this.userText = "";
      }
      setTimeout(this.contactAnswer, 1000);
    },
    deleteMessage(contactIndex, messageIndex) {
      this.contacts[contactIndex].messages.splice(messageIndex, 1);
    },
    searchContact() {
      return this.contacts
        .filter((contact) =>
          contact.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
        .map((contact) => {
          return {
            ...contact,
            name: contact.name,
          };
        });
    },
    lastMessageIndex(index) {
      return this.contacts[index].messages.length - 1;
    },
  },
};

const myApp = createApp(vueConfig);
myApp.mount("#app");
