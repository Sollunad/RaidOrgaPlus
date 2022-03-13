export enum UserRole {
	Normal = 0,			// default. Has no rights.
	Raider = 1,			// Raider - normal user, who is part of the Rising Light Community.
	Maz = 2,			// Moderator auf Zeit (Temporary Moderator). Like Moderator but has only Read-Rights.
	Moderator = 3,		// Moderator - Has the rights to create/delete raids, add Players to them, set the Raid Leads, etc...
	Admin = 4,			// tbh no clue why, but there was already a role higher than Moderator, so yeah...
}

export enum Theme {
	Light = 0,
	Dark = 1,
	OldDark = 2,
}

export enum RaidRole {
	Normal = 0,
	Lieutenant = 1,
	Leader = 2
}