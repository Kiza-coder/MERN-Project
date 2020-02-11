import React, { useReducer, useEffect} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {Container} from 'react-bootstrap'


const initialState = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
    checkDatabase : false
}

const reducer = (state,action) => {
    switch(action.type){
        case 'users':
            return{
                ...state, users: action.users, checkDatabase: true
            }
        case 'username':
            return{
                ...state, username: action.username
            }
        case 'description':
            return{
                ...state, description: action.description
            }
        case 'date':
            return{
                ...state, date: action.date
            }
        case 'duration':
            return{
                ...state, duration: action.duration
            }
        default:
            return initialState 
    }

}

const CreateExercise = () => {

    const[exercise,dispatch] = useReducer(reducer,initialState)
 

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => {
               dispatch({type:"users", users: res.data})
            })
            .catch(err => console.log(err))

    },[])

    const handleOnChangeUsername = (e) =>{
        dispatch({type:"username",username:e.currentTarget.value})
    }

    const handleOnChangeDescription = (e) =>{
        dispatch({type:"description", description :e.currentTarget.value})
    }

    const handleOnChangeDuration = (e) =>{
        dispatch({type:"duration",  duration:e.currentTarget.value})
    }

    const handleOnChangeDate = (date) =>{  
        dispatch({type:"date", date:date})
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        const new_exercise = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }
        console.log(new_exercise)
        axios.post("http://localhost:5000/exercises/add",new_exercise)
            .then(res => console.log("Added to database")
            )
            .catch(err => console.log(err))
        dispatch({})  
    }






    return (
        <Container>
            
            <h3>Create a new Exercise</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group pt-3">
                        <label>
                            Username :
                        </label>
                        <select className="form-control" value={exercise.username} onChange={handleOnChangeUsername} required>
                            {exercise.checkDatabase && exercise.users.map((user) =>{
                                return <option key ={user._id} value={user.username}> 
                                    {user.username}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group pt-3">
                        <label>
                            Description : 
                        </label>
                        <input type="text" value={exercise.description} onChange={handleOnChangeDescription}/>
                    </div>
                    <div className="form-group pt-3">
                        <label>
                            Duration (in minutes): 
                        </label>
                        <input type="text" onChange={handleOnChangeDuration}/>
                    </div>
                    <div className="form-group pt-3">
                        <label>
                            Date :
                        </label>
                        <div>
                            <DatePicker value={exercise.date} selected={exercise.date} onChange={handleOnChangeDate}/>
                        </div>
                    </div>
                    <div className="form-group pt-3">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
            </form>
        
        </Container>
    )
}

export default CreateExercise
