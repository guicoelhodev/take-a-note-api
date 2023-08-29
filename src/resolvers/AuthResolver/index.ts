import { Arg, Mutation, Resolver } from "type-graphql";
import {
  AuthJwtInput,
  AuthProviderInput,
} from "../../dtos/inputs/AuthProviderInput.ts";
import { supabase } from "../../server.ts";
import { AuthGithubModel } from "../../dtos/models/AuthGithubModel.ts";

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

  @Mutation(() => AuthGithubModel)
  async logIn(@Arg("body") { jwtToken }: AuthJwtInput) {
    let responseData: AuthGithubModel;
    const {
      data: { user },
      error: providerUserError,
    } = await supabase.auth.getUser(jwtToken);

    if (providerUserError) {
      throw new Error(providerUserError.message);
    }

    const {
      data: userDB,
      error: usersTableError,
    } = await supabase.from("users").select("*").eq("id", user.id);

    if(usersTableError){
      throw new Error(usersTableError.message);
    }

    if (!userDB.length) {

      console.log('aqui criou')
      const { data: insertUser, error } = await supabase.from("users").insert({
        id: user.id,
        created_at: user.created_at,
        last_signed: user.updated_at,
        avatar_url: user.user_metadata.avatar_url,
        email: user.user_metadata.email,
        full_name: user.user_metadata.full_name,
        user_name: user.user_metadata.user_name,
      });

      if(error){
        throw new Error(error.message);
      }
      responseData = insertUser;
    }else {
      console.log('aqui mostrou')
      responseData = userDB[0];
    }
    
    return responseData;
  }
}
