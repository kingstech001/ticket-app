"use client";
import { useState, useEffect } from "react";

interface TicketData {
  ticketType: string;
  ticketCount: number;
  name: string;
  email: string;
  about: string;
  avatar: string; // ✅ Added avatar
}

export const useTicketStore = () => {
  const [ticket, setTicket] = useState<TicketData>({
    ticketType: "",
    ticketCount: 1,
    name: "",
    email: "",
    about: "",
    avatar: "", // ✅ Ensure this property exists
  });

  useEffect(() => {
    const savedTicket = localStorage.getItem("ticketData");
    if (savedTicket) setTicket(JSON.parse(savedTicket));
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketData", JSON.stringify(ticket));
  }, [ticket]);

  return { ticket, setTicket };
};
