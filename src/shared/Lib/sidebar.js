
function showSideBar() { 
  store.dispatch({ 
    type: "showSideBar"
  })

  document.getElementById("Applet").style.filter = "blur(1px)";
  document.getElementById("PanelView").style.filter = "blur(1px)";
}

function hideSideBar() { 
  store.dispatch({ 
    type: "hideSideBar"
  })
  
  document.getElementById("Applet").style.filter = "blur(0px)";
  document.getElementById("PanelView").style.filter = "blur(0px)";
}


export { 
	showSideBar, 
	hideSideBar,
}


