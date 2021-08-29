import { DMChannel, TextChannel } from "discord.js";
import goml from "../../src/commands/Goml";
import DiscordClient from "../../src/DiscordClient";

describe("Goml", () => {
  const discordClient = new DiscordClient();
  const sendMock = jest.fn();
  discordClient.sendMessage = sendMock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("goml", () => {
    describe("should not send a message", () => {
      test("when a 'goml' message was sent in a DM.", async () => {
        const channel: Partial<DMChannel> = {};
        await goml(discordClient, <DMChannel>channel);
        expect(sendMock).toBeCalledTimes(0);
      });

      test("when a 'goml' message was not sent in the 'main' channel.", async () => {
        // I think the fact that I have to define `valueOf` here is a bug
        // or I'm just not understanding something about how `Partial` works here.
        const channel: Partial<TextChannel> = { name: DiscordClient.CHANNELS.MAIN + "foo", valueOf: () => { return "why"; }};
        await goml(discordClient, <TextChannel>channel);
        expect(sendMock).toBeCalledTimes(0);
      });
    });

    describe("should send a message", () => {
      test("when a 'goml' message was sent in the 'main' channel.", async () => {
        // Again more weirdness with `valueOf` and partial type definition here.
        const channel: Partial<TextChannel> = { name: DiscordClient.CHANNELS.MAIN, valueOf: () => { return "why"; }};
        await goml(discordClient, <TextChannel>channel);
        expect(sendMock).toBeCalledTimes(1);
      })
    });
  });
});
