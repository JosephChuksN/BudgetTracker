class TrackerApp {
    constructor(selectorString) {
        this.mainBody = document.querySelector(selectorString);
        this.mainBody.innerHTML = TrackerApp.html();
        this.mainBody.querySelector(".btn-sm").addEventListener("click", ()=> {
        this.onClickNewEntry();
        })
       this.loadData();

    }
    static html(){
        return `
        <table class="table table-success table-striped ">
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="new-entry"></tbody>
        <tbody>
          <tr class="" >
            <td colspan="5"><button class="btn btn-sm btn-dark" >New Entry</button></td>
          </tr>
        </tbody>
        <tfoot>
          <td colspan="5"><h4 class="px-1">Total: <span class="total">0.00</span></h4></td>
        </tfoot>
    </table>
        `; 
              
        
    }
static tContent(){
   return `
        <tr class="new-entry-row">
            <td><input class="rounded border-0 py-1" type="date" name="" id="date"></td>
            <td><input class="rounded border-0 py-1" type="text" name="" id="description" placeholder="Eg. Rent, Purchase, income"></td>
            <td><select class="rounded border-0 p-1" name="" id="type"><option value="Income">Income</option><option value="Expenses">Expenses</option></select></td>
            <td><input class="rounded border-0 py-1" type="number" name="" id="amount"></td>
            <td><button class="border-0 btn rounded btn-delete">&#10005;</button></td>
        </tr>
   `;
}

loadData(){
    const detailsEntries =JSON.parse(localStorage.getItem("budget-details") || "[]");
    for(const entry of detailsEntries){
        this.tRowEntries(entry)
    }
    this.review();
}     

rowEntries(){
    return Array.from(this.mainBody.querySelectorAll(".new-entry-row"));
}


save(){
      const details = this.rowEntries().map(rowData => {
          return {
              date: rowData.querySelector("#date").value,
              description: rowData.querySelector("#description").value,
              type: rowData.querySelector("#type").value,
               amount: rowData.querySelector("#amount").value,
               
          };

      })
   localStorage.setItem("budget-details", JSON.stringify(details))
   this.review();
}

tRowEntries(entry = {}){

    this.mainBody.querySelector(".new-entry").insertAdjacentHTML("beforeend", TrackerApp.tContent());
     const tRow = this.mainBody.querySelector(".new-entry tr:last-of-type")
       
      tRow.querySelector("#date").value = entry.date || new Date().toISOString().replace(/T.*/, "");
      tRow.querySelector("#description").value = entry.description || "";
      tRow.querySelector("#type").value = entry.type || "Income";
      tRow.querySelector("#amount").value = entry.amount || 0;
      tRow.querySelector(".btn-delete").addEventListener("click", e => {
      this.onDeletebtn(e);
      });
      
     
      tRow.querySelectorAll(".rounded").forEach(input => {
          input.addEventListener("input", this.save());
      });

}

review(){
    const total = this.rowEntries().reduce((total, row) =>{
      const amount = row.querySelector("#amount").value;
      const ifIncome = row.querySelector("#type").value === "Income";
      const checker =  ifIncome ? 1 : -1;
      return total + (amount * checker)
    }, 0);
      const totalFigure = this.mainBody.querySelector(".total");
      totalFigure.textContent = total;
    
}

onClickNewEntry(){
      this.tRowEntries()
}

onDeletebtn(e){
    
  e.target.closest("tr").remove();
  this.save();
}


}
export default TrackerApp;
