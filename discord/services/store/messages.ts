import * as _json from "./jsonHandler";

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

export function newMessageTermin(messageId: string, channelId: string, termin: any, session: string, raidName: string) {
	let messages: Message[] = _json.read('messages');
	const firstGroupCount = messages.filter(m => m.update == 0).length;
	const secondGroupCount = messages.filter(m => m.update == 1).length;

	let updateGroup = 0;
	if (secondGroupCount < firstGroupCount) {
		updateGroup = 1;
	}

	const newMessage: Message = { messageId, channelId, termin, session, raidName, type: "termin", update: updateGroup };
	messages.push(newMessage);
	_json.write('messages', messages);
}

export function newMessageKalender(messageId: string, channelId: string) {
	let messages: Message[] = _json.read('messages');
	const newMessage: Message = { messageId, channelId, type: "kalender", update: 0 };
	messages.push(newMessage);
	_json.write('messages', messages);
}

export function getMessage(messageId: string) {
	const messages: Message[] = _json.read('messages');
	const foundMessage = messages.find(c => c.messageId === messageId);
	if (foundMessage) return foundMessage;
}

export function getAll(): Message[] {
	return _json.read('messages');
}

export function deleteMessage(messageId: string) {
	const messages: Message[] = _json.read('messages');
	const filteredMessages = messages.filter(c => c.messageId !== messageId);
	_json.write('messages', filteredMessages);
}