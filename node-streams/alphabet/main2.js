import {SquareNumber} from './transform';
import Numbers from './numbers';
import Cache from './cache';

// writable
let cache = new Cache('KeyA');
// readable
let num = new Numbers(1, 10);
// transform
let test = new SquareNumber();

num.pipe(test).pipe(cache);

cache.on('finish', data => {
  console.log(`Data: ${cache._value}`);
});
