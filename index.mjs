import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(1000);

const accAlice = await stdlib.newTestAccount(startingBalance);
console.log('Hello, Alice and Bobs');

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);

console.log('Starting backend...');

const users = [];

const startBobs = async() => {
 const newBob = async (who) => {
  const acc = await stdlib.newTestAccount(startingBalance);
  const ctc = acc.contract(backend, ctcAlice.getInfo());
  users.push(acc.getAddress());
 };

 for (let i = 0; i < 6; i++) {
  await newBob(`Bob${i+1}`);
  console.log('creating new Bobs...');
  console.log(`New user Bob${i+1} Just attached to Alice's contract`);
 } 

 console.log(users);
};
await Promise.all([
 ctcAlice.p.Alice({
  contractReady: () => {
   console.log("Alice's contract is ready");
   startBobs();
  }
 })
]);

console.log('Goodbye Alice and Bobs');