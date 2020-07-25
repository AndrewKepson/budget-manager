// ======================
// VARIABLES
// ======================

// 1st: pull initial budgetItems/lastID from localStorage to set initial variables
                    // Get item from ls OR (if ls key is null) create an empty array
let budgetItems = JSON.parse(localStorage.getItem("budgetItems")) || [];
let lastID = localStorage.getItem("lastID") || 0;
// ======================
// FUNCTIONS
// ======================
const updateStorage = () => {
    localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    localStorage.setItem("lastID", lastID);
}

// 5th: function to render budgetItems on table; each item should be rendered in this format:
// <tr data-id="2"><td>Oct 14, 2019 5:08 PM</td><td>November Rent</td><td>Rent/Mortgage</td><td>1300</td><td>Fill out lease renewal form!</td><td class="delete"><span>x</span></td></tr>
// also, update total amount spent on page (based on selected category):

const renderItems = (items) => {

    if (!items) items = budgetItems;
    const tbody = $("#budgetItems tbody");
    tbody.empty();

    let total = 0;

    for (const { id, date, name, category, amount, notes } of items) {
        tbody.append(`<tr data-id="${id}"><td>${date}</td><td>${name}</td><td>${category}</td><td>$${parseFloat(amount).toFixed(2)}</td><td>${notes}</td><td class="delete"><span>x</span></td></tr>`);
        total += parseFloat(amount);
    }
    $("#total").text(`$${total}`)
}
// ======================
// MAIN PROCESS
// ======================

$("#toggleFormButton, #hideForm").click(function() {
    $("#addItemForm").toggle("slow", function() {
        $("#toggleFormButton").text($(this).is(":visible") ? "Hide Form" : "Add New Budget Item");
    });
});

$("#addItem").click(function(event) {
    event.preventDefault();

    let newItem = {
        id: ++lastID,
        date: moment().format("lll"),
        name: $("#name").val().trim(),
        category: $("#category").val().trim(),
        amount: $("#amount").val().trim(),
        notes: $("#notes").val().trim()
    };

    if (!newItem.name || !newItem.category || !newItem.amount) {
        return alert("Each budget item must have a valid name, category, and amount!")
    }

    budgetItems.push(newItem);

    updateStorage();

    $("input, select").val("");


});

// 6th: wire up change event on the category select menu, show filtered budgetItems based on selection


// 7th: wire up click event on the delete button of a given row; on click delete that budgetItem





renderItems();
