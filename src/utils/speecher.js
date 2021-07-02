const EventEmitter = require("events");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if(!SpeechRecognition){
    console.warn('A ferramenta de reconhecimento de voz não está disponível neste navegador')
}
else{
    console.log('Ferramenta de reconhecimento de voz está ativa!')
}


class Speecher extends EventEmitter{

    constructor(){
        super();
        this.currentTransciption = ''
        this.history = []

        this.recognition = new SpeechRecognition();
        this.activated = false
        this.isStarted = false

        this.init();
    }

    appendHistory = ()=>{
        if(!this.isActivated()) return this;
        this.history.push(this.currentTransciption);
        this.emit(Speecher.events.RESULT, this.currentTransciption)
        this.currentTransciption = '';
        return this;
    }

    end = (e)=>{
        this.isStarted = false;
        this.restart()
    }

    getCurrent = ()=>{
        return this.currentTransciption
    }

    handleResult = (event)=>{
        if(!this.isActivated()) return this;
        const transcription = Array.from(event.results).map(result => result[0]).map(result=> result.transcript).join('');
        this.setTransciption(transcription);
        
        const isFinal = event.results[0].isFinal
        if(isFinal){
            this.appendHistory();
        }

        return this
    }

    init = ()=>{
        this.recognition.interimResults = true
        this.recognition.addEventListener('result', (event)=>{this.handleResult(event)});
        this.recognition.addEventListener('end', this.end);
        return this;
    }

    isActivated = ()=>{
        return this.activated
    }

    setTransciption(transcription){
        if(!this.isActivated()) return this;
        this.currentTransciption = transcription
        this.emit(Speecher.events.TRANSCRIPT, transcription);
        return this;
    }

    restart = ()=>{
        if(this.isActivated()) this.start()
    }

    start = ()=>{
        if (!this.isActivated()){
            this.activated = true;
            this.emit(Speecher.events.START, this)
        }
        
        if (!this.isStarted){
            this.recognition.start();
            this.isStarted = true
        }

        return this;
    }

    stop = ()=>{
        if (!this.isActivated()) return this;
        this.activated = false;
        this.currentTransciption = '';
        this.emit(Speecher.events.STOP, this)
        return this
    }
}

Speecher.events = {
    TRANSCRIPT: 'transcript',
    RESULT: 'result',
    START: 'start',
    STOP: 'stop',
}

module.exports = Speecher