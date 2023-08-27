import { Field, ObjectType } from "type-graphql";

// Só são os campos que o frontEnd poderá consumir

@ObjectType()
export class UserModel {
  @Field()
  name: String;

  @Field()
  id: String;
}
