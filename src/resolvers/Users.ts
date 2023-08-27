import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserModel } from "../dtos/models/UserModel.ts";
import { CreateUserInput } from "../dtos/inputs/CreateUserInput.ts";

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
