Feature('Account detail');

Before(({ I }) => {
  I.amonPage('/');
});

Scenario('I have no money', ({ I }) => {
  // when
  I.click('잔액 확인');

  // then
  I.see('잔액이 없습니다');
});

Scenario('I have money', ({ I }) => {
  // when
  I.click('잔액 확인');

  // then
  I.see('잔액: 123,000원');
});
