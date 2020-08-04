import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" exact component={TeacherList} />
      <Route path="/give-class" exact component={TeacherForm} />
    </BrowserRouter>
  )
}

export default Routes