export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
  }

export enum RegistrationStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
  }


export enum UserStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    SUSPENDED = 'Suspended',
  }

  
export enum MembershipType {
    PREMIUM = 'premium',
    BASIC = 'basic',
    NONE = 'none',
  }



  export enum Days {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday',
  }

  export enum RoleType {
    admin = "admin",
    teacher = "teacher",
    student= "student",
    parent = "parent",
    staff= "staff",
  }

  export enum ClassLevels {
    PRE_SCHOOL = "Pre-School",
    PRIMARY = "Primary School",
    MIDDLE = "Middle School",
    HIGH = "High School",
    SENIOR_SECONDARY = "Higher Secondary",
    UNDERGRADUATE = "Undergraduate",
    POSTGRADUATE = "Postgraduate",
    DOCTORAL = "Doctoral",
    COMPETITIVE_EXAM = "Competitive Exam",
  }

  export enum Subjects {
    "English",
    "Hindi",
    "Mathematics",
    "Environmental Studies (EVS)",
    "Science",
    "Social Studies (Basic level)",
    "Sanskrit",
    "Gujarati",
    "Bengali",
    "Marathi",
    "General Knowledge",
    "Music & Dance",
    "Moral Science/Value Education",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Environmental Science",
    "Physical Education",
    "Psychology",
    "Accountancy",
    "Business Studies",
    "Economics",
    "Entrepreneurship",
    "History",
    "Geography",
    "Political Science",
    "Sociology",
    "Philosophy",
    "Fine Arts",
    "Biotechnology",
    "Microbiology",
    "Geology",
    "Agriculture",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Computer Science Engineering",
    "Electronics and Communication Engineering",
    "Information Technology",
    "Chemical Engineering",
    "Database Management",
    "Data Structures",
    "Computer Networks",
    "Web Development",
    "Software Engineering",
    "Operating Systems",
    "Computer Architecture",
    "Aerospace Engineering",
    "Cyber Security",
    "Cloud Computing",
    "C++",
    "Python",
    "Java",
    "Business Economics",
    "Business Statistics",
    "Financial Management",
    "Marketing Management",
    "Taxation",
    "Corporate Law",
    "Statistics"
  } 
  export enum Time {
    Morning = "Morning",
    Afternoon = "Afternoon",
    Evening = "Evening",
  }
  
 
  

  export enum TimeRange {
    EarlyMorning = "6:00-10:00",
    LateMorning = "10:00-12:00",
    EarlyAfternoon = "12:00-15:00",
    LateAfternoon = "15:00-18:00",
    EarlyEvening = "18:00-21:00",
    LateEvening = "21:00-24:00",
  }


  export enum GenderPreference {
    NO = 'no',
    MALE = 'male',
    FEMALE = 'female',
  }

  export enum LeadStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    CONTACTED = 'contacted',
    MATCHED = 'matched',
    SUCCESS = 'success',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
  }
  export enum Priority {
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low',
  }

  export enum ActivityType {
    INTERESTED = 'Interested',
    SELECTED_FOR_DEMO = 'SelectedForDemo',
    TEACHING = 'Teaching',
    NOT_INTERESTED = 'NotInterested',
    COMPLETED_DEMO = 'CompletedDemo',
  }