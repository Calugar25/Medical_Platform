import React from "react";
import Table from "../commons/tables/table";

import ReactTable from 'react-table';

 const  columns = [
   
    {
        Header: 'StartDate',
        accessor: 'startDate',
    },{
        Header: 'EndDate',
        accessor: 'endDate',
    }
    ,
    {
        Header: 'IntakeInterval',
        accessor: 'intakeInterval',
    }
   // ,{
      //  Header: '',
      //  Cell: row => (
      //      <div>
        //        <button onClick={() => this.handleDelete(row.original)}>Delete</button>
       //     </div>
     //   )
  //  }

];


  const  filters = [
    {
        accessor: 'startdate',
    }
];


class MedicationTable extends React.Component {

    constructor(props) {
        super(props);
        this.selectedHandler=this.props.selectedHandler;
        this.state = {
            tableData: this.props.tableData,
            selected:null
        };
        this.getTRPropsType=this.getTRPropsType.bind(this)
    }



   // handleDelete(row)
   // {
    //    console.log("ghb",row);
    //}
    getTRPropsType(state, rowInfo) {
        if (rowInfo && rowInfo.row) {
            return {
                style: {
                    textAlign: "center",
                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                },
                onClick: (e) => {
                    console.log(this.state.tableData[rowInfo.index])
                    this.setState({
                        selected: rowInfo.index
                    }, this.selectedHandler(rowInfo.index))
                },
            };
        }
        else
            return {}
    }
    
    render() {
       
        return (
            <ReactTable
              
              
                data={this.state.tableData}
                resolveData={data => data.map(row => row)}
                columns={columns}
                defaultPageSize={5}
                getTrProps={this.getTRPropsType}
                
            />
        )
    }
}

export default MedicationTable;