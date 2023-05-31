import React from 'react'

function NavBar({rate, setRate, pitch, setPitch, setting, setSetting, gearBtn}) {
  return (
    <div className='nav'>
        

            <label htmlFor = 'rate' >Rate</label>
            <input name='rate' className='input'  type='range' value ={rate} step='.1' max='2' min='.1' onChange={(e)=> setRate(e.target.value)}></input>
            <label for= 'pitch'>Pitch</label>
            <input name='pitch' className='input' type='range' value={pitch} step='.1' max='2' min='0' onChange={(e)=> setPitch(e.target.value)}></input>
            <button className='settingtBtn' onClick={()=> {
                gearBtn.style.display='block'
                setSetting(!setting)}}>Close</button>
    

    </div>
  )
}

export default NavBar