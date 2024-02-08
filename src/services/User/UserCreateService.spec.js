const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")
const AppError = require("../../utils/AppError")

describe("UserCreateService", () => {
    let userRepositoryInMemory = null
    let userCreateService = null

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })

    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123456",
            confirmPassword: "123456"
        }

        const userCreated = await userCreateService.execute(user)
        expect(userCreated).toHaveProperty("id")
    })

    it("user not should be created with exists email", async () => {
        const user1 = {
            name: "User Test",
            email: "user@test.com",
            password: "123456",
            confirmPassword: "123456"
        }

        const user2 = {
            name: "User Test",
            email: "user@test.com",
            password: "123456",
            confirmPassword: "123456"
        }

        await userCreateService.execute(user1)
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."))
    })

    it("user password must be at least 6 characters long", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123",
            confirmPassword: "123"
        }

        await expect(userCreateService.execute(user)).rejects.toEqual(new AppError("A senha deve ter no mínimo 6 caracteres. Por favor, escolha uma senha mais longa."))
    })

    it("password and confirmPassword must match", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123456",
            confirmPassword: "123"
        }

        await expect(userCreateService.execute(user)).rejects.toEqual(new AppError("As senhas não coincidem. Por favor, verifique e tente novamente."))
    })
})