/**
 * Mock Data
 * 
 * Sample data for development and demonstration purposes.
 * Replace with real API calls in production.
 */

import type { 
  User, 
  UserTableData, 
  Notification, 
  ChartDataPoint,
  StatCard 
} from "@/types";

// ============================================================================
// Mock User Data
// ============================================================================

/** Current mock user for authentication */
export const MOCK_USER: User = {
  id: "user_1",
  email: "john.doe@example.com",
  name: "John Doe",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  role: "admin",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-06-20"),
};

/** Sample users for the users table */
export const MOCK_USERS: UserTableData[] = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date("2024-06-20"),
  },
  {
    id: "user_2",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    role: "user",
    status: "active",
    createdAt: new Date("2024-02-20"),
    lastLogin: new Date("2024-06-19"),
  },
  {
    id: "user_3",
    name: "James Chen",
    email: "james.chen@example.com",
    role: "user",
    status: "active",
    createdAt: new Date("2024-03-10"),
    lastLogin: new Date("2024-06-18"),
  },
  {
    id: "user_4",
    name: "Emma Williams",
    email: "emma.williams@example.com",
    role: "viewer",
    status: "inactive",
    createdAt: new Date("2024-03-15"),
    lastLogin: new Date("2024-05-01"),
  },
  {
    id: "user_5",
    name: "Michael Roberts",
    email: "michael.roberts@example.com",
    role: "user",
    status: "pending",
    createdAt: new Date("2024-04-01"),
  },
  {
    id: "user_6",
    name: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    role: "user",
    status: "active",
    createdAt: new Date("2024-04-10"),
    lastLogin: new Date("2024-06-20"),
  },
  {
    id: "user_7",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "admin",
    status: "active",
    createdAt: new Date("2024-04-15"),
    lastLogin: new Date("2024-06-19"),
  },
  {
    id: "user_8",
    name: "Sophie Taylor",
    email: "sophie.taylor@example.com",
    role: "viewer",
    status: "active",
    createdAt: new Date("2024-05-01"),
    lastLogin: new Date("2024-06-17"),
  },
  {
    id: "user_9",
    name: "Chris Anderson",
    email: "chris.anderson@example.com",
    role: "user",
    status: "inactive",
    createdAt: new Date("2024-05-10"),
    lastLogin: new Date("2024-06-01"),
  },
  {
    id: "user_10",
    name: "Amy Wilson",
    email: "amy.wilson@example.com",
    role: "user",
    status: "active",
    createdAt: new Date("2024-05-20"),
    lastLogin: new Date("2024-06-20"),
  },
];

// ============================================================================
// Mock Notifications
// ============================================================================

/** Sample notifications for the notification dropdown */
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_1",
    title: "New user registration",
    message: "Sarah Mitchell has signed up for an account.",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    href: "/users",
  },
  {
    id: "notif_2",
    title: "Payment received",
    message: "£299.00 payment received from TechStart UK.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "notif_3",
    title: "Server alert",
    message: "CPU usage exceeded 80% on production server.",
    type: "warning",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: "notif_4",
    title: "Weekly report ready",
    message: "Your analytics report for this week is now available.",
    type: "info",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    href: "/analytics",
  },
  {
    id: "notif_5",
    title: "Failed login attempt",
    message: "Multiple failed login attempts detected from unknown IP.",
    type: "error",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];

// ============================================================================
// Mock Chart Data
// ============================================================================

/** Revenue data for area/line charts (last 12 months) */
export const MOCK_REVENUE_DATA: ChartDataPoint[] = [
  { name: "Jan", value: 4200, secondaryValue: 2400 },
  { name: "Feb", value: 3800, secondaryValue: 2210 },
  { name: "Mar", value: 5100, secondaryValue: 2900 },
  { name: "Apr", value: 4600, secondaryValue: 2780 },
  { name: "May", value: 5400, secondaryValue: 3190 },
  { name: "Jun", value: 6200, secondaryValue: 3590 },
  { name: "Jul", value: 5800, secondaryValue: 3490 },
  { name: "Aug", value: 6800, secondaryValue: 4000 },
  { name: "Sep", value: 7200, secondaryValue: 4300 },
  { name: "Oct", value: 6900, secondaryValue: 4100 },
  { name: "Nov", value: 7800, secondaryValue: 4800 },
  { name: "Dec", value: 8400, secondaryValue: 5200 },
];

/** User growth data for bar charts */
export const MOCK_USER_GROWTH_DATA: ChartDataPoint[] = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 145 },
  { name: "Mar", value: 162 },
  { name: "Apr", value: 178 },
  { name: "May", value: 195 },
  { name: "Jun", value: 220 },
  { name: "Jul", value: 242 },
  { name: "Aug", value: 268 },
  { name: "Sep", value: 295 },
  { name: "Oct", value: 320 },
  { name: "Nov", value: 352 },
  { name: "Dec", value: 390 },
];

/** Traffic source data for pie charts */
export const MOCK_TRAFFIC_DATA: ChartDataPoint[] = [
  { name: "Direct", value: 4200 },
  { name: "Organic Search", value: 3800 },
  { name: "Social Media", value: 2400 },
  { name: "Referral", value: 1800 },
  { name: "Email", value: 1200 },
];

/** Weekly activity data */
export const MOCK_WEEKLY_ACTIVITY: ChartDataPoint[] = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 145 },
  { name: "Wed", value: 162 },
  { name: "Thu", value: 138 },
  { name: "Fri", value: 155 },
  { name: "Sat", value: 72 },
  { name: "Sun", value: 58 },
];

// ============================================================================
// Mock Dashboard Stats
// ============================================================================

/** Dashboard statistics cards */
export const MOCK_STATS: StatCard[] = [
  {
    title: "Total Revenue",
    value: "£45,231.89",
    description: "+20.1% from last month",
    trend: 20.1,
    trendDirection: "up",
    icon: "PoundSterling",
  },
  {
    title: "Subscriptions",
    value: "+2,350",
    description: "+180.1% from last month",
    trend: 180.1,
    trendDirection: "up",
    icon: "Users",
  },
  {
    title: "Sales",
    value: "+12,234",
    description: "+19% from last month",
    trend: 19,
    trendDirection: "up",
    icon: "CreditCard",
  },
  {
    title: "Active Now",
    value: "573",
    description: "+201 since last hour",
    trend: 5.2,
    trendDirection: "up",
    icon: "Activity",
  },
];

/** Recent activity items for the dashboard */
export const MOCK_RECENT_ACTIVITY = [
  {
    id: "activity_1",
    user: "Sarah Mitchell",
    action: "created a new project",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "activity_2",
    user: "James Chen",
    action: "updated team settings",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    id: "activity_3",
    user: "Emma Williams",
    action: "invited 3 new members",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: "activity_4",
    user: "Michael Roberts",
    action: "deployed to production",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "activity_5",
    user: "Lisa Thompson",
    action: "commented on a task",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  },
];

