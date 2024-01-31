import React ,{ useEffect } from 'react'
import Styles from "./display.module.css"
import { useSelector } from 'react-redux';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import DataTable from 'react-data-table-component';
import { yellow } from '@mui/material/colors';
import { event } from 'jquery';


const customStyles={
  headRow:{
    style:{
      backgroundColor:'blue',
      color:'white'
    }
   
  },
  headCells:{
    style:{
      fontSize:'16px',
      fontWeight:'600',
      textTransform:'uppercase'
    }
   
  },
  cells:{
    style:{
      fontSize:'15px'
    }
  }
}
const Display = () => {
    const form1Data = useSelector((state) => state.form1.formData);
    const form2Data = useSelector((state) => state.form.formData);
    const form1DataLength = form1Data.length;
    const combinedData = form1Data.map((form1Item, index) => ({
      ...form1Item,
      ...form2Data[index], // Merging the corresponding item from form2Data
      Id: index+1,
    }));
  const columns=[
    {
      name:"Id",
      selector:row=>row.Id,
      sortable:true
   },
    {
      name:"Name",
      selector:row=>row.name,
      sortable:true
   },
    {
      name:"Age",
      selector:row=>row.age
   },
    {
      name:"Sex",
      selector:row=>row.sex
   },
    {
      name:"Mobile",
      selector:row=>row.mobile
   },
    {
      name:"Govt Issued Id Type",
      selector:row=>row.govtIdType
   },
    {
      name:"Govt Id",
      selector:row=>row.govtId
   },
    {
      name:"Address",
      selector:(row)=>row.address
   },
    {
      name:"City",
      selector:(row)=>row.city
   },
    {
      name:"Country",
      selector:(row)=>row.country,
      sortable:true
   },
    {
      name:"Pincode",
      selector:(row)=>row.pincode
   },
   {
    name:"State",
    selector:(row)=>row.state,
    sortable:true
 },
  ]

  const handleFilter=(event)=>{
    const newData=combinedData.filter(row=>row.name.toLowerCase().includees(event.target.value.toLowerCase()))
    combinedData(newData);
  }
  
  return (
    <div className={Styles.container}>
   <div style={{display:"flex",justifyContent:'right'}}>
    <input type="text" placeholder='Search...' onChange={handleFilter} style={{border:"1px solid black",padding: '6px 10px',width:"200px"}} />
   </div>

<DataTable style={{border:"1px solid red"}}
columns={columns}
data={combinedData}
customStyles={customStyles}
pagination
selectableRows
>

</DataTable>
 
    </div>
  )
}

export default Display