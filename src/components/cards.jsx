import { PiCompassRose } from "react-icons/pi";

function Card(props) {
    return (
        <>
            <div class="flex flex-row justify-center align-middle  p-5 bg-slate-800 border border-white rounded-lg " >
                <div class="self-center">
                    {props.icon}
                </div>
                <div class=" flex flex-col p-5 bg-slate-800">
                    <p class="font-normal text-[15px] opacity-75">{props.content}</p>
                    <h4 class="font-medium text-[35px]">{props.value}</h4>
                </div>
            </div>
        </>
    );
}

export default Card;