// Hardcoded users data with new hierarchy
export const users = [
  // CEO
  {
    id: 1,
    name: "Minan",
    email: "minan@abstractgroup.com",
    password: "123",
    role: "ceo",
    department: "Executive"
  },
  // COO
  {
    id: 2,
    name: "Rashmi",
    email: "rashmi@abstractgroup.com",
    password: "123",
    role: "coo",
    department: "Executive"
  },
  // L2 Managers
  {
    id: 3,
    name: "Anjali",
    email: "anjali@abstractgroup.com",
    password: "123",
    role: "manager_l2",
    department: "Management"
  },
  {
    id: 4,
    name: "Rohan",
    email: "rohan@abstractgroup.com",
    password: "123",
    role: "manager_l2",
    department: "Management"
  },
  // L1 Managers
  {
    id: 5,
    name: "Deepak",
    email: "deepak@abstractgroup.com",
    password: "123",
    role: "manager_l1",
    department: "Management"
  },
  {
    id: 6,
    name: "Kavita",
    email: "kavita@abstractgroup.com",
    password: "123",
    role: "manager_l1",
    department: "Management"
  },
  {
    id: 7,
    name: "Simran",
    email: "simran@abstractgroup.com",
    password: "123",
    role: "manager_l1",
    department: "Management"
  },
  // IT Persons
  {
    id: 8,
    name: "Rahul",
    email: "rahul@abstractgroup.com",
    password: "123",
    role: "it_person",
    department: "IT"
  },
  {
    id: 9,
    name: "Sneha",
    email: "sneha@abstractgroup.com",
    password: "123",
    role: "it_person",
    department: "IT"
  },
  {
    id: 10,
    name: "Amit",
    email: "amit@abstractgroup.com",
    password: "123",
    role: "it_person",
    department: "IT"
  },
  {
    id: 11,
    name: "Vikas",
    email: "vikas@abstractgroup.com",
    password: "123",
    role: "it_person",
    department: "IT"
  },
  // Employees
  {
    id: 12,
    name: "Tara",
    email: "tara@abstractgroup.com",
    password: "123",
    role: "employee",
    department: "Operations"
  },
  {
    id: 13,
    name: "Alex",
    email: "alex@abstractgroup.com",
    password: "123",
    role: "employee",
    department: "Operations"
  },
  {
    id: 14,
    name: "Radha",
    email: "radha@abstractgroup.com",
    password: "123",
    role: "employee",
    department: "Operations"
  },
  {
    id: 15,
    name: "Neha",
    email: "neha@abstractgroup.com",
    password: "123",
    role: "employee",
    department: "Operations"
  },
  {
    id: 16,
    name: "Priya",
    email: "priya@abstractgroup.com",
    password: "123",
    role: "employee",
    department: "Operations"
  }
];

// Categories and subcategories
export const categories = {
  "Hardware": ["Laptop Issues", "Desktop Problems", "Printer Issues", "Network Equipment"],
  "Software": ["Application Issues", "System Updates", "License Problems", "Performance Issues"],
  "Network": ["Internet Connectivity", "VPN Issues", "Email Problems", "Server Issues"],
  "Security": ["Password Reset", "Access Issues", "Security Alerts", "Compliance"]
};

// Sample tickets data with new users
export const tickets = [
  {
    id: "TKT-001",
    employee: "Tara",
    employeeEmail: "tara@abstractgroup.com",
    department: "Operations",
    category: "Hardware",
    subcategory: "Laptop Issues",
    description: "My laptop is running very slowly and keeps freezing. Need urgent help.",
    priority: "high",
    status: "open",
    assignedL1: "Rahul",
    assignedL2: "Deepak",
    dateCreated: "2024-01-15T09:30:00Z",
    lastUpdated: "2024-01-15T09:30:00Z",
    slaStatus: "on-track",
    comments: [
      {
        id: 1,
        author: "Tara",
        timestamp: "2024-01-15T09:30:00Z",
        content: "Initial ticket creation"
      }
    ],
    attachments: []
  },
  {
    id: "TKT-002",
    employee: "Alex",
    employeeEmail: "alex@abstractgroup.com",
    department: "Operations",
    category: "Software",
    subcategory: "Application Issues",
    description: "Excel is not opening properly. Getting error messages.",
    priority: "medium",
    status: "pending",
    assignedL1: "Rahul",
    assignedL2: null,
    dateCreated: "2024-01-14T14:20:00Z",
    lastUpdated: "2024-01-14T16:45:00Z",
    slaStatus: "on-track",
    comments: [
      {
        id: 1,
        author: "Alex",
        timestamp: "2024-01-14T14:20:00Z",
        content: "Initial ticket creation"
      },
      {
        id: 2,
        author: "Rahul",
        timestamp: "2024-01-14T16:45:00Z",
        content: "Looking into the issue. Will update soon."
      }
    ],
    attachments: []
  },
  {
    id: "TKT-003",
    employee: "Radha",
    employeeEmail: "radha@abstractgroup.com",
    department: "Operations",
    category: "Network",
    subcategory: "Internet Connectivity",
    description: "Cannot access company website from office network.",
    priority: "high",
    status: "approved",
    assignedL1: "Sneha",
    assignedL2: "Kavita",
    dateCreated: "2024-01-13T11:15:00Z",
    lastUpdated: "2024-01-13T15:30:00Z",
    slaStatus: "breached",
    comments: [
      {
        id: 1,
        author: "Radha",
        timestamp: "2024-01-13T11:15:00Z",
        content: "Initial ticket creation"
      },
      {
        id: 2,
        author: "Sneha",
        timestamp: "2024-01-13T15:30:00Z",
        content: "Issue resolved. Network configuration updated."
      }
    ],
    attachments: []
  },
  {
    id: "TKT-004",
    employee: "Neha",
    employeeEmail: "neha@abstractgroup.com",
    department: "Operations",
    category: "Security",
    subcategory: "Password Reset",
    description: "Need to reset my password for the system.",
    priority: "low",
    status: "closed",
    assignedL1: "Amit",
    assignedL2: null,
    dateCreated: "2024-01-12T08:45:00Z",
    lastUpdated: "2024-01-12T10:20:00Z",
    slaStatus: "on-track",
    comments: [
      {
        id: 1,
        author: "Neha",
        timestamp: "2024-01-12T08:45:00Z",
        content: "Initial ticket creation"
      },
      {
        id: 2,
        author: "Amit",
        timestamp: "2024-01-12T10:20:00Z",
        content: "Password reset completed. Please check your email."
      }
    ],
    attachments: []
  },
  {
    id: "TKT-005",
    employee: "Priya",
    employeeEmail: "priya@abstractgroup.com",
    department: "Operations",
    category: "Hardware",
    subcategory: "Printer Issues",
    description: "Office printer is not working. Shows paper jam error.",
    priority: "medium",
    status: "rejected",
    assignedL1: "Vikas",
    assignedL2: null,
    dateCreated: "2024-01-11T16:30:00Z",
    lastUpdated: "2024-01-11T17:00:00Z",
    slaStatus: "on-track",
    comments: [
      {
        id: 1,
        author: "Priya",
        timestamp: "2024-01-11T16:30:00Z",
        content: "Initial ticket creation"
      },
      {
        id: 2,
        author: "Vikas",
        timestamp: "2024-01-11T17:00:00Z",
        content: "Issue resolved by maintenance team. Ticket closed."
      }
    ],
    attachments: []
  }
];

// Notifications for COO
export const notifications = [
  {
    id: 1,
    title: "SLA Breach Alert",
    message: "Ticket TKT-003 has breached SLA",
    timestamp: "2024-01-13T15:30:00Z",
    type: "warning"
  },
  {
    id: 2,
    title: "High Priority Ticket",
    message: "New high priority ticket TKT-001 created",
    timestamp: "2024-01-15T09:30:00Z",
    type: "info"
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "Scheduled maintenance tonight at 2 AM",
    timestamp: "2024-01-14T10:00:00Z",
    type: "info"
  }
];

// KPI data
export const kpiData = {
  totalTickets: 156,
  pendingTickets: 23,
  closedTickets: 98,
  slaCompliance: 87.5,
  avgClosureTime: "2.3 days",
  ticketsBreached: 12
};
