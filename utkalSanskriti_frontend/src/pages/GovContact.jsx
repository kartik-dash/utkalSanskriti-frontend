import React, { useState, useEffect } from "react";
import { API_URL } from "../redux/api/api";

const GovContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/contacts/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading contacts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Contact List</h2>
      <div className="createuser overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-sm sm:text-base border p-2">Full Name</th>
            <th className="text-sm sm:text-base border p-2">Email</th>
            <th className="text-sm sm:text-base border p-2">Phone</th>
            <th className="text-sm sm:text-base border p-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <tr key={index} className="text-center border-b">
                <td className="text-xs sm:text-base border p-2">{contact.fullName}</td>
                <td className="text-xs sm:text-base border p-2">{contact.email}</td>
                <td className="text-xs sm:text-base border p-2">{contact.phone}</td>
                <td className="text-xs sm:text-base border p-2">{contact.msg}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-xs sm:text-base border p-2 text-center text-gray-500">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default GovContact;
