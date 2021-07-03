import { Request } from 'express';
import { addPlayer, createRaid, deleteRaid, invitablePlayers, removePlayer, setComment, setPlayerRole } from '../../endpoints/moderation/controller';
import * as role from '../../authentication/role';
import * as discord from '../../discord/discord';
import * as modRaids from '../../endpoints/moderation/raids';
import * as modUsers from '../../endpoints/moderation/users';
import * as invitable from '../../endpoints/raids/invites';

jest.mock('../../discord/discord');
jest.mock('../../authentication/role');
jest.mock('../../endpoints/moderation/raids');
jest.mock('../../endpoints/moderation/users');
jest.mock('../../endpoints/raids/invites');

describe('moderation-controller', () => {
	const roleMock = role as jest.Mocked<typeof role>;
	const discordMock = discord as jest.Mocked<typeof discord>;
	const modRaidsMock = modRaids as jest.Mocked<typeof modRaids>;
	const modUsersMock = modUsers as jest.Mocked<typeof modUsers>;
	const invitableMock = invitable as jest.Mocked<typeof invitable>;

	let raidName: string, raidId: number, accname: string, playerId: number;
	let req: Request;

	beforeEach(() => {
		raidId = 5;
		playerId = 5;
		accname = 'testPlayer.1234';
		raidName = 'testRaid';
	});

	roleMock.getRole.mockImplementation(() => {
		return 2;
	});

	describe('createRaid', () => {
		beforeEach(() => {
			req = {
				body: {
					name: raidName
				}
			} as Request;
		});

		it('should create a new raid', async () => {
			await createRaid(req, null);
			
			expect(roleMock.getRole).toBeCalled();
			expect(discordMock.addRaidRole).toBeCalledWith(raidName);
			expect(modRaidsMock.createRaid).toBeCalledWith(raidName);
		});

		it('should not create a new raid (insufficient rights)', async () => {
			roleMock.getRole.mockImplementationOnce(() => {
				return 0;
			});

			await createRaid(req, null);
			
			expect(roleMock.getRole).toBeCalled();
			expect(discordMock.addRaidRole).not.toBeCalled()
			expect(modRaidsMock.createRaid).not.toBeCalled();
		});

		it('should not create a new raid (incomplete request)', async () => {
			delete req.body.name;

			await createRaid(req, null);
			
			expect(roleMock.getRole).toBeCalled();
			expect(discordMock.addRaidRole).not.toBeCalled()
			expect(modRaidsMock.createRaid).not.toBeCalled();
		});
	});

	describe('deleteRaid', () => {
		beforeEach(() => {
			req = {
				body: {
					id: raidId,
					name: raidName,
				}
			} as Request;
		});

		it('should delete a raid', async () => {
			await deleteRaid(req, null);
	
			expect(roleMock.getRole).toBeCalled();
			expect(discordMock.removeRaidRole).toBeCalledWith(raidName);
			expect(modRaidsMock.deleteRaid).toBeCalledWith(raidId);
		});

		it('should not delete a raid (insufficient rights)', async () => {
			roleMock.getRole.mockImplementationOnce(() => {
				return 0;
			});

			await deleteRaid(req, null);
	
			expect(roleMock.getRole).toBeCalled();
			expect(discordMock.removeRaidRole).not.toBeCalled();
			expect(modRaidsMock.deleteRaid).not.toBeCalled();
		});

		it('should not delete a raid (incomplete request)', async () => {
			delete req.body.name;

			await deleteRaid(req, null);
	
			expect(roleMock.getRole).toBeCalled();
			expect(discordMock.removeRaidRole).not.toBeCalled();
			expect(modRaidsMock.deleteRaid).not.toBeCalled();
		});
	});

	describe('invitable players', () => {
		beforeEach(() => {
			req = { query: {} } as Request;
			req.query.raid = raidId.toString();
		})

		it('should return an empty array (not allowed)', async () => {
			roleMock.getRole.mockImplementationOnce((auth) => {
				return 0;
			});
	
			const result = await invitablePlayers(req, null);
	
			expect(result).toBeEmpty();
			expect(invitableMock.invitable).not.toBeCalled();
		});

		it('should return an empty array (no invitable players)', async () => {
			invitableMock.invitable.mockImplementationOnce((raid) => {
				return Promise.resolve([]);
			});

			const result = await invitablePlayers(req, null);

			expect(result).toBeEmpty();
			expect(invitableMock.invitable).toBeCalledWith(raidId);
		});

		it('should return invitable players', async () => {
			invitableMock.invitable.mockImplementationOnce((raid) => {
				const players: any[] = [{}, {}, {}];
				return Promise.resolve(players);
			});

			const result = await invitablePlayers(req, null);

			expect(result).not.toBeEmpty();
			expect(result).toBeArrayOfSize(3);
			expect(invitableMock.invitable).toBeCalledWith(raidId);
		});
	});

	describe('add/remove player', () => {
		beforeEach(() => {
			req = {
				body: {
					raid: raidId,
					spieler: playerId,
					accname: accname,
					raidName: raidName
				}
			} as Request;
		});

		discordMock.addRole.mockImplementation(() => {
			return Promise.resolve();
		});

		discordMock.removeRole.mockImplementation(() => {
			return Promise.resolve();
		})

		modRaidsMock.addPlayer.mockImplementation(() => {
			return Promise.resolve({} as any);
		});

		modRaidsMock.removePlayer.mockImplementation(() => {
			return Promise.resolve({} as any);
		});

		it('should add a player to the raid', async () => {
			await addPlayer(req, null);

			expect(discordMock.addRole).toBeCalledWith(accname, raidName);
			expect(modRaidsMock.addPlayer).toBeCalledWith(raidId, playerId);
		});

		it('should not add a player (no rights)', async () => {
			roleMock.getRole.mockImplementationOnce(() => {
				return 0;
			});

			await addPlayer(req, null);

			expect(discordMock.addRole).not.toBeCalled();
			expect(modRaidsMock.addPlayer).not.toBeCalled();
		});

		it('should not add a player (incomplete request)', async () => {
			delete req.body.accname;
			delete req.body.spieler;

			await addPlayer(req, null);
			
			expect(discordMock.addRaidLead).not.toBeCalled();
			expect(modRaidsMock.addPlayer).not.toBeCalled();
		});

		it('should remove a player from the raid', async () => {
			await removePlayer(req, null);

			expect(discordMock.removeRole).toBeCalledWith(accname, raidName);
			expect(modRaidsMock.removePlayer).toBeCalledWith(raidId, playerId);
		});

		it('should not remove a player (no rights)', async () => {
			roleMock.getRole.mockImplementationOnce(() => {
				return 0;
			});

			await removePlayer(req, null);

			expect(discordMock.removeRole).not.toBeCalled();
			expect(modRaidsMock.removePlayer).not.toBeCalled();
		});

		it('should not remove a player (incomplete request)', async () => {
			delete req.body.accname;
			delete req.body.spieler;

			await removePlayer(req, null);
			
			expect(discordMock.removeRole).not.toBeCalled();
			expect(modRaidsMock.removePlayer).not.toBeCalled();
		});
	});

	describe('setPlayerRole', () => {
		let role: number;

		modRaidsMock.getRaidsAsLead.mockImplementation(() => {
			return Promise.resolve(0);
		});

		modRaidsMock.setPlayerRole.mockImplementation(() => {
			return Promise.resolve({} as any);
		});

		discordMock.addRaidLead.mockImplementation(() => {
			return Promise.resolve();
		});

		discordMock.removeRaidLead.mockImplementation(() => {
			return Promise.resolve();
		});

		beforeEach(() => {
			role = 2;

			req = {
				body: {
					raid: raidId,
					spieler: playerId,
					accname: accname,
					role: role
				}
			} as Request;
		});

		it('should set the player role to leader', async () => {
			await setPlayerRole(req, null);

			expect(modRaidsMock.getRaidsAsLead).toBeCalledWith(playerId);
			expect(discordMock.addRaidLead).toBeCalledWith(accname);
			expect(modRaidsMock.setPlayerRole).toBeCalledWith(raidId, playerId, role);
		});

		it('should set the player role to player', async () => {
			role = 0;
			req.body.role = role;

			await setPlayerRole(req, null);

			expect(modRaidsMock.getRaidsAsLead).toBeCalledWith(playerId);
			expect(discordMock.removeRaidLead).toBeCalledWith(accname);
			expect(modRaidsMock.setPlayerRole).toBeCalledWith(raidId, playerId, role);
		});

		it('should not remove the leade role', async () => {
			modRaidsMock.getRaidsAsLead.mockImplementation(() => {
				return Promise.resolve(2);
			});

			role = 0;
			req.body.role = role;

			await setPlayerRole(req, null);

			expect(modRaidsMock.getRaidsAsLead).toBeCalledWith(playerId);
			expect(discordMock.addRaidLead).toBeCalledWith(accname);
			expect(modRaidsMock.setPlayerRole).toBeCalledWith(raidId, playerId, role);
		});

		it('should not set the player role (no rights)', async () => {
			roleMock.getRole.mockImplementationOnce(() => {
				return 0;
			});

			await setPlayerRole(req, null);

			expect(modRaidsMock.getRaidsAsLead).not.toBeCalled();
			expect(discordMock.addRaidLead).not.toBeCalled();
			expect(modRaidsMock.setPlayerRole).not.toBeCalled();
		});

		it('should not set the player role (incomplete request)', async () => {
			delete req.body.role;
			delete req.body.accname;

			await setPlayerRole(req, null);

			expect(modRaidsMock.getRaidsAsLead).not.toBeCalled();
			expect(discordMock.addRaidLead).not.toBeCalled();
			expect(modRaidsMock.setPlayerRole).not.toBeCalled();
		});
	});

	describe('setComment', () => {
		let comment: string;

		modUsersMock.setComment.mockImplementation(() => {
			return Promise.resolve({} as any);
		});

		beforeEach(() => {
			comment = 'unit test comment';

			req = {
				body: {
					spieler: playerId,
					comment: comment
				}
			} as Request;
		});

		it('should set a comment for the specified player', async () => {
			await setComment(req, null);

			expect(roleMock.getRole).toBeCalled();
			expect(modUsersMock.setComment).toBeCalledWith(playerId, comment);
		});

		it('should not set a comment (insufficient rights)', async () => {
			roleMock.getRole.mockImplementationOnce(() => {
				return 0;
			});

			await setComment(req, null);

			expect(roleMock.getRole).toBeCalled();
			expect(modUsersMock.setComment).not.toBeCalled();
		});

		it('should not set a comment (incomplete request)', async () => {
			delete req.body.comment;

			await setComment(req, null);

			expect(roleMock.getRole).not.toBeCalled();
			expect(modUsersMock.setComment).not.toBeCalled();
		});
	});
});