/**
 * Test file to verify Supabase client initialization
 * This validates that:
 * 1. Environment variables are properly set
 * 2. Supabase client initializes without errors
 * 3. Client can be imported from the expected location
 */

import { supabase } from "./client";

describe("Supabase Client", () => {
  it("should initialize successfully with valid environment variables", () => {
    expect(supabase).toBeDefined();
  });

  it("should have auth property", () => {
    expect(supabase.auth).toBeDefined();
  });

  it("should have from method for querying tables", () => {
    expect(supabase.from).toBeDefined();
    expect(typeof supabase.from).toBe("function");
  });
});
