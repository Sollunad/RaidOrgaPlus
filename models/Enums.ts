export enum UserRole {
	Normal = 0,			// default RO+ User. Has no extended rights what so ever.
	Maz = 1,			// Moderator auf Zeit (Temporary Moderator). Like Moderator but has only Read-Rights.
	Moderator = 2,		// Moderator - Has the rights to create/delete raids, add Players to them, set the Raid Leads, etc...
	Admin = 3,			// tbh no clue why, but there was already a role higher than Moderator, so yeah...
}

export enum Theme {
	Light = 0,
	Dark = 1,
	OldDark = 2,
}