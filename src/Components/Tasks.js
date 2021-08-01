function Tasks(props) {

    return (
        <div className="App">
            <h3>Tasks :</h3>

            <ul>
                {
                    props.titles.map((title, index) => {
                        return <li key={index}>{title}</li>
                    })
                }
            </ul>


        </div>
    );
}

export default Tasks;