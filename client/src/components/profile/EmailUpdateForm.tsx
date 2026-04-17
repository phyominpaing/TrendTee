import { Mail } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { emailUpdateSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmailUpdateFormProps {
  email: string;
}

type FormValues = z.infer<typeof emailUpdateSchema>;

const EmailUpdateForm = ({ email }: EmailUpdateFormProps) => {
  const [newEmail, setNewEmail] = useState(email);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <Mail className="size-4 text-slate-400" />
        Email address
      </label>
      <Input
        value={newEmail}
        onChange={handleEmailChange}
        className="h-11 rounded-xl border-slate-200 bg-white"
      />
    </div>
  );
};

export default EmailUpdateForm;
