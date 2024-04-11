/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { PeriodicalReservation } from "./periodicalReservation";

export interface CreateReservation {
  /** The date where the patron is no longer interested in the reserved material.
 If not set, a date will be calculated from the agency default interest period */
  expiryDate?: string;
  periodical?: PeriodicalReservation;
  /** ISIL-number of pickup branch.
 If not set, will default to patrons preferred pickup branch */
  pickupBranch?: string;
  /** Identifies the bibliographical record to reserve - The FAUST number */
  recordId: string;
}
