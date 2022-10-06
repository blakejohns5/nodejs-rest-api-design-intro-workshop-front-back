const mongoose = require("mongoose");

const connect = require("../connect");

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("mongoose schemas", () => {
  test("1. the `connect` function calls `mongoose.connect` with the url and options", async () => {
    await connect();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);

    expect(mongoose.connect.mock.calls[0][0]).toBe(
      "mongodb://localhost:27017/myApp",
    );
    expect(mongoose.connect.mock.calls[0][1]).toEqual(expect.any(Object));
  });
});
