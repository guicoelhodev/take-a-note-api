import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthGithubModel {
  @Field()
  id: string;

  @Field()
  created_at: string

  @Field()
  last_signed: string

 @Field()
  avatar_url: string;

  @Field()
  email: string;

  @Field()
  full_name: string;

  @Field()
  user_name: string;
}
