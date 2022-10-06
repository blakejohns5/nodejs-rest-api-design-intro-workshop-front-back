const db = require("../");
const server = require("../../utils/tests/server");

describe("mongoose relations", () => {
  let SONG = null;
  let CORRECT_SONG_INFO = null;

  beforeAll(async () => {
    await server.initTestServer();

    SONG = await db.User.create({
      firstName: "alex",
      lastName: "alex",
      email: "alex@mail.com",
      password: "my-super-password",
      speaks: ["english", "spanish"],
    });

    CORRECT_SONG_INFO = {
      name: "hello world",
      genre: "Rock",
      duration: 192,
      author: SONG._id,
    };
  });

  afterEach(async () => await server.clearSongsCollection());

  afterAll(async () => {
    await server.clearUsersCollection();
    await server.stopTestServer();
  });

  test("1.1.1 the song name is required", async () => {
    expect.assertions(1);

    try {
      const { name, ...props } = CORRECT_SONG_INFO;

      await db.Song.create(props);
    } catch (error) {
      expect(error.errors.name.message).toMatch(/is required/);
    }
  });

  test("1.1.3 trims the song name", async () => {
    const song = await db.Song.create({
      ...CORRECT_SONG_INFO,
      name: "  name   ",
    });
    expect(song.name).toBe("name");
  });

  test("1.2.1 the song genre is required", async () => {
    expect.assertions(1);

    try {
      const { genre, ...props } = CORRECT_SONG_INFO;

      await db.Song.create(props);
    } catch (error) {
      expect(error.errors.genre.message).toMatch(/is required/);
    }
  });

  test("1.2.3 trims the song genre", async () => {
    const song = await db.Song.create({
      ...CORRECT_SONG_INFO,
      genre: "  rock   ",
    });
    expect(song.genre).toBe("rock");
  });

  test("1.3.1 the song duration is required", async () => {
    expect.assertions(1);

    try {
      const { duration, ...props } = CORRECT_SONG_INFO;

      await db.Song.create(props);
    } catch (error) {
      expect(error.errors.duration.message).toMatch(/is required/i);
    }
  });

  test("1.3.2 the song duration is a number", async () => {
    expect.assertions(1);

    try {
      const { duration, ...props } = CORRECT_SONG_INFO;

      await db.Song.create({ ...props, duration: "hello" });
    } catch (error) {
      expect(error.errors.duration.message).toMatch(/cast to number/i);
    }
  });

  test("1.4 the song stats has the default values", async () => {
    const song = await db.Song.create(CORRECT_SONG_INFO);
    expect(song.stats).toEqual({
      timesPlayed: 0,
      upVotes: 0,
      downVotes: 0,
    });
  });

  test("1.4 the song stats sets values and defaults", async () => {
    const expected = {
      timesPlayed: 0,
      upVotes: 0,
      downVotes: 10,
    };

    const song = await db.Song.create({
      ...CORRECT_SONG_INFO,
      stats: expected,
    });

    expect(song.stats).toEqual(expected);
  });

  test("1.5.1 the song author is required", async () => {
    expect.assertions(1);

    try {
      const { author, ...props } = CORRECT_SONG_INFO;

      await db.Song.create(props);
    } catch (error) {
      expect(error.errors.author.message).toMatch(/is required/i);
    }
  });

  test("1.5.2 the song has a author", async () => {
    const song = await db.Song.create(CORRECT_SONG_INFO);
    expect(song.author).toEqual(expect.anything());
  });

  test("1.5.2 the song has a ref to the user collection", async () => {
    let song = await db.Song.create(CORRECT_SONG_INFO);
    song = await song.execPopulate("author");

    expect(song.author._id).toEqual(expect.anything());
    expect(song.author.firstName).toEqual(expect.any(String));
    expect(song.author.lastName).toEqual(expect.any(String));
  });

  test("1.6 the song doc includes the timestamps", async () => {
    const song = await db.Song.create(CORRECT_SONG_INFO);

    expect(song.createdAt).toEqual(expect.any(Date));
    expect(song.updatedAt).toEqual(expect.any(Date));
  });
});
