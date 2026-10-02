import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['student', 'author', 'admin'])
export const planEnum = pgEnum('plan', ['free', 'pro'])
export const lessonTypeEnum = pgEnum('lesson_type', [
  'reading',
  'playground',
  'quiz',
  'project',
])
export const publishStatusEnum = pgEnum('publish_status', [
  'draft',
  'review',
  'published',
  'archived',
])
export const submissionStatusEnum = pgEnum('submission_status', [
  'queued',
  'running',
  'passed',
  'failed',
  'error',
])

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  externalId: uuid('external_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: userRoleEnum('role').notNull().default('student'),
  plan: planEnum('plan').notNull().default('free'),
  xp: integer('xp').notNull().default(0),
  streak: integer('streak').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  language: text('language').notNull(),
  difficulty: text('difficulty').notNull(),
  status: publishStatusEnum('status').notNull().default('draft'),
  version: integer('version').notNull().default(1),
  isFree: integer('is_free').notNull().default(1),
})

export const modules = pgTable('modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id')
    .notNull()
    .references(() => courses.id),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  order: integer('order').notNull(),
})

export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  moduleId: uuid('module_id')
    .notNull()
    .references(() => modules.id),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  type: lessonTypeEnum('type').notNull(),
  order: integer('order').notNull(),
})

export const challenges = pgTable('challenges', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  language: text('language').notNull(),
  difficulty: text('difficulty').notNull(),
  lessonSlug: text('lesson_slug'),
})

export const challengeSpecs = pgTable('challenge_specs', {
  challengeId: uuid('challenge_id')
    .primaryKey()
    .references(() => challenges.id),
  specYaml: text('spec_yaml').notNull(),
})

export const submissions = pgTable('submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  challengeId: uuid('challenge_id')
    .notNull()
    .references(() => challenges.id),
  code: text('code').notNull(),
  status: submissionStatusEnum('status').notNull().default('queued'),
  publicResult: jsonb('public_result'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const progress = pgTable(
  'progress',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    lessonSlug: text('lesson_slug'),
    challengeSlug: text('challenge_slug'),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    bestScore: integer('best_score'),
    attempts: integer('attempts').notNull().default(0),
  },
  (table) => [uniqueIndex('progress_user_lesson_idx').on(table.userId, table.lessonSlug)],
)

export const certificates = pgTable('certificates', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  courseId: uuid('course_id')
    .notNull()
    .references(() => courses.id),
  issuedAt: timestamp('issued_at', { withTimezone: true }).notNull().defaultNow(),
  publicHash: text('public_hash').notNull().unique(),
})

export const aiCalls = pgTable('ai_calls', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  challengeId: uuid('challenge_id').references(() => challenges.id),
  kind: text('kind').notNull(),
  tokens: integer('tokens'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
