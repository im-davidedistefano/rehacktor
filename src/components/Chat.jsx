import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import supabase from "../supabase/client.js";

export default function Chat({ game }) {
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);
    dayjs.extend(relativeTime);
    dayjs().locale('it').format();

    const getMessages = async () => {
        const { data: messages, error } = await supabase
            .from('messages')
            .select(
                `*,
        profile: profiles (
          username
        )`
            )
            .eq('game_id', game.id);
        if (error) {
            console.log(error.message);
        } else {
            setMessages(messages);
        }
    };

    useEffect(() => {
        getMessages();
        const subscription = supabase
            .channel('messages')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                () => getMessages()
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={chatRef}>
            {messages &&
                messages.map((message) => (
                    <div key={message.id}>
                        <div>
                            <p className="fst-italic mb-0 fw-light">{message.content}</p>
                            <p className="text-grey small mb-0 fw-bold">{message.profile.username}</p>
                            <p className="text-grey" style={{fontSize: '10px'}}>
                                {`${dayjs().to(dayjs(message.created_at))}`}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
