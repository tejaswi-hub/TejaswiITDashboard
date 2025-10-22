// import React, { useState, useMemo } from 'react';
// import { useAppState } from '../../contexts/AppStateContext';
// import { useLocation } from 'react-router-dom';
// import Header from '../shared/Header';
// import Sidebar from '../shared/Sidebar';
// import TicketTable from '../shared/TicketTable';
// import CreateTicketModal from '../shared/CreateTicketModal';
// import EnhancedTicketModal from '../shared/EnhancedTicketModal';
// import { Plus, Ticket, Clock, CheckCircle } from 'lucide-react';

// const EmployeeDashboard = () => {
//   const { state, actions } = useAppState();
//   const { currentUser: user, tickets, filters } = state;
//   const location = useLocation();
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showTicketModal, setShowTicketModal] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   // Determine current view based on route
//   const currentView = location.pathname.split('/').pop();

//   // Filter tickets for current user
//   const userTickets = useMemo(() => {
//     return tickets.filter(ticket => ticket.createdByEmail === user.email);
//   }, [tickets, user.email]);

//   // Apply filters
//   const filteredTickets = useMemo(() => {
//     return userTickets.filter(ticket => {
//       const categoryMatch = !filters.category || 
//         ticket.category.toLowerCase().includes(filters.category.toLowerCase()) ||
//         ticket.subcategory.toLowerCase().includes(filters.category.toLowerCase());
      
//       const dateMatch = !filters.date || 
//         new Date(ticket.dateCreated).toLocaleDateString().includes(filters.date);
      
//       return categoryMatch && dateMatch;
//     });
//   }, [userTickets, filters]);

//   // Calculate KPIs
//   const kpis = useMemo(() => {
//     const totalTickets = userTickets.length;
//     const openTickets = userTickets.filter(t => t.status === 'open').length;
//     const pendingTickets = userTickets.filter(t => t.status === 'pending').length;
//     const closedTickets = userTickets.filter(t => t.status === 'closed').length;

//     return [
//       {
//         title: 'Total Tickets',
//         value: totalTickets,
//         icon: Ticket,
//         trend: 'up',
//         trendValue: '+2 this week'
//       },
//       {
//         title: 'Open Tickets',
//         value: openTickets,
//         icon: Clock,
//         trend: openTickets > 0 ? 'up' : 'down',
//         trendValue: openTickets > 0 ? `${openTickets} pending` : 'All resolved'
//       },
//       {
//         title: 'Pending Tickets',
//         value: pendingTickets,
//         icon: Clock,
//         trend: 'neutral',
//         trendValue: 'In progress'
//       },
//       {
//         title: 'Closed Tickets',
//         value: closedTickets,
//         icon: CheckCircle,
//         trend: 'up',
//         trendValue: `${Math.round((closedTickets / totalTickets) * 100)}% resolved`
//       }
//     ];
//   }, [userTickets]);

//   const columns = [
//     { key: 'id', label: 'ID', sortable: true },
//     { key: 'title', label: 'Title', sortable: true },
//     { key: 'subcategory', label: 'Subcategory', sortable: true },
//     { key: 'dateCreated', label: 'Date', sortable: true },
//     { key: 'status', label: 'Status', sortable: true },
//     { key: 'priority', label: 'Priority', sortable: true }
//   ];

//   const handleFilterChange = (key, value) => {
//     actions.updateFilters({ [key]: value });
//   };

//   const handleSort = (field, direction) => {
//     // Sort logic would be implemented here
//     console.log('Sort by:', field, direction);
//   };

//   const handleViewDetails = (ticket) => {
//     setSelectedTicket(ticket);
//     setShowTicketModal(true);
//   };

//   const handleCreateTicket = () => {
//     setShowCreateModal(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="ml-64">
//         <Header title={`Welcome, ${user.name}`} />
        
//         <main className="p-6">
//           {currentView === 'dashboard' && (
//             <>
//               {/* KPI Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 {kpis.map((kpi, index) => {
//                   const Icon = kpi.icon;
//                   return (
//                     <div key={kpi.title} className="card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
//                           <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
//                           <p className="text-xs text-gray-500 mt-1">{kpi.trendValue}</p>
//                         </div>
//                         <div className="p-3 rounded-full bg-employee-primary bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
//                           <Icon className="h-6 w-6 text-employee-primary" />
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>


//               {/* Recent Tickets Preview */}
//               <div className="card">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
//                 </div>
//                 <div className="p-6">
//                   <TicketTable
//                     tickets={filteredTickets.slice(0, 5)}
//                     columns={columns}
//                     filters={filters}
//                     onFilterChange={handleFilterChange}
//                     onSort={handleSort}
//                     onViewDetails={handleViewDetails}
//                     showActions={false}
//                   />
//                 </div>
//               </div>
//             </>
//           )}

//           {currentView === 'tickets' && (
//             <>
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
//               </div>
//               <TicketTable
//                 tickets={filteredTickets}
//                 columns={columns}
//                 filters={filters}
//                 onFilterChange={handleFilterChange}
//                 onSort={handleSort}
//                 onViewDetails={handleViewDetails}
//                 showActions={false}
//               />
//             </>
//           )}

//           {currentView === 'create-ticket' && (
//             <>
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">Create New Ticket</h2>
//               </div>
//               <div className="max-w-2xl">
//                 <CreateTicketModal
//                   isOpen={true}
//                   onClose={() => window.history.back()}
//                 />
//               </div>
//             </>
//           )}
//         </main>
//       </div>

//       {/* Modals */}
//       <CreateTicketModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//       />

//       <EnhancedTicketModal
//         ticket={selectedTicket}
//         isOpen={showTicketModal}
//         onClose={() => setShowTicketModal(false)}
//       />
//     </div>
//   );
// };

// export default EmployeeDashboard;
import React, { useEffect, useMemo, useState } from 'react';
import { useAppState, ActionTypes } from './AppStateContext'; 

// Mock API function (Replace this with actual Axios/Fetch calls in a real application)
const fetchEmployeeTickets = (email, setIsLoading, setTickets) => {
  setIsLoading(true);
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network latency
      const mockTickets = JSON.parse(localStorage.getItem('tickets')) || []; // Use stored tickets
      const employeeTickets = mockTickets.filter(t => t.createdByEmail === email);
      
      // In a real application, you'd dispatch setTickets(data) here.
      // For this local mock, we'll return the filtered list to the caller.
      resolve(employeeTickets); 
      setIsLoading(false);
    }, 500);
  });
};

const EmployeeDashboard = () => {
  const { state, actions } = useAppState();
  const { currentUser, tickets, isLoading } = state;
  const [employeeTickets, setEmployeeTickets] = useState([]); // Local state for filtered tickets

  // 1. Redirect if not authenticated (basic routing guard)
  if (!currentUser) {
    return <div className="p-8 text-center text-red-500">Please log in to view the dashboard.</div>;
  }
  
  // 2. Data Fetching and Filtering
  useEffect(() => {
    // In a real application, you'd fetch tickets from the API here:
    // actions.setTickets(data);
    // Since we're using mock data, we filter the global state tickets.
    
    actions.setIsLoading(true);
    
    // Simulating API fetch and local filtering
    fetchEmployeeTickets(currentUser.email, actions.setIsLoading, actions.setTickets)
      .then(filteredTickets => {
        setEmployeeTickets(filteredTickets); // Set the filtered list
        actions.setIsLoading(false);
      });

  }, [currentUser.email]); // Re-run when the current user changes

  // 3. Memoized Calculations for Dashboard Stats
  const stats = useMemo(() => {
    const total = employeeTickets.length;
    const open = employeeTickets.filter(t => t.status === 'open' || t.status === 'assigned').length;
    const resolved = employeeTickets.filter(t => t.status === 'resolved' || t.status === 'closed').length;
    const highPriority = employeeTickets.filter(t => t.priority === 'high').length;

    return { total, open, resolved, highPriority };
  }, [employeeTickets]);


  // --- Helper Components (to keep JSX clean) ---

  const StatCard = ({ title, value, color }) => (
    <div className={`p-4 rounded-lg shadow-md ${color} text-white`}>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
    </div>
  );

  const TicketItem = ({ ticket }) => (
    <div className="border-b p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
         onClick={() => actions.setSelectedTicket(ticket)}>
      <div>
        <p className="font-semibold text-gray-800">{ticket.title}</p>
        <p className={`text-xs ${ticket.priority === 'high' ? 'text-red-500' : 'text-gray-500'}`}>
          {ticket.id} | Priority: {ticket.priority}
        </p>
      </div>
      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
        ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
        ticket.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {ticket.status.toUpperCase()}
      </span>
    </div>
  );


  // --- Main Render ---

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome Back, {currentUser.name}!
      </h1>

      {isLoading ? (
        <div className="text-center p-10">Loading tickets...</div>
      ) : (
        <>
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Tickets Filed" value={stats.total} color="bg-indigo-600" />
            <StatCard title="Open/In Progress" value={stats.open} color="bg-yellow-600" />
            <StatCard title="High Priority" value={stats.highPriority} color="bg-red-600" />
            <StatCard title="Resolved/Closed" value={stats.resolved} color="bg-green-600" />
          </div>

          {/* New Ticket/Tickets List Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">My Recent Tickets</h2>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                onClick={() => actions.setModalState('showCreateModal', true)}
              >
                + New Ticket
              </button>
            </div>

            {employeeTickets.length === 0 ? (
              <p className="text-gray-500 p-4 border border-dashed text-center">
                You haven't submitted any tickets yet. Click '+ New Ticket' to get started!
              </p>
            ) : (
              <div className="divide-y divide-gray-200">
                {employeeTickets
                  .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
                  .slice(0, 5) // Show only the 5 most recent
                  .map(ticket => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                  ))}
              </div>
            )}
            
            {employeeTickets.length > 5 && (
                 <div className="text-center pt-4">
                    <button 
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                        onClick={() => actions.setActiveTab('tickets')} // Assuming 'tickets' tab shows the full list
                    >
                        View All My Tickets ({employeeTickets.length - 5} more)
                    </button>
                 </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDashboard;