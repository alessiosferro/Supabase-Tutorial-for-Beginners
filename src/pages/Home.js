import supabase from "../config/supabase-client";
import {useCallback, useEffect, useState} from "react";

import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [smoothies, setSmoothies] = useState(null);
    const [orderBy, setOrderBy] = useState('created_at')

    const handleDelete = async(id) => {
        setSmoothies(smoothies => smoothies
            .filter(smoothie => smoothie.id !== id)
        );
    }
    const fetchSmooties = useCallback(async () => {
        const {
            data,
            error
        } = await supabase
            .from('smoothies')
            .select()
            .order(orderBy, {
                ascending: false
            });

        if (error) {
            setFetchError('Could not fetch the smoothies');
            setSmoothies(null);
            console.log(error);
        }

        if (data) {
            setSmoothies(data);
            setFetchError(null);
        }
    }, [orderBy])

    useEffect(() => {
        void fetchSmooties();
    }, [fetchSmooties]);

    return (
        <div className="page home">
            <h2>Home</h2>

            {fetchError && (<p>{fetchError}</p>)}

            {smoothies && (
                <div className="smoothies">
                    <div className="order-by">
                        <p>Order by:</p>
                        <button onClick={() => setOrderBy('created_at')}>Time Created</button>
                        <button onClick={() => setOrderBy('title')}>Title</button>
                        <button onClick={() => setOrderBy('rating')}>Rating</button>
                    </div>
                    <div className="smoothie-grid">
                        {smoothies.map(smoothie => (
                            <SmoothieCard
                                key={smoothie.id}
                                onDelete={handleDelete}
                                smoothie={smoothie}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


export default Home