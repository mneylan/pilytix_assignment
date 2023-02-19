import "./styles.css";
import BasicTable from "./Table";
import { useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function App() {
  
  let data = [
    {
      "daysAgo": 28,
      "pilytixProb": 0.11,
      "repProb": 0.05
    },
    {
      "daysAgo": 21,
      "pilytixProb": 0.1,
      "repProb": 0.1
    },
    {
      "daysAgo": 14,
      "pilytixProb": 0.17,
      "repProb": 0.2
    },
    {
      "daysAgo": 7,
      "pilytixProb": 0.25,
      "repProb": 0.2
    }
  ]

  const bodyRef = useRef()
  return (
    <div className="App" ref={bodyRef}>
      <h2 className="pilytix-title">PILYTIX Scored Opportunities</h2>
      <BasicTable body={bodyRef}></BasicTable>

      {/* <div style={{height: 500 + 'px'}}>
        <ResponsiveBar 
          data={data}
          keys={['pilytixProb', 'repProb']}
          axisLeft={{
            legend: "probability"
          }}
          axisRight={{
            legend: "days ago"
          }}
        /> */}
      {/* </div> */}
        
    </div>
  );
}
