export interface Termin {
	id: number;
	date: Date;
	time: Date;
	endtime: Date;
	fk_raid: number;
	isArchived: boolean;
	isLocked: boolean;
	preview: boolean;
	test: string;
}