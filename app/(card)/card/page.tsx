"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { randomUUID } from "crypto";
import { Apple } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CardPage = () => {
  const router = useRouter();

  const handleLabelClick = (id: string) => {
    router.push(`/card/${id}`);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          {/* <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
          </div> */}

          <div className="flex gap-3">
            {cardData.map((item) => (
              <Label
                key={item.id}
                htmlFor="apple"
                onClick={() => handleLabelClick(item?.id)}
                className="flex items-center justify-center rounded-md border-2 border-muted bg-red-200 bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {item.state}
                {item.price}
              </Label>
            ))}
            {/* <RadioGroupItem value="apple" id="apple" className="peer sr-only" /> */}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default CardPage;

const cardData = [
  {
    id: "1",
    state: "편성대기",
    price: "1000000",
  },
  {
    id: "2",
    state: "작업대기",
    price: "1000000",
  },
  {
    id: "3",
    state: "작업진행",
    price: "1000000",
  },
  {
    id: "4",
    state: "검수대기",
    price: "1000000",
  },
  {
    id: "5",
    state: "검수진행",
    price: "1000000",
  },
  {
    id: "6",
    state: "검수반려",
    price: "1000000",
  },
  {
    id: "7",
    state: "재작업",
    price: "1000000",
  },
  {
    id: "8",
    state: "최종완료",
    price: "10000000",
  },
];
