'reach 0.1';

export const main = Reach.App(() => {
 const A = Participant('Alice', {  
  contractReady: Fun([], Null),
 })

 const B = API('Bob', { 
  // interact interface here
  })

 init();

 A.only(() => {
  const ready = declassify(interact.contractReady());
 });
 A.publish(ready);
 commit();

 exit();
});

