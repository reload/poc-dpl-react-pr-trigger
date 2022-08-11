/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { Address } from "./address";
import type { BlockStatus } from "./blockStatus";
import type { Period } from "./period";

export interface Patron {
  address?: Address;
  /** True if the user is allowed to create bookings. */
  allowBookings?: boolean;
  birthday?: string;
  /** A list of block statuses -
 if the patron is not blocked then this value is empty or null */
  blockStatus?: BlockStatus[];
  coAddress?: Address;
  /** Length of default interest period in days */
  defaultInterestPeriod: number;
  emailAddress?: string;
  name?: string;
  onHold?: Period;
  /** Patron identifier to be used in subsequent service calls involving the patron */
  patronId: number;
  phoneNumber?: string;
  /** ISIL of preferred pickup branch */
  preferredPickupBranch: string;
  receiveEmail: boolean;
  /** This field is deprecated and is no longer used */
  receivePostalMail: boolean;
  receiveSms: boolean;
  /** True if the user is resident in the same municipality as the library */
  resident: boolean;
}