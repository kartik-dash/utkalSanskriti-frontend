import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSosData } from '../redux/thunks/emergencysosThunks';

const EmergencyService = () => {
  const dispatch = useDispatch();
  const { emergenysos, status, error } = useSelector((state) => state.emergenysos);
  const userId = useSelector((state) => state.auth?.userId);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSosData());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  // Filter out rows where sendEmailToGuide is false
  const filteredSOS = emergenysos.filter(item => item.sendEmailToGuide);

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Emergency Service Requests</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Booking Id</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Message</th>
            {/* <th className="py-2 px-4 border-b">Guide</th> */}
            <th className="py-2 px-4 border-b">Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredSOS.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 px-4 text-center">{item.bookingId}</td>
              <td className="py-2 px-4 text-center">
                {`${item.client.firstName} ${item.client.lastName}`}
              </td>
              <td className="py-2 px-4 text-center">{item.client.email}</td>
              <td className="py-2 px-4 text-center">{item.client.contactNumber}</td>
              <td className="py-2 px-4 text-center">{item.description}</td>
              {/* <td className="py-2 px-4 text-center">{item.sendEmailToGuide.toString()}</td> */}
              <td className="py-2 px-4 text-center">{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmergencyService;
