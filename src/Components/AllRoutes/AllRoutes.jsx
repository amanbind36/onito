import React from 'react'
import Form2 from '../form/Form2'
import SignIn from '../form/Form1'
import {Routes,Route} from "react-router-dom"
import Display from '../Display'
const AllRoutes = () => {
  return (
    <Routes>
         <Route exact path="/" element={<SignIn />} />
 <Route exact path="/form2" element={<Form2 />} />
 <Route exact path="/display" element={<Display />} />
    </Routes>
  )
}

export default AllRoutes;