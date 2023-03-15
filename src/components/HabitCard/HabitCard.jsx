import { StyledHabitCard, HabitTitle, Weekday, Day, DeletButton, DeleteIcon } from "./styles";
import daysList from "../../constants/days";
import axios from "axios";
import UserContext from "../../contextAPI/userContext";
import { useContext } from "react";
import BASE_URL from "../../constants/BASE_URL";
import { useNavigate } from "react-router-dom";
export default function HabitCard({id, text, days}) {
  const {userData, setUserData} = useContext(UserContext);
  const navigate = useNavigate()
  const config = {
    headers: {
        "Authorization": `Bearer ${userData.token}`
    }
  };
  function deleteHabit (habitId) {
    axios.delete(`${BASE_URL}/habits/${habitId}`, config)
      .then((resposta)=>{
        axios.get(`${BASE_URL}/habits`, config)
          .then(({data})=> {
            setUserData({...userData, habitsList : data})
          })
          .catch((erro)=> {
            alert(erro.response.data.message)
          })
      })
      .catch(()=> {
        console.log("Erro ao deletar habito")
      })
  }
  return (
    <StyledHabitCard data-test="habit-container">
      <HabitTitle data-test="habit-name">{text}</HabitTitle>
      <Weekday>
        {daysList.map(({id:dayListId, day}, index) => <Day key = {index} isSelected = {days.includes(dayListId)} data-test="habit-day">{day}</Day>)}
      </Weekday>
      <DeletButton onClick={() => deleteHabit(id)} data-test="habit-delete-btn">
        <DeleteIcon/>
      </DeletButton>
    </StyledHabitCard>
  )
}