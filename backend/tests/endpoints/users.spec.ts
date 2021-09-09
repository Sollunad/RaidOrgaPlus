import { Request } from "express";
import hash from "password-hash";
import { Spieler } from "../../../models/Spieler";
import { getUser, invalidateSession, loginUser, registerUser } from "../../endpoints/users/controller";

import * as role from '../../authentication/role';
import * as auth from '../../authentication/auth';
import * as discordUser from '../../discord/users';
import * as user from '../../endpoints/users/user';
import * as sessions from '../../endpoints/users/session';
import * as register from '../../endpoints/users/register';
import * as login from '../../endpoints/users/login';
import * as discord from '../../endpoints/users/discord';
import { UserRole } from "../../../models/Enums";
import { Authentication } from "models/Auth";

jest.mock("password-hash");
jest.mock('../../authentication/role');
jest.mock('../../authentication/auth');
jest.mock('../../discord/users');
jest.mock('../../endpoints/users/user');
jest.mock('../../endpoints/users/session');
jest.mock('../../endpoints/users/register');
jest.mock('../../endpoints/users/login');
jest.mock('../../endpoints/users/discord');

describe('users controller', () => {
	const hashMock = hash as jest.Mocked<typeof hash>;
	const roleMock = role as jest.Mocked<typeof role>;
	const authMock = auth as jest.Mocked<typeof auth>;
	const discordUsersMock = discordUser as jest.Mocked<typeof discordUser>;
	const userMock = user as jest.Mocked<typeof user>;
	const sessionsMock = sessions as jest.Mocked<typeof sessions>;
	const registerMock = register as jest.Mocked<typeof register>;
	const loginMock = login as jest.Mocked<typeof login>;
	const discordMock = discord as jest.Mocked<typeof discord>;

	let userId: number;
	let req: Request;

	roleMock.getRole.mockImplementation(() => {
		return UserRole.Moderator;
	});

	describe('getUsers method', () => {
		const spieler: Spieler[] = [
			{ id: userId, accname: 'Unit Tester', name: 'Unit Tester' } as Spieler
		];

		beforeEach(() => {
			userId = 15
			req = { query: {} } as Request;
			req.query.id = userId.toString();

			userMock.get.mockImplementationOnce(() => {
				return Promise.resolve(spieler);
			});

			discordUsersMock.getAllUsers.mockImplementationOnce(() => {
				return Promise.resolve(null);
			});

			discordUsersMock.findUser.mockImplementationOnce(() => {
				return null;
			});
		});

		it('should return a user per ID', async () => {
			const user = await getUser(req, null);

			expect(userMock.get).toBeCalled();
			expect(roleMock.getRole).toBeCalled();
			expect(discordUsersMock.getAllUsers).toBeCalled();
			expect(discordUsersMock.findUser).toBeCalled();
			expect(user).not.toBeNull();
			expect(user).toBe(spieler[0]);
		});

		it('should return the user through the authentication', async () => {
			delete req.query.id;

			const auth = { user: userId } as Authentication;
			const user = await getUser(req, auth);

			expect(userMock.get).toBeCalled();
			expect(roleMock.getRole).not.toBeCalled();
			expect(discordUsersMock.getAllUsers).toBeCalled();
			expect(discordUsersMock.findUser).toBeCalled();
			expect(user).not.toBeNull();
			expect(user).toBe(spieler[0]);
		});
	});

	describe('invalideSession', () => {
		it('should delete the session', async () => {
			const auth = { uuid: '15' } as Authentication;

			authMock.deleteCache.mockImplementationOnce(() => {
				return null;
			});

			sessionsMock.invalidate.mockImplementationOnce(() => {
				return Promise.resolve(null);
			});

			await invalidateSession(null, auth);

			expect(authMock.deleteCache).toBeCalledWith(auth.uuid);
			expect(sessionsMock.invalidate).toBeCalledWith(auth.uuid);
		});
	});

	describe('registerUser', () => {
		beforeEach(() => {
			req = {
				body: {
					accName: 'Test User',
					pwd: 'somePassword',
					name: 'Test User',
					email: 'TestUser@nowhere.com'
				}
			} as Request;
		});

		it('should register the user', async () => {
			registerMock.register.mockImplementationOnce(() => {
				return Promise.resolve(true);
			});

			const resp = await registerUser(req);

			expect(registerMock.register).toBeCalled();
			expect(resp).not.toBeNull();
			expect(resp).toBeTrue();
		});

		it('should fail at registering the user (already registered)', async () => {
			registerMock.register.mockImplementationOnce(() => {
				return Promise.resolve(false);
			});

			const resp = await registerUser(req);

			expect(registerMock.register).toBeCalled();
			expect(resp).not.toBeNull();
			expect(resp).toBeFalse();
		});

		it('should fail at registering the user (missing information)', async () => {
			delete req.body.email;

			const resp = await registerUser(req);

			expect(registerMock.register).not.toBeCalled();
			expect(resp).toBeUndefined();
		});
	});

	describe('loginUser', () => {
		const accName = 'Unit Tester.1234';
		const password = 'somePassword';
		const key = 'someKey';
		const discordId = 'discordId';
		const agent = 'unitTestAgent';
		const uuid = 'someIdentifier';
		const wrongPassword = "wrongPassword";
		const wrongUsername = "wrongUsername";

		beforeEach(() => {
			req = {
				body: {
					accName: accName,
					pwd: password,
					key: key,
					id: discordId,
				},
				header: (header: string) => agent
			} as Request;
		});

		it('should login the user', async () => {
			loginMock.login.mockResolvedValueOnce(uuid);

			delete req.body.key;
			delete req.body.id;

			const resp = await loginUser(req);

			expect(loginMock.login).toBeCalled();
			expect(resp).not.toBeNull();
			expect(resp).not.toBeUndefined();
			expect(resp).toBe(uuid);
		});

		it('should login the user via discord', async () => {
			discordMock.login.mockResolvedValueOnce(uuid);

			delete req.body.accName;
			delete req.body.pwd;

			const resp = await loginUser(req);

			expect(discordMock.login).toBeCalled();
			expect(resp).not.toBeNull();
			expect(resp).not.toBeUndefined();
			expect(resp).toBe(uuid);
		});

		it('should not login the user (wrong username)', async () => {
			loginMock.login.mockResolvedValueOnce(wrongUsername);

			delete req.body.key;
			delete req.body.id;

			const resp = await loginUser(req);

			expect(loginMock.login).toBeCalled();
			expect(resp).not.toBeNull();
			expect(resp).not.toBeUndefined();
			expect(resp).toBe(wrongUsername);
		});

		it('should not login the user (wrong password)', async () => {
			loginMock.login.mockResolvedValueOnce(wrongPassword);

			delete req.body.key;
			delete req.body.id;

			const resp = await loginUser(req);

			expect(loginMock.login).toBeCalled();
			expect(resp).not.toBeNull();
			expect(resp).not.toBeUndefined();
			expect(resp).toBe(wrongPassword);
		});
	});
});