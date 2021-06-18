import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import  { Provider } from 'react-redux';
import store from '../store.js';
import App from '../containers/App.js';
import Home from '../components/Home.jsx'

test('Home button redirects to Home component', async () => {
    render(<Router><Provider store={store}><App /></Provider></Router>);
//   const linkElement = screen.getByText('Ningun nombre buscado');
//   expect(linkElement).toBeInTheDocument();
    fireEvent.click(screen.getByText('Ir al Home'))
    await waitFor(() => <Home />)

    expect(render(<Router><Provider store={store}><App><Home /></App></Provider></Router>))
});
