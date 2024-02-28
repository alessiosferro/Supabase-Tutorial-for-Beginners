import supabase from "../config/supabase-client";
import {useEffect, useState} from "react";

import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [smoothies, setSmoothies] = useState(null);

    const fetchSmooties = async () => {
        const {
            data,
            error
        } = await supabase
            .from('smoothies')
            .select();

        if (error) {
            setFetchError('Could not fetch the smoothies');
            setSmoothies(null);
            console.log(error);
        }

        if (data) {
            setSmoothies(data);
            setFetchError(null);
        }
    }

    useEffect(() => {
        void fetchSmooties();
    }, []);

    return (
        <div className="page home">
            <h2>Home</h2>

            {fetchError && (<p>{fetchError}</p>)}

            {smoothies && (
                <div className="smoothies">
                    {/* order-by buttons */}
                    <div className="smoothie-grid">
                        {smoothies.map(smoothie => (
                            <SmoothieCard
                                key={smoothie.id}
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