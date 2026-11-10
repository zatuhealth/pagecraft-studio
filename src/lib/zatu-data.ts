import ali from "@/assets/avatar-ali.jpg";
import mrs from "@/assets/avatar-mrs.jpg";
import jr from "@/assets/avatar-jr.jpg";
import cat from "@/assets/avatar-cat.jpg";
import dog from "@/assets/avatar-dog.jpg";

export type Vaccine = {
  name: string;
  description: string;
  dueDate: string;
  location: string;
  taken: boolean;
  category: "immunity" | "travel" | "high-risk";
};

export type Dependent = {
  id: string;
  name: string;
  fullName: string;
  relationship: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  avatar: string;
  vaccines: Vaccine[];
};

export const dependents: Dependent[] = [
  {
    id: "ali", name: "Ali Jjunju", fullName: "Ali Jjunju", relationship: "Self", dob: "14/03/1990",
    gender: "Male", country: "Uganda", state: "Kampala", avatar: ali,
    vaccines: [
      { name: "Hepatitis B", description: "3rd booster dose", dueDate: "2026-12-02", location: "Mulago Hospital", taken: false, category: "immunity" },
      { name: "Tetanus (Td)", description: "10-year booster", dueDate: "2025-06-10", location: "Nakasero Hospital", taken: true, category: "immunity" },
      { name: "Yellow Fever", description: "Required for travel", dueDate: "2024-01-20", location: "Entebbe Clinic", taken: true, category: "travel" },
      { name: "Influenza", description: "Seasonal flu shot", dueDate: "2026-11-30", location: "Kampala Health Centre", taken: false, category: "high-risk" },
    ],
  },
  {
    id: "mrs", name: "Mrs Jjunju", fullName: "Sarah Jjunju", relationship: "Spouse", dob: "02/08/1992",
    gender: "Female", country: "Uganda", state: "Kampala", avatar: mrs,
    vaccines: [
      { name: "HPV", description: "Final dose", dueDate: "2026-11-18", location: "Mulago Hospital", taken: false, category: "immunity" },
      { name: "Typhoid", description: "Travel protection", dueDate: "2025-04-01", location: "Entebbe Clinic", taken: true, category: "travel" },
    ],
  },
  {
    id: "jr", name: "Ali J Jr.", fullName: "Ali Jjunju Jr.", relationship: "Son", dob: "28/12/2015",
    gender: "Male", country: "Uganda", state: "Kampala", avatar: jr,
    vaccines: [
      { name: "Measles (MR)", description: "Second dose", dueDate: "2026-11-25", location: "Kisenyi HC IV", taken: false, category: "immunity" },
      { name: "Polio (OPV)", description: "Booster", dueDate: "2024-09-14", location: "Kisenyi HC IV", taken: true, category: "immunity" },
    ],
  },
  {
    id: "cat", name: "Myaw (Cat)", fullName: "Myaw", relationship: "Pet", dob: "05/05/2021",
    gender: "Female", country: "Uganda", state: "Kampala", avatar: cat,
    vaccines: [{ name: "Rabies", description: "Annual shot", dueDate: "2026-12-10", location: "Kampala Vet Clinic", taken: false, category: "immunity" }],
  },
  {
    id: "dog", name: "Maguja (Dog)", fullName: "Maguja", relationship: "Pet", dob: "11/01/2020",
    gender: "Male", country: "Uganda", state: "Kampala", avatar: dog,
    vaccines: [{ name: "DHPP", description: "Core canine vaccine", dueDate: "2026-02-03", location: "Kampala Vet Clinic", taken: true, category: "immunity" }],
  },
];

export const findDependent = (id: string) => dependents.find((d) => d.id === id);

export const appointments = [
  { id: 1, title: "General check-up", place: "Mulago Hospital", date: "Nov 12, 2026", time: "09:30", who: "Ali Jjunju", status: "upcoming" },
  { id: 2, title: "Measles vaccine", place: "Kisenyi HC IV", date: "Nov 25, 2026", time: "11:00", who: "Ali J Jr.", status: "upcoming" },
  { id: 3, title: "Dental cleaning", place: "Smile Dental", date: "Oct 02, 2026", time: "14:00", who: "Mrs Jjunju", status: "past" },
  { id: 4, title: "Rabies shot", place: "Kampala Vet Clinic", date: "Sep 18, 2026", time: "10:15", who: "Myaw (Cat)", status: "past" },
] as const;

export const invoices = [
  { id: 1, merchant: "sankarreddy777", note: "Testing", date: "2026-09-12", amount: 550, ref: "7710676592682845", status: "pending" },
  { id: 2, merchant: "Mulago Hospital", note: "Consultation", date: "2026-10-03", amount: 45000, ref: "7710676592680011", status: "paid" },
  { id: 3, merchant: "Kampala Vet Clinic", note: "Rabies vaccine", date: "2026-09-18", amount: 30000, ref: "7710676592671200", status: "paid" },
] as const;

export const transactions = [
  { id: 1, label: "Added funds", sub: "MTN Mobile Money", amount: 200000, date: "Nov 06" },
  { id: 2, label: "Mulago Hospital", sub: "Consultation", amount: -45000, date: "Oct 03" },
  { id: 3, label: "Transfer to Sarah", sub: "Wallet transfer", amount: -20000, date: "Sep 29" },
  { id: 4, label: "Kampala Vet Clinic", sub: "Rabies vaccine", amount: -30000, date: "Sep 18" },
];

export const ugx = (n: number) => `UGX ${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
