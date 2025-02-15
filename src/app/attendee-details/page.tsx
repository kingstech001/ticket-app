"use client";
import { useRouter } from "next/navigation";
import { useTicketStore } from "@/hooks/useTicketStore";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import Image from "next/image";

export default function FormPage() {
  const router = useRouter();
  const { ticket, setTicket } = useTicketStore();

  // On mount, load the stored ticket details (if any) and update the global store and local state.
  useEffect(() => {
    const storedTicket = localStorage.getItem("ticket");
    if (storedTicket) {
      const parsedTicket = JSON.parse(storedTicket);
      setTicket(parsedTicket);
      // Optionally update local state so that the form shows any previously entered values
      setName(parsedTicket.name || "");
      setEmail(parsedTicket.email || "");
      setAbout(parsedTicket.about || "");
      setAvatar(parsedTicket.avatar || "");
      console.log("Loaded ticket details from localStorage:", parsedTicket);
    }
  }, [setTicket]);

  // Initialize form state from the (possibly updated) ticket store.
  const [name, setName] = useState(ticket.name || "");
  const [email, setEmail] = useState(ticket.email || "");
  const [about, setAbout] = useState(ticket.about || "");
  const [avatar, setAvatar] = useState(ticket.avatar || "");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    about?: string;
    avatar?: string;
  }>({});

  // Simple email regex for validation
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      about?: string;
      avatar?: string;
    } = {};

    if (!name.trim()) newErrors.name = "Full Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!isValidEmail(email))
      newErrors.email = "Enter a valid email address.";
    if (!about.trim())
      newErrors.about = "Please provide details about the project.";
    if (!avatar) newErrors.avatar = "Please upload an image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setAvatar(base64data);
      };
      reader.readAsDataURL(file);
      // Reset the file input value so that the same file can be re-uploaded if needed
      event.target.value = "";
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      // Merge the details from the selection page (which now should include the correct ticket type and count)
      // with the form details.
      const ticketDetails = { ...ticket, name, email, about, avatar };
      console.log("Ticket details from selection page:", ticket);
      console.log("Merged ticket details:", ticketDetails);
      // Save details (including image as base64) to localStorage
      localStorage.setItem("ticket", JSON.stringify(ticketDetails));
      // Update the store
      setTicket(ticketDetails);
      // Navigate to the preview page
      router.push("/preview");
    }
  };

  return (
    <main className="max-w-[700px] mx-auto bg-[#041E23] p-[20px] md:p-[48px] border border-[#0E464F] rounded-[20px] md:rounded-[40px]">
      <div className="relative">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] md:text-[32px] mb-4 text-[#FFFFFF] font-[Jejumyeongjo]">
            Attendee Details
          </h2>
          <p className="text-start font-semibold text-white">Step 1 / 3</p>
        </div>

        <ProgressBar progress={60} />

        <div className="p-[24px] rounded-[24px] md:rounded-[32px] bg-[#08252B] border-[1px] border-[#0E464F] my-[32px]">
          <div className="bg-[#052228] border-[1px] border-[#07373F] rounded-[24px] px-[24px] pt-[24px] pb-[68px]">
            <h2 className="font-roboto text-gray-100 text-[16px] mb-[10px]">
              Upload Profile Photo
            </h2>
            {/* Image Upload */}
            <div className="relative mt-6 w-full h-[200px] md:bg-[#00000049]">
              <label
                htmlFor="imageUpload"
                className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer w-full h-full max-w-[240px] sm:h-[240px]"
              >
                {avatar ? (
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                    {/* User Uploaded Image */}
                    <Image
                      src={avatar}
                      alt="Avatar preview"
                      fill
                      unoptimized
                      className="object-cover rounded-[32px] transition-opacity duration-300 group-hover:opacity-50"
                    />
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-[#0000000a] bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center">
                      <HiOutlineCloudDownload size={40} className="mb-2" />
                      <span className="text-[16px] max-w-[192px]">
                        Drag & drop or click to upload
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="flex justify-center flex-col items-center h-full border-[#24A0B5] border-[4px] bg-[#0E464F] p-[24px] rounded-[32px] w-full text-center text-[16px] text-[#fafafa]">
                    <HiOutlineCloudDownload size={27} />
                    Drag & drop or click to upload
                  </span>
                )}
              </label>

              {/* Hidden File Input */}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

            </div>
          </div>
          {/* Error Message */}
          {errors.avatar && (
            <p className="text-red-500 text-sm mt-2">{errors.avatar}</p>
          )}
          <div className="h-[4px] w-full bg-[#07373F] my-[32px]"></div>

          {/* Full Name Input */}
          <div className="mt-6 w-full">
            <label htmlFor="FullName" className="block text-[#dbdfe0] mb-[8px]">
              Enter your name
            </label>
            <input
              id="FullName"
              name="FullName"
              type="text"
              className={`border border-[#07373F] p-3 w-full rounded-md bg-transparent text-white focus:outline-none ${errors.name ? "border-red-500" : ""
                }`}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mt-4 w-full">
            <label htmlFor="email" className="block text-[#dbdfe0] mb-[8px]">
              Enter your email *
            </label>
            <div className="relative">
              {/* Icon positioned inside the input */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MdOutlineEmail className="text-[#ffffff]" size={20} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                className={`border border-[#07373F] p-3 w-full rounded-md bg-transparent text-white pl-10 focus:outline-none placeholder-white ${errors.email ? "border-red-500" : ""
                  }`}
                placeholder="hello@avioflagos.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* About Input */}
          <div className="mt-4 w-full">
            <label htmlFor="about" className="block text-[#dbdfe0] mb-[8px]">
              Special request?
            </label>
            <textarea
              id="about"
              name="about"
              className={`border border-[#07373F] p-3 w-full rounded-md bg-transparent text-white focus:outline-none ${errors.about ? "border-red-500" : ""
                }`}
              placeholder="Textarea"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
            ></textarea>
            {errors.about && (
              <p className="text-red-500 text-sm mt-1">{errors.about}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-[24px] mt-8 text-[16px]">
            <button
              onClick={() => router.back()}
              className="flex-1 border border-[#24A0B5] text-[#24A0B5] py-3 rounded-md  transition hover:bg-[#24A0B5] hover:text-white font-[Jejumyeongjo]"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 bg-[#24A0B5] text-white py-3 rounded-md  transition hover:bg-[#1F9AA8] font-[Jejumyeongjo]"
            >
              Get My Ticket Free
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
