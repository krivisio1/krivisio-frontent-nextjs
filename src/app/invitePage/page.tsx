import Profile from "../management/dashboard/profile/page";
import Invitation from "./inviteTeamMember";
import JoinWorkspace from "./joinWorkspace";
import ProfileSetup from "./setUpProfile/page";

export default function testing(){
    return(
        <div>
            <JoinWorkspace/>
            <Invitation/>
            <ProfileSetup/>
        </div>
    )
}