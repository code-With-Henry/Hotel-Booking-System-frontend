import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth"; // adjust path if needed

interface Props {
  onTicketCreated: () => void; // callback to refresh ticket list
}

export const TicketForm: React.FC<Props> = ({ onTicketCreated }) => {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in.");

    console.log("Sending payload:", {
      userId: user?.userId,
      subject,
      description,
    });

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          subject,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create ticket");
        return;
      }

      toast.success("Support ticket created successfully!");
      setSubject("");
      setDescription("");
      onTicketCreated(); // trigger refresh in parent
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-red-900 p-6 rounded-lg shadow-md max-w-md mx-auto space-y-6 text-white"
    >
      <h3 className="text-xl font-semibold text-orange-300">Submit New Ticket</h3>

      <div>
        <label className="block text-sm font-medium mb-2 text-orange-200">Subject</label>
        <input
          type="text"
          className="
            w-full
            border
            border-orange-400
            rounded-md
            px-4
            py-2
            text-red-900
            placeholder-red-400
            focus:outline-none
            focus:ring-2
            focus:ring-orange-300
            focus:border-orange-300
            transition
            duration-200
          "
          placeholder="Briefly describe your issue"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-orange-200">Description</label>
        <textarea
          className="
            w-full
            border
            border-orange-400
            rounded-md
            px-4
            py-2
            text-red-900
            placeholder-red-400
            focus:outline-none
            focus:ring-2
            focus:ring-orange-300
            focus:border-orange-300
            transition
            duration-200
            resize-none
          "
          rows={5}
          placeholder="Please provide more details about your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-orange-600
          text-white
          font-semibold
          py-3
          rounded-md
          hover:bg-orange-700
          disabled:bg-orange-300
          disabled:cursor-not-allowed
          transition
          duration-200
        "
      >
        {loading ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  );
};
