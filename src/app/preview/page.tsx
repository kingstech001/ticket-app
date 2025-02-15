"use client";
import { useTicketStore } from "@/hooks/useTicketStore";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../components/ProgressBar";
import html2canvas from "html2canvas";
import Image from "next/image";

// Define the default ticket (adjust based on your TicketData type)
const defaultTicket = {
  name: "",
  email: "",
  about: "",
  avatar: "",
  ticketType: "",
  ticketCount: 1,
};

export default function PreviewPage() {
  const { ticket, setTicket } = useTicketStore();
  const router = useRouter();
  const ticketRef = useRef(null);

  // On mount, restore ticket details from localStorage if not present in the store.
  useEffect(() => {
    if (!ticket.name) {
      const storedTicket = localStorage.getItem("ticket");
      if (storedTicket) {
        setTicket(JSON.parse(storedTicket));
      }
    }
  }, [ticket, setTicket]);

  const handleDownload = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "ticket.png";
      link.click();
    }
  };

  const handleBookAnotherTicket = () => {
    // Clear ticket details from localStorage and store, then navigate to booking form.
    localStorage.removeItem("ticket");
    setTicket(defaultTicket);
    router.push("/");
  };

  return (
    <div className="mx-auto bg-[#041E23] border border-[#0E464F] rounded-[24px] md:rounded-[40px] p-[24px] md:p-[48px] max-w-[700px]">
      <div className="relative">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] md:text-[32px] mb-4 text-[#FFFFFF] font-[Jejumyeongjo] ">
            Ready
          </h2>
          <p className="text-start font-semibold text-white">Step 1 / 3</p>
        </div>
        <ProgressBar progress={90} />

        <h2 className="mt-[32px] font-roboto font-bold text-[24px] text-[#fafafa] text-center">
          Your Ticket is Booked!
        </h2>
        <p className="mb-[32px] mt-[12px] text-[#fafafa] text-center text-[16px] font-roboto">
          You can download or check your email for a copy.
        </p>

        {/* Fixed-size container for the background image, ticket card and barcode */}
        <div
          ref={ticketRef}
          className="w-[300px] h-auto bg-[url('/image/TICKET.svg')] bg-no-repeat bg-cover bg-center p-4 mx-auto"
        >
          {/* Ticket Details Card */}
          <div
            className="p-[12px] rounded-[16px] md:rounded-[32px] bg-[#08252B] border border-[#0E464F] text-center text-white max-w-[260px] mx-auto"
          >
            <h1 className="text-[34px] md:text-[32px] text-[#FFFFFF] road-rage">
              Techember Fest ’25
            </h1>
            <p className="text-[10px] font-roboto text-gray-100">
              📍 04 Rumens road, Ikoyi, Lagos
            </p>
            <p className="text-[10px] font-roboto text-gray-100">
              📅 March 15, 2025 | 7:00 PM
            </p>
            {ticket.avatar && (
              <Image
                src={ticket.avatar}
                alt="Avatar"
                width={124}
                height={124}
                className="object-cover rounded-[12px] border-[4px] border-[#24A0B5] mx-auto my-[20px]"
              />
            )}

            {/* Grid for ticket details using one-sided borders */}
            <div className="mt-4 grid grid-cols-2 bg-[#08343C] p-[4px] rounded-[8px] overflow-hidden">
              <div className="p-2 border-b border-[#0E464F] text-start">
                <p className="text-[10px] uppercase text-[#506f74] font-roboto mb-[4px]">
                  Enter your name
                </p>
                <p className="text-[12px] font-medium">
                  {ticket.name || "Not Provided"}
                </p>
              </div>
              <div className="p-2 border-l border-b border-[#0E464F] text-start">
                <p className="text-[10px] uppercase text-[#506f74] font-roboto mb-[4px]">
                  Enter your email *
                </p>
                <p className="text-[12px] font-medium">
                  {ticket.email || "Not Provided"}
                </p>
              </div>
              <div className="p-2 border-t border-[#0E464F] text-start">
                <p className="text-[10px] uppercase text-[#506f74] font-roboto mb-[4px]">
                  Type
                </p>
                <p className="text-[12px] font-medium">
                  {ticket.ticketType || "Not Selected"}
                </p>
              </div>
              <div className="p-2 border-l border-t border-[#0E464F] text-start">
                <p className="text-[10px] uppercase text-[#506f74] font-roboto mb-[4px]">
                  Ticket for :
                </p>
                <p className="text-sm font-medium">
                  {ticket.ticketCount || 1}
                </p>
              </div>
              <div className="col-span-2 p-2 border-t border-[#0E464F] text-start">
                <p className="text-[10px] uppercase text-[#506f74] font-roboto mb-[4px]">
                  Special request?
                </p>
                <p className="text-[12px] font-medium">
                  {ticket.about || "Not Provided"}
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/image/BarCode.svg"
            alt="barcode"
            width={236}
            height={100}
            className="pt-[30px] block mx-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-[24px] mt-8 text-[16px]">
          <button
            onClick={handleBookAnotherTicket}
            className="text-[#24A0B5] py-3 px-4 rounded-[8px] flex-1 transition font-[Jejumyeongjo] border-[1px] border-[#24A0B5]"
          >
            Book Another Ticket
          </button>
          <button
            onClick={handleDownload}
            className="bg-[#24A0B5] text-white flex-1 py-3 rounded-[8px] transition font-[Jejumyeongjo]"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
