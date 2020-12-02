import { Switch, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing'


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
