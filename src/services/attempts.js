import { supabase } from "./supabase";

// 💾 SAVE ATTEMPT
export const saveAttempt = async ({
  user_id,
  course_id,
  weeks,
  score,
  total,
}) => {
  const { data, error } = await supabase.from("attempts").insert([
    {
      user_id,
      course_id,
      weeks,
      score,
      total,
    },
  ]);

  return { data, error };
};

// 📊 GET USER ATTEMPTS
export const getAttempts = async (user_id) => {
  const { data, error } = await supabase
    .from("attempts")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  return { data, error };
};