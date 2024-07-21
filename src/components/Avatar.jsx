import { useEffect, useState } from 'react';
import supabase from "../supabase/client.js";
import '../assets/scss/components/Avatar.scss'
import imageNotAvailable from './../assets/img/image-not-available.jpg'

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage
                .from('avatars')
                .download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.log('Error downloading image: ', error.message);
        }
    }

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    async function uploadAvatar(event) {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(event, filePath);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <>
            <div className="position-relative">
                <img
                    src={avatarUrl ? avatarUrl : imageNotAvailable}
                    alt="Avatar"
                    className="propic mb-2"/>
                <div>
                    <input
                        className="uploadImg my-3"
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                    />
                </div>
            </div>
        </>
    )
}
