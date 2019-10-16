/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');


const SKILL_NAME = 'Verdad o Atrevimiento';
const HELP_MESSAGE = 'Bienvenido al juego de verdad o atrevimiento, di quiero confesar para verdad, di ponme a prueba para atrevimiento, di pasa palabra para pregunta siguiente o di reglas para oir este mensaje de nuevo. Di fin del juego para salir';
const HELP_REPROMPT = HELP_MESSAGE;
const STOP_MESSAGE = 'Juego terminado';
const VoA = 'Elige verdad o atrevimiento';
const verdad = 'De este grupo, ¿a quién llevarías a una isla desierta?';
const atrevimiento = 'Imita a alguien del grupo';



// SKILL START
const LaunchHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
  
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_MESSAGE)
      .withSimpleCard(SKILL_NAME, VoA)
      .getResponse();
  },
};



// SIGUIENTE
const SiguienteHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'SiguienteIntent');
  },
  handle(handlerInput) {

     return handlerInput.responseBuilder
      .speak(VoA)
      .reprompt(VoA)
      .withSimpleCard(SKILL_NAME, VoA)
      .getResponse();
      
  }
};


// VERDAD
const VerdadHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'VerdadIntent');
  },
  handle(handlerInput) {
    
     return handlerInput.responseBuilder
      .speak(verdad)
      .reprompt(verdad)
      .withSimpleCard(SKILL_NAME, verdad)
      .getResponse();
      
  }
};

// ATREVIMIENTO
const AtrevimientoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'AtrevimientoIntent');
  },
  handle(handlerInput) {
    
     return handlerInput.responseBuilder
      .speak(atrevimiento)
      .reprompt(atrevimiento)
      .withSimpleCard(SKILL_NAME, atrevimiento)
      .getResponse();
      
  
  }
};

// FIN DEL JUEGO
const FinDelJuegoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'FinDelJuegoIntent');
  },
  handle(handlerInput) {

     return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .reprompt(STOP_MESSAGE)
      .withSimpleCard(SKILL_NAME, STOP_MESSAGE)
      .getResponse();
      
  }
};


const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    SiguienteHandler,
    VerdadHandler,
    AtrevimientoHandler,
    FinDelJuegoHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
