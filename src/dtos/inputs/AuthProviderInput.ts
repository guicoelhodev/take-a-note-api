import { Field, InputType } from "type-graphql";
import { Allow, IsJWT } from "class-validator";

@InputType()
export class AuthProviderInput {
  @Field()
  @Allow()
  provider: "github";
}

@InputType()
export class AuthJwtInput {
  @Field()
  @IsJWT()
  jwtToken: string;
}
