import React from "react";
import speecher from "../utils/speecher";

import './speecher.css'

//const speecher = new Speecher()

export default class SpeecherComponent extends React.Component{
  constructor(props){
    super(props)
    this.history = [];
    this.speecherDialogs = React.createRef()
    this.define()
  }

  append = (transcriptObj)=>{
    this.history.push(transcriptObj)
    this.forceUpdate()
  }

  componentDidMount = ()=>{
    speecher.start();
  }

  componentDidUpdate = ()=>{
    this.scrollContainer()
  }

  createDialogBox = (transcript={...transcript, start: 0}, id)=>{
    if (typeof(id) == 'undefined') id = transcript.start;

    const className = ["dialog-box", transcript.type]

    return(
      <div key={id} className={className.join(' ')}>
        <div className='stats'>{this.formatTime(transcript.start)}, {this.formatSeconds(transcript.duration)}</div>
        <p className='text'>{transcript.text}</p>
      </div>
    )
  }

  define = ()=>{
    speecher.on(speecher.events.TRANSCRIPT, (transcriptObj)=>{
      this.forceUpdate()
    })

    speecher.on(speecher.events.RESULT, (transcriptObj)=>{
      this.append(transcriptObj)
    })

    speecher.registerCommand([
      'computador apagar mensagens',
      'computador apagar mensagem'
    ], ()=>{
      this.history = [];
      this.forceUpdate()
    })

    speecher.registerCommand([
      'computador insira uma marcação',
      'computador insira marcação',
      'computador inserir marcação',
      'computador inserir uma marcação',
    ], (command)=>{
      this.append({
        text: '---',
        type: 'mark',
        start: Date.now(),
        end: Date.now(),
        duration: 0
      })
    })
  }

  formatTime = (time)=>{
    const date = new Date(time)
    return (
      <span>{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}:{date.getSeconds().toString().padStart(2, '0')}</span>
    );
  }

  formatSeconds = (time)=>{
    const seconds = parseInt(time / 1000)
    return (
      <span>{seconds}s</span>
    )
  }

  getHistory = ()=>{
    const history = [];
    for(let i in this.history){
      let transcript = this.history[i];
      history.push(this.createDialogBox(transcript))
    }

    return history
  }

  getCurrent = ()=>{
    const preview = speecher.getPreview()
    if (preview.text.trim() == '') return null;
    return(this.createDialogBox(preview, 'current'))
  }

  render(){
    return(
      <div className='speecher-container'>
        <div className='speecher-dialogs' ref={this.speecherDialogs}>
          {this.getHistory()}
          {this.getCurrent()}
        </div>
        <div className="speecher-dialogs-shade"></div>
      </div>
    )
  }
  
  scrollContainer = ()=>{
    const el = this.speecherDialogs.current;
    if(el){
      el.scrollTo({top: el.scrollHeight, behavior: 'smooth'})
    }
  }
};
