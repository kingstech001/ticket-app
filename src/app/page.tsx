"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import ProgressBar from "./components/ProgressBar";
import { useTicketStore } from "@/hooks/useTicketStore";

const tickets = [
  { id: 1, name: "REGULAR ACCESS", price: 0, remaining: 20, total: 52 },
  { id: 2, name: "VIP ACCESS", price: 50, remaining: 10, total: 52 },
  { id: 3, name: "VVIP ACCESS", price: 100, remaining: 5, total: 52 },
];

const TicketSelection = () => {
  const router = useRouter();
  const { ticket, setTicket } = useTicketStore();
  // No ticket is selected by default until the user selects one.
  const [count, setCount] = useState<string>("1");
  const [selectedTicket, setSelectedTicket] = useState<string>("");
  const [error, setError] = useState("");

  // Update state when a ticket is selected; no default selection.
  const handleTicketSelect = (ticketName: string) => {
    setSelectedTicket(ticketName);
    localStorage.setItem("selectedTicket", ticketName);
    setError("");
    console.log("Ticket type selected:", ticketName);
  };

  // Update ticket count and save to local storage.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setCount(value);
      localStorage.setItem("ticketCount", value || "1");
      setError("");
      console.log("Ticket count updated:", value || "1");
    }
  };

  // Ensure at least one ticket is selected when input loses focus.
  const handleBlur = () => {
    if (count === "" || Number(count) < 1) {
      setCount("1");
      localStorage.setItem("ticketCount", "1");
      console.log("Ticket count corrected to 1");
    }
  };

  // Validate inputs, merge details, save to local storage, and navigate to the next page.
  const handleNext = () => {
    const errors: string[] = [];

    if (!selectedTicket) {
      errors.push("Please select a ticket type.");
    }
    if (!count || Number(count) < 1) {
      errors.push("Please enter a valid number of tickets.");
    }
    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }

    const updatedTicket = {
      ...ticket,
      ticketType: selectedTicket,
      ticketCount: Number(count),
    };

    console.log("Saving ticket details:", updatedTicket);
    localStorage.setItem("ticket", JSON.stringify(updatedTicket));
    setTicket(updatedTicket);
    router.push("/attendee-details");
  };

  return (
    <div className="max-w-[700px] mx-auto bg-[#041E23] p-12 border border-[#0E464F] rounded-[32px] md:rounded-[40px]">
      <div className="mx-auto relative">
        <div className=" sm:flex justify-between items-center">
          <h2 className=" text-[32px]  text-[#FFFFFF] font-[Jejumyeongjo]">
            Ticket Selection
          </h2>
          <p className="text-start font-semibold text-white">Step 1 / 3</p>
        </div>
        <ProgressBar progress={30} />

        {/* Event Details */}
        <div
          className="max-w-[700px] mx-auto py-[16px] px-[25px] border border-[#0E464F] rounded-[24px] md:rounded-[40px] mt-[32px] text-center"
          style={{
            background:
              "radial-gradient(70.52% 150.71% at 0% 0%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), #02191D",
          }}
        >
          <h1 className="text-[38px] md:text-[62px] text-[#FFFFFF] road-rage">
            Techember Fest ’25
          </h1>
          <p className="text-[14px] md:text-[16px] font-[roboto] text-gray-100 max-w-[300px] mx-auto">
            Join us for an unforgettable experience at [Event Name]! Secure your spot now.
          </p>
          <p className="font-[roboto] text-gray-100 mt-[8px]">
            📍 [Event Location] || March 15, 2025 | 7:00 PM
          </p>
        </div>
        <div className="h-[4px] w-full bg-[#07373F] my-[32px]"></div>

        {/* Ticket Selection */}
        <h2 className="jost text-[#FFFFFF] text-[20px] font-semibold mb-[8px]">
          Select Ticket Type:
        </h2>
        <div className="flex flex-col sm:flex-row gap-[25px] mb-[32px] rounded-[24px] border-[#07373F] border-[1px] p-[16px]">
          {tickets.map((t) => (
            <div
              key={t.id}
              onClick={() => handleTicketSelect(t.name)}
              className={`py-[12px] pl-[12px] pr-[10px] flex-1 rounded-[12px] shadow w-full border cursor-pointer transition ${selectedTicket === t.name
                  ? "bg-[#12464E] border-[#197686]"
                  : "border-[#197686]"
                }`}
            >
              <p className="text-[#FFFFFF] font-semibold jost text-[24px]">
                {t.price === 0 ? "Free" : `$${t.price}`}
              </p>
              <h3 className="text-[16px] font-medium text-[#FAFAFA] uppercase">
                {t.name}
              </h3>
              <p className="text-[14px] text-[#AAAAAA] mt-2">
                {t.remaining} / {t.total}
              </p>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Ticket Quantity Input */}
        <div className="flex flex-col my-8">
          <h2 className="jost text-[#FFFFFF] text-[20px] font-semibold mb-2">
            Number of Tickets
          </h2>
          <div className="relative w-full">
            <input
              type="text"
              className="border border-[#07373F] p-3 w-full rounded-md bg-transparent text-white focus:outline-none custom-number-input"
              value={count}
              onChange={handleChange}
              onBlur={handleBlur}
              inputMode="numeric"
            />
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-[24px] mt-8 text-[16px]">
          <button
            className="bg-transparent border-[#24A0B5] border-[1px] text-[#24A0B5] flex-1 py-3 rounded-md transition font-[Jejumyeongjo]"
            onClick={() => {
              localStorage.removeItem("ticketCount");
              localStorage.removeItem("selectedTicket");
              router.push("/");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#24A0B5] text-[#FFFFFF] flex-1 py-3 rounded-md  transition font-[Jejumyeongjo]"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
