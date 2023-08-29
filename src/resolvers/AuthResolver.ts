import { Arg, Mutation, Resolver } from "type-graphql";
import {
  AuthJwtInput,
  AuthProviderInput,
} from "../dtos/inputs/AuthProviderInput.ts";
import { supabase } from "../server.ts";
import { AuthGithubModel } from "../dtos/models/AuthGithubModel.ts";

@Resolver()
export class AuthResolver {
  @Mutation(() => String!)
  async sendJwtToken(@Arg("body") { provider }: AuthProviderInput) {
    const response = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        scopes: "read:user",
        redirectTo: "http://localhost:3000/login",
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data.url;
  }

  @Mutation(() => AuthGithubModel!)
  async logIn(@Arg("body") { jwtToken }: AuthJwtInput) {
    const { data, error } = await supabase.auth.getUser(jwtToken);

    return data.user;
  }
}
