Feature('Transfer');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('올바르게 송금이 된 경우', ({ I }) => {
  I.click('송금');
  I.fillfield('받을 분 계좌 번호', '1234567890');
  I.fillfield('보낼 금액', '3000');
  I.click('보내기');

  I.see('계좌 이체 성공');
});

Scenario('잔액이 부족할 경우', ({ I }) => {
  I.click('송금');

  I.fillfield('받을 분 계좌 번호', '1234567890');
  I.fillfield('보낼 금액', '30000000000');
  I.click('보내기');

  I.see('잔액이 부족합니다');
});

Scenario('계좌 번호가 잘못된 경우 경우', ({ I }) => {
  I.click('송금');

  I.fillfield('받을 분 계좌 번호', '이런 건 틀렸지');
  I.fillfield('보낼 금액', '3000');
  I.click('보내기');

  I.see('계좌 번호가 틀립니다');
});
