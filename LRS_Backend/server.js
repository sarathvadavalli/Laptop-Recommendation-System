import express from 'express';
import cors from 'cors';
import mysql from 'mysql2'
import bodyParser from 'body-parser';
const app = express();
const port=3000;
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'Sarath@12ms',
    database:'prac'
}).promise()

app.get('/',(req,res)=>{
    res.send('Server is ready');
});


var result;
app.post('/api/pro', async (req, res) => {
    const receivedData = req.body.selectedData;
    receivedData.sort((a, b) => {
        if (a.header < b.header) return -1;
        if (a.header > b.header) return 1;
    
        if (a.option < b.option) return -1;
        if (a.option > b.option) return 1;
        return 0;
    });
    let  previous='';
    console.log(receivedData);
    let query = 'SELECT * FROM LAPTOP WHERE (';
    if(receivedData.length!=0){
    for (const element of receivedData) {
        let { header, option } = element;
        console.log(header,option);
        if (header === 'price' && previous != header) {
            if(previous!=''){
            query = query.slice(0, -4);
            if (option === '$100 - $499') {
                let qy=") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 100 AND 499) or ";
                query += qy;
            } else if (option === '$500 - $999') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 500 AND 999) or ";
            } else if (option === '$1000 - $1499') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1000 AND 1499) or ";
            } else if (option === '$1500 - $1999') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1500 AND 1999) or ";
            } else if (option === '$2000+') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) >= 2000) or ";
            }
        }
        else{
            if (option === '$100 - $499') {
                let qy="CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 100 AND 499 or ";
                query += qy;
            } else if (option === '$500 - $999') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 500 AND 999 or ";
            } else if (option === '$1000 - $1499') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1000 AND 1499 or ";
            } else if (option === '$1500 - $1999') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1500 AND 1999 or ";
            } else if (option === '$2000+') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) >= 2000) or ";
            }
        }
            previous = header;
        }
         else if (header === 'price' && previous === 'price') {
            query = query.slice(0, -4);
            if (option === '$100 - $499') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 100 AND 499 or ";
            } else if (option === '$500 - $999') {
                query += "  or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 500 AND 999 or ";
            } else if (option === '$1000 - $1499') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1000 AND 1499 or ";
            } else if (option === '$1500 - $1999') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1500 AND 1999 or ";
            } else if (option === '$2000+') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) >= 2000 or ";
            }
        }
        else if(header==='weight'){
            if(option==='less than 1'){
                option=0;
            }
            if(previous===''){
                query+=header+" like '%"+option+".%kg%' or ";
            }
            else if(previous===header){
                query = query.slice(0, -4);
                query+=" or "+header+" like '%"+option+".%kg%' or ";
            }
            else{
                query = query.slice(0, -4);
                query+=") and ("+header+" like '%"+option+".%kg%' or ";
            }
            previous=header;
        }
            else if(header==='Battery'){
                option=option.slice(0,-3);
                if(previous===''){
                    query+=header+" like '"+option+".%-%' or ";
                }
                else if(previous===header){
                    query = query.slice(0, -4);
                    query+=" or "+header+" like '"+option+".%-%' or ";
                }
                else{
                    query = query.slice(0, -4);
                    query+=") and ("+header+" like '"+option+".%-%' or ";
                }
                previous=header;
            }
            else if(previous===header || previous===''){
            query += header + " LIKE '%" + option + "%' or ";
            previous=header;
            }
            else{
                    query = query.slice(0, -4);  
                    console.log(query);
                    query+=")and ("+header+ " LIKE '%" + option + "%' or ";
                    previous=header;
            }
        }
        query = query.slice(0, -4); 
        query += ");";
    }
    else {
    query=query.slice(0,-7);
    }
        console.log("\nnew line ",query);
    result = await db.query(query);
    console.log(result[0].length);
    res.send(result[0]);
    query = '';
});
app.post('/api/names', async (req, res) => {
    const receivedData = req.body.selectedData;
    receivedData.sort((a, b) => {
        if (a.header < b.header) return -1;
        if (a.header > b.header) return 1;
    
        if (a.option < b.option) return -1;
        if (a.option > b.option) return 1;
        return 0;
    });
    let  previous='';
    console.log(receivedData);
    let query = 'SELECT * FROM LAPTOP WHERE (';
    for (const element of receivedData) {
        const { header, option } = element;
        console.log(header,option);
        if (header === 'price' && previous != header) {
            if(previous!=''){
            query = query.slice(0, -4);
            if (option === '$100 - $499') {
                let qy=") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 100 AND 499) or ";
                query += qy;
            } else if (option === '$500 - $999') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 500 AND 999) or ";
            } else if (option === '$1000 - $1499') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1000 AND 1499) or ";
            } else if (option === '$1500 - $1999') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1500 AND 1999) or ";
            } else if (option === '$2000+') {
                query += ") and ((CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) >= 2000) or ";
            }
        }
        else{
            if (option === '$100 - $499') {
                let qy="CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 100 AND 499 or ";
                query += qy;
            } else if (option === '$500 - $999') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 500 AND 999 or ";
            } else if (option === '$1000 - $1499') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1000 AND 1499 or ";
            } else if (option === '$1500 - $1999') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1500 AND 1999 or ";
            } else if (option === '$2000+') {
                query += "CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) >= 2000) or ";
            }
        }
            previous = header;
        }
         else if (header === 'price' && previous === 'price') {
            query = query.slice(0, -4);
            if (option === '$100 - $499') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 100 AND 499 or ";
            } else if (option === '$500 - $999') {
                query += "  or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 500 AND 999 or ";
            } else if (option === '$1000 - $1499') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1000 AND 1499 or ";
            } else if (option === '$1500 - $1999') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1500 AND 1999 or ";
            } else if (option === '$2000+') {
                query += " or CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) >= 2000 or ";
            }
        }
            else if(previous===header || previous===''){
            query += header + " LIKE '%" + option + "%' or ";
            previous=header;
            }
            else{
                query = query.slice(0, -4);
                query+=")and ("+header+ " LIKE '%" + option + "%' or ";
                previous=header;
            }

       
    }
    query = query.slice(0, -4);
    query += ");";
    console.log("the pk ", query);
    result = await db.query(query);
    console.log(result[0].length);
    res.send(result[0]);
    query = '';
});


app.post('/api/begin', async (req, res) => {
    const receivedData = req.body.selectedData;
    receivedData.sort((a, b) => {
        if (a.header < b.header) return -1;
        if (a.header > b.header) return 1;
    
        if (a.option < b.option) return -1;
        if (a.option > b.option) return 1;
        return 0;
    });
   
    let query = 'SELECT * FROM LAPTOP WHERE (';
    let previous='';
    for (const element of receivedData) {
        const { header, option } = element;
        console.log(header,option);
        if(previous!=''){
           query+=" and ";
        }
        
        if(header === 'What Do You Use Your Laptop For?'){
           if(option === 'Casual Use/Work')
             query +=  "((CPU LIKE '%i5%U' OR CPU LIKE '%i3%U' OR CPU LIKE '%CELERON%' OR CPU LIKE '%Ryzen 3%' OR CPU LIKE '%Ryzen 5%') AND (GPU LIKE '%AMD%' OR GPU LIKE '%INTEL%') AND RAM LIKE '8 GB%')";
           else if(option === 'Coding')
             query +=  "((CPU LIKE '%i5%' OR CPU LIKE '%i7%' OR CPU LIKE '%Ryzen 7%' OR CPU LIKE '%Ryzen 5%') AND OS LIKE  '%11%'  AND (GPU LIKE  '%AMD%'  OR GPU LIKE  '%INTEL%') AND RAM NOT LIKE  '8 GB%')";
           else if(option === 'Gaming/Rendering')
             query += "((CPU LIKE '%H' OR CPU LIKE '%Ryzen 7%H') AND (GPU LIKE '%AMD%' OR GPU LIKE  '%NVIDIA%') AND RAM NOT LIKE '8 GB%')";
           previous=header;
        }
    
        if(header === 'Do You Have Brand Preference?'){
            if(option === 'Top Brands')
              query += "(LapName LIKE 'DELL%' OR LapName LIKE 'HP%' OR LapName LIKE 'LENOVO%')";
            else if(option === 'Any Serviceable Brand')
              query += "(LapName NOT LIKE 'MSI%' OR LapName NOT LIKE 'GIGABYTE%')";
            previous=header;
        }
    
        if(header === 'How Often Do You Travel?'){
            if(option === 'Very Often')
               query += "(weight NOT LIKE '3%kg' AND weight NOT LIKE '4%kg' AND Battery > 8)";
            else if(option === 'Sometimes')
                query += "(Battery > 5)";
            previous=header;
        }
    
        if(header === 'What Is Your Budget For Laptop?'){
            if (option === '$100 - $499') {
                query +=  "(CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 100 AND 499)";
            } else if (option === '$500 - $999') {
                query +=  "(CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 500 AND 999)";
            } else if (option === '$1000 - $1499') {
                query +=  "(CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1000 AND 1499)";
            } else if (option === '$1500 - $1999') {
                query +=  "(CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) BETWEEN 1500 AND 1999)";
            } else if (option === '$2000+') {
                query +=  "(CAST(REPLACE(price, '$', '') AS DECIMAL(10,2)) >= 2000)";
            }
            previous=header;
        }
    
        if(header === 'Do You Store A Lot Of Things?'){
            if(option === 'Yes')
                query +=  "(Disk > 512)";
            else if(option === 'Not Much')
                query +=  "(Disk BETWEEN 256 AND 512)";
            else if(option === 'Very Little')
                query += "(Disk < 256)";
            previous=header;
        }
    }
    query += ");";
    console.log("the pk ", query);
    result = await db.query(query);
    console.log(result[0].length);
    res.send(result[0]);
    query = '';
});


var num=0;
app.post('/api/laptopdata',async(req,res)=>{
    console.log(req.body.param);
    num=req.body.param;
    result = await db.query("SELECT * FROM laptop WHERE id=?", (num));
    res.send("successful");
})
app.get('/api/getdata',(req,res)=>{
    console.log(result[0][0]);
    res.send(result[0][0]);

})
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);

});