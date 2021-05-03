import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import App from './App';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

test('Redering App', () => {
  render(<App />);
});
