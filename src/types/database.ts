// ============================================================
// HKSchoolPlace — Database Types (手写版，等 Supabase 上线后用 CLI 生成覆盖)
// ============================================================

export type District =
  | "central_and_western"
  | "eastern"
  | "southern"
  | "wan_chai"
  | "kowloon_city"
  | "kwun_tong"
  | "sham_shui_po"
  | "wong_tai_sin"
  | "yau_tsim_mong"
  | "islands"
  | "kwai_tsing"
  | "north"
  | "sai_kung"
  | "sha_tin"
  | "tai_po"
  | "tsuen_wan"
  | "tuen_mun"
  | "yuen_long";

export type SchoolType = "non_profit" | "private_independent" | "international";

export type SessionType = "am" | "pm" | "whole_day" | "am_pm" | "am_whole_day" | "pm_whole_day" | "am_pm_whole_day";

export type VacancyStatus =
  | "has_vacancy"
  | "no_vacancy"
  | "waiting_list"
  | "no_information"
  | "not_offered"
  | "check_school";

export type InterviewType = "parent_child" | "child_only" | "none" | "unknown";

export type ApplicationResult = "accepted" | "waitlisted" | "rejected" | "pending";

export type IntelStatus = "pending" | "approved" | "rejected";

export type ReminderType = "deadline_7d" | "deadline_3d" | "deadline_1d";

export type ReminderStatus = "pending" | "sent" | "failed" | "cancelled";

export type DataSource = "edb" | "school" | "parent" | "inferred";

export interface School {
  id: string;
  school_code: string | null;
  name_tc: string;
  name_en: string | null;
  district: District;
  address_tc: string | null;
  address_en: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  school_type: SchoolType;
  kep_participant: boolean;
  session_type: SessionType | null;
  language_primary: string | null;
  language_secondary: string | null;
  fee_monthly_hkd: number | null;
  fee_annual_hkd: number | null;
  application_fee_hkd: number | null;
  registration_fee_hkd: number | null;
  other_fees_note: string | null;
  fee_notes: string | null;
  application_status: string | null;
  application_details: string | null;
  application_url: string | null;
  open_day_details: string | null;
  open_day_url: string | null;
  grades_offered: string[];
  data_source: DataSource;
  last_verified_at: string | null;
  last_profile_scraped_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vacancy {
  id: string;
  school_id: string;
  academic_year: string;
  n_vacancy: VacancyStatus;
  k1_vacancy: VacancyStatus;
  k2_vacancy: VacancyStatus;
  k3_vacancy: VacancyStatus;
  application_deadline: string | null;
  edb_source_url: string | null;
  edb_published_date: string | null;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdmissionIntel {
  id: string;
  school_id: string;
  user_id: string;
  academic_year: string;
  grade_applied: string;
  interview_type: InterviewType;
  interview_language: string | null;
  queue_time: string | null;
  has_second_interview: boolean | null;
  offer_month: string | null;
  application_result: ApplicationResult;
  fee_registration_hkd: number | null;
  fee_interview_hkd: number | null;
  notes: string | null;
  status: IntelStatus;
  helpful_count: number;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  preferred_districts: District[];
  child_birth_year: number | null;
  notification_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  school_id: string;
  reminder_enabled: boolean;
  reminder_days_before: number[];
  created_at: string;
  updated_at: string;
}

export interface Reminder {
  id: string;
  favorite_id: string;
  user_id: string;
  school_id: string;
  reminder_type: ReminderType;
  reminder_status: ReminderStatus;
  scheduled_date: string;
  sent_at: string | null;
  retry_count: number;
  created_at: string;
}

// ============================================================
// Supabase Database interface (for typed client)
// ============================================================

export interface IntelHelpfulVote {
  id: string;
  intel_id: string;
  user_id: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      schools: {
        Row: School;
        Insert: Partial<School> & Pick<School, "name_tc" | "district" | "school_type" | "data_source">;
        Update: Partial<School>;
      };
      vacancies: {
        Row: Vacancy;
        Insert: Partial<Vacancy> & Pick<Vacancy, "school_id" | "academic_year">;
        Update: Partial<Vacancy>;
      };
      admission_intel: {
        Row: AdmissionIntel;
        Insert: Partial<AdmissionIntel> & Pick<AdmissionIntel, "school_id" | "user_id" | "academic_year" | "grade_applied" | "interview_type" | "application_result">;
        Update: Partial<AdmissionIntel>;
      };
      users: {
        Row: User;
        Insert: Partial<User> & Pick<User, "id" | "email">;
        Update: Partial<User>;
      };
      favorites: {
        Row: Favorite;
        Insert: Partial<Favorite> & Pick<Favorite, "user_id" | "school_id">;
        Update: Partial<Favorite>;
      };
      reminders: {
        Row: Reminder;
        Insert: Partial<Reminder> & Pick<Reminder, "favorite_id" | "user_id" | "school_id" | "reminder_type" | "scheduled_date">;
        Update: Partial<Reminder>;
      };
      intel_helpful_votes: {
        Row: IntelHelpfulVote;
        Insert: Partial<IntelHelpfulVote> & Pick<IntelHelpfulVote, "intel_id" | "user_id">;
        Update: Partial<IntelHelpfulVote>;
      };
    };
    Functions: {
      increment_helpful_count: {
        Args: { p_intel_id: string };
        Returns: void;
      };
      decrement_helpful_count: {
        Args: { p_intel_id: string };
        Returns: void;
      };
    };
  };
}
