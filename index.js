function pipe(arrFuncs, data, ...args) {
	if (!Array.isArray(arrFuncs)) {
		arrFuncs = [arrFuncs]
	}
	
	return arrFuncs.reduce((newTransformedData, func) => {
		data = func(newTransformedData, ...args)
		return data;
	}, data)
}

module.exports = pipe

async function asyncPipe(arrFuncs = [], data, ...args) {
	if (!Array.isArray(arrFuncs)) {
		arrFuncs = [ arrFuncs ]
	}
	arrFuns = arrFuncs.map(async func => await func)
	
    return await pipe(arrFuncs, await data, await args)
}

module.exports.Promise = asyncPipe;
