export function removeArrayElement(oldArray, index) {
  const newIndex = index + 1;
	let newArray = [...oldArray.slice(0, index), ...oldArray.slice(newIndex)];
	return newArray;
}