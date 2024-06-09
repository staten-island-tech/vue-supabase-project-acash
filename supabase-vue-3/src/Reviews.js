import { supabase } from "./supabase";

const reviewlist = () => {
    useEffect(() => { 
        const fetchmovies = async () => {
            const{data, error} = await supabase
            .from(Reviews)
            .select()
            
            if (data) {
                fetchmovies(data)
            }
            else {error}
            console.log(error)
            }
        })
        fetchmovies()
    }
