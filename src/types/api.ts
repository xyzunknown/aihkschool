// ============================================================
// HKSchoolPlace — API Types (Request/Response)
// ============================================================

import type { School, Vacancy, AdmissionIntel, Favorite, District, SchoolType } from "./database";

// ---- Generic Response Wrappers ----

export interface ListResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
}

export interface SingleResponse<T> {
  data: T;
}

export interface MutationResponse {
  success: true;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = SingleResponse<T> | ErrorResponse;
export type ApiListResponse<T> = ListResponse<T> | ErrorResponse;
export type ApiMutationResponse = MutationResponse | ErrorResponse;

// ---- School List Filters ----

export interface SchoolListParams {
  district?: District[];
  type?: SchoolType;
  language?: string;
  session?: string;
  has_vacancy?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

// ---- School with Vacancy (joined for list) ----

export interface SchoolWithVacancy extends School {
  current_vacancy: Vacancy | null;
}

// ---- Intel with School Name ----

export interface IntelWithSchool extends AdmissionIntel {
  school_name_tc?: string;
  school_name_en?: string;
}

// ---- Favorite with School & Vacancy ----

export interface FavoriteWithSchool extends Favorite {
  school: School;
  current_vacancy: Vacancy | null;
}

// ---- Helpful Vote ----

export interface HelpfulVote {
  intel_id: string;
  user_id: string;
}
