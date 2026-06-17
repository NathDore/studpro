import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { seedCourses } from './utils/seeds/seedCourses';
import { seedTasks } from './utils/seeds/seedTasks';

seedCourses();
seedTasks();

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
