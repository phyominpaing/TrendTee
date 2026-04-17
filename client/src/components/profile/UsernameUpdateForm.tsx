import { User2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

interface UsernameUpdateFormProps {
  name: string;
}

const UsernameUpdateForm = ({ name }: UsernameUpdateFormProps) => {
  const [username, setUsername] = useState(name);
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        <User2 className="size-4 text-slate-400" />
        Full name
      </label>
      <Input
        value={username}
        onChange={handleUsernameChange}
        className="h-11 rounded-xl border-slate-200 bg-white"
      />
    </div>
  );
};

export default UsernameUpdateForm;
