let myLeads = []
let oldleads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsfromLocalstorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")


if (leadsfromLocalstorage) {
    myLeads = leadsfromLocalstorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].URL)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
   }) 
})

function render(Leads) {
    let listItems = ""
    for (let index = 0; index < Leads.length; index++) {
      listItems += `
      <li>
      <a target='_blank' href='${Leads[index]}'>
          ${Leads[index]}</a>
      </li>
      `
    }
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})



