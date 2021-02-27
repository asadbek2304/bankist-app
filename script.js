'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Ma'lumotlar
const account1 = {
  owner: 'Asadbek Abduxoshimov',
  movements: [200000, -200000, 34000, -3000, -2000, 5000000, 40000, -460000],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-02-14T17:01:17.194Z',
    '2021-02-16T23:36:17.929Z',
    '2021-02-17T10:51:36.790Z',
  ],
  currency: 'UZS',
  locale: 'uz-UZ',
};

const account2 = {
  owner: 'Feruza Abduxoshimova',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
    '2021-02-11T14:18:46.235Z',
    '2021-02-15T13:15:33.035Z',
    '2021-02-16T09:48:16.867Z',
    '2021-02-17T06:04:23.907Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200000, -200000, 34000, -3000, -2000, 5000000, 40000, -46000],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elementlar
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Vaqt bilan ishlash

const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`
  return new Intl.DateTimeFormat(locale).format(date)

}
//Amallarni ko'rsatish
const formatValyuta = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatDate(date, acc.locale);

    const formattedMov = formatValyuta(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
};

//Balansni hisoblash va ko'rsatish
const displayBalans = function (acc) {
  const balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  acc.balance = balance;
  labelBalance.textContent = formatValyuta(acc.balance, acc.locale, acc.currency);
}

//Pastki qismdagi statistikani ko'rsatish
const calcDisplaySummary = function (acc) {
  const summaryIn = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = formatValyuta(summaryIn, acc.locale, acc.currency);

  const summaryOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = formatValyuta(Math.abs(summaryOut), acc.locale, acc.currency);

  const summaryInt = acc.movements
    .filter((mov) => mov > 0)
    .map((int) => (int * acc.interestRate) / 100)
    .filter((int) => int > 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = formatValyuta(summaryInt, acc.locale, acc.currency);
};

//interfeysni yangilash funksiyasi
const updateUI = function (acc) {
  //Diplay movements
  displayMovements(acc);

  //Display balance
  displayBalans(acc);

  //Display summary
  calcDisplaySummary(acc);
}

//Username hosil qilish(User ownerdan hosil qilinadi)
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserNames(accounts);

const StartLogOutTimer = function () {
  const tik = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${second}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started'
    }

    time--;
  }

  let time = 600;
  tik();
  const timer = setInterval(tik, 1000);
  return timer;
}

//Hodisa amolga oshishi
let currentAccount, timer;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === +(inputLoginPin.value)) {
    //"Welcome" habarinin chiqarish
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")[0]} `;
    containerApp.style.opacity = 100;

    //Hozirgi sana va vaqtni chiqarish(hozirgi turgan joyingizdan foydalangan holda)

    const now = new Date();
    const options = {
      // weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    // let local = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

    //Inputdagi ma'lumotlarni o'chirish
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();

    ////timerni boshlash
    if (timer) clearInterval(timer)
    timer = StartLogOutTimer()

    //interfeysni yangilash
    updateUI(currentAccount)
  }
});

//Pul almashish funksiyasi

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +(inputTransferAmount.value);
  const saqlovchiAccount = accounts.find(acc => acc.userName === inputTransferTo.value)

  inputTransferTo.value = inputTransferAmount.value = ''

  if (amount > 0
    && amount <= currentAccount.balance
    && saqlovchiAccount
    && saqlovchiAccount?.userName !== currentAccount.userName) {

    currentAccount.movements.push(-amount);
    saqlovchiAccount.movements.push(amount);

    //Transferlarga  vaqtni qo'shish 

    currentAccount.movementsDates.push(new Date().toISOString());
    saqlovchiAccount.movementsDates.push(new Date().toISOString());

    //Interfeysni yangilash
    updateUI(currentAccount);

    //o'tkazma amalga oshganidan keyin timerni qayta ishga tushurish
    clearInterval(timer);
    timer = StartLogOutTimer()
  }
});

//Accountni yopish funksiyasi
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (currentAccount &&
    +(inputClosePin.value) === currentAccount.pin &&
    currentAccount.userName === inputCloseUsername.value) {
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);

    accounts.splice(index, 1)
    //interfeysni yashirish
    containerApp.style.opacity = 0;

  }
  inputCloseUsername.value = inputClosePin.value = ''
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor((inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Operatsiyalar uchun taymer qo'shish
    setTimeout(function () {//aktivlarga yangi qo'shish
      currentAccount.movements.push(amount);

      //Kreditga  vaqtni qo'shish 

      currentAccount.movementsDates.push(new Date().toISOString());

      //interfeysni yangilash
      updateUI(currentAccount);
      ////o'tkazma amalga oshganidan keyin timerni qayta ishga tushurish
      clearInterval(timer);
      timer = StartLogOutTimer()
    }, 3000);
  }
  inputLoanAmount.value = ''
});

let sortted = false;
btnSort.addEventListener('click', function (e) {

  e.preventDefault();
  displayMovements(currentAccount.movements, !sortted);
  sortted = !sortted;
});


