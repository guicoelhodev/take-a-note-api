import { Arg, Mutation, Resolver } from "type-graphql";
import { AuthProviderInput } from "../dtos/inputs/AuthProviderInput.ts";
import { supabase } from "../server.ts";

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean!)
  async logIn(@Arg('body') { provider }: AuthProviderInput) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    })

    if(error) {
      throw new Error(error.message)
    }

    console.log(data)
    return true;
  }
}