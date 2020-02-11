import React,{ useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const CreateUser = () => {

    const[username,setUsername] = useState("")
    const history = useHistory()

    const handleOnChangeUsername= (e) => {
        setUsername(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const new_user = {
            username: username
        }
        
        axios.post("http://localhost:5000/users/add",new_user)
            .then(res => console.log("Added to database")
            )
            .catch(err => console.log(err))
            history.push("/")
    }
    

    return (
        <Container>
            <h3>Create new User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username :</label>
                    <input type="text" className="form-control" value={username} onChange={handleOnChangeUsername} />
                </div>
                <div className="form-group pt-4">
                    <button type="submit" size="10"className="btn btn-primary" >Add user </button>
                </div>
            </form>
        </Container>
    )
}

export default CreateUser