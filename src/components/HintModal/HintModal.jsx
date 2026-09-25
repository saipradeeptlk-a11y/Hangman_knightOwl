import "./HintModal.css";
import { X } from "lucide-react";

export function Hint({ Hint , onclose}) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-button" onClick={ onclose }>
        <X size={24}  />
        </button>
        <h2 className={"modal-title win"}>
          {Hint}
        </h2>
    
      </div>
    </div>
  );
}