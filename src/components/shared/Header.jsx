import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { LogOut, Bell, User } from 'lucide-react';
import ProfileModal from './ProfileModal';

const Header = ({ title, showNotifications = false }) => {
  const { state, actions } = useAppState();
  const { currentUser: user, notifications } = state;
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const getRoleColor = (role) => {
    switch (role) {
      case 'employee': return 'text-employee-primary';
      case 'it_manager': return 'text-manager-primary';
      case 'coo': return 'text-coo-primary';
      default: return 'text-gray-700';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${getRoleColor(user.role)}`}>
              {title || `Welcome, ${user.name}`}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {showNotifications && (
              <div className="relative">
                <button
                  onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {showNotificationDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-gray-500 text-center">No notifications</div>
                      ) : (
                        notifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                              }`}></div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:block text-sm font-medium">{user.name}</span>
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        setShowProfileModal(true);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={actions.logout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        user={user}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </header>
  );
};

export default Header;

