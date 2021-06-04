export interface DiscordRole {
	id: string;
	name: string;
	color: string;
}

export interface DiscordMember {
	id: string;
	username: string;
	nickname: string;
	roles: DiscordRole[];
	joined: number;
	avatar: string;
	color: string;
}