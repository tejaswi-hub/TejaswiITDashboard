import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import Header from '../shared/Header';
import Sidebar from '../shared/Sidebar';
import TicketTable from '../shared/TicketTable';
import EnhancedTicketModal from '../shared/EnhancedTicketModal';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Download,
  FileText,
  BarChart3,
  Home,
  PieChart,
  Bell,
  User,
  Eye,
  X,
  Plus,
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Lock,
  Save,
  Hash,
  ArrowUpDown,
  LogOut
} from 'lucide-react';

const COODashboard = () => {
  const { state, actions } = useAppState();
  const { currentUser: user, tickets, filters } = state;
  const [activeView, setActiveView] = useState('reports');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Filter states
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Approval states
  const [selectedApprovalTicket, setSelectedApprovalTicket] = useState(null);
  const [showApprovalDetails, setShowApprovalDetails] = useState(false);
  
  // Ref for profile dropdown
  const profileDropdownRef = useRef(null);
  
  // Form states
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [profileData, setProfileData] = useState({
    email: 'rashmi.patel@abstractgroup.com',
    department: 'Operations',
    phone: '+91 98765 43210',
    employeeId: 'EMP-2019-0042',
    location: 'Mumbai, India',
    lastLogin: '17 Oct 2025, 9:30 AM'
  });

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New ticket escalation from Deepak', message: 'TCK-2025-0301', time: '30m ago', unread: true },
    { id: 2, title: 'SLA breach reported in HR department', message: 'Multiple tickets at risk', time: '1h ago', unread: true },
    { id: 3, title: 'Approval request pending for VPN setup', message: 'TCK-2025-0272', time: '2h ago', unread: true },
    { id: 4, title: 'Budget approval required', message: 'TCK-2025-0303', time: '45m ago', unread: true },
    { id: 5, title: 'Hardware request pending', message: 'TCK-2025-0304', time: '1h 15m ago', unread: true },
    { id: 6, title: 'Network issue escalation', message: 'TCK-2025-0305', time: '2h 30m ago', unread: true },
    { id: 7, title: 'Access request approved', message: 'TCK-2025-0306', time: '3h ago', unread: false },
    { id: 8, title: 'Software license renewal', message: 'TCK-2025-0307', time: '4h ago', unread: false },
    { id: 9, title: 'VPN setup completed', message: 'TCK-2025-0308', time: '5h ago', unread: false },
    { id: 10, title: 'System maintenance scheduled', message: 'Tonight at 2 AM', time: '6h ago', unread: false },
    { id: 11, title: 'Monthly report generated', message: 'October 2025 report ready', time: '1 day ago', unread: false },
    { id: 12, title: 'Security audit completed', message: 'All systems secure', time: '2 days ago', unread: false }
  ];

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Home },
    { id: 'reports', label: 'Reports and Metrics', icon: BarChart3 },
    { id: 'sla', label: 'SLA Compliance', icon: TrendingUp },
    { id: 'approvals', label: 'Approval Queue', icon: Clock },
    { id: 'export', label: 'Export Data', icon: Download },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Calculate comprehensive KPIs
  const kpis = useMemo(() => {
    const totalTickets = 1240; // Mock data to match the design
    const pendingApprovals = 12;
    const closedThisWeek = 326;
    const slaCompliance = 92;
    const avgResolutionTime = '12h 48m';

    return [
      {
        title: 'Total Tickets',
        value: totalTickets.toLocaleString(),
        icon: Users,
        trend: '+10%',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Pending Approvals',
        value: pendingApprovals,
        icon: Bell,
        trend: null,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      },
      {
        title: 'Tickets Closed This Week',
        value: closedThisWeek,
        icon: CheckCircle,
        trend: '+115%',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: 'SLA Compliance',
        value: `${slaCompliance}%`,
        icon: CheckCircle,
        trend: null,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Avg Resolution Time',
        value: avgResolutionTime,
        icon: Clock,
        trend: null,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50'
      }
    ];
  }, []);

  // Updated ticket data matching the image
  const ticketData = [
    {
      id: 'TCK-2025-0305',
      department: 'IT',
      issueType: 'Software Access',
      priority: 'High',
      status: 'Awaiting Approval',
      assignedLevel: 'L2 Manager',
      slaStatus: 'On Track',
      lastUpdated: '2025-10-18 09:15'
    },
    {
      id: 'TCK-2025-0304',
      department: 'HR',
      issueType: 'Policy Change',
      priority: 'Medium',
      status: 'In Progress',
      assignedLevel: 'L1 Manager',
      slaStatus: 'On Track',
      lastUpdated: '2025-10-17 16:30'
    },
    {
      id: 'TCK-2025-0303',
      department: 'Finance',
      issueType: 'Budget Approval',
      priority: 'Critical',
      status: 'Awaiting Approval',
      assignedLevel: 'COO',
      slaStatus: 'At Risk',
      lastUpdated: '2025-10-17 11:20'
    },
    {
      id: 'TCK-2025-0302',
      department: 'IT',
      issueType: 'Network Issue',
      priority: 'High',
      status: 'In Progress',
      assignedLevel: 'IT Manager',
      slaStatus: 'On Track',
      lastUpdated: '2025-10-17 10:45'
    },
    {
      id: 'TCK-2025-0301',
      department: 'Admin',
      issueType: 'Access Request',
      priority: 'Low',
      status: 'Resolved',
      assignedLevel: 'L1 Manager',
      slaStatus: 'Completed',
      lastUpdated: '2025-10-16 17:00'
    },
    {
      id: 'TCK-2025-0300',
      department: 'IT',
      issueType: 'Hardware',
      priority: 'Medium',
      status: 'Created',
      assignedLevel: 'Unassigned',
      slaStatus: 'On Track',
      lastUpdated: '2025-10-16 14:20'
    }
  ];

  // Mock data for approval queue
  const approvalQueue = [
    {
      id: 'TCK-2025-0301',
      raisedBy: 'Tara',
      currentHandler: 'Deepak (L1)',
      summary: 'Software access escalation - CRM system for 5 users',
      priority: 'High',
      details: 'Request for CRM system access for 5 new employees in the sales department. This requires approval for software licensing and user account creation.',
      department: 'Sales',
      dateRaised: '2025-10-16',
      slaDeadline: '2025-10-19'
    },
    {
      id: 'TCK-2025-0303',
      raisedBy: 'Neha',
      currentHandler: 'Kavita (L1)',
      summary: 'Hardware replacement request - 10 laptops for design team',
      priority: 'High',
      details: 'Design team requires 10 new laptops with high-end graphics cards for video editing and 3D modeling work. Budget approval needed for $25,000.',
      department: 'Design',
      dateRaised: '2025-10-15',
      slaDeadline: '2025-10-18'
    },
    {
      id: 'TCK-2025-0304',
      raisedBy: 'Raj',
      currentHandler: 'Amit (L2)',
      summary: 'VPN approval overdue',
      priority: 'Critical',
      details: 'VPN access request for remote work setup. Employee needs secure access to internal systems from home office.',
      department: 'IT',
      dateRaised: '2025-10-14',
      slaDeadline: '2025-10-17'
    },
    {
      id: 'TCK-2025-0305',
      raisedBy: 'Priya',
      currentHandler: 'Suresh (L1)',
      summary: 'Network reconfiguration request',
      priority: 'Medium',
      details: 'Network infrastructure needs reconfiguration to support new office layout. Requires temporary downtime.',
      department: 'IT',
      dateRaised: '2025-10-13',
      slaDeadline: '2025-10-20'
    }
  ];

  // Mock SLA data
  const slaData = [
    {
      department: 'IT',
      slaCompliance: 94,
      avgClosureTime: '11h 22m',
      ticketsBreached: 4,
      totalTickets: 456,
      status: 'good'
    },
    {
      department: 'HR',
      slaCompliance: 89,
      avgClosureTime: '13h 05m',
      ticketsBreached: 6,
      totalTickets: 298,
      status: 'warning'
    },
    {
      department: 'Finance',
      slaCompliance: 92,
      avgClosureTime: '10h 18m',
      ticketsBreached: 3,
      totalTickets: 234,
      status: 'good'
    },
    {
      department: 'Admin',
      slaCompliance: 97,
      avgClosureTime: '9h 45m',
      ticketsBreached: 2,
      totalTickets: 142,
      status: 'excellent'
    }
  ];

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleApprove = (ticketId) => {
    const ticket = approvalQueue.find(t => t.id === ticketId);
    setSelectedApprovalTicket(ticket);
    setShowApprovalDetails(true);
    // Simulate approval
    setTimeout(() => {
    alert(`Ticket ${ticketId} approved successfully!`);
      setShowApprovalDetails(false);
      setSelectedApprovalTicket(null);
    }, 1000);
  };

  const handleReject = (ticketId) => {
    const ticket = approvalQueue.find(t => t.id === ticketId);
    setSelectedApprovalTicket(ticket);
    setShowApprovalDetails(true);
    // Simulate rejection
    setTimeout(() => {
    alert(`Ticket ${ticketId} rejected.`);
      setShowApprovalDetails(false);
      setSelectedApprovalTicket(null);
    }, 1000);
  };
  
  const handleLogout = () => {
    if (actions.logout) {
      actions.logout();
    } else {
      // Fallback logout
      window.location.href = '/login';
    }
  };
  
  const handleClearFilters = () => {
    setDepartmentFilter('All');
    setStatusFilter('All');
    setPriorityFilter('All');
  };
  
  // Filter tickets based on selected filters
  const filteredTickets = useMemo(() => {
    return ticketData.filter(ticket => {
      const departmentMatch = departmentFilter === 'All' || ticket.department === departmentFilter;
      const statusMatch = statusFilter === 'All' || ticket.status === statusFilter;
      const priorityMatch = priorityFilter === 'All' || ticket.priority === priorityFilter;
      return departmentMatch && statusMatch && priorityMatch;
    });
  }, [departmentFilter, statusFilter, priorityFilter]);
  
  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleExport = (format, type) => {
    console.log(`Exporting ${type} as ${format}`);
    alert(`${type} exported as ${format.toUpperCase()} successfully!`);
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match');
      return;
    }
    console.log('Changing password');
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowChangePasswordModal(false);
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSLAStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  // Render Dashboard Overview
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                  {kpi.trend && (
                    <p className="text-xs text-green-600 mt-1">{kpi.trend}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Overview Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Ticket Overview</h3>
            <span className="text-sm text-gray-500">Showing 6 of 6 tickets</span>
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Department: All</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Admin</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Status: All</option>
              <option>Awaiting Approval</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Created</option>
            </select>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Priority: All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button 
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.issueType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.status === 'Awaiting Approval' ? 'bg-purple-100 text-purple-800' :
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.assignedLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.slaStatus === 'On Track' ? 'bg-blue-100 text-blue-800' :
                      ticket.slaStatus === 'At Risk' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.slaStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-1">
                    <span>{ticket.lastUpdated}</span>
                    <ArrowUpDown className="h-3 w-3 text-gray-400" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(ticket)}
                      className="text-blue-600 hover:text-blue-900 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render SLA Compliance View
  const renderSLACompliance = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              SLA & Performance Summary
            </h3>
            <p className="text-sm text-gray-600 mt-1">Department-wise SLA compliance and performance metrics</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('csv', 'SLA Report')}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleExport('pdf', 'SLA Report')}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Closure Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Breached</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tickets</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {slaData.map((dept) => (
                <tr key={dept.department} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-semibold">{dept.slaCompliance}%</span>
                      {getSLAStatusIcon(dept.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.avgClosureTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={dept.ticketsBreached > 4 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                      {dept.ticketsBreached}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.totalTickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Approval Queue View
  const renderApprovalQueue = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-600" />
              Approval Queue
            </h3>
            <p className="text-sm text-gray-600 mt-1">{approvalQueue.length} items pending COO approval</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raised By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Handler</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {approvalQueue.slice(0, 4).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.raisedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.currentHandler}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{item.summary}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Export Data View
  const renderExportData = () => (
    <div className="space-y-8">
      {/* SLA Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              SLA & Performance Summary
            </h3>
            <p className="text-sm text-gray-600 mt-1">Department-wise SLA compliance and performance metrics</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('csv', 'SLA Report')}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleExport('pdf', 'SLA Report')}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
        {/* SLA table content same as above */}
      </div>

      {/* Export Data Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
          <p className="text-sm text-gray-600 mt-1">Download reports and data in various formats</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Complete Ticket Report */}
          <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
            <div className="flex items-center mb-4">
              <Download className="h-8 w-8 text-blue-600 mr-3" />
              <h4 className="text-lg font-semibold text-gray-900">Complete Ticket Report</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Export all ticket data with detailed information, timelines, and resolution status</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('csv', 'Complete Ticket Report')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export as CSV
              </button>
              <button
                onClick={() => handleExport('pdf', 'Complete Ticket Report')}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Export as PDF
              </button>
            </div>
          </div>

          {/* SLA Performance Report */}
          <div className="border border-green-200 rounded-lg p-6 bg-green-50">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <h4 className="text-lg font-semibold text-gray-900">SLA Performance Report</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Department-wise SLA compliance metrics and performance indicators</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('csv', 'SLA Performance Report')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Export as CSV
              </button>
              <button
                onClick={() => handleExport('pdf', 'SLA Performance Report')}
                className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                Export as PDF
              </button>
            </div>
          </div>

          {/* Approval Queue Report */}
          <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
            <div className="flex items-center mb-4">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <h4 className="text-lg font-semibold text-gray-900">Approval Queue Report</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">All pending approvals with detailed summaries and priority levels</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('csv', 'Approval Queue Report')}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Export as CSV
              </button>
              <button
                onClick={() => handleExport('pdf', 'Approval Queue Report')}
                className="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Export as PDF
              </button>
            </div>
          </div>

          {/* Executive Analytics */}
          <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
              <h4 className="text-lg font-semibold text-gray-900">Executive Analytics</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">Comprehensive analytics with trends, forecasts, and insights</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('csv', 'Executive Analytics')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Export as CSV
              </button>
              <button
                onClick={() => handleExport('pdf', 'Executive Analytics')}
                className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>

        {/* Data Summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-sm text-gray-600">Total Records:</span>
              <span className="text-blue-600 font-semibold ml-2">1,240</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Date Range:</span>
              <span className="text-gray-900 font-semibold ml-2">Last 30 days</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Departments:</span>
              <span className="text-blue-600 font-semibold ml-2">4</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Last Export:</span>
              <span className="text-gray-900 font-semibold ml-2">Oct 15, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Profile View
  const renderProfile = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hello, Rashmi 👋</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">RD</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Rashmi Desai</h3>
                <p className="text-gray-600">COO</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                value={profileData.department}
                onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value="COO"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Role is assigned by admin</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
          
          {/* Change Password */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Change Password</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* Reporting Hierarchy */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Reporting Hierarchy</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Minan (CEO)</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Rashmi Desai (COO)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Abstract Group</h1>
                <p className="text-xs text-gray-500">IT Ticket Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-500">{notifications.length} unread notifications</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 rounded-full mt-2 bg-blue-400"></div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            <button className="text-xs text-gray-400 hover:text-gray-600">Dismiss</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="text-blue-600 text-sm hover:text-blue-800">View all {notifications.length} notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors"
                >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RD</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Rashmi</span>
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* Profile Header */}
                    <div className="bg-blue-600 p-4 rounded-t-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-blue-200">
                          <span className="text-blue-600 font-bold text-lg">RD</span>
                        </div>
                        <div>
                          <h3 className="text-white text-lg font-semibold">Rashmi Patel</h3>
                          <p className="text-blue-100 text-sm">Chief Operating Officer</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="text-sm text-gray-900">rashmi.patel@abstractgroup.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Phone:</span>
                        <span className="text-sm text-gray-900">+91 98765 43210</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Employee ID:</span>
                        <span className="text-sm text-gray-900">EMP-2019-0042</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Department:</span>
                        <span className="text-sm text-gray-900">Operations</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Location:</span>
                        <span className="text-sm text-gray-900">Mumbai, India</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Last Login:</span>
                        <span className="text-sm text-gray-900">17 Oct 2025, 9:30 AM</span>
                      </div>
                      
                      {/* Reporting Structure */}
                      <div className="bg-blue-50 p-3 rounded-lg mt-4">
                        <span className="text-sm text-gray-600">Reports to</span>
                        <div className="text-sm text-blue-600 font-medium mt-1">Minan Shah (CEO)</div>
                      </div>
                      
                      {/* Actions */}
                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                          <User className="h-4 w-4" />
                          <span>View Full Profile</span>
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Custom Sidebar */}
      <div className="fixed left-0 top-16 w-64 h-full bg-white shadow-lg z-30">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Abstract Group</h1>
          <p className="text-sm text-gray-500">IT Ticket Management System</p>
        </div>
        
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleViewChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Logged in as Rashmi Desai (COO)</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16">
        <main className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-600">Welcome, Rashmi</h1>
            <p className="text-gray-600">COO - Executive Department</p>
          </div>

          {activeView === 'dashboard' && renderDashboard()}
          {activeView === 'reports' && renderDashboard()}
          {activeView === 'sla' && renderSLACompliance()}
          {activeView === 'approvals' && renderApprovalQueue()}
          {activeView === 'export' && renderExportData()}
          {activeView === 'profile' && renderProfile()}
        </main>
      </div>

      {/* Modals */}
      <EnhancedTicketModal
        ticket={selectedTicket}
        isOpen={showTicketModal}
        onClose={() => setShowTicketModal(false)}
      />
      
      {/* Approval Details Modal */}
      {showApprovalDetails && selectedApprovalTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Approval Details</h3>
              <button
                onClick={() => setShowApprovalDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ticket ID</label>
                  <p className="text-sm text-gray-900">{selectedApprovalTicket.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedApprovalTicket.priority)}`}>
                    {selectedApprovalTicket.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Raised By</label>
                  <p className="text-sm text-gray-900">{selectedApprovalTicket.raisedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-sm text-gray-900">{selectedApprovalTicket.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Handler</label>
                  <p className="text-sm text-gray-900">{selectedApprovalTicket.currentHandler}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date since raised</label>
                  <p className="text-sm text-gray-900">{selectedApprovalTicket.dateRaised}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SLA Deadline</label>
                  <p className="text-sm text-gray-900">{selectedApprovalTicket.slaDeadline}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Summary</label>
                <p className="text-sm text-gray-900 mt-1">{selectedApprovalTicket.summary}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Details</label>
                <p className="text-sm text-gray-900 mt-1">{selectedApprovalTicket.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="ml-64 bg-white border-t border-gray-200 py-4">
        <div className="px-8 text-center text-sm text-gray-500">
          ©2025 Abstract Group | IT Ticket Management System | COO Dashboard
        </div>
      </footer>
    </div>
  );
};

export default COODashboard;
