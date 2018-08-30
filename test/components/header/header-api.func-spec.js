import { Header } from '../../../src/components/header/header';

let headerAPI;

describe('Header API', () => {
  beforeEach(() => {
    headerAPI = new Header();
  });

  it('Should support removing go-back class from button', () => {
    headerAPI.removeBackButton();
    expect(document.body.querySelector('.go-back')).toBeFalsy();
  });
});
