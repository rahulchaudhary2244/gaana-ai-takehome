"use client";

import { Input } from "@/components/ui/input";
import {
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LocationData } from "./sea-ports-table/types";
import { useState } from "react";
import { If } from "./if";

type Props = {
    initialData: Partial<LocationData>;
    onSubmit: (data: LocationData) => void;
    showIdInput?: boolean;
};

export const SeaPortForm = ({
    initialData,
    onSubmit,
    showIdInput = false,
}: Props) => {
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        name: initialData.name || "",
        city: initialData.city || "",
        country: initialData.country || "",
        province: initialData.province || "",
        timezone: initialData.timezone || "",
        code: initialData.code || "",
        coordinates: {
            lon: initialData.coordinates?.[0] || 0,
            lat: initialData.coordinates?.[1] || 0,
        },
        alias: (initialData.alias || []).join(", "),
        regions: (initialData.regions || []).join(", "),
        unlocs: (initialData.unlocs || []).join(", "),
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field?: "lon" | "lat"
    ) => {
        const { name, value } = e.target;

        if (field) {
            setFormData((prev) => ({
                ...prev,
                coordinates: {
                    ...prev.coordinates,
                    [field]: parseFloat(value),
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalData: LocationData = {
            id: formData.id,
            name: formData.name,
            city: formData.city || undefined,
            country: formData.country,
            province: formData.province || undefined,
            timezone: formData.timezone,
            code: formData.code || undefined,
            coordinates: [formData.coordinates.lon, formData.coordinates.lat],
            alias: formData.alias
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            regions: formData.regions
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            unlocs: formData.unlocs
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        };

        onSubmit(finalData);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
            <If condition={showIdInput}>
                <Input
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ID"
                />
            </If>
            <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
            />
            <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
            />
            <Input
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="Province"
            />
            <Input
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                placeholder="Timezone"
            />
            <Input
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Code"
            />
            <Input
                type="number"
                step="any"
                value={formData.coordinates.lon}
                onChange={(e) => handleChange(e, "lon")}
                placeholder="Longitude"
            />
            <Input
                type="number"
                step="any"
                value={formData.coordinates.lat}
                onChange={(e) => handleChange(e, "lat")}
                placeholder="Latitude"
            />
            <Input
                className="col-span-2"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                placeholder="Alias (comma-separated)"
            />
            <Input
                className="col-span-2"
                name="regions"
                value={formData.regions}
                onChange={handleChange}
                placeholder="Regions (comma-separated)"
            />
            <Input
                className="col-span-2"
                name="unlocs"
                value={formData.unlocs}
                onChange={handleChange}
                placeholder="Unlocs (comma-separated)"
            />

            <AlertDialogFooter className="col-span-2">
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button type="submit">Save</Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </form>
    );
};
