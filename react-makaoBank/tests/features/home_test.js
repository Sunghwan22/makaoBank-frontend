Feature('Home');

Scenario('I visit the HomePage', ({ I }) => {
  I.amOnPage('/');

  I.see('Hello, world');
});
