import React, {useState, useRef} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { useSpeechSynthesis } from 'react-speech-kit';
import mars from './assets/mars.jpg'
import night from './assets/space-planet.jpg'
import hd from './assets/hd.gif'
import {motion} from 'framer-motion'
import NavBar from './NavBar';
import SettingsIcon from '@mui/icons-material/Settings';
import EditNoteIcon from '@mui/icons-material/EditNote';
import greyUFO from './assets/greyUFO.png'
import asteroid1 from './assets/asteroid1.png'
import asteroid2 from './assets/asteroid2.png'
// import { duration } from '@mui/material';




// import {motion} from 'framer-motion'


const HomePage = ({currentUser}) => {
  //140 voice is a good option 

  // const {speak} = useSpeechSynthesis();

  const [light, setLight] = useState(true)
  const [setting, setSetting] =useState(false)
  const [rate, setRate]= useState(.7)
  const [pitch, setPitch]= useState(1)
  const synth = window.speechSynthesis;
  const [text, setText] = useState('')
  const [textword,  setTextword] = useState('')
  const [type, setType]= useState(false)
  const gearBtnRef = useRef()
  const closeTypeBtnRef = useRef()
  const typeBtnRef = useRef()
  const flyingORef = useRef()
  const flyingminiORef = useRef()
  const asteroid1Ref = useRef()
  const asteroid2Ref = useRef()
  const textAreaRef = useRef()
  let voices = []
  let divBtns = document.querySelector('.buttons')
  let gearBtn = document.querySelector('.navBtn')
  let settingNav = document.querySelector('.nav')
  let OptimusText = document.querySelector('.text')
  const [message, setMessage]=useState('')

 

  voices = synth.getVoices()
  
  let voice = voices[140]
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

  function speakSynth(instance) {
    document.body.style.background = `url(${hd}) no-repeat center center fixed`
    document.body.style.backgroundSize  = `100vw 100vh`
    divBtns.style.display = 'none'
    // textBubble.style.display = 'none'
    OptimusText.style.display ='none'
    flyingORef.current.style.display ='none'
    flyingminiORef.current.style.display ='none'
    asteroid1Ref.current.style.display = 'none'
    asteroid2Ref.current.style.display = 'none'
    if(setting) {
      settingNav.style.display ='none'

    }
    else {
      gearBtn.style.display ='none'
    }
    if(type) {
      textAreaRef.current.style.display = 'none'
      closeTypeBtnRef.current.style.display = 'none'
    }
    else {
      typeBtnRef.current.style.display= 'none'
      
    }
   

    // document.body.style.backgroundRepeat = 'no-repeat'
    // document.body.style.width = '100vw'
    // document.body.style.height = '100vw'
    synth.speak(instance)
    if(light) {
    instance.onend = ()=> {
      document.body.style.background = `url(${mars}) no-repeat center center fixed`
      document.body.style.backgroundSize  = `cover`
      divBtns.style.display = 'block'
      // textBubble.style.display = 'block'
      OptimusText.style.display ='block'
      flyingORef.current.style.display ='block'
      flyingminiORef.current.style.display ='block'
      if(setting) {
        settingNav.style.display ='flex'
  
      }
      else {
        gearBtn.style.display ='block'
      }
      if(type) {
        textAreaRef.current.style.display ='block'
        closeTypeBtnRef.current.style.display = 'block'

      }
      else{
        typeBtnRef.current.style.display ='block'

      }
      
    }
     }
     else{
      instance.onend = ()=> {
      document.body.style.background = `url(${night}) no-repeat center center fixed`
      document.body.style.backgroundColor = `black`
      document.body.style.backgroundSize  = 'cover'
      divBtns.style.display = 'block'
      // textBubble.style.display = 'block'
      OptimusText.style.display ='block'
      asteroid1Ref.current.style.display = 'block'
      asteroid2Ref.current.style.display = 'block'
      if(setting) {
        settingNav.style.display ='flex'
  
      }
      else {
        gearBtn.style.display ='block'
      }
      if(type) {
        textAreaRef.current.style.display ='block'
        closeTypeBtnRef.current.style.display ='block'

      }
      else{
        typeBtnRef.current.style.display ='block'

      }

     }
    }
  }

  const commands = [
    {
      command: 'open *',
      callback:(site) => {
        let words = 'Ok, you got it'
        const utterThis = new SpeechSynthesisUtterance(words);
        utterThis.rate = rate
        utterThis.pitch = pitch
        console.log(utterThis.pitch)
        utterThis.voice = voice
        speakSynth(utterThis)
        setTimeout(()=> window.open('http://'+site.replace(" ", "")), 2500)
        

      
      // console.log('hello')
      }
    },
    {
      command: 'dark mode',
      callback: () => {
        document.body.style.background = `url(${night}) no-repeat center center fixed`
        document.body.style.backgroundColor = `black`
        // document.body.style.backgroundSize  = '100vw 100vh'
        document.body.style.backgroundSize  = 'cover'
        document.body.style.color = 'coral'
        // textBubble.style.borderColor = 'coral'
        // textBubble.style.color = 'gold'
        gearBtn.style.color = 'coral'
        flyingORef.current.style.display ='none'
        flyingminiORef.current.style.display ='none'
        asteroid1Ref.current.style.display = 'block'
        asteroid2Ref.current.style.display = 'block'
        // let h1 = document.querySelector('.text')
        // h1.innerText = 'black'
        // if(type) {
        //   textBubble.style.borderColor ='coral'
        //   textBubble.style.color = 'gold'
  
        // }
        // else{
        //   typeBtnRef.current.style.color ='coral'
        // }

        setLight(false)
      }
    },
    {
      command: 'light mode',
      callback: ()=> {
      document.body.style.background  = `url(${mars}) no-repeat center center fixed`
      document.body.style.backgroundSize  = `cover`
      document.body.style.color = 'black'
      // textBubble.style.borderColor = 'black'
      // textBubble.style.color = 'black'
      gearBtn.style.color = 'black'
      flyingORef.current.style.display ='block'
      flyingminiORef.current.style.display ='block'
      asteroid1Ref.current.style.display = 'none'
      asteroid2Ref.current.style.display = 'none'
      // if(type) {
      //   textBubble.style.borderColor ='black'
      //   textBubble.style.color = 'black'

      // }
      // else{
      //   typeBtnRef.current.style.color ='black'
      // }
      setLight(true)
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
          utterThis.rate = rate
          utterThis.pitch = pitch

          utterThis.voice = voice
          speakSynth(utterThis)
  
        })
       
      }
    },
    {
      command: 'play *',
      callback:(song)=> {
        let obj = {song: song}
        let word;
        fetch('/play-song', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          word = res.play
        })
        .then(()=> {
          const utterThis = new SpeechSynthesisUtterance(word);
          utterThis.rate = rate
          utterThis.pitch = pitch
          utterThis.voice = voice
          speakSynth(utterThis)
  
        })

      }
    },
    {
      command: "* today's date",
      callback: ()=> {
        let date;
        fetch('/date')
        .then(res => res.json())
        .then(res => {
          console.log(res)
          date = res.date
        })
        .then(()=> {
          const utterThis = new SpeechSynthesisUtterance(date);
          utterThis.rate = rate
          utterThis.pitch = pitch
          utterThis.voice = voice
          speakSynth(utterThis)

        })
      }

    },
    {
      command: "what time is it",
      callback: ()=> {
        let time;
        fetch('/time')
        .then(res => res.json())
        .then(res=> {
          console.log(res)
          time = res.time
        })
        .then(()=> {
          const utterThis = new SpeechSynthesisUtterance(time);
          utterThis.rate = rate
          utterThis.pitch = pitch
          utterThis.voice = voice
          speakSynth(utterThis)
        })

      }
    },
    {
      command: "what is your name",
      callback: ()=> {
        let word = "My name is Optimus, and this is version 1 of my software"
        const utterThis = new SpeechSynthesisUtterance(word);
        utterThis.rate = rate
        utterThis.pitch = pitch
        utterThis.voice = voice
        speakSynth(utterThis)
          
         
          // utterThis.onend()

          // utterThis.addEventListener("end", (e) => {
          //   console.log('done speaking')
          // })
          // speak(utterThis)

      }
    },
    {
      command: "who is *",
      callback:(person)=> {
        console.log(person)
        let newPerson = person.replaceAll(" ", "")
        console.log(newPerson)
        let obj = {who: newPerson};
        let info;
        fetch('/who-is', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'

          },
          body: JSON.stringify(obj)
        })
        .then(res=> res.json())
        .then(res => {
          console.log(res)
          
        info = res.person
        })
        .then(()=> {
          const utterThis = new SpeechSynthesisUtterance(info);
          utterThis.rate = rate
          utterThis.pitch = pitch
          utterThis.voice = voice
          speakSynth(utterThis)
        })
      }
    },
    {
      command: "weather in *",
      callback: (city)=> {
        let newCity = city.replace(' ', ', ')
        let obj = {city: newCity}
        console.log(newCity)
        let temp;
        let temp_High;
        let temp_Min;
        fetch('/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'

          },
          body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(res => {
          temp = res.temp
          temp_High = res.temp_high
          temp_Min = res.temp_min
        })
        .then(()=> {
          let word = `The tempertaure in ${city}, is ${temp} degrees, with a high of ${temp_High} and a low of ${temp_Min} degrees`
          const utterThis = new SpeechSynthesisUtterance(word);
          utterThis.rate = rate
          utterThis.pitch = pitch
          utterThis.voice = voice
          speakSynth(utterThis)

        })
      }
    },
    {
      command: 'how are you',
      callback: ()=> {
        let emotion = ['I am well', 'I am great', "I've been better", 'I feel fantastic']
        let n = emotion.length
        let a = Math.floor(Math.random() * n)
        console.log(a)
        let word = emotion[a]
        const utterThis = new SpeechSynthesisUtterance(word);
        utterThis.rate = rate
        utterThis.pitch = pitch
        utterThis.voice = voice
        speakSynth(utterThis)
     }
    },
    {
      command: 'flip a coin',
      callback: ()=> {
        let coin = ['heads', 'tails']
        let n = coin.length
        let a = Math.floor(Math.random() * n)
        let word = `It landed on ${coin[a]}`
        const utterThis = new SpeechSynthesisUtterance(word);
        utterThis.rate = rate
        utterThis.pitch = pitch
        utterThis.voice = voice
        speakSynth(utterThis)


      }
    },
    {
      command: 'tell me a joke',
      callback: ()=> {
        let joke;
        fetch('/jokes')
        .then(res=> res.json())
        .then(res=> {
        joke = res.joke
        console.log(joke)
     })
     .then(()=> { const utterThis = new SpeechSynthesisUtterance(joke);
      utterThis.rate = rate
      utterThis.pitch = pitch
      utterThis.voice = voice
      speakSynth(utterThis)})
    


      }
    },
    {
      command: 'sleep mode',
      callback: ()=> {
        let word = "going to sleep in, 3, 2, 1, good bye!"
        const utterThis = new SpeechSynthesisUtterance(word);
        utterThis.rate = rate
        utterThis.pitch = pitch
        utterThis.voice = voice
        speakSynth(utterThis)
          setTimeout(()=> {
            fetch('/sleep')
          }, 4000)
         


      }
    },
    { command: 'message *',
    callback: (words)=> {
      console.log(words)
       setMessage(words)
      let sent = "What is the number"
      const utterThis = new SpeechSynthesisUtterance(sent);
      utterThis.rate = rate
      utterThis.pitch = pitch
      utterThis.voice = voice
      speakSynth(utterThis)


    }

    },
    {
      command: 'send *',
      callback: (number)=> {
        console.log(number)
        let newNumber = number.replaceAll(" ", "")
        let obj = {message: message, digits: newNumber}
        console.log(newNumber)
        console.log(obj)
        fetch('/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'

          },
          body: JSON.stringify(obj)
        })
        .then(()=> {
          let word = "message sent"
          const utterThis = new SpeechSynthesisUtterance(word);
          utterThis.rate = rate
          utterThis.pitch = pitch
          utterThis.voice = voice
          speakSynth(utterThis)
        })

      }
    }
      
    
  ]
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  const handleSpeak = () => {
    console.log(transcript)
    console.log(textword)
    if(text) {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.rate = rate
    utterThis.pitch = pitch
    utterThis.voice = voice
    speakSynth(utterThis)
    setText("")
    setTextword('')
    }
    else if(transcript)
    {
    const utterThis = new SpeechSynthesisUtterance(transcript);
    utterThis.rate = rate
    utterThis.pitch = pitch
    utterThis.voice = voice
    speakSynth(utterThis)

    }
    // speak({text: transcript})
  }

  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {setting ?  <NavBar rate={rate} setRate={setRate} pitch={pitch} setPitch={setPitch} setting={setting} setSetting={setSetting} gearBtn={gearBtn}/> : null}
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {/* <p>{transcript}</p> */}
      <button id='stopVoice' onClick ={()=> {
            synth.cancel()
            const utterThis = new SpeechSynthesisUtterance(" ");
            speakSynth(utterThis)
            }}>Stop Voice</button>
            <br></br>
        <motion.button 
        className='navBtn'
        ref = {gearBtnRef} //instead of grabbin the button from the DOM
        animate ={{rotate: [0, 15, 0] }}
        onClick={()=> {
          setSetting(!setting)
          // let btn = document.querySelector('.navBtn')
          gearBtnRef.current.style.display='none'

        }}
        transition={{type: 'tween', duration: 1, repeat: Infinity }}>
        <SettingsIcon fontSize="large"/>
        </motion.button>
      
      
        <h1 className='text'>Optimus V.1</h1>
        <motion.img className='flyingO'
        src={greyUFO}
        animate={{x: [0,1800] }}
        transition={{type: "tween", duration: 5, repeat:Infinity}}
        ref={flyingORef}>
        

        </motion.img>
        <motion.img className='flyingMiniO'
        src={greyUFO}
        animate={{x: [-200,1800] }}
        transition={{type: "tween", duration: 10, repeat:Infinity}}
        ref={flyingminiORef}>

        </motion.img>
        <motion.img className='asteroid1'
        src={asteroid1}
        animate={{y: [-700,800]}}
        transition={{type: "tween", duration: 30, repeat:Infinity}}
        ref={asteroid1Ref}
        >

        </motion.img>
        <motion.img className='asteroid2'
        src={asteroid2}
        animate={{y: [-800,800]}}
        transition={{type: "tween", duration: 60, repeat:Infinity}}
        ref={asteroid2Ref}
        >

        </motion.img>
       
       
            {type ? <><textarea id={light ? 'lightTextArea': 'darkTextArea'}  placeholder='type' onChange = {onChange} name = 'textArea' value ={text} ref={textAreaRef}></textarea> 
           
             <button className='closeType' ref={closeTypeBtnRef} onClick={()=> {
              setType(!type)
            }}>X</button> </> : 
            <motion.button
            animate={{x:[-3,3,-3]}}
            transition={{type: 'tween', duration: 2, repeat: Infinity}} 
            className={light ? 'lightTypeBtn' : 'darkTypeBtn' }
            ref ={typeBtnRef}
            onClick={()=> {
              setType(!type)
            }}>
              <EditNoteIcon fontSize='large'/>
            </motion.button>
                            }
           <div className='framer-div'>
            <motion.div  
            className='buttons'
            animate ={{y: [0, 10, 0] }}
            transition={{type: 'tween', duration: 3, repeat: Infinity }}> 
            <button onClick={speechRecognitionStart}>Start</button>
            <button onClick={speechRecognitionStop}>Stop</button>
            {/* <button onClick={resetTranscript}>Reset</button> */}
            <button onClick = {handleSpeak}>Talk</button>
            </motion.div>
           


           </div>
    </div>
  );
};
export default HomePage;