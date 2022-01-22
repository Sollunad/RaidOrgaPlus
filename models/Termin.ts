export interface Termin {
	id: number;
	date: Date;
	time: string;
	endtime: string;
	fk_raid: number;
	isArchived: boolean;
	isLocked: boolean;
	preview: boolean;
	text: string;
	dateString: string;
}

export interface DiscordTermin {
	messageId: string;
	channelId: string;
	fk_termin: number;
}