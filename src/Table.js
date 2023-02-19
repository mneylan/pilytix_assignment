import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateCard from "./Card";
import { useState } from "react";

import * as opportunities from "./opportunities.json";
import { readBuilderProgram } from "typescript";
import { rgbToHex } from "@mui/material";

export default function BasicTable(props) {
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  
  const [currentOpportunity, setCurrentOpportunity] = useState([]) 

  function handleRowClick(event, row) {
    // console.log("row", row);
    setCurrentOpportunity([row])
    
  }

  function handleKey(event) {
    
    let dataLength = data.length
    let currentOp = currentOpportunity[0]

    if (event.key == "ArrowRight" && currentOp.oppId + 1 <= dataLength) {
      
      setCurrentOpportunity([data[currentOp.oppId]])
    } 

    if (event.key == "ArrowLeft" && (currentOp.oppId - 1) > 0) {
      
      setCurrentOpportunity([data[currentOp.oppId - 2]])
    } 

  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{backgroundColor: '#3f51b5'}} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#2c387e',
          '& th': {
            color: '#fff'
          }
          
        }}>
          <TableRow>
            <TableCell align="left">Opp Name</TableCell>
            <TableCell align="left">Opp Stage</TableCell>
            <TableCell align="right">Rep Probability</TableCell>
            <TableCell align="right">PX Probability</TableCell>
            <TableCell align="left">PX Tier</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Sales Rep</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              onClick={(event) => handleRowClick(event, row)}
              key={row.oppId}
              sx={{ "& th": { color: '#fff' }, "& td": { color: '#fff'}, "&:last-child td, &:last-child th": { border: 0  } }}
            >
              <TableCell component="th" scope="row">
                {row.oppName}
              </TableCell>
              <TableCell align="left">{row.stage}</TableCell>
              <TableCell align="right">{row.repProbability}</TableCell>
              <TableCell align="right">{row.pilytixProbability}</TableCell>
              <TableCell align="left">{row.pilytixTier}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="left">{row.product}</TableCell>
              <TableCell align="left">{row.salesRepName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {currentOpportunity.length > 0 &&
        <div className="background" style={{height: document.body.offsetHeight + 110}} onClick={(event) =>  { if (event.target.className == "background") {
          setCurrentOpportunity([]); document.body.style.overflow = "auto"}}} >
          <CreateCard currentOpp={currentOpportunity[0]} handleKey={handleKey} />
        </div>
      }
    </TableContainer>
  );
}
