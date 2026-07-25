import { r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
function useAuth() {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return { user, session, loading };
}
export {
  useAuth as u
};
