"use script";

const { createApp } = Vue;

const vueConfig = {
  data() {
    const mainUser = {
      name: "John Doe",
      avatar: "./img/avatar_io.jpg",
    };
    const randomAnswer = [
      "Mia mamma diceva sempre: 'la vita è come una scatola di cioccolatini. Non sai mai quello che ti capita'",
      "Tieni i tuoi amici vicini, ma i tuoi nemici ancora più vicini.",
      "Lascio i problemi di domani al me di domani.",
      "Ok!",
      "Vivi e lascia vivere",
      "Rosso di sera bel tempo si spera",
      "Devo studiare Vue Js",
      "Sono un robot",
    ];
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
      searchText: "",
      currentContact: null,
      mainUser,
      contacts,
      userText: "",
      randomAnswer,
      splashPage: "",
      fontSize: "",
      color: "",
    };
  },
  methods: {
    checkStatus(status) {
      return status;
    },
    changeContact(contact) {
      this.currentContact = contact;
    },
    searchContacts() {
      return this.contacts.filter((contact) => {
        return contact.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase().trim());
      });
    },
    contactAnswer() {
      this.currentContact.messages.push({
        message:
          this.randomAnswer[
            Math.floor(Math.random() * this.randomAnswer.length)
          ],
        status: "received",
        date: new Date().toLocaleString(),
      });
    },
    newMessage() {
      this.currentContact.visible = true;
      if (this.currentContact.messages.length === 1) {
        this.currentContact.messages.splice(0, 1);
      }

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
    lastIndex(array) {
      return array.length - 1;
    },
    paperPlane() {
      if (this.userText.trim() !== "") {
        return "block";
      } else {
        return "none";
      }
    },
    microphone() {
      if (this.userText.trim() !== "") {
        return "none";
      } else {
        return "block";
      }
    },
    fontLarge() {
      this.fontSize = "large";
    },
    fontMedium() {
      this.fontSize = "";
    },
    fontSmall() {
      this.fontSize = "small";
    },
    darkMode() {
      this.color = "dark-mode";
    },
    lightMode() {
      this.color = "";
    },
  },
  mounted() {
    setTimeout(() => {
      this.splashPage = "hidden";
    }, 3000);
  },
};

const myApp = createApp(vueConfig);
myApp.mount("#app");
