import { useState } from "react";

// it seems the identifier do not accept "row-setting", which would be a better css class name
import { rowSetting } from "./App.module.css";

// const CssStyle = {
//   nthChild(even) {
//     backgroundColor: `#dddddd`;
//   }
// };

function App() {
  const [state, setState] = useState("");
  const [formatedTable, setFormatedTable] = useState("");

  // it is called by the button and check which function to execute, clearData (if there is data) or getData (if no data)
  const callButton = ()  => state ? clearData() : getData();

  // it clears the table by given null to state
  const clearData = () => setState(null);


  // it calls the http request API to get data and after that, it calls the function to format the table
  const getData = async() => {
    const addr = "https://jsonplaceholder.typicode.com/users";
    const jData = await fetch(addr);
    const data = await jData.json();
    setState(data);

    formatTable(data);
  }
  

  // table header
  const formatTableHeader = () =>
    <tr style={{background: "grey", color:"wheat"}}>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
    </tr>

  
  // table content
  const formatTableContent = d => {
    const row = d.map((e, i) => {
      return (
        <tr 
          key   = {i}
          className = { rowSetting }
          >
          <td
            style = {{border: "1px solid #dddddd", textAlign: "center"}}
          >{e.id}</td>
          <td
            style = {{border: "1px solid #dddddd", textAlign: "left", paddingLeft: "1rem"}}

          >{e.name}</td>
          <td
            style = {{border: "1px solid #dddddd", textAlign: "left", paddingLeft: "1rem"}}
          >{e.email}</td>
        </tr>
      );
    });

    return row;
  }


  // it consolidates the table
  const formatTable = dt => {
    const header = formatTableHeader();
    const body = formatTableContent(dt);

    const finalTable = 
      <table
        style={{
          borderCollapse: "collapse", 
          width: "100%", 
          marginTop:"1rem"
        }}
      >
        <thead
          style = {{border: "1px solid #dddddd"}}
        >
          { header }
        </thead>
        <tbody
          style = {{border: "1px solid #dddddd"}}
        >
          { body }
        </tbody>
      </table>

    setFormatedTable(finalTable);
  }


  return (
    <div>

      <button
        onClick = { () => callButton()}
      >
        {state ? "Clear table" : "Get Data"}
      </button>

      <div>
        {state 
          ?
            formatedTable
          :
            <h1>No data at all</h1>
        }
      </div>

    </div>
  );
}

export default App;
