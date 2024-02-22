"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { makeData } from "./make-data";
const ShadTable = () => {
  const [data, setData] = useState(() => makeData(100));

  return (
    <Table
      style={{
        backgroundColor: "ghostwhite",
      }}
    >
      <TableCaption>shadcn-table</TableCaption>
      <TableHeader
        style={{
          backgroundColor: "tomato",
        }}
      >
        <TableRow>
          <TableHead>firstName</TableHead>
          <TableHead>lastName</TableHead>
          <TableHead>age</TableHead>
          <TableHead>visits</TableHead>
          <TableHead>progress</TableHead>
          <TableHead>status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow key={`${data.progress}_1`}>
            <TableCell className="font-medium">{data.firstName}</TableCell>
            <TableCell>{data.lastName}</TableCell>
            <TableCell>{data.age}</TableCell>
            <TableCell className="text-right">{data.visits}</TableCell>
            <TableCell className="text-right">{data.progress}</TableCell>
            <TableCell className="text-right">{data.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow
          style={{
            backgroundColor: "tomato",
          }}
        >
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ShadTable;
