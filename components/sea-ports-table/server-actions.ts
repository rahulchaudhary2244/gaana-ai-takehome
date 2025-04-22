"use server";

import { revalidatePath } from "next/cache";
import { LocationData, LocationResponse } from "./types";

const URL = process.env.SEA_PORTS_ENDPOINT ?? "http://localhost:4000/sea-ports";

export const getSeaPorts = async ({
    _page,
    _per_page,
    _sort,
    _order,
    name,
}: {
    _page: number;
    _per_page: number;
    _sort: string;
    _order: string;
    name: string;
}) => {
    const response = await fetch(
        `${URL}?_page=${_page}&_per_page=${_per_page}&_sort=${_sort}&_order=${_order}&name=${name}`
    );
    const data = (await response.json()) as LocationResponse;
    return data;
};

export const getAllIds = async () => {
    const response = await fetch(URL);
    const data = (await response.json()) as LocationData[];
    return data.map((ele) => ele.id);
};

export const updateSeaPortInfo = async (data: LocationData) => {
    try {
        await fetch(`${URL}/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        revalidatePath("/");
        return { success: true };
    } catch {
        return { success: false };
    }
};

export const addSeaPortInfo = async (data: LocationData) => {
    try {
        const ids = await getAllIds();
        if (ids.includes(data.id))
            return { success: false, message: "ID already exist" };

        await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        revalidatePath("/");
        return { success: true };
    } catch {
        return { success: false };
    }
};

export const deleteSeaPortInfo = async ({ id }: Pick<LocationData, "id">) => {
    try {
        await fetch(`${URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        revalidatePath("/");
        return { success: true };
    } catch {
        return { success: false };
    }
};
