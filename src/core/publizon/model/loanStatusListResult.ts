/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * Publizon Library API
 * Pubhub exists in two separate environments, each with their own server, code and database. Please use the web service located at library-api.qa.pubhub.dk when developing and testing.
Orders/loans created in test environment will not be invoiced. Please request a new license key for the production environment when you're ready to go live.
 * OpenAPI spec version: 1
 */
import type { ApiResponseCode } from "./apiResponseCode";
import type { LoanStatusItem } from "./loanStatusItem";

export interface LoanStatusListResult {
  code?: ApiResponseCode;
  /** @nullable */
  items?: LoanStatusItem[] | null;
  /** @nullable */
  message?: string | null;
}
