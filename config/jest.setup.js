module.exports = async () => {
  const CHANNEL_CHANGELOG = "123456789012345678";
  const CHANNEL_MAIN = "876543210987654321";
  process.env = Object.assign(process.env, {
    CHANGELOG_CHANNEL: CHANNEL_CHANGELOG,
    CHANNEL: CHANNEL_MAIN,
  });
};
