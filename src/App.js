import React from 'react';
import {
   BrowserRouter as Routeur,
  Route,
  Switch 
} from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import ExercisesList from "./components/ExercisesList"
import CreateUser from './components/CreateUser';
import CreateExercise from './components/CreateExercise';
import EditExercise from './components/EditExercise';
import Navbar from './components/Navbar';


function App() {
  return (
   <Routeur>
     
     <Navbar />
       <br />

      <Switch>
    
     <Route path="/edit/:id">
          <EditExercise />
     </Route>
     <Route path="/create">
          <CreateExercise />
    </Route>
    <Route path="/user">
          <CreateUser />
    </Route>
    <Route path="/">
          <ExercisesList />
     </Route>
     </Switch>
    
    </Routeur>
  );
}

export default App;
