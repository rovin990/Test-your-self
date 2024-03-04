import React, { useEffect, useState } from 'react'

function Timer({examTimeInMins,width}) {    
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

        return ()=>clearInterval(interval)

        
    },[deadline])



    
  return (
    <div className='card' style={{width:width+'px',marginTop:10+'%'}}>
        {/* <div className='card-header' style={{padding:0,margin:0}}>
            <p className='text-center' style={{padding:0,margin:0}}>Timer</p>
        </div>         */}
        <div className='card-body '>
            <div className='d-flex justify-content-center'>
                <p> {hour<10?"0"+hour:hour} : {minutes<10?"0"+minutes:minutes} : {second<10?"0"+second:second}</p>
            </div>
            <div class="progress">
            <div class="progress-bar bg-success progress-bar-striped" role="progressbar" style={{width: timer +'%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{timer}%</div>
            </div>
        </div>
    </div>
  )
}

export default Timer