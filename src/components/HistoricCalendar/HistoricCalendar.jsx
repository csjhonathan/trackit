import dayjs from "dayjs"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { useEffect } from "react";
import { Day, NormalDay } from "./styles";
import HabitsModal from "../HabitsModal/HabitsModal ";
export default function HistoricCalendar({ historicHabits }) {

  const [value, onChange] = useState(new Date());
  const [showModal, setShowModal] = useState({show : false, habits : []})
  const dayjs = require("dayjs");

 
  function showHabits (habits){
    const manyHabits = habits.habits.map(({name, done}) => {
      return {name , done}
    })
    setShowModal({show : true ,  habits : manyHabits})
  }

  function formatDay(date){
    
    
    if(historicHabits){
      const today = dayjs().format("DD/MM/YYYY");
      const formatedDate = dayjs(date).format("DD/MM/YYYY");
      const haveHabitsInThisDay = historicHabits.find(({day}) => day === formatedDate)
      
      if(haveHabitsInThisDay && formatedDate !== today){
        const isNotAllDone = haveHabitsInThisDay.habits.some(({done}) => done === false);
        const isAllDone = haveHabitsInThisDay.habits.some(({done}) => done === false);
        if(isNotAllDone){
          return(
            <Day isDone = {false} onClick = { () => showHabits (haveHabitsInThisDay)}>
              {date.getDate()}
            </Day>
          )
        }else if(isAllDone){
          <Day isDone = {true}>
              {date.getDate()}
          </Day>
        }
      }

      if(haveHabitsInThisDay){
        return(
          <NormalDay onClick={() => showHabits (haveHabitsInThisDay)}>
            {date.getDate()}
          </NormalDay >
        )
      }
    
    }
    return(
      <NormalDay>
        {date.getDate()}
      </NormalDay >
    )
    
  }
  return (
    <>
      <Calendar 
        calendarType="US"
        onChange={onChange} 
        value={value}
        formatDay = {(_, date) => formatDay(date)}
      />

      {showModal.show && <HabitsModal setShowModal = {setShowModal} showModal = {showModal}/>}
    </>
    
  )
}
