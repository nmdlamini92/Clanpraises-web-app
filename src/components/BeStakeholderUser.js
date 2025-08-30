import { FaUser, FaFeather, FaFeatherAlt } from "react-icons/fa"
import { IconBtn } from "./IconBtn"


export default function BeStakeholderUser() {

    return (
        <div className="text-xs p-1 rounded border border-gray-300 bg-lime-200/30">
            <div className="flex flex-row justify-center items-center">
            <IconBtn 
                Icon={props => <FaUser {...props} size={12} className=""/>} 
                style={{ marginBottom: 0, color: "rgba(180, 83, 9, 0.8)" }}
                >
            </IconBtn>
            <p className="font-bold text-md">become a stakeholder user</p>
            </div>
            do you have an archive of clan praises?<br></br>
            <div className="flex flex-row justify-center items-center gap-1">
             <p>Email us at</p> <p className="text-blue-500 underline">admin@clanpraises.com</p>
             </div>
        </div>
            
    )
}