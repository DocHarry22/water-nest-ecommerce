"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Mail } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Thank you for subscribing!");
    setEmail("");
    setIsLoading(false);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {message && (
        <p className="mt-2 text-sm text-green-600">{message}</p>
      )}
    </form>
  );
}
