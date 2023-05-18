import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
// import {motion} from 'framer-motion'


const App = () => {
  //140 voice is a good option 

  const {speak} = useSpeechSynthesis();
  const synth = window.speechSynthesis;
  const [text, setText] = useState('')
  const [textword,  setTextword] = useState('')
  let voices = []
 

  voices = synth.getVoices()
  
  let voice = voices[140]
  console.log(voice)
  function onChange(e) {
    setText(e.target.value)
    setTextword(e.target.value)

  }

  function speechRecognitionStart(){
    SpeechRecognition.startListening()



  }

  function speechRecognitionStop(){
    SpeechRecognition.stopListening()
  }

  const commands = [
    {
      command: 'open *',
      callback:(site) => {
        let words = 'Ok, you got it'
        const utterThis = new SpeechSynthesisUtterance(words);
        utterThis.rate = .8
        utterThis.voice = voice
        speak(utterThis)
        setTimeout(()=> window.open('http://'+site.replace(" ", "")), 3000)
        

      
      // console.log('hello')
      }
    },
    {
      command: 'dark mode',
      callback: () => {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white'
      }
    },
    {
      command: 'light mode',
      callback: ()=> {
      document.body.style.backgroundColor = 'transparent'
      document.body.style.color = 'black'
      }
    },
    {
      command: 'hi',
      callback: ()=> {
        let word;
        fetch('/greeting')
        .then(response => response.json())
        .then(res => {
        console.log(res)
        word = res.text})
        .then(()=> {
          const utterThis = new SpeechSynthesisUtterance(word);
          utterThis.rate = .5
          utterThis.voice = voice
          speak(utterThis)
  
        })
       
      }
    }
  ]
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  const handleSpeak = () => {
    console.log(transcript)
    console.log(textword)
    if(textword) {
    const utterThis = new SpeechSynthesisUtterance(textword);
    utterThis.rate = .5
    utterThis.voice = voice
    speak(utterThis)
    setText("")
    setTextword('')
    }
    else{
    const utterThis = new SpeechSynthesisUtterance(transcript);
    utterThis.rate = .5
    utterThis.voice = voice
    speak(utterThis)

    }
    // speak({text: transcript})
  }

  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={speechRecognitionStart}>Start</button>
      <button onClick={speechRecognitionStop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      {console.log(transcript)}
      <p>{transcript}</p>
      <br></br>
      <div>
        <h1>Text to speech</h1>
        <button onClick = {handleSpeak}>Talk</button>
      </div>
      {/* <motion.div 
        animate={{x: "90%" }}
        transition={{type: "tween", duration: 80}}> Hello
           </motion.div>  */}
           <textarea onChange = {onChange} name = 'textArea' value ={text}></textarea>
    </div>
  );
};
export default App;