import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RegistrationTestNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Registration test event details
  const registrationEvent = {
    title: "Admissions Test Registration",
    description: "Registration opens for the MAIS entrance examination. Limited spots available!",
    openDate: new Date('2025-06-16T09:00:00'),
    closeDate: new Date('2025-06-20T09:00:00'),
    link: "https://mongolaspiration.edu.mn/"
  };

  useEffect(() => {
    // Check if notification was already dismissed in this session
    const dismissed = sessionStorage.getItem('registrationNotificationDismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Show notification after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // After animation completes, mark as dismissed
    setTimeout(() => {
      setIsDismissed(true);
      sessionStorage.setItem('registrationNotificationDismissed', 'true');
    }, 300);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleRegistrationClick = () => {
    window.open(registrationEvent.link, '_blank', 'noopener,noreferrer');
  };

  if (isDismissed) return null;

  // Calculate time until registration opens
  const now = new Date();
  const timeUntilOpen = registrationEvent.openDate.getTime() - now.getTime();
  const isRegistrationOpen = timeUntilOpen <= 0 && now < registrationEvent.closeDate;
  const isRegistrationClosed = now >= registrationEvent.closeDate;
  
  // Calculate days/hours until opening
  const daysUntilOpen = Math.ceil(timeUntilOpen / (1000 * 60 * 60 * 24));
  const hoursUntilOpen = Math.ceil(timeUntilOpen / (1000 * 60 * 60));
  
  // Don't show if registration is closed
  if (isRegistrationClosed) return null;  const getStatusInfo = () => {
    if (isRegistrationOpen) {
      return {
        status: "OPEN NOW!",
        urgency: "🟢 Registration is OPEN"
      };
    } else if (daysUntilOpen <= 1) {
      return {
        status: hoursUntilOpen <= 24 ? `${hoursUntilOpen}h` : "Tomorrow",
        urgency: "🔥 Opens Soon!"
      };
    } else {
      return {
        status: `${daysUntilOpen}d`,
        urgency: `📅 ${daysUntilOpen} days to go`
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed right-0 top-1/3 z-50"
        >          <div className="bg-white text-gray-800 rounded-l-md shadow-lg overflow-visible border-2">
            <div className="relative">
              {/* Dismiss Button */}
              <button 
                onClick={handleDismiss}
                className="absolute right-2 top-2 text-gray-500 hover:text-red-600 transition-colors p-1 bg-gray-50 hover:bg-red-50 rounded-full z-10"
                aria-label="Dismiss notification"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              
              {/* Expand/Collapse Button */}
              <button
                onClick={handleToggleCollapse}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all"
                style={{ boxShadow: '0 0 8px rgba(220, 38, 38, 0.3)' }}
                aria-label={isCollapsed ? "Expand notification" : "Collapse notification"}
              >
                <svg className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
              
              {/* Content */}
              <motion.div 
                className={`py-4 pl-4 pr-8 transition-all duration-300`}
                style={{ 
                  width: isCollapsed ? '80px' : '320px',
                  minWidth: isCollapsed ? '80px' : '320px'
                }}
              >                {isCollapsed ? (
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-2"
                    >
                      <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 9h5V7a2 2 0 00-2-2H9v4zm6 0h.01M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h6M9 17h6v2H9v-2z"/>
                      </svg>
                    </motion.div>
                    <div className="bg-red-100 text-red-800 rounded px-2 py-1 text-xs font-bold">
                      {statusInfo.status}
                    </div>
                  </div>
                ) : (
                  <>                    {/* Header */}
                    <div className="flex items-center mb-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <svg className="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 9h5V7a2 2 0 00-2-2H9v4zm6 0h.01M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h6M9 17h6v2H9v-2z"/>
                        </svg>
                      </motion.div>
                      <h3 className="font-semibold text-sm text-gray-800">MAIS Registration</h3>
                    </div>                      {/* Event Details */}
                    <div className="bg-white shadow border rounded-md p-3 mb-3">
                      <div className="font-bold text-base mb-1 text-accent-dark">{registrationEvent.title}</div>
                      <div className="text-xs text-gray-700 mb-2">
                        {registrationEvent.description}
                      </div>
                      <div className="flex items-center text-gray-600 text-xs mb-1">
                        <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>June 16-20, 2025</span>
                      </div>
                      <div className="text-xs font-medium text-accent">
                        {statusInfo.urgency}
                      </div>
                    </div>                      {/* CTA Button */}                    <motion.button 
                      onClick={handleRegistrationClick}
                      className="bg-accent hover:bg-accent-dark text-white text-sm px-3 py-2 rounded flex items-center justify-center transition-colors w-full font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{isRegistrationOpen ? "Register Now!" : "Visit Website"}</span>
                      <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </motion.button>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationTestNotification;
