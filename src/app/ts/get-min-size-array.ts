export default function getMinSizeArray<T>(
		minCount: number,
		getArrayPromise: (step: number) => Promise<T[]>,
		step = 0,
		initialArray: T[] = []): Promise<T[]> {

	return getArrayPromise(step)
		.then(result => callGetMinSizeArrayIfNeeded(result, minCount, getArrayPromise, step + 1, initialArray))
		.catch(result => callGetMinSizeArrayIfNeeded(result, minCount, getArrayPromise, step + 1, initialArray));
}

function callGetMinSizeArrayIfNeeded<T>(
		result: T[],
		minCount: number,
		getArrayPromise: (step: number) => Promise<T[]>,
		step: number,
		initialArray: T[]) {

	const array = initialArray.concat(result);
	return array.length >= minCount
		? array
		: getMinSizeArray(minCount, getArrayPromise, step, array);
}
