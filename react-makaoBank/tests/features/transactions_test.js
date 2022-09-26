Feature('거래 내역 확인 ');

Before(({ I }) => {
  // Todo: 계좌 설정
  I.amOnPage('/');

  // Todo: 로그인
});

Scenario('거래 내역이 없는 경우', ({ I }) => {
  I.click('거래 내역 확인');

  I.see('거래 내역이 없습니다');
});

Scenario('거래 내역이 있는 경우', ({ I }) => {
  // given
  I.click('송금');
  I.fillfield('받을 분 계좌 번호', '1234567890');
  I.fillfield('보낼 금액', '3000');
  I.click('보내기');

  I.waitForText('계좌 이체 성공');
  // when

  I.amOnPage('/');
  I.click('거래 내역');
  // then
  I.see('송금 - 1234567890 - 3,000원');
});
