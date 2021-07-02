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
        this.currentTransciption = '';
        this.history = [];
        this.commands = [];

        this.transcribeCommand = false;

        this.recognition = new SpeechRecognition();
        this.activated = false;
        this.isStarted = false;
        this.startTime = Date.now();

        this.events = Speecher.events;

        this.init();
    }

    appendHistory = ()=>{
        if(!this.isActivated()) return this;

        const end = Date.now()
        const duration = end - this.startTime

        const transcriptObj = {
            text: this.currentTransciption,
            start: this.startTime,
            end,
            duration,
            type: 'transcription'
        }

        this.history.push(transcriptObj);
        this.reset()
        this.emit(Speecher.events.RESULT, transcriptObj)
        return this;
    }

    getCommandsCallbacks = (text)=>{
        let callbacks = []
        text = text.trim().toLowerCase()
        this.commands.map(command => {
            if (command.name.includes(text)){
                this.emit('command', text)
                callbacks.push({
                    callback: command.callback,
                    argument: text
                });
            }
            return command
        })

        return callbacks
    }

    end = (e)=>{
        this.isStarted = false;
        this.restart()
    }

    getCurrent = ()=>{
        return this.currentTransciption
    }

    getPreview = ()=>{
        const end = Date.now()
        const duration = end - this.startTime
        const transcriptObj = {
            text: this.getCurrent(),
            start: this.startTime,
            end,
            duration,
            type: 'transcription'
        }

        return transcriptObj
    }

    handleResult = (event)=>{
        if(!this.isActivated()) return this;
        const transcription = Array.from(event.results).map(result => result[0]).map(result=> result.transcript).join('');
        const words = transcription.split(' ').length
        if (words == 1) this.startTime = Date.now()

        this.setTransciption(transcription);
        
        const isFinal = event.results[0].isFinal
        if(isFinal){
            const callbacks = this.getCommandsCallbacks(transcription)
            if (callbacks.length <= 0 || this.transcribeCommand){
                this.appendHistory();
            }
            
            this.reset();

            for(let callbackObj of callbacks){
                callbackObj.callback(callbackObj.argument)
            }
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

    registerCommand = (commandText, callback)=>{
        if (typeof(callback) == 'function'){
            let commandName = commandText
            if (!Array.isArray(commandText)) commandName = [commandText]

            commandName = commandName.map(item=>item.toString().trim().toLowerCase())

            const command = {name: commandName, callback}
            this.commands.push(command)
            this.emit('registerCommand', command)
        }
    }

    reset = ()=>{
        this.currentTransciption = '';
        this.startTime = Date.now()
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

module.exports = new Speecher();