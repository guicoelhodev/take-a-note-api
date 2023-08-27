import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput } from "../dtos/inputs/createUserInput.ts";
import { UserModel } from "../dtos/models/UserModel.ts";

@Resolver()
export class UsersResolver {
  @Query(() => String!)
  async helloWorld() {
    return "Hello World!";
  }

  @Mutation(() => UserModel!)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = {
      createdAt: data.createdAt,
      name: data.name,
    };

    return user;
  }
}
