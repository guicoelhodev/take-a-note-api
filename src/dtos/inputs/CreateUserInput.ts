import { Field, InputType } from "type-graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @MinLength(3)
  name: String;
}
