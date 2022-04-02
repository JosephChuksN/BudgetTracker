export default class TrackerApp {
    constructor(selectorString) {
        this.mainBody = document.querySelector(selectorString);
        this.mainBody.innerHTML = TrackerApp.html();
       

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
          <td colspan="5"><h4 class="px-1">Total: <span>0.00</span></h4></td>
        </tfoot>
    </table>
        `; 
              
        
    }
static tContent(){
   return `
        <tr>
            <td><input class="rounded border-0 py-1" type="date" name="" id=""></td>
            <td><input class="rounded border-0 py-1" type="text" name="" id="" placeholder="Eg. Rent, Purchase, income"></td>
            <td><select class="rounded border-0 p-1" name="" id=""><option value="Income">Income</option><option value="Expenses">Expenses</option></select></td>
            <td><input class="rounded border-0 py-1" type="number" name="" id=""></td>
            <td><button class="border-0 btn btn-delete">&#10005;</button></td>
        </tr>
   `;
}

}
 
