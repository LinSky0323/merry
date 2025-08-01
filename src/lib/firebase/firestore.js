import {db} from "./firebaseApp"
import {  doc, setDoc } from "firebase/firestore"

export async function returnMsg(name,obj){
    const ref = doc(db,"info",name)
    try{
        await setDoc(ref,obj)
        return({"success":true,"mes":"修改成功"})
    }
    catch(error){
        return({"success":false,"mes":"修改失敗 : "+error})
    }   
}//創建？更新paramsID
