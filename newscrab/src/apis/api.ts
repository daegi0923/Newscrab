// 아래는 ts로 통신하는 예시임!
// // api.ts
// import axios from 'axios';

// interface User {
//   id: number;
//   name: string;
// }

// export const fetchUsers = async (): Promise<User[]> => {
//   // const response = await axios.get<User[]>('/api/users');
//   return response.data;
// };

// // UserComponent.tsx
// import React, { useEffect, useState } from 'react';
// import { fetchUsers } from './api';

// const UserComponent: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const loadUsers = async () => {
//       const fetchedUsers = await fetchUsers();
//       setUsers(fetchedUsers);
//     };
//     loadUsers();
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserComponent;
