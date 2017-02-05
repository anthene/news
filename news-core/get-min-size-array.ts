import { ListResult } from './list-result';
import { millisecondsInDay } from "./milliseconds-in-day";

export function getMinSizeArray<T>(
		minCount: number,
		getArrayPromise: (step: number) => Promise<T[]>,
		maxDate: Date,
		minDate: Date,
		step = 0,
		initialArray: T[] = []): Promise<ListResult<T>> {

	if (maxDate.valueOf() - step * millisecondsInDay < minDate.valueOf())
		return Promise.resolve({ list: initialArray, minDate: minDate });

	return getArrayPromise(step)
		.then(result => callGetMinSizeArrayIfNeeded(result, minCount, getArrayPromise, maxDate, minDate, step + 1, initialArray))
		.catch(result => callGetMinSizeArrayIfNeeded(result, minCount, getArrayPromise, maxDate, minDate, step + 1, initialArray));
}

function callGetMinSizeArrayIfNeeded<T>(
		result: T[],
		minCount: number,
		getArrayPromise: (step: number) => Promise<T[]>,
		maxDate: Date,
		minDate: Date,
		step: number,
		initialArray: T[]): Promise<ListResult<T>> {

	const array = initialArray.concat(result);
	return array.length >= minCount
		? Promise.resolve({ list: array, minDate: new Date(maxDate.valueOf() - step * millisecondsInDay) })
		: getMinSizeArray(minCount, getArrayPromise, maxDate, minDate, step, array);
}
