import {Injectable} from '@angular/core';
import * as Crypto from 'crypto-js';

/**
 * Service to manage / wrap AES encryption
 */
@Injectable({
   providedIn: 'root'
})
export class EncryptionService {

   constructor() {
   }

   /**
    * @const integer Return encrypt method or Cipher method number. (128, 192, 256)
    */
   get encryptMethodLength(): number {
      const encryptMethod = this.encryptMethod;
      // get only number from string.
      // @link https://stackoverflow.com/a/10003709/128761 Reference.
      const aesNumber = encryptMethod.match(/\d+/)[0];
      return parseInt(aesNumber);
   }// encryptMethodLength


   /**
    * @const integer Return cipher method divide by 8. example: AES number 256 will be 256/8 = 32.
    */
   get encryptKeySize(): number {
      const aesNumber = this.encryptMethodLength;
      return aesNumber / 8;
   }// encryptKeySize


   /**
    * @link http://php.net/manual/en/function.openssl-get-cipher-methods.php Refer to available methods in PHP if we are working between JS & PHP encryption.
    * @const string Cipher method.
    *              Recommended AES-128-CBC, AES-192-CBC, AES-256-CBC
    *              due to there is no `openssl_cipher_iv_length()` function in JavaScript
    *              and all of these methods are known as 16 in iv_length.
    */
   get encryptMethod() {
      return 'AES-256-CBC';
   }// encryptMethod


   /**
    * Decrypt string.
    *
    * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-Crypto Reference.
    * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-Crypto Crypto JS base64 encode/decode reference.
    * @return string Return decrypted string.
    */
   decrypt(encryptedString: string, key: string) {
      const json = JSON.parse(Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(encryptedString)));

      const salt = Crypto.enc.Hex.parse(json.salt);
      const iv = Crypto.enc.Hex.parse(json.iv);

      // no need to base64 decode.
      const encrypted = json.ciphertext;

      let its = parseInt(json.iterations);
      if (its <= 0) {
         its = 999;
      }

      // example: AES number is 256 / 4 = 64
      const encryptMethodLength = (this.encryptMethodLength / 4);
      const hashKey = Crypto.PBKDF2(key, salt, {
         hasher: Crypto.algo.SHA512,
         keySize: (encryptMethodLength / 8),
         iterations: its
      });

      const decrypted = Crypto.AES.decrypt(encrypted, hashKey, {mode: Crypto.mode.CBC, iv: iv});

      return decrypted.toString(Crypto.enc.Utf8);
   }// decrypt


   /**
    * Encrypt string.
    *
    * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-Crypto Reference.
    * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-Crypto Crypto JS base64 encode/decode reference.
    * @param value string The original string to be encrypt.
    * @param key The key.
    * @return string Return encrypted string.
    */
   encrypt(value: string, key: string) {
      const iv = Crypto.lib.WordArray.random(16); // the reason to be 16, please read on `encryptMethod` property.

      const salt = Crypto.lib.WordArray.random(256);
      const its = 999;
      const encryptMethodLength = (this.encryptMethodLength / 4); // example: AES number is 256 / 4 = 64
      const hashKey = Crypto.PBKDF2(key, salt, {
         hasher: Crypto.algo.SHA512,
         keySize: (encryptMethodLength / 8),
         iterations: its
      });

      const encrypted = Crypto.AES.encrypt(value, hashKey, {mode: Crypto.mode.CBC, iv: iv});
      const encryptedString = Crypto.enc.Base64.stringify(encrypted.ciphertext);

      const output = {
         ciphertext: encryptedString,
         iv: Crypto.enc.Hex.stringify(iv),
         salt: Crypto.enc.Hex.stringify(salt),
         iterations: its
      };

      return Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(JSON.stringify(output)));
   }
}
