import { Personalize } from '../../../src/components/personalize/personalize';

let personalization = {};

describe('Personalize API', () => {
  beforeEach(() => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-soho-light' });
  });

  it('Should define personalization', () => {
    expect(personalization).toBeDefined();
  });

  it('Should define currentTheme', () => {
    expect(personalization.currentTheme).toEqual('theme-soho-light');
  });

  it('Should not run if config is ignored', () => {
    personalization = new Personalize(document.documentElement, { noInit: true });

    expect(personalization.currentTheme).toBeUndefined();
  });

  it('Should set theme on html tag', () => {
    expect(document.documentElement.classList.contains('theme-soho-light')).toBeTruthy();
  });

  it('Should set theme on html tag for random theme name', () => {
    personalization = new Personalize(document.documentElement, { theme: 'cat-in-a-hat' });

    expect(document.documentElement.classList.contains('cat-in-a-hat')).toBeTruthy();
  });

  it('Should set theme on legacy light theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'light' });

    expect(document.documentElement.classList.contains('light-theme')).toBeTruthy();
  });

  it('Should set theme on legacy dark theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'dark' });

    expect(document.documentElement.classList.contains('dark-theme')).toBeTruthy();
  });

  it('Should set theme on legacy high-contrast theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'high-contrast' });

    expect(document.documentElement.classList.contains('high-contrast-theme')).toBeTruthy();
  });

  it('Should set theme on soho light theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-soho-light' });

    expect(document.documentElement.classList.contains('theme-soho-light')).toBeTruthy();
  });

  it('Should set theme on soho dark theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-soho-dark' });

    expect(document.documentElement.classList.contains('theme-soho-dark')).toBeTruthy();
  });

  it('Should set theme on soho contrast theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-soho-contrast' });

    expect(document.documentElement.classList.contains('theme-soho-contrast')).toBeTruthy();
  });

  it('Should set theme on uplift light theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-uplift-light' });

    expect(document.documentElement.classList.contains('theme-uplift-light')).toBeTruthy();
  });

  it('Should set theme on uplift dark theme', () => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-uplift-dark' });

    expect(document.documentElement.classList.contains('theme-uplift-dark')).toBeTruthy();
  });

  it('Should fire colorschanged on setColors', () => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-uplift-light' });
    const spyEvent = spyOnEvent('html', 'colorschanged');
    personalization.setColors('personalization');

    expect(spyEvent).toHaveBeenTriggered();
  });

  it('Should fire colorschanged on setColorsToDefault', () => {
    personalization = new Personalize(document.documentElement, { theme: 'theme-uplift-light' });
    const spyEvent = spyOnEvent('html', 'colorschanged');
    personalization.setColorsToDefault();

    expect(spyEvent).toHaveBeenTriggered();
  });
});
