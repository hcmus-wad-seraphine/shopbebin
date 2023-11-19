import { User } from "@prisma/client";
import {
    createUser,
    getUserByEmail,
    getUserByPhone,
    updateUser,
    deleteUser,
} from ".";

describe("users query flow", () => {
    const randomEmail = Math.random().toString(36).substring(7);

    let user: User = {
        id: "",
        email: randomEmail + "@shopbebin.com",
        phone: "0123456789",
        addresses: [
            {
                unit_number: "123A",
                street: "Ho Tung Mau",
                district: "Quan 1",
                city: "Ho Chi Minh",
            },
        ],
    };

    test("create user", async () => {
        await createUser({
            email: user.email,
            phone: user.phone,
            addresses: user.addresses,
        });
        const createdUser = await getUserByEmail(user.email);
        expect(createdUser).not.toBeNull();
        user = createdUser!;
    });

    test("get user by email", async () => {
        const foundUser = await getUserByEmail(user.email);
        expect(foundUser).not.toBeNull();
        expect(foundUser).toEqual(user);
    });

    test("get user by phone", async () => {
        const foundUser = await getUserByPhone(user.phone);
        expect(foundUser).not.toBeNull();
        expect(foundUser).toEqual(user);
    });

    test("update user", async () => {
        const newEmail = Math.random().toString(36).substring(7);
        user.email = newEmail + "@shopbebin.com";
        await updateUser(user);
        const updatedUser = await getUserByEmail(user.email);
        expect(updatedUser).not.toBeNull();
        expect(updatedUser).toEqual(user);
    });

    test("delete user", async () => {
        await deleteUser(user.id);
        const deletedUser = await getUserByEmail(user.email);
        expect(deletedUser).toBeNull();
    });
});