import { Request } from "express";
import { Spieler } from "../../../models/Spieler";

import * as role from '../../authentication/role';
import * as discord from '../../discord/discord';
import * as user from '../../endpoints/users/user';

jest.mock('../../discord/discord');
jest.mock('../../authentication/role');
jest.mock('../../endpoints/users/user');

describe('users controller', () => {
	const roleMock = role as jest.Mocked<typeof role>;
	const discordMock = discord as jest.Mocked<typeof discord>;
	const userMock = user as jest.Mocked<typeof user>;

	let userId: number;
	let req: Request;

	roleMock.getRole.mockImplementation(() => {
		return 2;
	});

	describe('getUsers method', () => {
		beforeEach(() => {
			userId = 15
			req = { query: {} } as Request;
			req.query.id = userId.toString();
		});

		it('should return a user per ID', () => {
			const spieler: Spieler[] = [
				{ id: userId, accname: 'Unit Tester', name: 'Unit Tester' } as Spieler
			];

			userMock.get.mockImplementationOnce((id: number) => {
				return Promise.resolve(spieler);
			});

			discordMock.getAllUsers.mockImplementationOnce(() => {
				return Promise.resolve(null);
			});

			discordMock.findUser.mockImplementationOnce(() => {
				return Promise.resolve(null) as any;
			});
			
			
		});
	});
});