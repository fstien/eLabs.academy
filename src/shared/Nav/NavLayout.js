import React from "react";

export default class NavLayout extends React.Component { 

 render() { 
  return(
      <div id="NavLayout">
        {this.props.children}
      </div>
  )
 }

}