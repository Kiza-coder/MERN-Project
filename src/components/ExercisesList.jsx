import React, { useReducer ,useEffect } from 'react'
import axios from 'axios'
import Exercise from './Exercise'
import {Table} from 'react-bootstrap'

const initialState = {
    exercises : [],
    checkDatabase : false
}

const reducer = (state,action) => {
    switch(action.type)
    
    {
        case "data":
            return{
                exercises : action.data,
                checkDatabase : true
            }
            
        default:
            return initialState
    }

}

const ExercisesList = () => {

    const [exercisesList,dispatch] = useReducer(reducer,initialState)

    useEffect(() => {
        axios.get("http://localhost:5000/exercises")
            .then(res => {
                dispatch({type:"data",data:res.data})
            })
            .catch(err => {
                console.log(err)
            })

    },[])


    return (
            <Table>
                <thead>
                    <tr>
                       <th>Username</th>
                       <th>Description</th>
                       <th>Duration</th>
                       <th>Date</th>                    
                    </tr>
                </thead>
                <tbody>
                    {exercisesList.checkDatabase && exercisesList.exercises.map((exercise) => {
                        return <Exercise key={exercise._id} exercise={exercise} />
                    })}
                </tbody>
            </Table>
    )
}

export default ExercisesList
