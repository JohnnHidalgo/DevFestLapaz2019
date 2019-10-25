'use strict';

const {
    dialogflow,
    BasicCard,
    Permission,
    Suggestions,
} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({ debug: true });

const cardSpeakers = {
    'Pablo Perez': {
        title: 'Pablo Perez',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_PabloPerez.jpg?alt=media&token=4ac9f6ac-674b-4a06-898e-52177374b7b2',
            accessibilityText: 'Pablo Perez',
        },
        display: 'WHITE',
    },
    'Argel Bejarano': {
        title: 'Argel Bejarano',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_ArgelBejarano.jpeg?alt=media&token=6e7f7398-9e4c-4797-be76-80bd9b601add',
            accessibilityText: 'Argel Bejarano',
        },
        display: 'WHITE',
    },
    'Victor Aguilar': {
        title: 'Victor Aguilar',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_VictorAguilar.jpeg?alt=media&token=3c5aeec9-23b8-42de-9505-1fc32fd1cada',
            accessibilityText: 'Victor Aguilar',
        },
        display: 'WHITE',
    },
    'Noe Bautista': {
        title: 'Noe Bautista',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_NoeBranagan.jpg?alt=media&token=63da5be6-45f1-43c8-9ac2-a7f0dba0a5f5',
            accessibilityText: 'Noe Bautista',
        },
        display: 'WHITE',
    },
    'Adriana Moya': {
        title: 'Adriana Moya',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_AdrianaMoya.jpeg?alt=media&token=1b1e0b4d-69ac-4474-b247-1ab9b8bf789e',
            accessibilityText: 'Adriana Moya',
        },
        display: 'WHITE',
    },
    'Leonidas Esteban': {
        title: 'Leonidas Esteban',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_LeonidasEstevan.jpg?alt=media&token=296f720c-c863-41d3-bf95-5ab1ef2a40aa',
            accessibilityText: 'Leonidas Esteban',
        },
        display: 'WHITE',
    },
    'Diego Velasquez': {
        title: 'Diego Velasquez',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_DiegoVel%C3%A1squez.jpg?alt=media&token=fb6ad58c-957c-461e-bbe3-9bf3c1331478',
            accessibilityText: 'Diego Velasquez',
        },
        display: 'WHITE',
    },
    'Fernanda Ramirez': {
        title: 'Fernanda Ramirez',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_FernandaRamirez.JPG?alt=media&token=be43db13-fff6-4b2a-8847-67b2bdbf944c',
            accessibilityText: 'Fernanda Ramirez',
        },
        display: 'WHITE',
    },
    'Luis Avilés': {
        title: 'Luis Avilés',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_LuisAviles.png?alt=media&token=af1dc44e-eb16-401e-ae83-9d8a400b3ee6',
            accessibilityText: 'Luis Avilés',
        },
        display: 'WHITE',
    },
    'Kenji Kawada': {
        title: 'Kenji Kawada',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_KenjiKawada.jpg?alt=media&token=28d0d294-4160-4e8b-9e8c-563842fce50c',
            accessibilityText: 'Kenji Kawada',
        },
        display: 'WHITE',
    },
};

var elemSpeakers = [
    ['Pablo Perez', 'Argentina', 'Tensorflow'],
    ['Argel Bejarano', 'Mexico', 'Flutter'],
    ['Victor Aguilar', 'Bolivia', 'Backend'],
    ['Noe Branagan', 'Republica Dominicana', 'Kotlin'],
    ['Adriana Moya', 'Colombia', 'GCP'],
    ['Leonidas Esteban', 'Mexico', 'Web'],
    ['Diego Velasquez', 'Peru', 'Flutter'],
    ['Fernanda Ochoa', 'Mexico', 'AOG'],
    ['Luis Avilés', 'Bolivia', 'Angular'],
    ['Kenji Kawaida', 'Bolivia', 'Android'],
];

var paisSpeakers = [
    ['Argentina'],
    ['Mexico'],
    ['Bolivia'],
    ['Republica Dominicana'],
    ['Colombia'],
    ['Peru'],
];
var index;
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new Permission({
        context: 'Hola, para conocerte mejor.',
        permissions: 'NAME',
    }));
});

app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
        conv.ask(`OK, no te preocupes. Vamos a realizarte algunas preguntas \n`);
        conv.ask(`Seleciona una categoría`);
        conv.ask(new Suggestions('Speakers', 'Tech'));
    } else {
        conv.data.userName = conv.user.name.display;
        conv.ask(`Gracias, ${conv.data.userName}. Vamos a realizarte algunas preguntas `);
        conv.ask(`Seleciona una categoría`);
        conv.ask(new Suggestions('Speakers', 'Tech'));
    }
});

app.intent('SelectCategory', (conv, { category }) => {
    if (category == 'Speakers') {
        index = Math.floor(Math.random() * elemSpeakers.length);
        var selectSpeaker = elemSpeakers[index][0];
        conv.ask(`${category}! Comencemos!, estás listo?`, new BasicCard(cardSpeakers[selectSpeaker]));
        conv.ask(`De que país es  ${selectSpeaker}?`);
        conv.ask(new Suggestions(paisSpeakers[0], paisSpeakers[1], paisSpeakers[2], paisSpeakers[3], paisSpeakers[4], paisSpeakers[5]));
    } else {
        conv.close(`${category}! No tenemos el quiz aún`);
    }
});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);