const crypto = require('crypto');
const bcrypt = require('bcrypt');
let salt ='ashw$*%TGW32*4g#wa^67sdf';

let pass ='1111';
let sha512 = crypto.createHash('sha512').update(pass+salt).digest('base64');
console.log(sha512);

let pass2 ='1111';
let sha5122 = crypto.createHash('sha512').update(pass2+salt).digest('base64');

console.log(sha5122);
if(sha512 === sha5122 ) console.log('로그인되었습니다.');
else console.log('일치하지 않습니다.')

let hash = null;
const genPass = async (pass) =>{
  hash = await bcrypt.hash(pass, 6);
  console.log(hash);
} 

const comparePass = async (pass) => {
  let compare = await bcrypt.compare(pass, hash);
  console.log(compare);
}

genPass('1234');
setTimeout(function() {
  comparePass('1234');
}, 1000);