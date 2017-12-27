# pipe
## version@0.0.0

## A simple pipe function that runs synchronously and asynchronously Promised based.
### I created this module because there were and are still times I would find myself re-creating this function throughout other projects. The main purpose of the function is to pass data from one function/promise to another and then return that data back.

```js
const pipe = require('@andre_garvin/pipe')

function reverse(str) {
    let reverse_str = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reverse_str += str[i];
    }
    return reverse_str;
}

const upperCase = (str) => str.toUpperCase();

// sync
const newStr = pipe([
	reverse,
	upperCase
], 'Hello, World!')

console.log( newStr ) // !DLROW ,OLLEH
```

```js
const pipe = require('@andre_garvin/pipe').Promise
// If you do not use the `.Promise` property it will still resolve the Promise being pased to pipe

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
pipe([reverse, upperCase, stripChar], 'Hello, World!', 'l')
	.then(newStr => console.log(newStr)) // !DROW ,OEH
```