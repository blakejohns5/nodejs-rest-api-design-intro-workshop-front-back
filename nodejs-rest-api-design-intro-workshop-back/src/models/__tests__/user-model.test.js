const db = require("../");
const server = require("../../utils/tests/server");

describe("mongoose schemas", () => {
  beforeAll(async () => await server.initTestServer());
  afterEach(async () => await server.clearUsersCollection());
  afterAll(async () => await server.stopTestServer());

  const CORRECT_USER_INFO = {
    firstName: "alex",
    lastName: "alex",
    email: "alex@mail.com",
    password: "my-super-password",
    speaks: ["english", "spanish"],
  };

  describe("2. create the 'User' model following the schema requirements", () => {
    test("2.1.1 the firstName is required", async () => {
      expect.assertions(1);

      try {
        const { firstName, ...props } = CORRECT_USER_INFO;

        await db.User.create(props);
      } catch (error) {
        expect(error.errors.firstName.properties.message).toMatch(
          /The first name is required/,
        );
      }
    });

    test("2.1.3 trims the first name", async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        firstName: "  name   ",
      });
      expect(user.firstName).toBe("name");
    });

    test("2.2.1 the lastName is required", async () => {
      expect.assertions(1);

      try {
        const { lastName, ...props } = CORRECT_USER_INFO;

        await db.User.create(props);
      } catch (error) {
        expect(error.errors.lastName.properties.message).toMatch(
          /The last name is required/,
        );
      }
    });

    test("2.2.3 trims the last name", async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        lastName: "  name   ",
      });
      expect(user.lastName).toBe("name");
    });

    test("2.3.1 the email is required", async () => {
      expect.assertions(1);

      try {
        const { email, ...props } = CORRECT_USER_INFO;

        await db.User.create(props);
      } catch (error) {
        expect(error.errors.email.properties.message).toMatch(
          /The email is required/,
        );
      }
    });

    test("2.3.3 trims the email", async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        email: "  mail@mail.com   ",
      });
      expect(user.email).toBe("mail@mail.com");
    });

    test("2.3.3 trims the email", async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        email: "  mail@mail.com   ",
      });
      expect(user.email).toBe("mail@mail.com");
    });

    test("2.3.4 the email is unique", async () => {
      expect.assertions(1);

      try {
        await db.User.create({
          ...CORRECT_USER_INFO,
        });
        await db.User.create({
          ...CORRECT_USER_INFO,
        });
      } catch (error) {
        expect(error.message).toMatch(/E11000 duplicate key/);
      }
    });

    test("2.3.5 fails to create a user with an invalid email", async () => {
      expect.assertions(1);

      try {
        await db.User.create({
          ...CORRECT_USER_INFO,
          email: 28,
        });
      } catch (error) {
        expect(error.errors.email.properties.message).toMatch(/is not valid/);
      }
    });

    test("2.4.1 the password is required", async () => {
      expect.assertions(1);

      try {
        const { password, ...props } = CORRECT_USER_INFO;

        await db.User.create(props);
      } catch (error) {
        expect(error.errors.password.properties.message).toMatch(
          /The password is required/,
        );
      }
    });

    test("2.4.3 the password has a min length", async () => {
      expect.assertions(1);

      try {
        await db.User.create({ ...CORRECT_USER_INFO, password: 123 });
      } catch (error) {
        expect(error.errors.password.properties.message).toMatch(
          /The password is too short/,
        );
      }
    });

    test("2.5.1 the speaks prop is an array", async () => {
      expect.assertions(1);

      const user = await db.User.create({
        ...CORRECT_USER_INFO,
      });

      expect(user.speaks).toEqual(
        expect.arrayContaining([...CORRECT_USER_INFO.speaks]),
      );
    });

    test("2.5.2 the speaks prop only allows values from the enum", async () => {
      expect.assertions(1);

      try {
        await db.User.create({ ...CORRECT_USER_INFO, speaks: ["something"] });
      } catch (error) {
        expect(error.message).toMatch(/is not a valid enum value/);
      }
    });

    test("2.6 the user doc includes the timestamps", async () => {
      const user = await db.User.create(CORRECT_USER_INFO);

      expect(user.createdAt).toEqual(expect.any(Date));
      expect(user.updatedAt).toEqual(expect.any(Date));
    });

    test("3. encrypt the password before storing it in the database", async () => {
      const user = await db.User.create({ ...CORRECT_USER_INFO });

      expect(user.password).not.toBe(CORRECT_USER_INFO.password);
      expect(user.password).toEqual(expect.any(String));
    });

    test("4. add a 'comparePassword' method to the 'User' schema", async () => {
      const user = await db.User.create({ ...CORRECT_USER_INFO });

      expect(user.comparePassword).toEqual(expect.any(Function));
      expect(await user.comparePassword(CORRECT_USER_INFO.password)).toBe(true);
    });
  });
});
