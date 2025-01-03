import classes from "./RecepieDetails.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const RecepieDetails = (match) => {
    const history = useHistory();
    const id = match.match.params.id;
    const [details,setDetails]= useState({});
    const  fetchDetails = async ()=> {
        const data= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const response= await data.json();
        setDetails(response.meals[0]);
        console.log(response.meals[0]);
    }

    const ingredients= [];
    for (let i=1; i<=20;i++){
        if (details[`strIngredient${i}`]){
            ingredients.push(`${details[`strIngredient${i}`]} - ${details[`strMeasure${i}`]}`);
        }
        else{
            break;
        }
    }
    
    useEffect(fetchDetails,[]);
    return (  
        
        <div className={classes.RecepieDetails}>
            <button className={classes.CloseButton} onClick={() => history.goBack()}>X</button>

            <h1>{details.strMeal}</h1>
            <div className={classes.Content}>
                <div className={classes.ImageDetails}>
                    <img src={details.strMealThumb} alt={details.strMeal} />
                </div>
                <div className={classes.Instructions}>
                    <h3>Ingredients:</h3><br></br>
                    <ul className={classes.Ingredients}>
                        {ingredients.map((e, id) => (
                            <li key={id}>{e}</li>
                        ))}
                    </ul><br></br><br></br>
                    <h3>Instructions:</h3><br></br>
                    <p>{details.strInstructions}</p><br></br>
                    <a href={details.strYoutube} target="_blank" rel="noopener noreferrer">
                        Here is a YouTube video to help you if you're stuck!
                    </a>
                </div>
            </div>
        </div>

    );
}
 
export default RecepieDetails;