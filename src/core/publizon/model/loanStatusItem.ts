/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Publizon Library API
 * Pubhub exists in two separate environments, each with their own server, code and database. Please use the web service located at library-api.qa.pubhub.dk when developing and testing.
Orders/loans created in test environment will not be invoiced. Please request a new license key for the production environment when you're ready to go live.
 * OpenAPI spec version: 1
 */
import type { ContentLoanStatusEnum } from "./contentLoanStatusEnum";

export interface LoanStatusItem {
  loanStatus?: ContentLoanStatusEnum;
  onChecklist?: boolean;
  identifier?: string | null;
}
