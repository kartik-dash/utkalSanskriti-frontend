import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMembership } from "../redux/thunks/memberShipThunks";
import membershipImage from "../assets/logo/only-logo.png"; // Ensure correct path
import swal from "sweetalert";

export default function MembershipPage() {
  const dispatch = useDispatch();
  const clientId = useSelector((state) => state.auth.userId); // Get user ID from Redux state
  const { status, orderData, error, membershipType } = useSelector((state) => state.membership);

  const [selectedMembership, setSelectedMembership] = useState("Gold");
  const membershipFees = { Gold: 50, Premium: 100 };

  // ✅ Ensure Razorpay script is loaded before creating an instance
  useEffect(() => {
    const loadRazorpay = async () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("✅ Razorpay SDK Loaded");
        script.onerror = () => swal("Error", "Failed to load Razorpay. Try again!", "error");
        document.body.appendChild(script);
      }
    };

    loadRazorpay();
  }, []);

  useEffect(() => {
    if (status === "succeeded" && orderData) {
      let orderDetails;
      try {
        orderDetails = JSON.parse(orderData);
      } catch {
        orderDetails = orderData;
      }

      if (!window.Razorpay) {
        swal("Error", "Razorpay SDK not loaded. Please refresh and try again.", "error");
        return;
      }

      const options = {
        key: "rzp_test_LtwJVThA9sZotx", // Use your Razorpay test/live key
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: "CyfrifProUtkalSanskriti",
        description: `Membership Payment - ${membershipType}`,
        order_id: orderDetails.id,
        handler: function (response) {
          swal("Payment Successful!", `Payment ID: ${response.razorpay_payment_id}`, "success");
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        swal("Payment Failed!", response.error.description, "error");
      });

      rzp1.open();
    }
  }, [status, orderData, membershipType]);

  const handleSubscribe = async () => {
    if (!clientId) {
      swal("Error", "User ID is required!", "warning");
      return;
    }

    swal({
      title: "Confirm Subscription",
      text: `Are you sure you want to subscribe to ${selectedMembership} membership for $${membershipFees[selectedMembership]}?`,
      icon: "info",
      buttons: true,
    }).then((willProceed) => {
      if (willProceed) {
        dispatch(addMembership({
          clientId,
          membershipType: selectedMembership,
          fee: membershipFees[selectedMembership] * 100, // Convert to paisa
        }));
      }
    });
  };

  return (
    <div className="flex items-center justify-center mx-auto mt-6 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img src={membershipImage} alt="Membership" className="h-full w-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">Join Our Membership</h2>
          <p className="text-gray-600 text-center mb-4">Get exclusive access to premium benefits.</p>
          {/* 
          <div className="mb-5">
            <label className="text-gray-700 font-medium">User ID</label>
            <input 
              type="text" 
              value={clientId} 
              disabled
              className="mt-2 p-3 border rounded-md w-full bg-gray-200 text-gray-600" 
            />
          </div> */}

          <div className="mb-5">
            <label className="text-gray-700 font-medium">Membership Type</label>
            <select 
              value={selectedMembership} 
              onChange={(e) => setSelectedMembership(e.target.value)}
              className="mt-2 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500">
              {Object.keys(membershipFees).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="text-gray-700 font-medium">Membership Fee</label>
            <input 
              type="text" 
              value={`$${membershipFees[selectedMembership]}`} 
              disabled 
              className="mt-2 p-3 border rounded-md w-full bg-gray-200 text-gray-600" 
            />
          </div>

          <button 
            onClick={handleSubscribe} 
            disabled={status === "loading"}
            className={`w-full ${
              status === "loading" ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium py-3 rounded-lg transition-all duration-300`}
          >
            {status === "loading" ? "Processing..." : "Subscribe Now"}
          </button>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}

