import {expect} from '@jest/globals';
import type {MatcherFunction} from 'expect'

const toBeDate: MatcherFunction = function(actual){
    if (typeof actual !== 'string'){
        throw new Error('Must be type string')
    }
    const pass = !isNaN(Date.parse(actual))
    if (pass) {
        return {
            message: () =>
            `expected ${this.utils.printReceived(
                actual,
              )} not to be a string parsable as a date`,
            pass: true
        }
    } else {
        return {
            message: () =>
            `expected ${this.utils.printReceived(
                actual,
              )} to be a string parsable as a date`,
            pass: false
        }
    }
}
expect.extend({
    toBeDate
})

declare module 'expect' {
    interface AsymmetricMatchers {
        toBeDate(): void;
      }
      interface Matchers<R> {
        toBeDate(): R;
      } 
}