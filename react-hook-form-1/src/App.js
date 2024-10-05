import './App.css';
import From from './pages/From';
import {IntlProvider} from "react-intl";

function App() {
  return (
      <IntlProvider locale={'ko'} messages={{zz: '안녕하세요?'}}>
    <From />
      </IntlProvider>
  );
}

export default App;
