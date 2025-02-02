

let button = document.querySelector("button");
let container = document.querySelector(".notes-container");


function showNotes() {
   let savedNotes = localStorage.getItem("notes");
   if (savedNotes) {
      container.innerHTML = savedNotes;
   }
}


function updateStorage() {
   localStorage.setItem("notes", container.innerHTML);
}


showNotes();


button.addEventListener('click', () => {
   let newpara = document.createElement("p");
   let img = document.createElement("img");
   newpara.className = "note";
   newpara.setAttribute('contenteditable', 'true');
   img.src = "assets/delete.png";
   img.setAttribute("contenteditable", 'false');
   container.appendChild(newpara).appendChild(img);

 
   updateStorage();
});


container.addEventListener('click', function (e) {
   
   if (e.target.tagName === "IMG") {
      e.target.parentElement.remove();
      updateStorage();
   }
   
   else if (e.target.tagName === "P" && e.target.classList.contains("note")) {
      e.target.onkeyup = function () {
         updateStorage();
      };
   }
});

// Prevent the default behavior of the Enter key in contenteditable elements (to insert a line break)
document.addEventListener("keydown", event => {
   if (event.key === "Enter") {
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      let br = document.createElement("br");
      range.insertNode(br);
      range.setStartAfter(br);
      event.preventDefault();
   }
});
