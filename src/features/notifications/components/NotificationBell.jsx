// import { useState, useRef, useEffect } from 'react';
// import { Bell } from 'lucide-react';
// import { useNotifications } from '../hooks/useNotifications';
// import NotificationPanel from './NotificationPanel';

// function NotificationBell() {
//   const [isOpen, setIsOpen] = useState(false);
//   const wrapperRef = useRef(null);

//   const { notifications, unreadCount, isLoading, markAllAsRead } = useNotifications();

//   const handleToggle = () => {
//     const nextOpen = !isOpen;
//     setIsOpen(nextOpen);

//     // Mark everything read the moment the user opens the panel to see them
//     if (nextOpen && unreadCount > 0) {
//       markAllAsRead();
//     }
//   };

//   useEffect(() => {
//     if (!isOpen) return;
//     const handleClickOutside = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen]);

//   return (
//     <div className="relative" ref={wrapperRef}>
//       <button
//         onClick={handleToggle}
//         className="relative p-2 rounded-full hover:bg-background transition"
//         aria-label="Notifications"
//       >
//         <Bell size={20} className="text-ink" />
//         {unreadCount > 0 && (
//           <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
//         )}
//       </button>

//       {isOpen && (
//         <NotificationPanel
//           notifications={notifications}
//           isLoading={isLoading}
//           onClose={() => setIsOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default NotificationBell;