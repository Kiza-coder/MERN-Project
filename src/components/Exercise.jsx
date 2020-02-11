import React from 'react'
import {Link} from 'react-router-dom'


const Exercise = ({exercise}) => {
    const editLink = "/edit/"+exercise._id
  

    

    return (   
            <tr>
        <td>{exercise.username}</td>
        <td>{exercise.description}</td>
        <td>{exercise.duration}</td>
        <td>{exercise.date}</td>
        <td><Link to={editLink}>edit</Link>|</td> 
            </tr>
    
    )
}

export default Exercise
