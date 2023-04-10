import { gql, useQuery } from "@apollo/client";
import "./App.css";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <h1>loading ....</h1>;
  if (error) return <h2>Error: {error.message}</h2>;
  return (
    <div className="App">
      <h1>Apollo Server</h1>
      <div style={{textAlign:"center",gap:"2rem", display:"flex", flexWrap:"wrap", marginBlock:"auto"}}>
        {data.locations?.map(({ id, name, description, photo }) => {
          return (
            <div key={id} style={{border:"2px solid black", display:"flex", flexDirection:"column", alignItems:"center", width:"500px", padding:"1rem"}}>
              <h2>{name}</h2>
              <p>{description.slice(0, 100)}</p>
              <img src={photo} height={200} width={200}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
