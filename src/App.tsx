import './App.scss'
import { AuthProvider } from './context/AuthContext'
import { TodoProvider } from './context/TodoContext'
import CustomRoutes from './core/Routes'
import FirebaseNotifications from './services/firebase/notifications';

function App() {

  return (
    <div className="app">
      <AuthProvider>
        <TodoProvider>
            <CustomRoutes />
            <FirebaseNotifications />
        </TodoProvider>
      </AuthProvider>
    </div>
  )
}

export default App
