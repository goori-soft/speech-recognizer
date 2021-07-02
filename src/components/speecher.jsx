import React from "react";
import Speecher from "../utils/speecher";

import './speecher.css'

const speecher = new Speecher()

export default class SpeecherComponent extends React.Component{
  constructor(props){
    super(props)
    this.define()
    this.state = {
      history: []
    }
  }

  define = ()=>{
    speecher.on(Speecher.events.TRANSCRIPT, ()=>{
      this.setState({history: [...speecher.history]})
    })
    //speecher.on(Speecher.events.START, ()=>{console.log('Iniciando')})
    speecher.start()
  }

  getHistory = ()=>{
    const history = []
    for(let i in speecher.history){
      history.push(<p key={i} className="dialog-box">{speecher.history[i]}</p>)
    }

    return history
  }

  getCurrent = ()=>{
    return(
      <p key="current" className="dialog-box">{speecher.getCurrent()}</p>
    )
  }

  render(){
    return(
      <>
      {this.getHistory()}
      {this.getCurrent()}
      </>
    )
  }
};
