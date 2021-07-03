import React from "react";
import speecher from "../utils/speecher";
import commnads from "../utils/commands";
import tips from "../utils/tips";

import Button from '../components/button';
import Analyser  from "./analyser";
import {faMicrophoneAlt, faMicrophoneAltSlash} from '@fortawesome/free-solid-svg-icons'

import './speecher.css';

const primary = 'primary';
const secondary = 'secondary';
export default class SpeecherComponent extends React.Component{
  constructor(props){
    super(props)
    this.history = [];
    this.speecherDialogs = React.createRef()

    this.state = {
      buttonType: secondary,
      buttonIcon: faMicrophoneAltSlash,
      currentTip: 0
    }

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
    speecher.ignore();

    speecher.setPrefix(commnads.prefix)

    speecher.on(speecher.events.COMMAND, ()=>{
      this.nextTip()
    })

    speecher.on(speecher.events.TRANSCRIPT, (transcriptObj)=>{
      this.forceUpdate()
    })

    speecher.on(speecher.events.RESULT, (transcriptObj)=>{
      this.append(transcriptObj)
    })

    speecher.on(speecher.events.IGNORE, ()=>{
      this.setState({buttonType: secondary, buttonIcon: faMicrophoneAltSlash})
    })

    speecher.on(speecher.events.NOT_IGNORE, ()=>{
      this.setState({buttonType: primary, buttonIcon: faMicrophoneAlt})
    })

    speecher.registerCommand(commnads.clearMessages, ()=>{
      this.history = [];
      this.forceUpdate()
    })

    speecher.registerCommand(commnads.insertMark, (command)=>{
      this.append({
        text: '---',
        type: 'mark',
        start: Date.now(),
        end: Date.now(),
        duration: 0
      })
    });

    speecher.registerCommand(commnads.startLog, ()=>{
      speecher.notIgnore();
    })

    speecher.registerCommand(commnads.endLog,()=>{
      speecher.ignore();
    })

    speecher.registerCommand(commnads.cleanLastMessage, ()=>{
      this.history.splice(-1,1);
      this.forceUpdate();
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
    if (speecher.isIgnoring()) return null
    const preview = speecher.getPreview()
    if (preview.text.trim() == '') return null;
    return(this.createDialogBox(preview, 'current'))
  }

  getColor = ()=>{
    let color = '#54BF71'
    if (speecher.isIgnoring()) color = '#F58F2A'
    return color;
  }

  getTip = ()=>{
    return tips[this.state.currentTip]
  }

  nextTip = ()=>{
    let currentTip = this.state.currentTip + 1
    if (currentTip >= tips.length) currentTip = 0
    this.setState({currentTip})
  }

  render(){
    return(
      <div className='speecher-container'>
        <div className='speecher-dialogs' ref={this.speecherDialogs}>
          {this.getHistory()}
          {this.getCurrent()}
        </div>
        <div className="speecher-dialogs-shade"></div>
        <div className="speecher-controller">
          <Button type={this.state.buttonType} icon={this.state.buttonIcon} onClick={()=>{this.toggle()}}/>
          <Analyser color={this.getColor}/>
        </div>
        <div className="speecher-tip">
          {this.getTip()}
        </div>
      </div>
    )
  }
  
  scrollContainer = ()=>{
    const el = this.speecherDialogs.current;
    if(el){
      el.scrollTo({top: el.scrollHeight, behavior: 'smooth'})
    }
  }

  toggle = ()=>{
    speecher.toggleIgnore();
  }
};
