import { createClient } from "@supabase/supabase-js";

// .env.local에 저장한 키들을 가져옴
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
