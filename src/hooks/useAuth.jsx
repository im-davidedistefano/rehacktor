import { useState, useEffect } from 'react';
import supabase from "../supabase/client.js";

function useAuth() {
    const [sessione, setSessione] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSessione(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSessione(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        let ignore = false;
        async function getProfile() {
            setLoading(true);
            const { user } = sessione;

            const { data, error } = await supabase
                .from('profiles')
                .select(`*`)
                .eq('id', user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setProfile(data);
                }
            }

            setLoading(false);
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [sessione]);

    return {
        sessione,
        loading,
        profile,
    };
}

export default useAuth;
