export type Message = {
	messageId: string,
	channelId: string,
	termin?: {
		id: number,
		date: string,
		time: string,
		endtime: string,
		type: number
	},
	session?: string,
	raidName?: string,
	type: "termin" | "kalender",
	update?: number
};