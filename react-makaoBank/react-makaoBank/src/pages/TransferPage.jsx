import { useState } from 'react';

export default function TransferPage() {
  const [success, setSuccess] = useState(false);

  const handleSunmit = (event) => {
    event.preventDefault();
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSunmit}>
      <div>
        <label htmlFor="input-account">
          받을 분 계좌 번호
        </label>
        <input
          id="input-account"
          type="number"
        />
      </div>
      <div>
        <label htmlFor="input-amount">
          보낼 금액
        </label>
        <input
          id="input-amount"
          type="number"
        />
      </div>
      <button type="submit">
        보내기
      </button>
      {success ? (
        <p>계좌 이체 성공</p>
      ) : null}
    </form>
  );
}
