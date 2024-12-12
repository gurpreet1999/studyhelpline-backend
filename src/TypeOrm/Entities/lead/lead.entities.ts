import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

import { ClassLevel, Subject } from '../Subject&Class/Subject.entities';
import { AvailabilityDays, AvailabilityTime } from '../AvailabilityDay&Time/Availability.entities';
import { TeacherProfile } from 'src/Modules/TeacherService/Entity/teacher.entities';
import { GenderPreference, LeadStatus } from 'src/Shared/Enums/enum';
import { EmployeeProfile } from 'src/Modules/AdminService/Entity/employee.entities';
import { Address } from '../Address/Address.entites';
import { User } from '../User/User.entities';



@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;


  @ManyToOne(() => EmployeeProfile, (employee) => employee.handledLeads)
  handledByEmployeeId: EmployeeProfile

  @Column({ type: 'varchar' })
  budget: string

  @Column({ type: "enum", enum: GenderPreference })
  genderPreference: GenderPreference

  @OneToOne(() => Address, (address) => address.lead, { cascade: true })
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Subject, (subject) => subject.leads)
  subjects: Subject[];


  @Column({type:"varchar"})
  classlevel:string

  @ManyToMany(() =>AvailabilityDays, (availabilityDays) => availabilityDays.lead, { cascade: true })
  days: AvailabilityDays[]

  @ManyToMany(() => AvailabilityTime, (availabilityTime) => availabilityTime.lead, { cascade: true })
  times: AvailabilityTime[]
  

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;


  @ManyToOne(() => TeacherProfile, { nullable: true })
  @JoinColumn({ name: 'selectedTutorId' })
  selectedTutor: TeacherProfile;
  
  
  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @Column({ type: 'varchar' , nullable: true})
  teacherbookingdate:string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  feedback: string;

  @Column({ type: 'enum', enum: ['High', 'Medium', 'Low'], default: 'Medium' })
  priority: string;

  @Column({ type: 'varchar', nullable: true })
  rejectionReason: string;

  @Column({ type: 'boolean', default: false })
  isLeadClosed: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  revenueGenerated: number

  
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  refunded_amount: number

  @Column('decimal', { precision: 10, scale: 2 ,default: 0 }) 
  lead_price: number;

  // @OneToMany(() => TeacherLeadPurchase, (teacherleadpurchase) => teacherleadpurchase.lead)
  // purchases:TeacherLeadPurchase;

  @OneToMany(() => TeacherLeadActivity, (teacherleadactivity) => teacherleadactivity.lead)
  teacherActivities: TeacherLeadActivity[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lead_source: string;


  @ManyToOne(() => User, user => user.leads)
  @JoinColumn({ name: 'userId' })
  student: User;




}


@Entity("teacher_leads_activity")
export class TeacherLeadActivity{



  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeacherProfile, (teacher) => teacher.leadsActivity)
  @JoinColumn({ name: 'teacherId' })
  teacher: TeacherProfile;

 @ManyToOne(() => Lead, (lead) => lead.teacherActivities)
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column({ type: 'enum', enum: ['Interested', 'SelectedForDemo', 'Teaching', 'NotInterested', 'CompletedDemo'], default: 'NotInterested' })
  activityType: string;

  @Column({ type: 'time', nullable: true })
  teaching_start_time: string;

  @Column({ type: 'time', nullable: true })
  teaching_end_time: string;

  @Column({ type: 'text', nullable: true })
  student_feedback: string;


  @Column({ type: 'boolean', default: false })
  is_teaching_started: boolean;

  @Column({ type: 'boolean', default: false })
  isDemoAttended: boolean;


  @Column({ type: 'boolean', default: false })
  isTeacherSelected: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({type:"boolean",default:false})
  is_currently_teaching:boolean

  @Column({ type: 'date' })
  demo_date: Date;

  @Column({type:"date"})
  teaching_started:Date

  @Column({ type: 'boolean', default: false })
  isLeadPurchased: boolean;  

  @Column({ type: 'text', nullable: true })
  employeeFollowUp: string; 

  @Column({ type: 'decimal', nullable: true })
  feesFinalized: number;

  @Column({ type: 'text', nullable: true })
  teacherRemarks: string;

  @Column({ type: 'boolean', default: false })
  refundDemanded: boolean;

  @Column({ type: 'text', nullable: true })
  refundDemandedReason: string; 

  // @OneToMany(() => TeacherLeadPurchase, (purchase) => purchase.lead)
  // purchases: TeacherLeadPurchase[];

  @OneToMany(()=>TeacherLeadActivityLog,teacheractivitylog=>teacheractivitylog.teacher_lead_activity)
  logs:TeacherLeadActivityLog[]



 
}



// @Entity("lead_teacher_purchase")
// export class TeacherLeadPurchase{
//   @PrimaryGeneratedColumn()
//   id: number;


//   @Column({ type: 'varchar', length: 255, nullable: true })
//   transactionId: string;

//   @Column({ type: 'enum',  enum: ['PhonePe', 'Google Pay', 'Debit Card', 'Barcode', 'Bank Transfer', 'Wallet'], nullable: false })
//   paymentMethod: string;


//   @Column({ type: 'varchar', length: 255, nullable: true })
//   invoiceId: string;

//   @ManyToOne(() => TeacherProfile, (teacher) => teacher.purchasedLeads, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'teacherId' })
//   teacher: TeacherProfile;

//   @ManyToOne(() => Lead, (lead) => lead.purchases, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'leadId' })
//   lead: Lead;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   price: number;

//   @CreateDateColumn({ type: 'datetime' })
//   purchaseDate: Date;

//   @Column({ type: 'boolean', default: false })
//   isRefunded: boolean;

//   @Column({ type: 'text', nullable: true })
//   refundReason: string;


// }

@Entity("teacher_leads_activity_logs")
export class TeacherLeadActivityLog  {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeacherLeadActivity, (activity) => activity.logs)
  @JoinColumn({ name: 'activityId' })
  teacher_lead_activity: TeacherLeadActivity;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;



  @Column({ type: 'text' })
  action: string;


}

// notification shema 
// Refunds schema 

// this both schema i need to maintain 
// ok

// . Memberships
// Defines the available membership plans and their benefits.

// Attributes:

// membership_id (Primary Key): Unique identifier for the membership plan.
// name (String): Name of the membership (e.g., Basic, Premium, Pro).
// price (Decimal): Monthly or yearly cost of the membership.
// lead_limit (Integer): Maximum number of leads the teacher can get in a billing cycle.
// priority_access (Boolean): Indicates if the teacher gets priority access to leads.
// other_benefits (Text): Description of other advantages (e.g., Exclusive discounts, Premium support).
// validity_period (Integer): Duration of the membership (e.g., 30 days, 1 year).
// created_at (Timestamp): Record creation timestamp.
// updated_at (Timestamp): Record update timestamp

// id (Primary Key): Unique identifier for the record.
// teacher_id (Foreign Key): Links to the Teachers table.
// membership_id (Foreign Key): Links to the Memberships table.
// start_date (Timestamp): Start date of the membership.
// end_date (Timestamp): End date of the membership.
// status (Enum): Membership status (Active, Expired, Canceled).
// remaining_leads (Integer): Number of leads the teacher can still receive in the current cycle.
// created_at (Timestamp): Record creation timestamp.
// updated_at (Timestamp): Record update timestamp.

// . Lead_Allocation
// Tracks the leads allocated to teachers under a membership plan.

// Attributes:

// allocation_id (Primary Key): Unique identifier for the allocation.
// teacher_id (Foreign Key): Links to the Teachers table.
// lead_id (Foreign Key): Links to the Leads table.
// membership_id (Foreign Key): Links to the Memberships table.
// allocated_at (Timestamp): When the lead was allocated.
// is_claimed (Boolean): Indicates if the teacher has claimed the lead.
// claimed_at (Timestamp, Nullable): When the lead was claimed (if applicable).
// created_at (Timestamp): Record creation timestamp.
// updated_at (Timestamp): Record update timestamp.


// Ad_Campaigns
// Tracks details about your ad campaigns.

// Attributes:

// campaign_id (Primary Key): Unique identifier for the campaign.
// campaign_name (String): Name of the ad campaign (e.g., Google Ads - January, Facebook Spring Offer).
// platform (Enum): Platform where the ad is run (Google, Facebook, LinkedIn, etc.).
// budget (Decimal): Total budget allocated to the campaign.
// start_date (Date): When the campaign starts.
// end_date (Date): When the campaign ends.
// created_at (Timestamp): When the campaign record was created.
// updated_at (Timestamp): When the campaign record was last updated.


// Lead_Sources
// Tracks the sources from which leads are generated.

// Attributes:

// source_id (Primary Key): Unique identifier for the source.
// source_name (String): Name of the lead source (e.g., Google Ads, Organic Search, Referral, Direct).
// medium (Enum): Medium through which the lead was acquired (e.g., CPC, Email, Social Media).
// campaign_id (Foreign Key, Nullable): Links to the Ad_Campaigns table if the lead came from an ad campaign.
// created_at (Timestamp): When the source record was created.
// updated_at (Timestamp): When the source record was last updated.
