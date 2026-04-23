// ============================================================
// HKSchoolPlace — Stable database type exports
// `database.generated.ts` is the only file that codegen overwrites.
// ============================================================
import type { Database as GeneratedDatabase } from "./database.generated";

export type {
  CompositeTypes,
  Enums,
  Json,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "./database.generated";

export type Database = GeneratedDatabase;

export type School = GeneratedDatabase["public"]["Tables"]["schools"]["Row"];
export type Vacancy = GeneratedDatabase["public"]["Tables"]["vacancies"]["Row"];
export type AdmissionIntel = GeneratedDatabase["public"]["Tables"]["admission_intel"]["Row"];
export type User = GeneratedDatabase["public"]["Tables"]["users"]["Row"];
export type Favorite = GeneratedDatabase["public"]["Tables"]["favorites"]["Row"];
export type Reminder = GeneratedDatabase["public"]["Tables"]["reminders"]["Row"];
export type LcsdProgramme = GeneratedDatabase["public"]["Tables"]["lcsd_programmes"]["Row"];
export type LcsdProgrammeStatus = GeneratedDatabase["public"]["Tables"]["lcsd_programme_status"]["Row"];
export type ProgrammeSubscription = GeneratedDatabase["public"]["Tables"]["programme_subscriptions"]["Row"];
export type ProgrammeReminder = GeneratedDatabase["public"]["Tables"]["programme_reminders"]["Row"];
export type AppFeatureFlag = GeneratedDatabase["public"]["Tables"]["app_feature_flags"]["Row"];
export type CronRunLog = GeneratedDatabase["public"]["Tables"]["cron_run_logs"]["Row"];
export type Activity = GeneratedDatabase["public"]["Tables"]["activities"]["Row"];
export type SchoolEnrichment = GeneratedDatabase["public"]["Tables"]["school_enrichments"]["Row"];
export type SchoolAlias = GeneratedDatabase["public"]["Tables"]["school_aliases"]["Row"];
export type IntelHelpfulVote = GeneratedDatabase["public"]["Tables"]["intel_helpful_votes"]["Row"];
export type District = NonNullable<School["district"]>;
export type SchoolType = School["school_type"];
export type SessionType = NonNullable<School["session_type"]>;
export type VacancyStatus = Vacancy["n_vacancy"];
export type InterviewType = AdmissionIntel["interview_type"];
export type ApplicationResult = AdmissionIntel["application_result"];
export type IntelStatus = AdmissionIntel["status"];
export type ReminderType = Reminder["reminder_type"];
export type ReminderStatus = Reminder["reminder_status"];
export type DataSource = School["data_source"];
export type ProgrammeCategory = NonNullable<LcsdProgramme["category"]>;
export type ProgrammeReminderType = ProgrammeReminder["reminder_type"];
export type ProgrammeReminderStatus = ProgrammeReminder["status"];
export type ProgrammeEnrolmentStatus = LcsdProgrammeStatus["enrolment_status"];
export type CronRunStatus = CronRunLog["status"];
export type ActivityCategory = Activity["category"];
export type MatchConfidence = NonNullable<Activity["match_confidence"]>;
export type ActivitySource = Activity["source"];
export type AliasType = SchoolAlias["alias_type"];
