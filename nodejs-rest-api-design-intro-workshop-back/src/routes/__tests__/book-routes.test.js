const supertest = require("supertest");

const app = require("../../server");
const db = require("../../models");
const { initTestServer, stopTestServer } = require("../../utils/tests/server");
const { seedBooks } = require("../../db/seed");

const request = supertest(app);

describe("books crud controllers", () => {
  beforeAll(async () => await initTestServer());
  afterAll(async () => await stopTestServer());
  beforeEach(async () => await seedBooks());

  test("1.1.1 create the book and return it", async () => {
    const user = await db.User.findOne({ _id: { $exists: true } })
      .select("_id")
      .lean()
      .exec();

    const res = await request.post("/books").send({
      title: "test book title",
      author: user._id,
      genre: "test",
      year: 1000,
      pages: 1000,
    });

    expect(res.body.data).toEqual(expect.any(String));
  });

  test("1.1.2 return a status code of `200`", async () => {
    const user = await db.User.findOne({ _id: { $exists: true } })
      .select("_id")
      .lean()
      .exec();

    const res = await request.post("/books").send({
      title: "test book title",
      author: user._id,
      genre: "test",
      year: 1000,
      pages: 1000,
    });

    expect(res.status).toBe(201);
  });

  test("1.2.1 get all the book ids and titles", async () => {
    const res = await request.get("/books");
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        { _id: expect.anything(), title: expect.any(String) },
        { _id: expect.anything(), title: expect.any(String) },
        { _id: expect.anything(), title: expect.any(String) },
      ]),
    );
  });

  test("1.2.2 return a status code of `200`", async () => {
    const res = await request.get("/books");
    expect(res.status).toBe(200);
  });

  test("1.3.1 get the book and author info", async () => {
    const book = await db.Book.findOne({}).select("_id").limit(1).lean().exec();
    const res = await request.get(`/books/${book._id}`);
    expect(res.body.data).toEqual({
      _id: expect.any(String),
      title: expect.any(String),
      pages: expect.any(Number),
      author: {
        _id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
      },
    });
  });

  test("1.3.2 return a status code of `200`", async () => {
    const book = await db.Book.findOne({}).select("_id").limit(1).lean().exec();
    const res = await request.get(`/books/${book._id}`);
    expect(res.status).toBe(200);
  });

  test("1.4.1 update the book and return the updates", async () => {
    const book = await db.Book.findOne({})
      .select("title pages")
      .limit(1)
      .lean()
      .exec();

    const res = await request.patch(`/books/${book._id}`).send({
      title: "test title",
      pages: 1000,
    });

    expect(res.body.data).toMatchObject({
      _id: expect.any(String),
      title: "test title",
      pages: 1000,
    });
  });

  test("1.4.2 return a status code of `200`", async () => {
    const book = await db.Book.findOne({})
      .select("title pages")
      .limit(1)
      .lean()
      .exec();

    const res = await request.patch(`/books/${book._id}`).send({
      title: "test title",
      pages: 1000,
    });

    expect(res.status).toBe(200);
  });

  test("1.5.1 delete the book and return it", async () => {
    const book = await db.Book.findOne({}).select("_id").limit(1).lean().exec();
    const res = await request.delete(`/books/${book._id}`);
    const removedBook = await db.Book.findOne({ _id: book._id })
      .select("_id")
      .limit(1)
      .lean()
      .exec();

    expect(res.body.data._id).toEqual(expect.any(String));
    expect(removedBook).toBe(null);
  });

  test("1.5.2 return a status code of `200`", async () => {
    const book = await db.Book.findOne({}).select("_id").limit(1).lean().exec();
    const res = await request.delete(`/books/${book._id}`);
    expect(res.status).toBe(200);
  });
});
