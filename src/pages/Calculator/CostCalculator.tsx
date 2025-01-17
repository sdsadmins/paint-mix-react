import { Grid, Typography } from "@mui/material";
import CardComponent from "components/CardComponent";
import CustomButton from "components/CustomButton";
import CustomInputComponent from "components/CustomInputComponent";
import CustomSelectComponent from "components/CustomSelect";
import CustomTable from "components/CustomTable";
import CustomTextButton from "components/CustomTextButton";
import PickupDate from "components/PickupDate";
import { FC, useState } from "react";
import ViewJobCost from "./ViewJobCost";
import TableTextButton from "components/TableTextButton";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/rootReducer";

const CostCalculator:FC=()=>{
  const [costView,setCostView]=useState(false);
  const navigate =useNavigate();
   //-----------------Redux Calling-------------------------//
   const isOverflow = useSelector((state: AppState) => state.overflow.isOverflow);
   console.log("isOverflow", isOverflow);
   //-------------------------------------------------------//

     //--------------------------costForm----------------------------------------//
     const costForm = (
       <div style={{ display: 'flex', width: '100%', flexDirection: 'column',justifyContent: 'center' }}>
         <div style={{paddingBottom:'20px'}}>
            <p style={{fontWeight:600,color:"#1266F1",fontSize:'16px'}}>COMPLETED JOBS</p>
         </div>
         <Grid container gap={"15px"} sx={{display:'flex',borderTop:"1px solid #E0E0E0",padding:'24px 0px 29px 0px'}}>
         <Grid  sm={2.43} xs={12}>
             <CustomInputComponent label="Customer Name" name="FirstName" />
          </Grid>
          <Grid  sm={2.43} xs={12}>
             <CustomInputComponent label="Business Name" name="BusinessName" />
          </Grid>
          <Grid  sm={2.43} xs={12}>
            <CustomInputComponent label="Job Name" name="JobName" />
          </Grid>
          <Grid sm={2.43} xs={12}>
            <PickupDate label="Date" />
          </Grid>
          <Grid  sm={1.2} xs={12}>
            <CustomButton children={"Filter"} />
          </Grid>
          </Grid>
       
       </div>
     )
     //------------------------------------------------------------------------------//
     

     //--------------------------------Completed JobList Table-----------------------//

     const ViewDetail=()=>{
        setCostView(!costView);
     }
        const jobListColumns = [
            {name:'Customer Name',datan:'CustomerName'},
            {name:'Business Name',datan:'BusinessName'},
            {name:'Job Name',datan:'JobName'},
            {name:'Date',datan:'Date'},
            {name:'Cost',datan:'Cost'},
            {name:'Action',datan:'Action',Call:()=><TableTextButton children={"View"} width="42px" onClick={ViewDetail}/>},
        ]
        const jobListdata = [
            {CustomerName:"Antonio Razzo",BusinessName:"Tony’s Lounge",JobName:"Dining Room",Date:"01/21/23",Cost:"$800.00"},
            {CustomerName:"Antonio Razzo",BusinessName:"Tony’s Lounge",JobName:"Dining Room",Date:"01/21/23",Cost:"$800.00"},
            {CustomerName:"Antonio Razzo",BusinessName:"Tony’s Lounge",JobName:"Dining Room",Date:"01/21/23",Cost:"$800.00"},
        ]
     //--------------------------------------------------------------------------------------//
//---------------------------------Page Footer--------------------------------------------//     
const Pagefooter =(
  <div style={{display:'flex', flexDirection:'row',gap:'15px'}}>
          <CustomTextButton width="60px" onClick={()=>{navigate('/')}}>Back</CustomTextButton>
          <CustomTextButton width="100px" >Export</CustomTextButton>

  </div>
)
//---------------------------------------------------------------------------------------------//

    return(
        <div>
            {costView ?
            <ViewJobCost onClicks={ViewDetail}/> 
            :
            <>
            <div>
            {costForm}
          </div>
          <CustomTable columns={jobListColumns} data={jobListdata} />
                {isOverflow ?
                <div style={{ width:'100%',display: 'flex', flexDirection: 'row',justifyContent:'flex-end',marginTop:'15px'}}>
        {Pagefooter}
      </div>
      :
<div style={{position:'fixed',bottom:'10px',width:'100%'}}>
  <div style={{ width:'100%',display: 'flex', flexDirection: 'row',justifyContent:'flex-end',padding:'0px 40px'}}>
        {Pagefooter}
      </div>

</div>
}
          </>
            }
           
     
        </div>
    )
}
export default CostCalculator;