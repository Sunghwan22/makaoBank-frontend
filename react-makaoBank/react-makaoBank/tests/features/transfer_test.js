Feature('Transfer');

const amount = 1000000;

Before(({ I }) => {
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount });

  I.amOnPage('/transfer');
});

Scenario('올바르게 송금이 된 경우', ({ I }) => {
  const transferAmount = 500000;

  I.fillField('받을 분 계좌 번호', '1234567890');
  I.fillField('보낼 금액', transferAmount);
  I.fillField('받는 분께 표시할 이름', '테스트');
  I.click('보내기');

  I.see('계좌 이체 성공');

  I.click('잔액 확인');

  I.see('잔액 : 500,000원');
});
// todo 예외 상황 처리 필요함
Scenario('잔액이 부족할 경우', ({ I }) => {
  I.click('송금');

  I.fillField('받을 분 계좌 번호', '1234567890');
  I.fillField('보낼 금액', '30000000000');
  I.fillField('받는 분께 표시할 이름', '테스트');
  I.click('보내기');

  I.see('금액이 잘못 됬습니다');
});

Scenario('계좌 번호가 잘못된 경우 ', ({ I }) => {
  I.click('송금');

  I.fillField('받을 분 계좌 번호', '00999999');
  I.fillField('보낼 금액', '30000000000');
  I.fillField('받는 분께 표시할 이름', '테스트');
  I.click('보내기');

  I.see('계좌 번호가 잘못됬습니다');
});
