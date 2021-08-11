import {Route} from "react-router-dom"
import LoginView from "./Views/LoginView"
import RegisterView from "./Views/RegisterView"
import DashboardView from "./Views/DashboardView"
import PrivateRoute from "./components/PrivateRoute"
import CrearPostView from "./Views/CrearPostView"
import BlogView from "./Views/BlogView"
function Routes() {
  return (
    <div>
      <Route path='/' exact component={BlogView} /> 
      <Route path='/login' exact component={LoginView} /> 
      <Route path='/register' exact component={RegisterView} /> 
      <PrivateRoute path='/dashboard' exact component={DashboardView} /> 
      <PrivateRoute path='/crearpost' exact component={CrearPostView} /> 
    </div>
  )
}

export default Routes

