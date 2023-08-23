import { Innertext } from "./Innertext";

export function Display(props){
    return(
        <div className={'display'} style={{visibility:props.isVisible}}>
            Info
            <Innertext content={props.content2}/>
            <div onClick={props.closeDisplay} style={{cursor:'pointer'}}>[close]</div>
        </div>
    )
}