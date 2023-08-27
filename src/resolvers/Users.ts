import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserModel } from "../dtos/models/UserModel.ts";
import { CreateUserInput } from "../dtos/inputs/CreateUserInput.ts";
import { supabase } from "../server.ts";
import { randomUUID } from "crypto";

@Resolver()
export class UsersResolver {
  @Query(() => [UserModel]!)
  async users() {
    const { data, error } = await supabase.from("notes").select("*");

    return data;
  }

  @Mutation(() => UserModel!)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user: UserModel = {
      name: data.name,
      id: randomUUID(),
    };

    const { error } = await supabase.from("notes").insert(user);

    if (error) {
      throw new Error(error.message);
    }

    return user;
  }
}
