import React from "react";

import './analyser.css'

export default class Analyser extends React.Component{

    constructor(props){
        super(props)
        this.canvasRef = React.createRef()
        this.canvasCtx = null
        this.analyser = null
        this.barsNum = 100
        this.color = this.props.color || '#0c6e27'
    }

    componentDidMount = ()=>{
        this.canvasCtx = this.canvasRef.current.getContext('2d');
        
        const options = {audio: true}
        navigator.getUserMedia(options, (stream)=>{
            const context = new AudioContext()
            this.analyser = context.createAnalyser()
            const source = context.createMediaStreamSource(stream)
            source.connect(this.analyser)

            this.draw();
        }, this.errorMicRequest)
    }

    draw = ()=>{
        const drawRequest = requestAnimationFrame(this.draw);
        const canvas = this.canvasRef.current;

        if (this.canvasCtx){

            this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

            const length = this.analyser.frequencyBinCount
            const dataArray = new Uint8Array(length)
            this.analyser.getByteFrequencyData(dataArray)

            let x = 0;
            let y = 0;
            let width = 2;
            let height = 0;

            let color = '#0c6e27'
            if (typeof(this.color) == 'function'){
                color = this.color()
            }
            else{
                color = this.color || '#0c6e27'
            }


            this.canvasCtx.fillStyle = color

            for (let i = 0; i < this.barsNum; i++){
                x = i * 3;
                height = dataArray[i] / 3;

                y = (canvas.height - height)/2

                this.canvasCtx.fillRect(x, y, width, height)
            }
        }
    }

    errorMicRequest = ()=>{
        console.log('Usuário não concedeu acesso ao microfone');
    }

    render = ()=>{
        return(
            <>
                <canvas className="analyser-canvas" ref={this.canvasRef} height="60" width="300"></canvas>
            </>
        )
    }
}