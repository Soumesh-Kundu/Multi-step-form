import { useRealm } from "../realm"


export default defineEventHandler(async (event) => {
    const {mongo}=useRealm()
    const dataCollection=mongo
    try {
        const body = await readMultipartFormData(event)

        // this files Array will content all files that are send by users 

        // file object structure:
        // {
        //     name:"",
        //     filename:"",
        //     type:"",
        //     data:""
        // }

        const files = body.filter(item => item.filename !== undefined)//<-- initial Array of File Objects

        // after uploading the files make sure to create a Array of  object files  which will contain the filename and url/path and name of the field  it is coming of the file 
        
        // files= [{name:"<Actual field name>",filename:"<name of the file",url/path:"url/path of the uploaded file"}]
        
        const resObj=body.filter(item=>item.filename===undefined).map(item=>{
            const value=Buffer.from(item.data).toString()
           return {name:item.name, value:value.includes(',')?value.split(','):value}}).reduce((acc,item)=>{
            acc[item.name]=item.value
            return acc
           },{})
        //here add the files with their appropiate field which is given in the "name" field in initial file object in this "resObj"
        
        // ex:
        // resObj[<field name of file>]= <Array of files which containg that field in their name>


        await dataCollection.insertOne(resObj)
        // console.log(resObj)
        return { status: "done" }
    } catch (error) {
        console.log(error)
        setResponseStatus(500,event)
        return { error: "Internal server Error" }
    }
})