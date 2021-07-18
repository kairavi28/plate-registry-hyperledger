import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation';
import Vehicle from './components/registerVehicle';
import Enroll from './components/enroll';
import CreateOwner from './components/createOwner';


function App() {
  return (
  <>
      <Navigation/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/enroll' component={Enroll}/>
          <Route exact path='/vehicle' component={Vehicle}/>
          <Route exact path='/createOwner' component={CreateOwner}/>
          
        </Switch>
      </BrowserRouter>
  </>
  );
}

export default App;
