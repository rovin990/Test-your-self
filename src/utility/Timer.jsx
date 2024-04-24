import React, { useEffect, useState } from 'react'

function Timer({examTimeInMins,width,actionOnTimeEnd}) {    
    const [hour,setHour]=useState(Math.floor((examTimeInMins/60)));
    const [minutes,setMinutes]=useState(Math.floor((examTimeInMins%60)-1));
    const [second,setSecond]=useState(59);
    const [deadline,setDeadline]=useState(examTimeInMins*60);
    const [timer,setTimer]=useState(100);


    useEffect(()=>{
        const interval=setInterval(()=>{
            setDeadline(deadline-1);
            setTimer(Math.floor((deadline/(examTimeInMins*60))*100))
            if(second==0){
                if(minutes>0){
                    setMinutes(minutes-1);
                    setSecond(60);
                }
                else if(hour>0){
                    setHour(hour-1);
                    setMinutes(60)
                    setHour(60);
                }
                else{
                    setHour(0);
                    setMinutes(0)
                    setSecond(0)
                }
            }
            else{
                setSecond(second-1)
                
            }
        },1000)

        if(deadline===0){
            actionOnTimeEnd()
        }

        return ()=>clearInterval(interval)

        
    },[deadline])



    
  return (
    <div className='d-flex justify-content-center'>
         <span>Time Left :<p> {hour<10?"0"+hour:hour} : {minutes<10?"0"+minutes:minutes} : {second<10?"0"+second:second}</p></span> 
    </div>
  )
}

export default Timer