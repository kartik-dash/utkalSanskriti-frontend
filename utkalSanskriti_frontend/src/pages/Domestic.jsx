import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchDomestic } from '../redux/thunks/domesticThunks';

const Domestic = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.domestic);


  useEffect(() => {
    dispatch(fetchDomestic());
  }, [dispatch]);

  if (loading) return <div>Loading Domestic Users...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className='text-black text-2xl font-bold mt-4 mb-4'>Domestic Clients</h2>
      {requests.length === 0 ? (
        <p>No Clients Found</p>
      ) : (
        <table className='min-w-full bg-white border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='py-2 px-2 border-b'>Full Name</th>
              <th className='py-2 px-2 border-b'>Email</th>
              <th className='py-2 px-2 border-b'>Contact Number</th>
              <th className='py-2 px-2 border-b'>Created At</th>
              <th className='py-2 px-2 border-b'>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((user) => (
              <tr key={user.userId} className='border-b'>
                <td className='py-2 px-2 text-center'>{`${user.firstName} ${user.lastName}`}</td>
                <td className='py-2 px-2 text-center'>{user.email}</td>
                <td className='py-2 px-2 text-center'>{user.contactNumber}</td>
                <td className='py-2 px-2 text-center'>
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className='py-2 px-2 text-center'>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Domestic;
