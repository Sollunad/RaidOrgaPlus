import { CacheType, CommandInteraction, MessageEmbed, WebhookEditMessageOptions } from "discord.js";
import { Raid } from "../../../models/Raid";
import { SpielerRaid } from "../../../models/Spieler";
import link from "../../commands/link";
import { listRaidsForUser } from "../../utils/queries";

jest.mock("../../utils/queries");
const mockListRaidsForUser = jest.mocked(listRaidsForUser);

describe("link command", () => {
	const mockInteraction = {
		options: {
			getSubcommand: () => "",
			getString: (option) => "",
		},
		guild: {
			members: {
				fetch: (options) => Promise.resolve({}),
			},
		},
		deferReply: () => Promise.resolve(),
		editReply: (options) => Promise.resolve({}),
	} as CommandInteraction<CacheType>;

	it("should have commands", () => {
		const commands = link.data;

		expect(commands).not.toBeNull();

		expect(commands.name).not.toBeNull();
		expect(commands.name).toBe("link");

		expect(commands.description).not.toBeNull();
	});

	describe("subcommand - list", () => {
		beforeEach(() => {
			mockInteraction.options.getSubcommand = () => "list";
		});

		it("should return an error message", async () => {
			mockListRaidsForUser.mockImplementationOnce(() => Promise.resolve([]));
			const spy = jest.spyOn(mockInteraction, "editReply");

			await link.execute(mockInteraction);

			expect(mockListRaidsForUser).toBeCalled();
			expect(spy).toBeCalled();
			expect(typeof spy.mock.calls[0]).toBe("object");
		});

		it("should return an embed with raids", async () => {
			const returnValue = Promise.resolve([{ name: "test" }] as (Raid & SpielerRaid)[]);
			mockListRaidsForUser.mockImplementationOnce(() => returnValue);
			
			const spy = jest.spyOn(mockInteraction, "editReply");

			await link.execute(mockInteraction);

			expect(mockListRaidsForUser).toBeCalled();
			expect(spy).toBeCalled();

			const arg = spy.mock.calls[0][0];
			expect(arg).toBeInstanceOf(Object);
			expect(arg).toHaveProperty("embeds");

			const embed = (<WebhookEditMessageOptions>arg).embeds[0];
			expect(embed).toBeTruthy();
			expect(embed).toBeInstanceOf(MessageEmbed);
			expect(embed.title).toBeTruthy();
			expect(embed.fields).toHaveLength(1);
			expect(embed.timestamp).toBeTruthy();
		});
	});

	describe("subcommand - get", () => {
		beforeEach(() => {
			mockInteraction.options.getSubcommand = () => "get";
			// mockInteraction.options.getString = () => "";
		});

		it("should return an error message", async () => {
			mockListRaidsForUser.mockImplementationOnce(() => Promise.resolve([]));
			const spy = jest.spyOn(mockInteraction, "editReply");

			await link.execute(mockInteraction);

			expect(mockListRaidsForUser).toBeCalled();
			expect(spy).toBeCalled();
			expect(typeof spy.mock.calls[0]).toBe("object");
		});
	});
});
