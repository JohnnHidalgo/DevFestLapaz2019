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
        display: 'BLUE',
    },
    'Argel Bejarano': {
        title: 'Argel Bejarano',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_ArgelBejarano.jpeg?alt=media&token=6e7f7398-9e4c-4797-be76-80bd9b601add',
            accessibilityText: 'Argel Bejarano',
        },
        display: 'BLUE',
    },
    'Victor Aguilar': {
        title: 'Victor Aguilar',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_VictorAguilar.jpeg?alt=media&token=3c5aeec9-23b8-42de-9505-1fc32fd1cada',
            accessibilityText: 'Victor Aguilar',
        },
        display: 'BLUE',
    },
    'Noe Bautista': {
        title: 'Noe Bautista',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_NoeBranagan.jpg?alt=media&token=63da5be6-45f1-43c8-9ac2-a7f0dba0a5f5',
            accessibilityText: 'Noe Bautista',
        },
        display: 'BLUE',
    },
    'Adriana Moya': {
        title: 'Adriana Moya',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_AdrianaMoya.jpeg?alt=media&token=fc248a76-f3eb-4448-9474-a5a1f3ed9374',
            accessibilityText: 'Adriana Moya',
        },
        display: 'BLUE',
    },
    'Leonidas Esteban': {
        title: 'Leonidas Esteban',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_LeonidasEstevan.jpg?alt=media&token=296f720c-c863-41d3-bf95-5ab1ef2a40aa',
            accessibilityText: 'Leonidas Esteban',
        },
        display: 'BLUE',
    },
    'Diego Velasquez': {
        title: 'Diego Velasquez',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_DiegoVel%C3%A1squez.jpg?alt=media&token=8ffa408b-1867-415f-bbf6-2fabf260b5c7',
            accessibilityText: 'Diego Velasquez',
        },
        display: 'BLUE',
    },
    'Fernanda Ramirez': {
        title: 'Fernanda Ramirez',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_FernandaRamirez.JPG?alt=media&token=be43db13-fff6-4b2a-8847-67b2bdbf944c',
            accessibilityText: 'Fernanda Ramirez',
        },
        display: 'BLUE',
    },
    'Luis Avilés': {
        title: 'Luis Avilés',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_LuisAviles.png?alt=media&token=af1dc44e-eb16-401e-ae83-9d8a400b3ee6',
            accessibilityText: 'Luis Avilés',
        },
        display: 'BLUE',
    },
    'Kenji Kawada': {
        title: 'Kenji Kawada',
        image: {
            url: 'https://firebasestorage.googleapis.com/v0/b/devfestgdglapaz-mkrvwj.appspot.com/o/S_KenjiKawada.jpg?alt=media&token=28d0d294-4160-4e8b-9e8c-563842fce50c',
            accessibilityText: 'Kenji Kawada',
        },
        display: 'BLUE',
    },
};

var elemSpeakers = [
    ['Pablo Perez', 'Argentina'],
    ['Argel Bejarano', 'Mexico'],
    ['Victor Aguilar', 'Bolivia'],
    ['Noe Branagan', 'Republica Dominicana'],
    ['Adriana Moya', 'Colombia'],
    ['Leonidas Esteban', 'Mexico'],
    ['Diego Velasquez', 'Peru'],
    ['Fernanda Ochoa', 'Mexico'],
    ['Luis Avilés', 'Bolivia'],
    ['Kenji Kawaida', 'Bolivia'],
];

var paisSpeakers = [
    ['Argentina'],
    ['Mexico'],
    ['Bolivia'],
    ['Republica Dominicana'],
    ['Colombia'],
    ['Peru'],
];

var techSpeakers = [
    ['Tensorflow'],
    ['Flutter'],
    ['Backend'],
    ['Kotlin'],
    ['GCP'],
    ['AOG'],
    ['Angular'],
    ['Android'],
];

var quTech = [
    ['Cómo se llama la mascota de Flutter?', 'Dant', 'Dash', 'Dani', 'Dolt', 'Dash'],
    ['El actual CEO de Google es ', 'Mukesh Ambani', 'Sergey Brin', 'Larry Page', 'Sundar Pichai', 'Sundar Pichai'],
    ['Tensorflow es:', 'Framework de IA', 'Aplicación de IA', 'Motor de IA', 'Librería de IA', 'Librería de IA'],
    ['Nombre de la Primera version de Android?', 'Banana Pie', 'Apple Cupcake', 'Apple Pie', 'Cupcake', 'Apple Pie'],
    ['En que año salió  la version de Android Froyo?', '2011', '2010', '2009', '2012', '2010'],
    ['A partir de que versión de Angular se puede desarrollar PWA?', 'Angular5', 'Angular6', 'Angular4', 'Angular3', 'Angular6'],
    ['Con cuál de estas plataformas no se vinculan los agentes de Dialogflow', 'Messenger', 'Slack', 'Whatsapp', 'Skype', 'Whatsapp'],
    ['Que año Anunció Google a Kotlin como lenguaje para desarrollar aplicaciones Android', '2016', '2018', '2017', '2015', '2017'],
    ['En qué evento Google anunció Kotlin', 'Google I/O 2017', 'Google I/O 2018', 'Google I/O 2016', 'Google I/O 2015', 'Google I/O 2017'],
];

var index;
var count = 0;
var score = 0;

app.intent('Default Welcome Intent', (conv) => {
    index = 0;
    count = 0;
    score = 0;
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
        count++;
    } else {
        conv.close(`${category}! No tenemos el quiz aún`);
    }
});

app.intent('askForSpeakerCountry', (conv, { country }) => {
    if (country == elemSpeakers[index][1]) {
        conv.ask(`Correcto`);
        score++;
    } else {
        conv.ask(`incorrecto`);
    }
    if (count < 3) {
        index = 0;
        index = Math.floor(Math.random() * elemSpeakers.length);
        var selectSpeakerCountry = elemSpeakers[index][0];
        conv.ask(`De que país es  ${selectSpeakerCountry}?`, new BasicCard(cardSpeakers[selectSpeakerCountry]));
        conv.ask(new Suggestions(paisSpeakers[0], paisSpeakers[1], paisSpeakers[2], paisSpeakers[3], paisSpeakers[4], paisSpeakers[5]));
        count++;
    } else {
        if (score == 3) {
            conv.close(`Ganaste !`);
            index = 0;
            count = 0;
            score = 0;
        } else {
            conv.close(`Intenta denuevo!`);
            index = 0;
            count = 0;
            score = 0;
        }
    }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);