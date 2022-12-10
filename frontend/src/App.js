import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import DetailsPage from './pages/DetailsPage';
import { useEffect } from 'react';


function App() {

  return (
    
    <Router basename='/'>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/create' element={<CreatePage/>}/>
        <Route exact path='/edit/:id' element={<EditPage/>}/>
        <Route exact path='/details/:id' element={<DetailsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
