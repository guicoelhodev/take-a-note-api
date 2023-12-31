import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { supabase } from "../../server.ts";
import { AuthGithubModel } from "../../dtos/models/AuthGithubModel.ts";
import { AuthProviders } from "../../types/Auth";

@Resolver()
export class AuthResolver {
  @Query(() => String!)
  async hello() {
    return "Hello World!";
  }

  @Mutation(() => String!)
  async sendJwtToken(@Arg("provider") provider: AuthProviders) {
    const response = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        scopes: provider === "github" ? "read:user" : "",
        redirectTo: `http://localhost:3000/login?provider=${provider}`,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data.url;
  }

  @Mutation(() => AuthGithubModel)
  async logIn(@Arg("jwtToken") jwtToken: string) {
    let responseData: AuthGithubModel;
    const {
      data: { user },
      error: providerUserError,
    } = await supabase.auth.getUser(jwtToken);

    if (providerUserError) {
      throw new Error(providerUserError.message);
    }

    const { data: userDB, error: usersTableError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id);

    if (usersTableError) {
      throw new Error(usersTableError.message);
    }

    if (!userDB.length) {
      const { data: insertUser, error } = await supabase.from("users").insert({
        id: user.id,
        created_at: user.created_at,
        last_signed: user.updated_at,
        avatar_url: user.user_metadata.avatar_url,
        email: user.user_metadata.email,
        full_name: user.user_metadata.full_name,
        user_name: user.user_metadata.user_name,
      });

      // google provider return name intead of user_name

      if (error) {
        throw new Error(error.message);
      }

      console.log("aqui criou");
      responseData = insertUser;
    } else {
      console.log("aqui mostrou");
      responseData = userDB[0];
    }

    console.log(responseData);
    return responseData;
  }
}
