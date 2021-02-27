// const detect = function(KateDogs, JuliaDogs){
//  const corrected = JuliaDogs.slice(1, -2);
//  const testdata = corrected.concat(KateDogs)
// testdata.forEach(function(mov, i) {
//   const old = mov > 3 ? 'adult': 'puppy';
//   console.log(`${i + 1}-it ${old}  va u ${mov} yoshda `)
// })
// }

// const catesData = [3, 5, 12, 7, 2];
// const juliasData = [4, 1, 15, 8, 3]

// detect(catesData, juliasData)

// const converUSD = 1.1

// const movements = [230, 400, 1000, 800, 500, -700, 300, -100];
///////MAP METHOD//////////
// const movementsUSD = movements.map(mov => mov * converUSD)

// console.log(movementsUSD)

// const movementsDescription = movements.map((mov, i, arr) => 
  
//   `Movements ${i + 1}: you ${mov > 0 ? 'deposited': 'withdrew'} ${Math.abs(mov)}`
  
// )

// console.log(movementsDescription)

/////FILTER METHOD//////////
// const withdrawals = movements.filter(mov => mov < 0)
// console.log(withdrawals)

///////REDUCE METHOD/////////

// const balance = movements.reduce((acc, curr) => acc + curr, 0)

// console.log(balance)

// const balanceWith = movements.reduce(function(acc, curr, i, arr){
//   console.log(`Qo'shiluvchi ${i}: ${acc}`);
//   return acc + curr
// })

// const catesData = [3, 5, 12, 7, 2];
// const juliasData = [4, 1, -6, 15, -4, -23, 8, 3]

// const sortted= juliasData.sort((a, b) => a-b)
// console.log(sortted)

// const arr = Array.from({ length: 20}, (_, i) => i * 5);

// console.log(arr)


///////////////coding challange/////////////
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

// dogs.forEach(dog => Math.trunc((dog.recomended = dog.weight * 0.75 * 28)));

// const SarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

// // console.log(SarahDog);

// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recomended);
// console.log(ownersEatTooMuch)

// const ownersEatLittle = dogs.filter(dog => dog.curFood < dog.recomended);
// console.log(ownersEatLittle);

// const text = ownersEatTooMuch.flatMap(dog => dog.owners).join(' va ')
// console.log(`${text}larning itlari ko'p ovqat yeyapti`);

// const text1 = ownersEatLittle.flatMap(dog => dog.owners).join(' va ')
// console.log(`${text1}larning itlari kam ovqat yeyapti`)

// console.log(dogs.some(dog => dog.curFood === dog.recomended));

// const check = dog => dog.curFood > dog.recomended * 0.9 && dog.curFood < dog.recomended * 1.1;

// console.log(dogs.some(check));

// console.log(dogs.filter(check));

// const DogsSorted = dogs.sort((a, b) => a.recomended - b.recomended);
// console.log(DogsSorted)
/////////////////////////////////////////

// console.log(234235342346234645724572

// Internationalization bilan ishlash
// const number = 34234324.234;
// const options = {
//   style: "currency",
//   unit: 'celsius',
//   currency: 'EUR'
// }

// console.log('US  : ', new Intl.NumberFormat('en-US', options).format(number))

///SetTimeOut 

// const ingredients = [ 'pishloq']
// const ovqat = setTimeout((ing1, ing2) => {
//   console.log(`Siz ${ing1} va ${ing2} li ovqatga buyurtma berdingiz`)
// }, 3000,
// ...ingredients
// );

// console.log('Waiting...')

// if(ingredients.includes('qalampir')) clearTimeout(ovqat)

////SetInterval

// setInterval(() => {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();
//   console.log(`${hours}:${minutes}:${seconds}`)
// }, 1000)

//remainder operatorni ishlatish
// labelBalance.addEventListener('click', function(){
//   [...document.querySelectorAll('.movements__row')].
//   forEach(function(row, i){
//     if(i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if(i % 3 ===0) row.style.backgroundColor = 'red'
//   })
// })


