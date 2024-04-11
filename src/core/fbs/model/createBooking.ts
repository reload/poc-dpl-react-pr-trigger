/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { Period } from "./period";

export interface CreateBooking {
  /** True if automatic forward is active for this booking */
  automaticForwardLoan: boolean;
  /** The delivery branch identifier */
  deliverBranchId: string;
  /** The minimum number of materials */
  minimumMaterials: number;
  /** Additional information about this booking */
  note?: string;
  /** The patron group ID for this booking */
  patronGroupId: number;
  period: Period;
  /** The preferred number of materials */
  preferredMaterials: number;
  /** The record ID */
  recordId: string;
  /** The branch that provides the material for booking */
  requestedFromBranchId: string;
}
