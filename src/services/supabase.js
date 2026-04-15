import { createClient } from "@supabase/supabase-js";

const supabaseUrl="https://dvvdfpvekgyatqiyniby.supabase.co"
const supabaseKey="sb_publishable_2Rn3sbpTJt7TVlcPnlqxVg_47anHGUj"

export const supabase = createClient(supabaseUrl, supabaseKey);