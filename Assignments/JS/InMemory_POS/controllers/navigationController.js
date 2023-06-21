$("#Home").on('click',function () {
    // Show the home page
    $("#HomePage").show();
    // Hide other forms
    $("#customerForm").hide();
    $("#itemForm").hide();
    $("#orderForm").hide();
    $("#orderDetailsForm").hide();
});

$("#Customer").on('click',function () {
    // Hide the home page
    $("#HomePage").hide();
    // Show the customer form
    $("#customerForm").show();
    // Hide other forms
    $("#itemForm").hide();
    $("#orderForm").hide();
    $("#orderDetailsForm").hide();
});

$("#Item").on('click',function () {
    // Hide the home page
    $("#HomePage").hide();
    // Hide the customer form
    $("#customerForm").hide();
    // Show the item form
    $("#itemForm").show();
    // Hide other forms
    $("#orderForm").hide();
    $("#orderDetailsForm").hide();
});

$("#Order").on('click',function () {
    // Hide the home page
    $("#HomePage").hide();
    // Hide the customer form
    $("#customerForm").hide();
    // Hide the item form
    $("#itemForm").hide();
    // Show the order form
    $("#orderForm").show();
    // Hide other forms
    $("#orderDetailsForm").hide();
});

$("#orderDetails").on('click',function () {
    // Hide the home page
    $("#HomePage").hide();
    // Hide the item form
    $("#itemForm").hide();
    // Hide the customer form
    $("#customerForm").hide();
    // Hide the order form
    $("#orderForm").hide();
    // Show the order details form
    $("#orderDetailsForm").show();
});
