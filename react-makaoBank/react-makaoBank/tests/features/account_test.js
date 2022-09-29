Feature('잔액 확인 - 고객은 얼마를 쓸 수 있는지 알기 위해 본인 계좌의 금액을 알 수 있다.');

Before(({ I }) => {
  // GET / backdoor/setup-database
  I.setupDatabase();

  I.login('1234');

  I.amOnPage('/');
});
// Todo: 잔액없는 경우 확인 필요함
Scenario('잔액이 없는 경우', ({ I }) => {
  // given
  // Todo : 잔액을 0으로 설정
  I.changeAmount({ userId: 1, amount: 0 });

  I.amOnPage('/');
  // when
  I.click('잔액 확인');

  // then
  I.see('잔액이 없습니다');
});

Scenario('잔액이 있는 경우', ({ I }) => {
  // given
  // 잔액이 123,000원이로 설정
  I.changeAmount({ userId: 1, amount: 123000 });
  I.amOnPage('/');
  // when
  I.click('잔액 확인');

  // then
  I.see('잔액 : 123,000원');
});
