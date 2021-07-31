export interface Changelog {
	version: string;
	release: string;
	features: string[];
	subversions?: Omit<Changelog, 'subversions'>[];
}