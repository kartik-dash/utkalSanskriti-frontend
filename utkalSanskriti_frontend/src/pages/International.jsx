import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternationalData } from '../redux/thunks/internationalThunks';




const International = () => {
    const dispatch = useDispatch();
    const { requests, loading, error } = useSelector((state) => state.international);


    // Pagination state
const [currentPage, setCurrentPage] = useState(1);
const internationalPerPage = 10;

// Pagination logic
const indexOfLastInternational = currentPage * internationalPerPage;
const indexOfFirstInternational = indexOfLastInternational - internationalPerPage;
const currentInternational = requests.slice(indexOfFirstInternational, indexOfLastInternational);
const totalPages = Math.ceil(requests.length / internationalPerPage);


    useEffect(() => {
        dispatch(fetchInternationalData());
    }, [dispatch]);


    if (loading) return <div>Loading International Users...</div>;
    if (error) return <div className='text-red-500'>Error: {error}</div>;

    return (
        <div className="container mx-auto">
            <h2 className='text-black text-2xl font-bold mt-4 mb-4'>International Clients</h2>
            {requests.length === 0 ? (
                <p>no client found</p>
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
                        {currentInternational.map((user) => (
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
            )};
            {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center items-center gap-4">
                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                    </div>
                )}
        </div>
    );
};

export default International;