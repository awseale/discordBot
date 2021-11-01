import DiscordClient, { MESSAGES } from "../src/DiscordClient";

describe("DiscordClient", () => {
  let discordClient: DiscordClient;
  const sendMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    discordClient = new DiscordClient();
    // @ts-ignore
    discordClient.channels.cache.get = jest.fn((channelName) => {
      return {
        send: sendMock,
      };
    });
  });

  describe("sendMessage()", () => {
    test("successfully calls channel.send when called correctly", async () => {
      await discordClient.sendMessage(MESSAGES.GOML, DiscordClient.CHANNELS.CHANGELOG);
      expect(discordClient.channels.cache.get).toHaveBeenCalledWith(DiscordClient.CHANNELS.CHANGELOG);
      expect(sendMock).toHaveBeenCalledWith(MESSAGES.GOML);
    });

    test("doesnt call channel.send when called with empty channel name", async () => {
      await discordClient.sendMessage(MESSAGES.GOML, "");
      expect(discordClient.channels.cache.get).not.toHaveBeenCalled();
      expect(sendMock).not.toHaveBeenCalled();
    });

    test("doesnt call channel.send when it cannot find the channel from cache", async () => {
      await discordClient.sendMessage(MESSAGES.GOML, "NON_EXISTING_CHANNEL");
      expect(discordClient.channels.cache.get).not.toHaveBeenCalled();
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  describe("parseMessage()", () => {
    test("parses 'Normal message' correctly", () => {
      const input = "Normal message";
      const output = "normal message";
      expect(discordClient.parseMessage(input)).toEqual(output);
    });

    test("parses '  NORMAL MESSAGE  ' correctly", () => {
      const input = "  NORMAL MESSAGE  ";
      const output = "normal message";
      expect(discordClient.parseMessage(input)).toEqual(output);
    });
  });

  describe("isValidChannel", () => {
    test("returns true if the channel is not empty", () => {
      const input = "123456789012345678";
      const output = true;
      expect(discordClient.isValidChannel(input)).toEqual(output);
    });

    test("returns false when the channel is empty", () => {
      const input = "";
      const output = false;
      expect(discordClient.isValidChannel(input)).toEqual(output);
    });
  });
});
