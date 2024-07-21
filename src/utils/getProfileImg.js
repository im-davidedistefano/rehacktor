export default function getProfileImg(fileUrl) {
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileUrl}`;
}
