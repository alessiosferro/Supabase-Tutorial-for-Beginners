import {Link} from "react-router-dom";
import supabase from "../config/supabase-client";

const SmoothieCard = ({ smoothie, onDelete }) => {
    const handleDelete = async() => {
        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)
            .select();

        if (data) {
            console.log({ data });
            onDelete(smoothie.id);
        }

        if (error) {
            console.log({ error });
        }
    }

    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="buttons">
                <Link to={`/${smoothie.id}`}>
                    <i className="material-icons">edit</i>
                </Link>

                <button onClick={handleDelete} aria-label="Delete smoothie">
                    <i className="material-icons">delete</i>
                </button>
            </div>
        </div>
    );
}

export default SmoothieCard;