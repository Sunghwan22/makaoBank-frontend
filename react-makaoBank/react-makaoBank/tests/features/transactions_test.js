Feature('거래 내역 확인 ');

Before(({ I }) => {
  // Todo: 계좌 설정
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount: 1000000 });
});

Scenario('거래 내역이 없는 경우', ({ I }) => {
  I.login('1234');

  I.click('거래 내역 확인');

  I.see('거래 내역이 없습니다');
});

Scenario('내가 보낸 거래 내역이 있는 경우', ({ I }) => {
  // given
  I.login('1234');

  I.transfer({ to: '1234567890', amount: 3000, name: '테스트' });

  // when
  I.amOnPage('/');
  I.click('거래 내역 확인');
  // then
  I.see('송금\t1234567890\t3,000원');
});

Scenario('내가 받은 거래 내역이 있는 경우', ({ I }) => {
  I.login('1234');
  // given
  I.transfer({ to: '1234567890', amount: 3000, name: '테스트' });
  I.login('1234567890');

  // when
  I.amOnPage('/');
  I.click('거래 내역 확인');
  // then
  I.see('입금\t테스트\t3,000원');
});
