/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */

/**
 * The state of the event.
 */
export type EventPATCHBodyState =
  typeof EventPATCHBodyState[keyof typeof EventPATCHBodyState];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventPATCHBodyState = {
  TicketSaleNotOpen: "TicketSaleNotOpen",
  Active: "Active",
  SoldOut: "SoldOut",
  Cancelled: "Cancelled",
  Occurred: "Occurred"
} as const;
