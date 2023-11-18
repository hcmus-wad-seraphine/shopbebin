import { getUsers } from ".";

describe("users query", () => {
    test("get users", async () => {
        const users = await getUsers();
        expect(users).toBeInstanceOf(Array);
    });
});
