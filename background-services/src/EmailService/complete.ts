import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'
dotenv.config()
import sendMail from '../Helpers/email'
interface Project{
    id:string
    name:string
    description:string
    enddate:string
    user_id:string
    assigned:string
    completed:string
}


const Sendadmin= async()=>{
const pool = await mssql.connect(sqlConfig)
const projects:Project[]= await(await pool.request().query(`
SELECT * FROM Projects WHERE complete ='1'`)).recordset
 for(let project of projects){
    ejs.renderFile('template/admin.ejs',{email:project.user_id,name:project.name } ,async(error,data)=>{
        let messageoption={
            from:process.env.EMAIL,
            to:'kiprophez@gmail.com',
            subject:"completed task",
            html:data,
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE Projects SET complete='2' WHERE ProjectsId = '${project.id}'`)
            console.log('Email is Sent');
            
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}


export default  Sendadmin

