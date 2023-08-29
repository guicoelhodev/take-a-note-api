import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthGithubModel {
  @Field()
  id: string;

  @Field()
  aud: string;

  @Field()
  role: string;

  @Field()
  email: string;

  @Field()
  email_confirmed_at: string;

  @Field()
  phone: string;

  @Field()
  confirmed_at: string;

  @Field()
  last_sign_in_at: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
