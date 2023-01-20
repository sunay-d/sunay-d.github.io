
export default function Card(props) {
    return(
        <section>
            <img className="photo" src={props.card.imageUrl}/>
            <div className="info">
                <div className="location">
                    <i className="fa fa-map-marker"></i>
                    <p>{props.card.location.toUpperCase()}</p>
                    <a href={props.card.googleMapsUrl}>View on Google Maps</a>
                </div>
                <h2>{props.card.title}</h2>
                <p className="date">{`${props.card.startDate}-${props.card.endDate}`}</p>
                <p className="description">{props.card.description}</p>
                <hr/>
            </div>       
        </section>
    )
}