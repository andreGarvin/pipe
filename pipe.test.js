const { test } = require('ava')

test('pipe', t => {
    const pipe = require('.')

    function reverse(str) {
        let reverse_str = '';
        for (let i = str.length - 1; i >= 0; i--) {
            reverse_str += str[i];
        }
        return reverse_str;
    }

    const upperCase = (str) => str.toUpperCase();
    
    const newStr = pipe([
        reverse,
        upperCase
    ], 'Hello, World!')

    return t.is(newStr, '!DLROW ,OLLEH') 
})

test('pipe.Promise', async t => {
    const pipe = require('.').Promise
    
    function stripChar(str, sep) {
        return new Promise(resolve => {
            const transformedStr = str.split('').reduce((newTransformedStr, char) => {
                if (!sep.includes(char.toLowerCase())) {
                    newTransformedStr += char;
                    return newTransformedStr;
                }
                return newTransformedStr
            }, '')
            return resolve(transformedStr)
        })
    }

    // you can also pass in other arguments into the function
    const newStr = await pipe([stripChar], 'Hello, World!', 'l')
    return t.is(newStr, 'Heo, Word!')
})