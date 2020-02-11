import React, { useReducer, useEffect }  from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {Container} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

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
        case 'edit_user':
            return{
                ...state,
                username: action.user.username,
                description: action.user.description,
                duration: action.user.duration,
                date: new Date(action.user.date),
                users: [],
                checkDatabase : false
            }

        default:
            return initialState 
    }

}

const EditExercise = () => {

    const[exercise,dispatch] = useReducer(reducer,initialState)
    const history = useHistory()
    const {id} = useParams()
    const urlExerciseGetById = "http://localhost:5000/exercises/"+id
    const urlExerciseEditById = "http://localhost:5000/exercises/"+id+"/update"
    console.log(urlExerciseEditById,urlExerciseGetById)


    useEffect(() => {
        axios.get(urlExerciseGetById)
            .then(res => {
                dispatch({type :"edit_user", user: res.data })
            })
            .catch(err => {
                console.log(err)
            })
            axios.get("http://localhost:5000/users")
            .then(res => {
               dispatch({type:"users", users: res.data})
            })
            .catch(err => console.log(err))
       
    // eslint-disable-next-line
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
        const edit_exercise = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }

        axios.post(urlExerciseEditById,edit_exercise)
            .then(res => console.log("Database update")
            )
            .catch(err => console.log(err))
        dispatch({})
        history.push("/")  
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
                        <input type="text" value={exercise.duration} onChange={handleOnChangeDuration}/>
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
                        <input type="submit" value="Edit Exercise" className="btn btn-warning" />
                    </div>
            </form>
        </Container>
    )
}

export default EditExercise
