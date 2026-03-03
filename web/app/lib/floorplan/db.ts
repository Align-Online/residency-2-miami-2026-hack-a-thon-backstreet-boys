import { createClient } from "@supabase/supabase-js";
import type { Layout } from "./types";

// Use publishable key for client-side reads/writes
// For admin operations (deletes, batch updates), use server-side API routes with secret key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// create a new layout record
export async function createLayout(layout: Layout) {
    const { data, error } = await supabase.from("layouts").insert([layout]).select();
    if (error) {
        console.error("createLayout error", error);
        throw error;
    }
    return data?.[0] as Layout | undefined;
}

// fetch layout by id
export async function getLayoutById(id: string): Promise<Layout | null> {
    const { data, error } = await supabase.from("layouts").select("*").eq("id", id).single();
    if (error) {
        console.error("getLayoutById error", error);
        return null;
    }
    return (data as Layout) || null;
}

// fetch all layouts
export async function listLayouts(): Promise<Layout[]> {
    const { data, error } = await supabase
        .from("layouts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("listLayouts error", error);
        return [];
    }
    return (data as Layout[]) || [];
}

// update an existing layout
export async function updateLayout(id: string, partial: Partial<Layout>) {
    const { data, error } = await supabase.from("layouts").update(partial).eq("id", id).select();
    if (error) {
        console.error("updateLayout error", error);
        throw error;
    }
    return data as Layout[] | undefined;
}
