import React from "react";

function Page(props) {

  return (
    <div className={"page-number-container"}>
      <img className="previous-page-arrow" src={"./assets/icons/arrow_previous.svg"} alt={"previous arrow"}/>
      <input type={"number"} value={props.pageNumber}/>
      <img className={"next-page-arrow"} src={"./assets/icons/arrow_next.svg"} alt={"next arrow"}/>
    </div>
  );
}

export default Page;