enum AUDITTYPES {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
enum PERMISSIONTYPES {
  READ = 'read',
  WRITE = 'write',
}

enum USERSTATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  BLOCKED = 'blocked',
  PENDING = 'pending',
  INVITED = 'invited',
  ONBOARDED = 'onboarded',
}

enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
  THERAPIST = 'therapist',
}

enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  NONBINARY = 'non-binary',
  NOPREFRENCE = 'No preference',
}

enum REALTIONSTATUS {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  INRELATION = 'In-relation',
}
enum SESSIONTYPE {
  INDIVIDUAL_90 = 'individual 90 mins',
  INDIVIDUAL_45 = 'individual 45 mins',
  COUPLE_90 = 'couple 90 mins',
  DISCOVERYCALL = 'discovery call',
}

enum BOOKINGSTATUS {
  BOOKED = 'booked',
  RESCHEDULE_REQUESTED = 'reschedule requested',
  RESCHEDULED = 'rescheduled',
  MISSED = 'missed',
  COMPLETED = 'completed',
  THEREPIST_NO_SHOW = 'therapist no show',
}

enum MOODANDEMOTION {
  MOOD = 'mood',
  EMOTION = 'emotion',
}
enum SESSIONSTATUS {
  PENDING = 'pending',
  BOOKED = 'booked',
}
enum WORKSTATUS {
  SELFEMPLOYED = 'Self-employed',
  ENTREPRENEUR = 'Entreoreneur',
  STUDENT = 'Student',
  UNEMPLOYED = 'Unemployed',
  LOOKINGFORAJOB = 'Looking for job',
  EMPLOYED = 'Employed',
}

enum AFFIRMATIONSTATUS {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

enum PRONOUNS {
  HE_HIM = 'he/him',
  SHE_HER = 'she/her',
  THEY_THEM = 'they/them',
  OTHER = 'other',
}

enum THERAPISTROLE {
  CounsellingPsychologist = 'Counselling Psychologist',
  ClinicalPsychologist = 'Clinical Psychologist ',
  Psychotherapist = 'Psychotherapist',
  Psychiatrist = 'Psychiatrist',
  CareerCounsellor = 'Career Counsellor',
  AlternateTherapyPractitioner = 'Alternate Therapy Practitioner',
  RehabilitationPsychologist = 'Rehabilitation Psychologist ',
}
enum THERAPISTPREFEREDLANGUAGES {
  NOPREFRENCE = 'No prefrence',
  HINDI = 'Hindi',
  ENGLISH = 'English',
  TAMIL = 'Tamil',
}

enum WHATBRINGSYOUHERETODAY {
  ADDICTION = 'Addiction',
  ANGER_OR_AGGRESSION = 'Anger or Aggression',
  ANXIETY = 'Anxiety',
  CAREER_OR_WORK_ISSUES = 'Career/Work-related Issues',
  CHRONIC_HEALTH_ISSUES = 'Chronic Health Issues',
  DEPRESSION = 'Depression',
  FAMILY_ISSUES = 'Family Issues',
  GRIEF_OR_LOSS = 'Grief/Loss',
  LIFE_TRANSITIONS = 'Life Transitions',
  PARENTING_ISSUES = 'Parenting Issues',
  PRE_POST_PREGNANCY = 'Pre/Post Pregnancy',
  RELATIONSHIP_ISSUES = 'Relationship Issues',
  SELF_ESTEEM_OR_SELF_WORTH = 'Self-esteem or Self-worth Issues',
  SEXUAL_OR_GENDER_IDENTITY_ISSUES = 'Sexual or Gender Identity Issues',
  STRESS = 'Stress',
  TRAUMA = 'Trauma',
}

enum SPECIFICGOALS {
  REDUCE_WORRY_OR_NERVOUSNESS = 'Reduce Worry or Nervousness',
  BOOST_SELF_CONFIDENCE = 'Boost Self-confidence',
  HANDLE_DAILY_PRESSURES = 'Handle Daily Pressures',
  IMPROVE_PERSONAL_RELATIONSHIPS = 'Improve Personal Relationships',
  DEAL_WITH_LOSS_AND_SADNESS = 'Deal with Loss & Sadness',
  HEAL_FROM_PAST_TRAUMA = 'Heal from Past Trauma',
  MANAGE_ANGER = 'Manage Anger',
  DEAL_WITH_LIFE_CHANGES = 'Deal with Life Changes',
  HANDLE_WORK_PROBLEMS = 'Handle Work Problems',
  QUIT_ADDICTIVE_BEHAVIOURS = 'Quit Addictive Behaviours',
  STRENGTHEN_FAMILY_TIES = 'Strengthen Family Ties',
  IMPROVE_FOCUS_AND_ORGANISATION = 'Improve Focus & Organisation',
  MANAGE_OBSESSIVE_THOUGHTS = 'Manage Obsessive Thoughts',
  STABILISE_MOOD_SWINGS = 'Stabilise Mood Swings',
  REDUCE_IMPULSIVE_BEHAVIOURS = 'Reduce Impulsive Behaviours',
}

enum SIGNS {
  DIFFICULTY_FOCUSING_OR_PAYING_ATTENTION = 'Difficulty Focusing or Paying Attention',
  SLEEP_DIFFICULTIES_OR_FREQUENT_NIGHTMARES = 'Sleep Difficulties or Frequent Nightmares',
  CHANGE_IN_APPETITE_OR_EATING_HABITS = 'Change in Appetite or Eating Habits',
  FEELING_SAD_OR_HOPELESS = 'Feeling Sad or Hopeless',
  FREQUENT_IRRITATION_OR_ANGER = 'Frequent Irritation or Anger',
  SUDDEN_PANIC_OR_INTENSE_FEAR = 'Sudden Panic or Intense Fear',
  AVOIDING_SOCIAL_INTERACTIONS = 'Avoiding Social Interactions',
  USING_ALCOHOL_OR_OTHER_SUBSTANCES_FREQUENTLY = 'Using Alcohol/Other Substances Frequently',
  THOUGHTS_OF_SELF_HARM_OR_SUICIDE = 'Thoughts of Self-harm or Suicide',
  PERSISTENT_UNWANTED_THOUGHTS_OR_URGES = 'Persistent Unwanted Thoughts or Urges',
  IMPULSIVE_OR_RISKY_BEHAVIOURS = 'Impulsive or Risky Behaviours',
  EXTREME_MOOD_SWINGS = 'Extreme Mood Swings',
  REPETITIVE_UNCONTROLLED_BEHAVIOURS = 'Repetitive Uncontrolled Behaviours',
  DIFFICULTY_MAINTAINING_RELATIONSHIPS = 'Difficulty Maintaining Relationships',
  RAPID_CHANGES_IN_SELF_IMAGE = 'Rapid Changes in Self-image',
}

enum SESSIONTYPEPREFERENCE {
  INDIVIDUAL_THERAPY = 'Individual Therapy',
  COUPLE_THERAPY = 'Couple Therapy',
}

enum BACKGROUNDTRACKSTATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

enum MOODANDEMOTIONTYPE {
  VERY_UNPLEASANT = 'Very Unpleasant',
  UNPLEASANT = 'Unpleasant',
  SLIGHTLY_UNPLEASANT = 'Slightly Unpleasant',
  NEUTRAL = 'Neutral',
  SLIGHTLY_PLEASANT = 'Slightly Pleasant',
  PLEASANT = 'Pleasant',
  VERY_PLEASANT = 'Very Pleasant',
}
enum OFFERTYPES {
  BUNDLE = 'bundle',
  OFFER = 'offer',
}

enum OFFERDISCOUNTTYPES {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

enum OFFERSTATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

enum ACTIVITYLOGTYPE {
  SESSION = 'Session',
  PAYMENT = 'Payment',
}

enum BOOKINGSTATUSETYPE {
  BOOKED = 'booked',
  RESCHEDULE_REQUESTED = 'rescheduleRequest',
  RESCHEDULED = 'reschedule',
  MISSED = 'missed',
  COMPLETED = 'completed',
  THEREPIST_NO_SHOW = 'therapistNoShow',
}

enum ISSUETYPE {
  PAYMENT_RELATED = 'paymentRelated',
  BOOKING_OR_SESSION_RELATED = 'bookingOrSessiOnRelated',
  THERAPIST_CONCERN = 'therapistConcern',
  TECHNICAL_ISSUE = 'technicalIssue',
}

enum PAYMENT_RELATED {
  PAYMENT_FAILED = 'paymentFailed',
  INCORRECT_CHARGER = 'incorrectCharger',
  PAYMENT_DISPERENCIES = 'paymentDisperancies',
  REFUND_REQUEST = 'refundRequest',
  OTHER = 'other',
}

enum THERAPIST_CONCERN {
  INAPPROPRIATE_BEHAVIOR_BY_THERAPIST = 'inappropriateBehaviorByTherapist',
  BREACH_OF_CONFIDENTIALITY = 'breachOfConfidentiality',
  THERAPIST_ASKING_TO_BOOK_SESSIONS_OUTSIDE_HUMANN = 'therapistAskingToBookSessionsOutsideHumann',
  REQUESTING_CONTACT_OUTSIDE_PLATFORM = 'requestingContactOutsidePlatform',
  PROMOTING_OTHER_BUSINESSES_DURING_SESSIONS = 'promotingOtherBusinessesDuringSessions',
  OTHER = 'other',
}

enum BOOKING_OR_SESSION_RELATED {
  UNABLE_TO_BOOK_SESSION = 'unableToBookSession',
  THERAPIST_DID_NOT_SHOW_UP = 'therapistDidNotShowUp',
  SESSION_RESCHEDULING_PROBLEMS = 'sessionReschedulingProblems',
  SESSION_CANCELLATION_PROBLEMS = 'sessionCancellationProblems',
  UNABLE_JOIN_SESSION = 'unableJoinSession',
  TECHNICAL_ISSUES_DURING_SESSION = 'technicalIssuesDuringSession',
  WANT_REMATCH_WITH_SUITABLE_THERAPISTS = 'wantRematchWithSuitableTherapists',
}

enum TECHNICAL_ISSUE {
  MOOD_TRACKER_FEATURE_NOT_WORKING = 'moodTrackerFeatureNotWorking',
  NOTIFICATIONS_NOT_WORKING = 'notificationsNotWorking',
  ANY_OTHER_FEATURE_NOT_WORKING = 'anyOtherFeatureNotWorking',
}

enum ISSUE_STATUS {
  PENDING = 'pending',
  SOLVED = 'solved',
}

enum MODALTIY {
  ACCEPTANCEANDCOMMITMENTTHERAPY = 'Acceptance and Commitment Therapy (ACT)',
  ATTACHMENTFOCUSEDTHERAPY = 'Attachment Focused Therapy',
  INTERPERSONALTHERAPY = 'Interpersonal Therapy (IPT)',
  PERSONCENTREDTHERAPY = 'Person Centred Therapy',
  COGNITIVEBEHAVIOURALTHERAPY = 'Cognitive Behavioural Therapy (CBT)',
  COMPASSIONFOCUSEDTHERAPY = 'Compassion Focused Therapy (CFT)',
  DANCEMOVEMENTTHERAPY = 'Dance Movement Therapy',
  DIALECTICALBEHAVIOURTHERAPY = 'Dialectical Behaviour Therapy (DBT)',
  EMOTIONFOCUSEDTHERAPY = 'Emotion Focused Therapy',
  EXISTENTIALTHERAPY = 'Existential Therapy',
  EYEMOVEMENTDESENSITISATIONREPROCESSING = 'Eye Movement Desensitisation Reprocessing (EMDR)',
  FAMILYSYSTEMSTHERAPY = 'Family Systems Therapy',
  GESTALTTHERAPY = 'Gestalt Therapy',
  HUMANISTICTHERAPY = 'Humanistic Therapy',
  HYPNOTHERAPY = 'Hypnotherapy',
  COUPLESTHERAPY = 'Couples Therapy',
  ECLECTICTHERAPY = 'Eclectic Therapy',
  MINDFULNESSBASEDCOGNITIVETHERAPY = 'Mindfulness-Based Cognitive Therapy (MBCT)',
  NARRATIVETHERAPY = 'Narrative Therapy',
  PSYCHOANALYTICPSYCHODYNAMICTHERAPY = 'Psychoanalytic/Psychodynamic Therapy',
  RATIONALEMOTIVEBEHAVIOURALTHERAPY = 'Rational Emotive Behavioural Therapy (REBT)',
  SOLUTIONFOCUSEDBRIEFTHERAPY = 'Solution Focused Brief Therapy - SFBT',
  TRANSACTIONALANALYSIS = 'Transactional Analysis',
  EXPRESSIVEARTSTHERAPY = 'Expressive Arts Therapy',
  MUSICTHERAPY = 'Music Therapy',
  INTEGRATIVEORHOLISTICPSYCHOTHERAPY = 'Integrative or Holistic Psychotherapy',
  REIKIANDENERGYWORK = 'Reiki and Energy Work',
  TRANSPERSONALPSYCHOLOGY = 'Transpersonal Psychology',
  EMOTIONALFREEDOMTECHNIQUE = 'Emotional Freedom Technique (EFT)',
  PASTLIFEREGRESSION = 'Past Life Regression',
  HOOPONOPONO = "Ho'oponopono",
  PLAYTHERAPY = 'Play Therapy',
}

export {
  AUDITTYPES,
  PERMISSIONTYPES,
  USERSTATUS,
  ROLE,
  GENDER,
  REALTIONSTATUS,
  SESSIONTYPE,
  BOOKINGSTATUS,
  MOODANDEMOTION,
  SESSIONSTATUS,
  WORKSTATUS,
  AFFIRMATIONSTATUS,
  PRONOUNS,
  THERAPISTROLE,
  THERAPISTPREFEREDLANGUAGES,
  WHATBRINGSYOUHERETODAY,
  SPECIFICGOALS,
  SIGNS,
  SESSIONTYPEPREFERENCE,
  BACKGROUNDTRACKSTATUS,
  MOODANDEMOTIONTYPE,
  OFFERTYPES,
  OFFERDISCOUNTTYPES,
  OFFERSTATUS,
  ACTIVITYLOGTYPE,
  BOOKINGSTATUSETYPE,
  ISSUETYPE,
  PAYMENT_RELATED,
  THERAPIST_CONCERN,
  BOOKING_OR_SESSION_RELATED,
  TECHNICAL_ISSUE,
  ISSUE_STATUS,
  MODALTIY,
};
