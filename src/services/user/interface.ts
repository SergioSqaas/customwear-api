import { Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
    name: Type.String(),
    email: Type.String(),
    address: Type.String(),
    phone: Type.String(),
});

export type UserType = Static<typeof UserSchema>;

export const UserPartialSchema = Type.Partial(UserSchema);

export type UserPartialType = Static<typeof UserPartialSchema>;

export const UserParamsSchema = Type.Object({
  UserId: Type.String(),
});

export type UserParamsType = Static<typeof UserParamsSchema>;
