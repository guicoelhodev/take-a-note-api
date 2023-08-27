import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  name: String;

  @Field()
  id: String;

  @Field()
  createdAt: Date;
}
