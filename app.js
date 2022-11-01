const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');

const getInputValue = (id) => {
  const inputValueText = document.getElementById(id).value;
  const inputValueNum = parseFloat(inputValueText);
  return inputValueNum;
};

fetch('https://simple-bank-server.onrender.com/account')
  .then((res) => res.json())
  .then((data) => dashboardData(data[0]));

const dashboardData = (data) => {
  // console.log(data);
  let {
    name,
    email,
    accountNumber,
    mobile,
    currentBalance,
    totalDeposit,
    totalWithdraw,
    _id: id,
  } = data;

  document.getElementById('account').innerHTML = accountNumber;
  document.getElementById('name').innerHTML = name;
  document.getElementById('email').innerHTML = email;
  document.getElementById('mobile').innerHTML = mobile;
  document.getElementById('balance').innerHTML = currentBalance;
  document.getElementById('total-deposit').innerHTML = totalDeposit;
  document.getElementById('total-withdraw').innerHTML = totalWithdraw;

  const patchUrl = `https://simple-bank-server.onrender.com/account/${id}`;

  // Deposit button
  depositBtn.addEventListener('click', () => {
    const depositInput = getInputValue('deposit');
    if (depositInput > 0) {
      currentBalance = currentBalance + depositInput;
      totalDeposit = totalDeposit + depositInput;

      deposit.value = '';
    } else {
      deposit.value = '';
      alert('Please insert positive number');
      return;
    }
    fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ currentBalance, totalDeposit, totalWithdraw }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    window.location.reload(false);
  });

  // Withdraw button
  withdrawBtn.addEventListener('click', () => {
    const withdrawInput = getInputValue('withdraw');

    if (withdrawInput > 0 && withdrawInput < currentBalance) {
      currentBalance = currentBalance - withdrawInput;
      totalWithdraw = totalWithdraw + withdrawInput;
      withdraw.value = '';
    } else {
      alert('Invalid request');
      return;
    }

    fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ currentBalance, totalDeposit, totalWithdraw }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    window.location.reload(false);
  });
};
