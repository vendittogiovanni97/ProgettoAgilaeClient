"use client";

import AgilaeNotify from "@/module/common/components/AgilaeNotify";
import { useState } from "react";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-end p-4">
      <AgilaeNotify onClick={toggleNotifications} />
    </div>
  );
}
