import React from "react";
import { ResponsiveBar } from '@nivo/bar'
import uniqid from 'uniqid';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useRef } from "react";

export default function CreateCard(props) {
    
  const handleKey = props.handleKey
  let graphOneData;
  let graphTwoData;
  let graphThreeData;
  
  props = props.currentOpp

  
  
   if (props.probabilityHistory != null) {
      graphOneData = props.probabilityHistory.map(item => {
      let newItem = {...item}
      newItem.pilytixProb = newItem.pilytixProb * 100
      newItem.repProb = newItem.repProb * 100
      return newItem
    })
   }

   if (props.pilytixFactorsIncreasingWin != null) {
      graphTwoData = props.pilytixFactorsIncreasingWin.map(item => {
        let newItem = {...item}
        return newItem
      })
   }
   
   if (props.pilytixFactorsDecreasingWin != null) {
      graphThreeData = props.pilytixFactorsDecreasingWin.map(item => {
        let newItem = {...item}
        return newItem
      })
      
   }
  
  
    
  const cardRef = useRef()

    useEffect(() => {
      cardRef.current.focus()
      document.body.style.overflow = "hidden"
    })

    
    let name = props.oppName.split(" - ")

    return (
      
        <div className="card-container" key={props.oppId} tabIndex={0}ref={cardRef} onKeyDown={(event) => { handleKey(event)}}>
          <div className="business-type">{name[0]}</div>
          <div className="year">{name[1]}</div>
          <div className="product-type">{props.product}</div>
          <h2 className="title">{name[2]}</h2>
          <div className="rep-name">{`Rep: ${props.salesRepName}`}</div>
          <div className="rep-prob">{'Rep. Probability:' + ' ' + (props.repProbability) * 100 + "%" }</div>
          <div className="stars">{props.pilytixTier}</div>
          <div className="amount">{'$' + props.amount.toLocaleString({style: 'currency', currency:'USD'})}</div>
          <div className="stage">{'Stage' + props.stage}</div>
            
            {props.probabilityHistory != null &&
              <div style={{
                height: 200 + 'px',
                gridColumn: 'span 3'
              }}>
                
                  <ResponsiveBar 
                    data={graphOneData}
                    keys={[
                      'pilytixProb',
                      'repProb'
                    ]}
                    
                    indexBy="daysAgo"
                    axisLeft={{
                      tickPadding: 3,
                      tickSize: 0,
                      legendOffset: -35,
                      legend: 'probability'
                    }}
                    axisBottom={{
                      tickPadding: 3,
                      tickSize: 0,
                      legendOffset: 20,
                      legend: 'days ago'
                    }}
                    margin={{
                      left: 60,
                      bottom: 30,
                      top: 50,
                      right: 80
                    }}
                    minValue={0}
                    maxValue={100}
                    
                  />
              </div>
            }
            
            {props.pilytixFactorsIncreasingWin != null &&
              <div style={{gridColumn: "span 3", marginTop: 20 + 'px'}}>PILYTIX Factors Increasing Win
                <TableContainer component={Paper}>
                  <Table sx={{minHeight: 300}}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Weight</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {graphTwoData.map((row) => (
                        
                        <TableRow key={uniqid()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">{row.name}</TableCell>
                          <TableCell>{row.message}</TableCell>
                          <TableCell>{`${row.weight.value} -- ${row.weight.description}`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            }
            
            {props.pilytixFactorsDecreasingWin != null &&
              <div style={{gridColumn: "span 3"}}>PILYTIX Factors Decreasing Win
                <TableContainer component={Paper} sx={{marginTop: 20 + 'px'}}>
                  <Table className="dec-table" sx={{minHeight: 300}}>
                    <TableHead>
                      <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Weight</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {graphThreeData.map((row) => (
                          <TableRow key={uniqid()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.message}</TableCell>
                            <TableCell align="right">{`${row.weight.value} -- ${row.weight.description}`}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            }
        </div>
      
    )
  
}