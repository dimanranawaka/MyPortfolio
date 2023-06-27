// Variable for auto-generated order ID
let autoGeneratedOrderId = 1;

// Set the value of an element with ID "txtOrderID" to the auto-generated order ID
$('#txtOrderID').val('0-00' + autoGeneratedOrderId);

/* Load All Items to Table */
function loadAllOrderDetails() {
    // Remove any existing rows from the table body
    $('#orderTblBody').empty();

    // Iterate over each order detail
    for (let oDetails of orderDetails) {
        // Create a table row with the order details and append it to the table body
        let orderRow = `<tr>
                            <td>${oDetails.iCode}</td>
                            <td>${oDetails.itemName}</td>
                            <td>${oDetails.price}</td>
                            <td>${oDetails.Qty}</td>
                            <td>${oDetails.total}</td>
                        </tr>`;
        $('#orderTblBody').append(orderRow);
        bool = false;
    }
}

// Load all customers to the combo box
function loadAllCustomersToCombo() {
    // Clear existing options in the combo box
    $('#orderCustomerID').empty();

    // Iterate over each customer
    for (let customer of customerDetails) {
        // Append a new option with the customer ID to the combo box
        $("#orderCustomerID").append(`<option>${customer.id}</option>`);
    }
}

// Combo operations when selecting a customer ID
$('#orderCustomerID').on('click', function () {
    // Get the selected customer ID
    let customerID = $('#orderCustomerID').val();

    // Iterate over the customer details
    for (let i = 0; i < customerDetails.length; i++) {
        // If the customer ID matches, update the corresponding fields
        if (customerDetails[i].id === customerID) {
            $("#selectCusName").val(customerDetails[i].name);
            $("#orderCustomerContact").val(customerDetails[i].address);
            $("#orderCustomerContact").val(customerDetails[i].contact);
        }
    }
});

// Load all items to the combo box
function loadAllItemToCombo() {
    // Clear existing options in the combo box
    $('#itemCodeCombo').empty();

    // Iterate over each item
    for (let item of itemDetails) {
        // Append a new option with the item code to the combo box
        $("#itemCodeCombo").append(`<option>${item.itemCode}</option>`);
    }
}

// Combo operations when selecting an item code
$('#itemCodeCombo').on('click', function () {
    // Get the selected item code
    let itemID = $('#itemCodeCombo').val();

    // Iterate over the item details
    for (let i = 0; i < itemDetails.length; i++) {
        // If the item code matches, update the corresponding fields
        if (itemDetails[i].itemCode === itemID) {
            $("#selectItemCode").val(itemDetails[i].itemCode);
            $("#txtItemDescription").val(itemDetails[i].itemName);
            $("#txtItemPrice").val(itemDetails[i].unitPrice);
            $("#txtQTYOnHand").val(itemDetails[i].qty);
        }
    }
});

// Variable initialization
let bool = false;
let orderAmount = 0;

// Add button click event handler for adding an item to the table
$('#btnAddToTable').on('click', function () {
    // Clear the table body and load all order details
    $("#orderTblBody").empty();
    loadAllOrderDetails();

    // Calculate the total for the current item
    let a = $("#txtItemPrice").val();
    let b = $('#txtQty').val();
    let tot = a * b;

    // Create an Order object with the item details
    let orderArray = new Order(
        $("#selectItemCode").val(),
        $("#txtItemDescription").val(),
        $("#txtItemPrice").val(),
        $("#txtQty").val(),
        tot,
        $('#txtOrderID').val()
    );

    let qty1;
    let qty2;
    let tot1;
    let tot2;

    // Check if the item already exists in the order details
    for (let i = 0; i < orderDetails.length; i++) {
        let test = orderDetails[i];

        if ($('#selectItemCode').val() === test.iCode && $('#txtOrderID').val() === test.orderId) {
            bool = true;
            qty1 = parseInt(test.Qty);
            tot1 = parseInt(test.total);
            qty2 = parseInt($("#txtQty").val());
            tot2 = parseInt(tot);

            // Update the existing item's quantity and total
            test.iCode = $("#selectItemCode").val();
            test.itemName = $("#txtItemDescription").val();
            test.price = $("#txtItemPrice").val();
            test.Qty = qty1 + qty2;
            test.total = tot1 + tot2;

            // Clear the table body
            $('#orderTblBody').empty();
        }
    }

    // If the item doesn't exist in the order details, add it
    if (bool === false) {
        orderDetails.push(orderArray);
    }

    // Update the item quantity in the item details
    for (let i = 0; i < itemDetails.length; i++) {
        if (itemDetails[i].itemCode === $("selectItemCode").val()) {
            itemDetails[i].qty = itemDetails[i].qty - $("#txtQty").val();
        }
    }

    // Load all items
    loadAllItems();

    // Show a notification for the customer
    savedSuccessfully();

    // Load all order details
    loadAllOrderDetails();

    $('#total').val();

    // Recalculate the total
    let x = $("#txtItemPrice").val();
    let y = $('#txtQty').val();
    let z = x * y;

    // Create an OrderDetails object for purchase details
    let singleOrder = new OrderDetails(
        $('#txtOrderID').val(),
        $('#txtDate').val(),
        $("#orderCustomerID").val(),
        $("#selectItemCode").val(),
        $("#txtQty").val(),
        z,
        $("#txtDiscount").val()
    );

    // Add the purchase details to the array
    purchaseDetails.push(singleOrder);

    // Update the order amount
    orderAmount += tot;

    // Load all purchase details
    loadAllPurchaseDetails();
});

// Variable initialization
let fullTot = 0;
let setTotZero = 0;
let fullAmount = 0;

// Submit order button click event handler
$('#btnSubmitOrder').on('click', function () {
    // Calculate the total for the current item
    let x = $("#txtItemPrice").val();
    let y = $('#txtQty').val();
    let z = x * y;

    // Create an object for the single order
    let singleOrder = {
        oID: $('#txtOrderID').val(),
        date: $('#txtDate').val(),
        cID: $("#orderCustomerID").val(),
        iCode: $("#selectItemCode").val(),
        oQty: $("#txtQty").val(),
        Tot: z,
        discount: $("#txtDiscount").val()
    }

    // Add the single order to the purchase details
    purchaseDetails.push(singleOrder);

    // Clear text fields
    clearTextField('#selectItemCode,#txtItemDescription,#txtItemPrice,#txtQTYOnHand');
    clearTextField('#orderCustomerID,#selectCusName,#orderCustomerContact,#orderCustomerAddress');

    // Show a notification for the customer
    savedSuccessfully();

    // Increment the auto-generated order ID
    $('#txtOrderID').val('O-00' + autoGeneratedOrderId);
    autoGeneratedOrderId++;

    // Calculate the full total
    for (let i = 0; i < orderDetails.length; i++) {
        let totVal = orderDetails[i];
        fullTot += parseInt(totVal.total)
    }

    // Get the discount percentage
    let disCount = parseInt($('#txtDiscount').val());

    // Calculate the discounted price
    let discountedPrice = (orderAmount / 100) * disCount;

    // Calculate the order amount
    let oAmount = parseInt(orderAmount);

    // Set the value of the total field
    $('#total').val("Rs/= " + (oAmount - discountedPrice));

    // Get the custom cash
    let customCash = parseInt($('#txtCash').val());

    // Calculate the subtotal
    let subTotal = (orderAmount / 100) * disCount;
    $('#subtotal').val(subTotal);

    let s = customCash;
    let d = discountedPrice;
    let sbTot;

    if (discountedPrice > 0) {
        sbTot = subTotal;
        $('#subtotal').val(sbTot);
    } else {
        $('#subtotal').val("No discount");
    }

    let dc = s - d;

    $('#txtBalance').val(s - (oAmount - discountedPrice));

    // Increment the auto-generated order ID
    $('#txtOrderID').val('O-00' + autoGeneratedOrderId);
    autoGeneratedOrderId++;

    // Reset variables and order details
    orderAmount = 0;
    orderDetails.splice(0, orderDetails.length);
    loadAllOrderDetails();
});

// Clear button click event handler
$('#btnClear').on('click', function () {
    // Clear text fields
    clearTextField('#txtQty,#subtotal,#total');
    clearTextField('#txtCash,#txtDiscount,#txtBalance');
});
