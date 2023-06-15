import { Static, Type } from "@sinclair/typebox";

export const ProductSchema = Type.Object({
    type: Type.String(),
    urlImage: Type.String(),
    promptDescription: Type.String(),
    price: Type.Optional(Type.Number()),
    stock: Type.Optional(Type.Number()),
});

export type ProductType = Static<typeof ProductSchema>;


export const ProductPartialSchema = Type.Partial(ProductSchema);

export type ProductPartialType = Static<typeof ProductPartialSchema>;

export const ProductParamsSchema = Type.Object({
    productId: Type.String(),
});

export type ProductParamsType = Static<typeof ProductParamsSchema>;
