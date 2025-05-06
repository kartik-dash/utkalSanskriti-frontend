
// // ChatPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {API_URL} from "../redux/api/api";

// const adminchatPage = () => {
//   const dispatch = useDispatch();
//   const UserId = useSelector((state) => state.auth?.userId);

//   // Chat state: the selected user and message input
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messageInput, setMessageInput] = useState('');

//   // State for role selection and fetched descendant users
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [roleUsers, setRoleUsers] = useState([]);
//   const [loadingRoleUsers, setLoadingRoleUsers] = useState(false);
//   const [errorRoleUsers, setErrorRoleUsers] = useState(null);

//   // Conversation state: fetched conversation messages, loading and error flags
//   const [conversation, setConversation] = useState([]);
//   const [loadingConversation, setLoadingConversation] = useState(false);
//   const [errorConversation, setErrorConversation] = useState(null);

//   // Roles list with mapping for API role value
//   const roles = [
//     { id: 1, displayName: 'MASTER ADMIN', apiRole: 'MASTER_ADMIN' },
//     { id: 2, displayName: 'TOP LEVEL', apiRole: 'TOP_LEVEL' },
//     { id: 3, displayName: 'MID LEVEL', apiRole: 'MID_LEVEL' },
//     { id: 4, displayName: 'TEAM LEADER', apiRole: 'TEAM_LEADER' },
//     { id: 5, displayName: 'SUPPORT SERVICE', apiRole: 'SUPPORT_SERVICE' },
//     { id: 6, displayName: 'MANAGEMNT GOVERMENT', apiRole: 'GOVERMENT_MANAGEMENT' },
//     { id: 7, displayName: 'GOVERMENT', apiRole: 'GOVERMENT' },
//     { id: 8, displayName: 'TEMPLE ADMIN', apiRole: 'TEMPLE_ADMIN' },
//     { id: 9, displayName: 'GUIDE', apiRole: 'GUIDE' },
//   ];

//   // When a user is selected, fetch the conversation between the logged-in user and the selected recipient.
//   useEffect(() => {
//     if (selectedUser && UserId) {
//       const fetchConversation = async () => {
//         setLoadingConversation(true);
//         setErrorConversation(null);
//         try {
//           const response = await fetch(
//             `${API_URL}/api/messages/crm/conversation?userId1=${UserId}&userId2=${selectedUser.userId}`
//           );
//           if (!response.ok) {
//             throw new Error('Failed to fetch conversation');
//           }
//           const data = await response.json();
//           setConversation(data);
//         } catch (err) {
//           setErrorConversation(err.message || 'Something went wrong');
//         }
//         setLoadingConversation(false);
//       };

//       fetchConversation();
//     }
//   }, [selectedUser, UserId]);

//   // Handler for selecting a descendant user (from a role) for chatting
//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//   };

//   // Handler for selecting a role. Fetch its descendant users and filter by the role.
//   const handleRoleSelect = async (role) => {
//     // Toggle the role list: if the same role is clicked, close it.
//     if (selectedRole && selectedRole.id === role.id) {
//       setSelectedRole(null);
//       setRoleUsers([]);
//       setErrorRoleUsers(null);
//       return;
//     }

//     setSelectedRole(role);
//     setLoadingRoleUsers(true);
//     setErrorRoleUsers(null);

//     try {
//       const response = await fetch(`${API_URL}/api/users/${UserId}/descendantsAndAncestors`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();

//       // Filter users based on the role's apiRole field.
//       const filteredUsers = data.filter(user => user.role === role.apiRole);
//       setRoleUsers(filteredUsers);
//     } catch (err) {
//       setErrorRoleUsers(err.message || 'Something went wrong');
//     }
//     setLoadingRoleUsers(false);
//   };

//   // Handler for sending a message using the new API endpoint
//   const handleSendMessage = async () => {
//     if (messageInput.trim() && selectedUser && UserId) {
//       const payload = {
//         senderId: UserId, // Logged-in user's ID
//         recipientId: selectedUser.userId, // Selected user's ID
//         content: messageInput.trim(),
//       };

//       try {
//         const response = await fetch(`${API_URL}/api/messages/crm/send`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to send message');
//         }

//         // Optionally, fetch the updated conversation after sending the message
//         const convResponse = await fetch(
//           `${API_URL}/api/messages/crm/conversation?userId1=${UserId}&userId2=${selectedUser.userId}`
//         );
//         if (!convResponse.ok) {
//           throw new Error('Failed to fetch updated conversation');
//         }
//         const updatedConv = await convResponse.json();
//         setConversation(updatedConv);
//         setMessageInput('');
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div className="flex h-[800px] bg-[#ece5dd]">
//       {/* Left Side - Role List with Descendant Users */}
//       <div className="w-1/4 bg-white p-4 border-r border-gray-300 overflow-y-auto">
//         <h2 className="font-bold text-2xl mb-4 text-gray-800">Select Role</h2>
//         <ul className="space-y-4">
//           {roles.map((role) => (
//             <li key={role.id}>
//               <div
//                 className="flex items-center cursor-pointer p-3 hover:bg-[#25D366] hover:text-white rounded-xl transition-all"
//                 onClick={() => handleRoleSelect(role)}
//               >
//                 <span className="text-lg font-medium">{role.displayName}</span>
//               </div>
//               {/* If this role is selected, display its filtered descendant users */}
//               {selectedRole && selectedRole.id === role.id && (
//                 <div className="ml-4 mt-2">
//                   {loadingRoleUsers ? (
//                     <p>Loading users...</p>
//                   ) : errorRoleUsers ? (
//                     <p className="text-red-600">Error: {errorRoleUsers}</p>
//                   ) : roleUsers.length > 0 ? (
//                     <ul className="space-y-2">
//                       {roleUsers.map((user) => (
//                         <li
//                           key={user.userId}
//                           className="cursor-pointer p-2 hover:bg-gray-100 rounded"
//                           onClick={() => handleUserSelect(user)}
//                         >
//                           <p className="font-medium">
//                             {user.firstName} {user.lastName}
//                           </p>
//                           <p className="text-sm text-gray-600">{user.email}</p>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-gray-600">No users found for this role.</p>
//                   )}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right Side - Chat Window */}
//       <div className="flex-1 bg-white p-6 flex flex-col">
//         {selectedUser ? (
//           <>
//             <header className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <span className="text-2xl font-bold">
//                   Chat with {selectedUser.firstName} {selectedUser.lastName}
//                 </span>
//               </div>
//             </header>

//             <div className="flex-1 overflow-y-auto mb-4">
//               {loadingConversation ? (
//                 <div>Loading conversation...</div>
//               ) : errorConversation ? (
//                 <div className="text-red-500">{errorConversation}</div>
//               ) : conversation.length > 0 ? (
//                 conversation.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${
//                       message.senderId === UserId ? 'justify-end' : 'justify-start'
//                     } mb-4`}
//                   >
//                     <div
//                       className={`max-w-[70%] px-4 py-2 rounded-xl ${
//                         message.senderId === UserId
//                           ? 'bg-[#25D366] text-white rounded-br-none'
//                           : 'bg-[#f1f1f1] text-black rounded-bl-none'
//                       }`}
//                     >
//                       {message.content}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No conversation yet.</p>
//               )}
//             </div>

//             <div className="flex items-center mt-auto border-t border-gray-300 pt-4">
//               <input
//                 type="text"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 className="border border-gray-300 p-3 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]"
//                 placeholder="Type a message..."
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-[#25D366] text-white px-6 py-3 ml-3 rounded-full hover:bg-[#128C7E] transition-colors"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center text-center text-gray-600 flex-1">
//             <p className="text-lg">Select a user to start chatting...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default adminchatPage;

// ChatPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from "../redux/api/api";

const adminchatPage = () => {
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.auth?.userId);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const [selectedRole, setSelectedRole] = useState(null);
  const [roleUsers, setRoleUsers] = useState([]);
  const [loadingRoleUsers, setLoadingRoleUsers] = useState(false);
  const [errorRoleUsers, setErrorRoleUsers] = useState(null);

  const [conversation, setConversation] = useState([]);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [errorConversation, setErrorConversation] = useState(null);

  const roles = [
    { id: 1, displayName: 'MASTER ADMIN', apiRole: 'MASTER_ADMIN' },
    { id: 2, displayName: 'TOP LEVEL', apiRole: 'TOP_LEVEL' },
    { id: 3, displayName: 'MID LEVEL', apiRole: 'MID_LEVEL' },
    { id: 4, displayName: 'TEAM LEADER', apiRole: 'TEAM_LEADER' },
    { id: 5, displayName: 'SUPPORT SERVICE', apiRole: 'SUPPORT_SERVICE' },
    { id: 6, displayName: 'MANAGEMNT GOVERMENT', apiRole: 'GOVERMENT_MANAGEMENT' },
    { id: 7, displayName: 'GOVERMENT', apiRole: 'GOVERMENT' },
    { id: 8, displayName: 'TEMPLE ADMIN', apiRole: 'TEMPLE_ADMIN' },
    { id: 9, displayName: 'GUIDE', apiRole: 'GUIDE' },
  ];

  useEffect(() => {
    if (selectedUser && UserId) {
      const fetchConversation = async () => {
        setLoadingConversation(true);
        setErrorConversation(null);
        try {
          const response = await fetch(
            `${API_URL}/api/messages/crm/conversation?userId1=${UserId}&userId2=${selectedUser.userId}`
          );
          if (!response.ok) throw new Error('Failed to fetch conversation');
          const data = await response.json();
          setConversation(data);
        } catch (err) {
          setErrorConversation(err.message || 'Something went wrong');
        }
        setLoadingConversation(false);
      };
      fetchConversation();
    }
  }, [selectedUser, UserId]);

  const handleUserSelect = (user) => setSelectedUser(user);

  const handleRoleSelect = async (role) => {
    if (selectedRole && selectedRole.id === role.id) {
      setSelectedRole(null);
      setRoleUsers([]);
      setErrorRoleUsers(null);
      return;
    }

    setSelectedRole(role);
    setLoadingRoleUsers(true);
    setErrorRoleUsers(null);

    try {
      const response = await fetch(`${API_URL}/api/users/${UserId}/descendantsAndAncestors`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const filteredUsers = data.filter(user => user.role === role.apiRole);
      setRoleUsers(filteredUsers);
    } catch (err) {
      setErrorRoleUsers(err.message || 'Something went wrong');
    }
    setLoadingRoleUsers(false);
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedUser && UserId) {
      const payload = {
        senderId: UserId,
        recipientId: selectedUser.userId,
        content: messageInput.trim(),
      };

      try {
        const response = await fetch(`${API_URL}/api/messages/crm/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to send message');

        const convResponse = await fetch(
          `${API_URL}/api/messages/crm/conversation?userId1=${UserId}&userId2=${selectedUser.userId}`
        );
        if (!convResponse.ok) throw new Error('Failed to fetch updated conversation');
        const updatedConv = await convResponse.json();
        setConversation(updatedConv);
        setMessageInput('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[800px] bg-[#ece5dd]">
      <div className="w-full md:w-1/4 bg-white p-4 border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
        <h2 className="font-bold text-xl md:text-2xl mb-4 text-gray-800">Select Role</h2>
        <ul className="space-y-4">
          {roles.map((role) => (
            <li key={role.id}>
              <div
                className="flex items-center cursor-pointer p-3 hover:bg-[#25D366] hover:text-white rounded-xl transition-all"
                onClick={() => handleRoleSelect(role)}
              >
                <span className="text-base md:text-lg font-medium">{role.displayName}</span>
              </div>
              {selectedRole && selectedRole.id === role.id && (
                <div className="ml-4 mt-2">
                  {loadingRoleUsers ? (
                    <p>Loading users...</p>
                  ) : errorRoleUsers ? (
                    <p className="text-red-600">Error: {errorRoleUsers}</p>
                  ) : roleUsers.length > 0 ? (
                    <ul className="space-y-2">
                      {roleUsers.map((user) => (
                        <li
                          key={user.userId}
                          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                          onClick={() => handleUserSelect(user)}
                        >
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No users found for this role.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:flex-1 bg-white p-4 md:p-6 flex flex-col">
        {selectedUser ? (
          <>
            <header className="flex items-center justify-between mb-6">
              <span className="text-lg md:text-2xl font-bold">
                Chat with {selectedUser.firstName} {selectedUser.lastName}
              </span>
            </header>

            <div className="flex-1 overflow-y-auto mb-4">
              {loadingConversation ? (
                <div>Loading conversation...</div>
              ) : errorConversation ? (
                <div className="text-red-500">{errorConversation}</div>
              ) : conversation.length > 0 ? (
                conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.senderId === UserId ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-xl ${
                        message.senderId === UserId
                          ? 'bg-[#25D366] text-white rounded-br-none'
                          : 'bg-[#f1f1f1] text-black rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              ) : (
                <p>No conversation yet.</p>
              )}
            </div>

            <div className="flex items-center mt-auto border-t border-gray-300 pt-4">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#25D366] text-white px-5 py-2 md:px-6 md:py-3 ml-2 md:ml-3 rounded-full hover:bg-[#128C7E] transition-colors"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center text-center text-gray-600 flex-1">
            <p className="text-base md:text-lg">Select a user to start chatting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default adminchatPage;
