export function equalsIgnoreCase(text: string, search: string) {
	return text.localeCompare(search, undefined, { sensitivity: "base" }) === 0;
}

export const checkAccountName = (name: string) => {
	return /[a-zA-Z]+[a-zA-Z\s]*\.\d{4}/.test(name);
}