import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes';
import { ThemeProvider } from 'react-bootstrap';

const App = () => {

  return (
  <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
>
  <div className='bg-light'>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
</div>
    </ThemeProvider>
  );
}

export default App;
