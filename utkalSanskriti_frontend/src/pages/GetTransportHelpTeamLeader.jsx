import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchTransportRequestsTeamLeader } from '../redux/thunks/transportThunks';



const GetTransportHelpTeamLeader = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.transportHelp);
  const UserId = useSelector((state) => state.auth?.userId);


  useEffect(() => {
    if (UserId) {
      dispatch(fetchTransportRequestsTeamLeader(UserId));
    }
  }, [dispatch, UserId]);


  if (loading) return <div>Loading transport help requests...</div>;
  if (error) return <div>Error: {error} </div>;


  return (
    <div className="w-full mx-auto p-4">
      <h2 className='text-black text-base sm:text-2xl font-bold mt-4 mb-4'>Transport Help Requests</h2>
      {requests.length === 0 ? (
        <p>No Transport Requests Are Availabe</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="createuser overflow-x-auto">
        <table className='min-w-full bg-white border border-gray-300 whitespace-nowrap'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='text-sm sm:text-base py-2 px-2 border-b'>Help Message Id</th>
              <th className='text-sm sm:text-base py-2 px-2 border-b'>User Id</th>
              <th className='text-sm sm:text-base py-2 px-2 border-b'>Message</th>
              <th className='text-sm sm:text-base py-2px-2 border-b'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.helpMessageId} className='border-b'>
                <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.helpMessageId}</td>
                <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.userId}</td>
                <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.message}</td>
                <td className="text-xs sm:text-base py-2 px-4 text-center">
                  {new Date(request.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </div>
      )}
    </div>
  )
}

export default GetTransportHelpTeamLeader


