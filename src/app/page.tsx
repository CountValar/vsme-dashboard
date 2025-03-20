"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const initialData = [
  { supplier: "Løgismose", ghgEmissions: 120, waterUsage: 500, biodiversityImpact: 2, wasteManagement: 80, workforceSafety: "Good", compliance: "High" },
  { supplier: "DAVA Foods", ghgEmissions: 180, waterUsage: 700, biodiversityImpact: 5, wasteManagement: 60, workforceSafety: "Moderate", compliance: "Medium" },
  { supplier: "Munke Mølle", ghgEmissions: 95, waterUsage: 450, biodiversityImpact: 1, wasteManagement: 90, workforceSafety: "Excellent", compliance: "High" },
  { supplier: "Churney", ghgEmissions: 210, waterUsage: 900, biodiversityImpact: 7, wasteManagement: 50, workforceSafety: "Poor", compliance: "Low" },
];

const complianceColors: Record<string, string> = {
  High: "bg-green-500",
  Medium: "bg-yellow-500",
  Low: "bg-red-500",
};

export default function SupplierDashboard() {
  const [filterCompliance, setFilterCompliance] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState<null | typeof initialData[0]>(null);

  const filteredData = filterCompliance === "all" ? initialData : initialData.filter(supplier => supplier.compliance === filterCompliance);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Supplier Sustainability Dashboard</h1>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Supplier Overview - ESRS Metrics</h2>
            <Select onValueChange={setFilterCompliance}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Compliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
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
              {filteredData.map((supplier) => (
                <TableRow key={supplier.supplier} onClick={() => setSelectedSupplier(supplier)} className="cursor-pointer hover:bg-gray-100">
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
                    <Badge className={complianceColors[supplier.compliance] || "bg-gray-500"}>{supplier.compliance}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedSupplier && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Supplier Profile: {selectedSupplier.supplier}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { metric: "GHG Emissions", value: selectedSupplier.ghgEmissions },
                { metric: "Water Usage", value: selectedSupplier.waterUsage },
                { metric: "Biodiversity Impact", value: selectedSupplier.biodiversityImpact },
                { metric: "Waste Mgmt.", value: selectedSupplier.wasteManagement }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <Radar name="Supplier Score" dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
            <Button onClick={() => setSelectedSupplier(null)} className="mt-4">Close Profile</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
