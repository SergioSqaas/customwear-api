import { Static, Type } from "@sinclair/typebox";

export const TicketSchema = Type.Object({
    order: Type.Optional(Type.String()),
    user: Type.String(),
    totalAmount: Type.Optional(Type.Number()),
    status: Type.Optional(Type.String()),
});

export type TicketType = Static<typeof TicketSchema>;


export const TicketPartialSchema = Type.Partial(TicketSchema);

export type TicketPartialType = Static<typeof TicketPartialSchema>;

export const TicketParamsSchema = Type.Object({
    ticketId: Type.String(),
});

export type TicketParamsType = Static<typeof TicketParamsSchema>;
