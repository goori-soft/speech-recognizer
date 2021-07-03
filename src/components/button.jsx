import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



import './button.css'

export default class Button extends React.Component{

    render = ()=>{
        let label = null;
        let icon = null;
        let type = this.props.type || 'primary';
        let className = ['button', type];

        if (this.props.icon){
            icon = (<div className="button-icon"><FontAwesomeIcon icon={this.props.icon}/></div>)
        }

        if (this.props.label){
            label = (<div className="button-label">{this.props.label}</div>)
        }

        return(
            <div className={className.join(' ')} onClick={this.props.onClick}>
                {icon}
                {label}
            </div>
        )
    }
}