import { Field, InputType } from "type-graphql";
import { Allow} from 'class-validator'

@InputType()
export class AuthProviderInput {
  @Field()
  @Allow()
  provider: 'github';
}