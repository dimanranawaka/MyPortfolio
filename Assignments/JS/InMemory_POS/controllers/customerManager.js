
/*Customer ID Generator*/
let customerIDAutoGenerator = 1;
$('#cusIdTxt').val("C-0"+customerIDAutoGenerator);


/*Load All Customers to table */
function loadAllCustomer(){
    /*Remove If Repeats*/
    $("#customerTableBody").empty();

    for(let i of customerDetails){
        let row = `<tr>
                        <td>${i.id}</td>
                        <td>${i.name}</td>
                        <td>${i.address}</td>
                        <td>${i.connect}</td>
                        
                   </tr>`;
        $('#customerTableBody').append(row);
    }
}
/* Disabling Tab */
$('#cusNameTxt, #cusAddressTxt , #cusContactTxt , #cusIdTxt').on('keydown',function (e){
    if(e.key === "Tab"){
        e.preventDefault();
    }
})

/* Validator for Customer ID  txt */
validator(
    '#cusIdTxt', /^(C-0)[0-9]{1,4}$/,
    "Your input can't be validated, Ex - C-001",
    '#customerIdLbl', '#cusNameTxt'
)

/* Validator for Customer Name  txt */
validator(
    '#cusNameTxt', /^[A-z]{3,30}$/,
    "Your input can't be validated, Ex - Dreed",
    '#customerNameLbl', '#cusAddressTxt'
)
/* Validator for Customer Contact  txt */
validator(
    '#cusContactTxt', /^(07([1245678])|091)(-)[0-9]{7}$/,
    "Your input can't be validated, Ex - 0772868308",
    '#CustomerContactLbl', '#cusNameTxt'
)
/* Save Customer Function */

function saveCustomer(){

    /* taking Customer details into a customerObject */

    let customer = new Customer(
        $('#cusIdTxt').val(),
        $('#cusNameTxt').val(),
        $('#cusAddressTxt').val(),
        $('#cusContactTxt').val()
    );

    /* Adding customer Object into Database Array */
    customerDetails.push(customer);

    clearTextField('#cusNameTxt,#cusAddressTxt , #cusContactTxt, #cusIdTxt');

    /* save notification for customer */

    savedSuccessfully();
    loadAllCustomer();
    customerIDAutoGenerator++;
    $('#cusIdTxt').val("C-0"+customerIDAutoGenerator);
    /** **********/
}

/* Saving Customer Object */
$("#addCustomerBtn").on('click',function () {
    saveCustomer();
});

/* search by pressing enter function in Manage Customer Tab*/

$("#srcCustomerId").on('keydown',function (e){
    let response = search($("#srcCustomerId").val(),customerDetails);
    let key = e.which;
    if (key === 13){
        if (response){
            $("#cusIdTxt").val(response.id);
            $("#cusNameTxt").val(response.name);
            $("#cusAddressTxt").val(response.name);
            $("#cusAddressTxt").val(response.address);
            $("#cusContactTxt").val(response.contact);
        }else{
            clearTextField('#cusNameTxt ,#cusAddressTxt,#cusContactTxt,#cusIdTxt');
            searchResultNotFound();
        }
    }
});

/* delete customer */
$('#deleteCustomerBtn').on('click',function (){
    deleteObj('#srcCustomerId', customerDetails);
    clearTextField('#cusNameTxt,#cusAddressTxt,#cusContactTxt,#cusIdTxt,#srcCustomerId');
})
/* update customer */
$('#updateCustomerBtn').on('click',function (){
    update(
        '#srcCustomerId', customerDetails, '#cusIdTxt',
        '#cusNameTxt', '#cusAddressTxt', '#cusContactTxt'
    );
    clearTextField('#cusNameTxt,#cusAddressTxt,#cusContactTxt,#cusIdTxt,#srcCustomerId');
    $('#cusIdTxt').val("C-0"+customerIDAutoGenerator);
})