export function toBoolean (value: string | number | boolean | null | undefined): boolean {
	const trueValues = [true, 'true', '1', 1];
	const falseValues = [false, 'false', '0', 0];

	if (typeof value === 'string') {
		if (trueValues.includes(value.toLowerCase())) {
			return true;
		}
		if (falseValues.includes(value.toLowerCase())) {
			return false;
		}
	}

	if (trueValues.includes(value)) {
		return true;
	}
	if (falseValues.includes(value)) {
		return false;
	}

	return null;
}