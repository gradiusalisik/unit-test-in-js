const Ajax = require("./async");
const axios = require("axios");

jest.mock("axios");

describe("Ajax: echo", () => {
  test("should return value async", async () => {
    const result = await Ajax.echo("some data");
    expect(result).toBe("some data");
  });
  test("should return value async with promise", () => {
    return Ajax.echo("some data").then((data) => {
      expect(data).toBe("some data");
    });
  });
  test("should catch error with promise", () => {
    return Ajax.echo("some data").catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
  test("should catch error with promise", async () => {
    try {
      await Ajax.echo("some data");
    } catch (error) {
      expect(error.message).toBe("error");
    }
  });
});

describe("Ajax: GET", () => {
  let response;
  let posts;

  beforeEach(() => {
    posts = [
      {
        id: 1,
        title: "Post 1",
        completed: false,
      },
    ];
    response = {
      data: {
        posts,
      },
    };
  });
  test("should return data from backend", () => {
    axios.get.mockReturnValue(response);

    return Ajax.get().then((data) => {
      expect(data.posts).toEqual(posts);
    });
  });
});
