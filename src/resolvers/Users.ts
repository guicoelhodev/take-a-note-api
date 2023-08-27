import { Query, Resolver } from "type-graphql";

@Resolver()
export class UsersResolver {
  @Query(() => String!)
  async helloWorld() {
    return "Hello World!";
  }
}
