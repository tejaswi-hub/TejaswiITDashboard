import React, { useState, useMemo } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import Header from '../shared/Header';
import Sidebar from '../shared/Sidebar';
import TicketTable from '../shared/TicketTable';
import EnhancedTicketModal from '../shared/EnhancedTicketModal';
import { Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const ManagerL2Dashboard = () => {
  const { state, actions } = useAppState();
  const { currentUser: user, tickets, filters } = state;
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Filter tickets assigned to L2 team
  const teamTickets = useMemo(() => {
    return tickets.filter(ticket => ticket.assignedL2 === user.name);
  }, [tickets, user.name]);

  // Apply filters
  const filteredTickets = useMemo(() => {
    return teamTickets.filter(ticket => {
      const departmentMatch = !filters.department || 
        ticket.department.toLowerCase().includes(filters.department.toLowerCase());
      
      const statusMatch = !filters.status || 
        ticket.status.toLowerCase().includes(filters.status.toLowerCase());
      
      const dateMatch = !filters.date || 
        new Date(ticket.dateCreated).toLocaleDateString().includes(filters.date);
      
      return departmentMatch && statusMatch && dateMatch;
    });
  }, [teamTickets, filters]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalTickets = teamTickets.length;
    const openTickets = teamTickets.filter(t => t.status === 'open').length;
    const pendingTickets = teamTickets.filter(t => t.status === 'pending').length;
    const closedTickets = teamTickets.filter(t => t.status === 'closed').length;
    const avgClosureTime = "2.1 days"; // This would be calculated from actual data

    return [
      {
        title: 'Team Tickets',
        value: totalTickets,
        icon: Users,
        trend: 'up',
        trendValue: '+3 this week'
      },
      {
        title: 'Open Tickets',
        value: openTickets,
        icon: Clock,
        trend: openTickets > 3 ? 'up' : 'down',
        trendValue: openTickets > 3 ? 'High workload' : 'Manageable'
      },
      {
        title: 'Pending Tickets',
        value: pendingTickets,
        icon: AlertTriangle,
        trend: 'neutral',
        trendValue: 'In progress'
      },
      {
        title: 'Avg Closure Time',
        value: avgClosureTime,
        icon: CheckCircle,
        trend: 'down',
        trendValue: 'Improving'
      }
    ];
  }, [teamTickets]);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'createdBy', label: 'Employee', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'subcategory', label: 'Issue Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true }
  ];

  const handleFilterChange = (key, value) => {
    actions.updateFilters({ [key]: value });
  };

  const handleSort = (field, direction) => {
    console.log('Sort by:', field, direction);
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleApprove = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleReject = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <Header title={`Welcome, ${user.name}`} />
        
        <main className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.title} className="card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{kpi.trendValue}</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tickets Table */}
          <TicketTable
            tickets={filteredTickets}
            columns={columns}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSort={handleSort}
            onViewDetails={handleViewDetails}
            onApprove={handleApprove}
            onReject={handleReject}
            showActions={true}
          />
        </main>
      </div>

      {/* Ticket Modal */}
      <EnhancedTicketModal
        ticket={selectedTicket}
        isOpen={showTicketModal}
        onClose={() => setShowTicketModal(false)}
      />
    </div>
  );
};

export default ManagerL2Dashboard;

