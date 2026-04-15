import { supabase } from "./supabase";

// 🔐 SIGN UP
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
};

// 🔐 SIGN IN
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

// 🚪 SIGN OUT
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// 👤 GET CURRENT USER
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data: data?.user, error };
};