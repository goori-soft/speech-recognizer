

const options = {audio: true}

const successCallback = (stream)=>{
    console.log('O microfone está sendo capturado')

    const context = new AudioContext()
    const analyser = context.createAnalyser()
    const source = context.createMediaStreamSource(stream)

    source.connect(analyser)
    
    const interval = setInterval(()=>{
        const length = analyser.frequencyBinCount
        const dataArray = new Uint8Array(length)
        analyser.getByteFrequencyData(dataArray)

        console.log(dataArray)
    }, 1000)
}

const errorCallback = ()=>{
    console.log('O usuário recusou a conexão com o microfone')
}

navigator.getUserMedia(options, successCallback, errorCallback)

module.exports = null



