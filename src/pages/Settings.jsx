import { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import supabase from "../supabase/client.js";
import Avatar from "../components/Avatar.jsx";

export default function Settings() {
    const { sessione } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setfirstName] = useState(null);
    const [bio, setBio] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function getProfile() {
            setLoading(true);
            const { user } = sessione;

            const { data, error } = await supabase
                .from('profiles')
                .select(`username, first_name, avatar_url, bio`)
                .eq('id', user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setfirstName(data.first_name);
                    setAvatarUrl(data.avatar_url);
                    setBio(data.bio);
                }
            }

            setLoading(false);
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [sessione]);

    async function updateProfile(event, avatarUrl) {
        event.preventDefault();

        setLoading(true);
        const { user } = sessione;

        const updates = {
            id: user.id,
            username,
            first_name,
            avatar_url,
            bio,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            setAvatarUrl(avatarUrl);
        }
        setLoading(false);
    }

    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 bg-dark text-white p-5">
                            <h1 className="mb-1">Settings</h1>
                            <p className="small text-grey mb-3 fw-bold">{sessione.user.user_metadata.username}</p>
                            <Link to={'/profile'} className="small text-grey text-decoration-none" style={{paddingLeft: '11px'}}>
                                <span className="me-2">⃪⃪</span>
                                back to your profile
                            </Link>
                        </div>
                        <div className="offset-md-2 col-md-5 py-5">
                            <form onSubmit={updateProfile} className="row form-widget">
                                <div className="col-md-6 mb-4 mb-md-0">
                                    <Avatar
                                        url={avatar_url}
                                        size={150}
                                        onUpload={(event, url) => {
                                            updateProfile(event, url);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                                        <input
                                            id="email"
                                            className="form-control rounded-0"
                                            type="text"
                                            value={sessione.user.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label fw-bold">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control rounded-0"
                                            id="username"
                                            name="username"
                                            value={username || sessione.user.user_metadata.username}
                                            onChange={(e) => (e.target.value !== '') ? setUsername(e.target.value) : setUsername(username || sessione.user.user_metadata.username)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="first_name" className="form-label fw-bold">
                                            Full name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control rounded-0"
                                            id="first_name"
                                            name="first_name"
                                            value={first_name || sessione.user.user_metadata.first_name}
                                            onChange={(e) => (e.target.value !== '') ? setfirstName(e.target.value) : setfirstName(first_name || sessione.user.user_metadata.first_name)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-2">
                                        <label htmlFor="bio" className="form-label fw-bold">
                                            Tell us something about you
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control rounded-0"
                                            id="bio"
                                            name="bio"
                                            placeholder="Type your bio here..."
                                            value={bio || ''}
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary text-white text-uppercase fw-bold border-0 rounded-0 my-3"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading ...' : 'Update'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
