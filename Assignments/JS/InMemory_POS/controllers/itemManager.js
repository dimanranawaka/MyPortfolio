/* Item Code Generator */

let itemIdAutoGenerator = 1;
$('#itemIdTxt').val("I-0" + itemIdAutoGenerator);

/* Item TAB Functions */

/* Load All Items to the table */

function loadAllItems() {

    /* Remove If Repeats */
    $("#itemTblBody").empty();

    for (let i of itemDetails) {
        let row = `<tr>
                        <td>${i.itemCode}</td>
                        <td>${i.itemName}</td>
                        <td>${i.qty}</td>
                        <td>${i.unitPrice}</td>
                   </tr>`;
        $('#itemTblBody').append(row);
    }
}

/* Disabling tab press */
$('#ItemNameTxt,#itemIdTxt,#itemQtyTxt,#unitPriceTxt').on('keydown', function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
})



/* Validator for itemIdTxt */
validator('#itemIdTxt', /^I-[0-9]{1,5}$/,
    "Your input can't be validated, Ex - I-001",
    '#itemIdTxtLbl', '#ItemNameTxt'
);



/* Validator for ItemNameTxt  */
validator('#ItemNameTxt', /^[A-z]{2,10}$/,
    "Your input can't be validated, Ex - Burger",
    '#itemNameTxtLbl', '#itemQtyTxt'
);



/* Validator for itemQtyTxt  */
validator('#itemQtyTxt', /^[0-9]{1,4}$/,
    "Your input can't be validated, 10 ",
    '#itemQtyTxtLbl', '#unitPriceTxt'
);


/* Validator for item unitPriceTxt  */
validator('#unitPriceTxt', /^([0-9]{2,6}.[0-9]{1,2})$/,
    "Your input can't be validated, Ex - 120.99",
    '#itemUnitPriceTxtLbl', '#ItemNameTxt'
);

/* save object in to the array */
function saveItem() {

    /* packing item details into itemObject */
    let item = new Item(
        $("#itemIdTxt").val(),
        $("#ItemNameTxt").val(),
        $("#itemQtyTxt").val(),
        $('#unitPriceTxt').val()
    );


    /* itemObjects adding into itemDetails main Array */
    itemDetails.push(item);

    clearTextField('#ItemNameTxt,#itemIdTxt,#itemQtyTxt,#unitPriceTxt')

    /* Saved Notification */
    savedSuccessfully();
    loadAllItems();
    itemIdAutoGenerator++;
    $('#itemIdTxt').val("I-0" + itemIdAutoGenerator);
    loadAllItemToCombo();
}

/* Save Item */
$("#addItemBtn").on('click', function () {
    saveItem();
});

/* Search Item */
$("#srcItemID").on('keyup', function (e) {
    let response = search($("#srcItemID").val(), itemDetails);
    let key = e.which;
    if (key === 13) {
        if (response) {
            $("#itemIdTxt").val(response.itemCode);
            $("#ItemNameTxt").val(response.itemName);
            $("#itemQtyTxt").val(response.qty);
            $('#unitPriceTxt').val(response.unitPrice);
        } else {
            clearTextField('#ItemNameTxt,#itemIdTxt,#itemQtyTxt,#unitPriceTxt');
            searchResultNotFound();
        }
    }
});

/* Delete Item */
$('#deleteItemBtn').on('click', function () {
    deleteObj('#srcItemID', itemDetails)
    clearTextField('#ItemNameTxt,#itemIdTxt,#itemQtyTxt,#unitPriceTxt,#srcItemID');
});

/* Update Item */
$('#updateItemBtn').on('click', function () {
    update('#srcItemID', itemDetails, '#itemIdTxt',
        '#ItemNameTxt', '#itemQtyTxt', '#unitPriceTxt');

    clearTextField('#ItemNameTxt,#itemIdTxt,#itemQtyTxt,#unitPriceTxt,#srcItemID');
    $('#itemIdTxt').val("I-0" + itemIdAutoGenerator);
});