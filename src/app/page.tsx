"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const data = [
  { supplier: "Løgismose", ghgEmissions: 120, waterUsage: 500, biodiversityImpact: 2, wasteManagement: 80, workforceSafety: "Good", compliance: "High" },
  { supplier: "DAVA Foods", ghgEmissions: 180, waterUsage: 700, biodiversityImpact: 5, wasteManagement: 60, workforceSafety: "Moderate", compliance: "Medium" },
  { supplier: "Munke Mølle", ghgEmissions: 95, waterUsage: 450, biodiversityImpact: 1, wasteManagement: 90, workforceSafety: "Excellent", compliance: "High" },
  { supplier: "Churney", ghgEmissions: 210, waterUsage: 900, biodiversityImpact: 7, wasteManagement: 50, workforceSafety: "Poor", compliance: "Low" },
];

const complianceColors = {
  High: "bg-green-500",
  Medium: "bg-yellow-500",
  Low: "bg-red-500",
};

export default function SupplierDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Supplier Sustainability Dashboard</h1>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Supplier Overview - ESRS Metrics</h2>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Compliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>GHG Emissions (ESRS E1)</TableHead>
                <TableHead>Water Usage (ESRS E2)</TableHead>
                <TableHead>Biodiversity Impact (ESRS E4)</TableHead>
                <TableHead>Waste Mgmt. (ESRS E5)</TableHead>
                <TableHead>Workforce Safety (ESRS S1)</TableHead>
                <TableHead>Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((supplier) => (
                <TableRow key={supplier.supplier}>
                  <TableCell>{supplier.supplier}</TableCell>
                  <TableCell>
                    <Progress value={(supplier.ghgEmissions / 250) * 100} className="w-32" />
                  </TableCell>
                  <TableCell>
                    <Progress value={(supplier.waterUsage / 1000) * 100} className="w-32" />
                  </TableCell>
                  <TableCell>{supplier.biodiversityImpact}</TableCell>
                  <TableCell>
                    <Progress value={supplier.wasteManagement} className="w-32" />
                  </TableCell>
                  <TableCell>{supplier.workforceSafety}</TableCell>
                  <TableCell>
                    <Badge className={complianceColors[supplier.compliance]}>{supplier.compliance}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">GHG Emissions per Supplier (ESRS E1)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="supplier" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ghgEmissions" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}